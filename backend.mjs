import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import {fileURLToPath} from 'node:url';
import {DatabaseSync} from 'node:sqlite';
import catCards from './integrations/cat-cards/lib/handler.cjs';
import catCards3D from './integrations/cat-cards-3d/lib/handler.cjs';
import {createModuleRegistry} from './modules/registry.mjs';
import {startAdminServer} from './admin/server.mjs';
import {createCommunity} from './community/store.mjs';
import {createRealtime} from './community/realtime.mjs';
import {definitions} from './modules/definitions.mjs';

const ROOT=path.dirname(fileURLToPath(import.meta.url));
const DATA=process.env.LAB_DATA_DIR||path.join(ROOT,'data');
const PORT=Number(process.env.PORT||18765);
fs.mkdirSync(DATA,{recursive:true});fs.mkdirSync(path.join(ROOT,'logs'),{recursive:true});
const accessPath=path.join(DATA,'access.json');
if(!fs.existsSync(accessPath)){
 const salt=crypto.randomBytes(24).toString('hex');
 const hash=s=>crypto.scryptSync(s,salt,64).toString('hex');
 fs.writeFileSync(accessPath,JSON.stringify({salt,keys:{'118':hash('118000118'),'3d':hash('yd000d')}},null,2));
}
const access=JSON.parse(fs.readFileSync(accessPath,'utf8'));
const db=new DatabaseSync(path.join(DATA,'lab.sqlite'));
db.exec(`PRAGMA journal_mode=WAL;PRAGMA busy_timeout=5000;
CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,space TEXT NOT NULL,expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS messages(id TEXT PRIMARY KEY,space TEXT NOT NULL,author TEXT NOT NULL,body TEXT NOT NULL,owner TEXT NOT NULL,created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS profiles(session TEXT PRIMARY KEY,name TEXT NOT NULL);`);
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const attempts=new Map(),limits=new Map(),streams=new Map(),reconnectState=new Map(),textCache=new Map();
const roomMessages=[];
const catHandler=catCards.createCatHandler({base:'/games/cat-cards',getIdentity:req=>{const s=auth(req);return s?{id:s.user_id,name:s.name}:null;},settleGame:result=>community.settle('cat',result),getRankings:()=>community.rankings('cat'),authorize:req=>auth(req)?.space==='118',rateKey:req=>auth(req)?.token,loginUrl:'/'});
const cat3DHandler=catCards3D.createCatHandler({dataDir:path.join(DATA,'modules/cat-cards-3d/persistent'),base:'/games/cat-cards-3d',getIdentity:req=>{const s=auth(req);return s?{id:s.user_id,name:s.name}:null;},settleGame:result=>community.settle('cat',result),getRankings:()=>community.rankings('cat'),authorize:req=>auth(req)?.space==='118',rateKey:req=>auth(req)?.token,loginUrl:'/'});
let toolServices,moduleRegistry,adminServer,wsHub;
let eventNumber=0;
const UUID=/^[0-9a-f-]{36}$/;
const log=(event,detail='')=>fs.appendFileSync(path.join(ROOT,'logs','website.log'),`${new Date().toISOString()} ${event} ${detail}\n`);
const cookie=req=>(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('lab_session='))?.slice(12)||'';
function auth(req){const token=cookie(req);if(!/^[a-f0-9]{64}$/.test(token))return null;return db.prepare("SELECT s.*,COALESCE(NULLIF(u.name,''),p.name) name,u.character FROM sessions s LEFT JOIN profiles p ON p.session=s.token LEFT JOIN lab_users u ON u.id=s.user_id WHERE s.token=? AND s.expires>?").get(hash(token),Date.now());}
function json(res,status,value,headers={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});res.end(JSON.stringify(value));}
async function body(req,max=16000){let size=0;const parts=[];for await(const chunk of req){size+=chunk.length;if(size>max)throw Object.assign(Error('内容过长'),{status:413});parts.push(chunk);}try{return JSON.parse(Buffer.concat(parts).toString('utf8')||'{}');}catch{throw Object.assign(Error('请求格式有误'),{status:400});}}
function sameOrigin(req){if(!req.headers.origin)return true;try{return new URL(req.headers.origin).host===req.headers.host;}catch{return false;}}
function allowed(key,ms){const now=Date.now();if(now-(limits.get(key)||0)<ms)return false;limits.set(key,now);return true;}
function emit(client,type,data){if(client.res.destroyed||client.res.writableEnded)return;const ok=client.res.write(`id: ${++eventNumber}\nevent: ${type}\ndata: ${JSON.stringify(data)}\n\n`);if(!ok&&client.res.writableLength>256000)client.res.destroy();}
function presence(){return community.presence();}
function broadcast(type,data,predicate=()=>true){if(type==='world')wsHub?.broadcast(data);for(const c of streams.values())if(predicate(c)&&!(type==='world'&&wsHub?.has(c.id)))emit(c,type,data);}
function announce(){broadcast('presence',presence());}
function disconnect(c,remember=true){if(streams.get(c.id)!==c)return;streams.delete(c.id);wsHub?.detach(c.id);community.detach(c);if(remember)reconnectState.set(c.id,{chat:c.chat,activity:c.activity,until:Date.now()+60000});announce();}
function clientFor(session,input){if(!UUID.test(input.cid||''))return null;return streams.get(session.token+':'+input.cid)||null;}
function catalog(){try{const value=JSON.parse(fs.readFileSync(path.join(ROOT,'integrations.json'),'utf8'));return moduleRegistry?moduleRegistry.catalog(value):value;}catch{return{tools:[],cat:null};}}
function connect(req,res,url,session){
 const cid=url.searchParams.get('cid');
 if(!UUID.test(cid||'')||!session.name)return json(res,400,{error:'请先填写名字'});
 const id=session.token+':'+cid,previous=streams.get(id),saved=reconnectState.get(id);
 if(previous){streams.delete(id);previous.res.end();}
 res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no'});
 res.write('retry: 1800\n\n');res.flushHeaders();
 const c={id,cid,res,token:session.token,name:session.name,chat:!!(saved?.until>Date.now()&&saved.chat),activity:saved?.until>Date.now()?saved.activity:null,seen:Date.now(),expires:session.expires};
 streams.set(id,c);reconnectState.delete(id);community.attach(c,session);
 emit(c,'connected',{cid,name:c.name,chat:c.chat,messages:c.chat?roomMessages.slice(-60):[]});announce();
 res.on('close',()=>disconnect(c));
}
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.wasm':'application/wasm','.glb':'model/gltf-binary'};
function staticFile(req,res,url){
 const publicRoot=path.join(ROOT,'public');
 let relative=decodeURIComponent(url.pathname);if(relative.endsWith('/'))relative+='index.html';
 const target=path.resolve(publicRoot,'.'+relative);
 if(!target.startsWith(publicRoot+path.sep)||!fs.existsSync(target)||!fs.statSync(target).isFile())return json(res,404,{error:'页面不存在'});
 if(relative.startsWith('/tools/')||relative.startsWith('/games/')){
  const s=auth(req);if(!s||s.space!==(relative.startsWith('/tools/')?'3d':'118'))return json(res,401,{error:'请先进入对应实验室'});
  res.setHeader('X-Frame-Options','SAMEORIGIN');
  res.setHeader('Content-Security-Policy',"default-src 'self' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'");
 }
 const stat=fs.statSync(target),etag=`W/\"${stat.size.toString(16)}-${Math.trunc(stat.mtimeMs).toString(16)}\"`;
 const contentType=mime[path.extname(target)]||'application/octet-stream';
 const headers={'Content-Type':contentType,'Cache-Control':relative.startsWith('/assets/')?'public, max-age=31536000, immutable':relative.startsWith('/tools/')?'private, max-age=0, must-revalidate':'no-cache','ETag':etag,'Vary':'Accept-Encoding'};
 if(req.headers['if-none-match']===etag){res.writeHead(304,headers);return res.end();}
 const compressible=/text\/|application\/(json|javascript|wasm)|model\/gltf-binary/.test(contentType)&&stat.size>600;
 if(compressible){
  let entry=textCache.get(target);if(!entry||entry.mtime!==stat.mtimeMs){const bytes=fs.readFileSync(target);entry={mtime:stat.mtimeMs,bytes,br:zlib.brotliCompressSync(bytes,{params:{[zlib.constants.BROTLI_PARAM_QUALITY]:5}}),gz:zlib.gzipSync(bytes)};textCache.set(target,entry);}
  const accept=req.headers['accept-encoding']||'';let bytes=entry.bytes;
  if(/\bbr\b/.test(accept)){bytes=entry.br;headers['Content-Encoding']='br';}else if(/\bgzip\b/.test(accept)){bytes=entry.gz;headers['Content-Encoding']='gzip';}
  headers['Content-Length']=bytes.length;res.writeHead(200,headers);return res.end(req.method==='HEAD'?undefined:bytes);
 }
 headers['Content-Length']=stat.size;res.writeHead(200,headers);if(req.method==='HEAD')return res.end();fs.createReadStream(target).pipe(res);
}
const community=createCommunity({db,root:ROOT,dataDir:DATA,json,body,broadcast,emit,log});
moduleRegistry=await createModuleRegistry({root:ROOT,dataDir:DATA,auth,json,log,settleGame:(game,result)=>community.settle(game,result),rankings:game=>community.rankings(game),handleTool:async(req,res,url,session)=>{toolServices ||= (await import('./tool-services.mjs')).createToolServices({root:ROOT,dataDir:DATA,body,json});return toolServices.handle(req,res,url,session);}});
let accessWrites=0;
function recordAccess(req,res,started){const file=path.join(ROOT,'logs','access.log');try{if(++accessWrites%128===0&&fs.existsSync(file)&&fs.statSync(file).size>8*1024*1024)fs.renameSync(file,file+'.'+Date.now()+'.old');fs.appendFileSync(file,JSON.stringify({time:new Date().toISOString(),method:req.method,path:req.url.split('?')[0].slice(0,300),status:res.statusCode,ms:Math.round(performance.now()-started)})+'\n');}catch{}}
const server=http.createServer(async(req,res)=>{
 const accessStarted=performance.now();res.once('finish',()=>recordAccess(req,res,accessStarted));
 if(['GET','HEAD'].includes(req.method)){
  let url;try{url=new URL(req.url,'http://localhost');}catch{return json(res,400,{error:'网址格式无效'});}const entry=definitions.find(d=>[d.url,d.url.slice(0,-1),d.url+'index.html'].includes(url.pathname));
  if(entry?.disabled)return json(res,410,{error:'平面版已停用'});if(entry){const session=auth(req);if(session?.space!==entry.space)return json(res,401,{error:'请先进入对应实验室'});const current=moduleRegistry.status().modules.find(m=>m.id===entry.id);if(current?.url&&current.url!==entry.url){res.writeHead(302,{Location:current.url+url.search,'Cache-Control':'no-store'});return res.end();}}
 }
 if(req.url.startsWith('/modules/')){try{if(await moduleRegistry.handle(req,res,new URL(req.url,'http://localhost')))return;}catch(error){log('module_error',String(error.message).slice(0,200));if(!res.headersSent)json(res,500,{error:'模块请求未完成'});else res.end();return;}}

 if(req.url.split('?')[0].startsWith('/games/cat-cards/'))return json(res,410,{error:'平面版已停用'});
 if(await cat3DHandler(req,res))return;
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');res.setHeader('X-Frame-Options','DENY');
 res.setHeader('Content-Security-Policy',"default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' blob: wss://yongdian3d.asia; font-src 'self'; frame-src 'self'; worker-src 'self' blob:; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
 try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname.startsWith('/games/cat-cards/api/'))return void await catHandler(req,res);
  if(!url.pathname.startsWith('/api/')){if(!['GET','HEAD'].includes(req.method))return json(res,405,{error:'不支持的请求'});return staticFile(req,res,url);}
  if(!['GET','POST','DELETE'].includes(req.method))return json(res,405,{error:'不支持的请求'});
  if(req.method!=='GET'&&!sameOrigin(req))return json(res,403,{error:'请求来源不匹配'});
  if(url.pathname==='/api/health'&&req.method==='GET')return json(res,200,{app:'3DAlab',status:'ok',version:'3.1.0'});
  if(url.pathname==='/api/session'&&req.method==='GET'){const s=auth(req);return json(res,200,{space:s?.space||null,name:s?.name||null,id:s?.user_id||null,character:s?.character||null});}
  if(url.pathname==='/api/login'&&req.method==='POST'){
   const ip=req.headers['cf-connecting-ip']||req.socket.remoteAddress,now=Date.now();
   let record=attempts.get(ip);if(!record||record.until<now)record={count:0,until:now+60000};
   if(record.count>=12)return json(res,429,{error:'请一分钟后重试'});
   record.count++;attempts.set(ip,record);
   const input=await body(req),key=typeof input.key==='string'?input.key:'';
   if(key.length>64)return json(res,400,{error:'密钥无效'});
   const derived=await new Promise((resolve,reject)=>crypto.scrypt(key,access.salt,64,(err,data)=>err?reject(err):resolve(data)));
   const space=Object.keys(access.keys).find(k=>crypto.timingSafeEqual(derived,Buffer.from(access.keys[k],'hex')));
   if(!space){log('login_failed');return json(res,401,{error:'密钥无效'});}
   attempts.delete(ip);const existing=auth(req);
   const identity=community.identify(req,existing);if(existing?.space===space){return json(res,200,{space,name:identity.user.name||existing.name||'',id:identity.user.id,character:identity.user.character},{'Set-Cookie':identity.cookies});}
   const token=crypto.randomBytes(32).toString('hex');db.prepare('INSERT INTO sessions(token,space,expires,user_id) VALUES(?,?,?,?)').run(hash(token),space,now+7*86400000,identity.user.id);
   log('login',space);return json(res,200,{space,name:identity.user.name||'',id:identity.user.id,character:identity.user.character},{'Set-Cookie':[`lab_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${req.headers['x-forwarded-proto']==='https'?'; Secure':''}`,...identity.cookies]});
  }
  if(url.pathname==='/api/logout'&&req.method==='POST'){
   const token=hash(cookie(req));for(const c of [...streams.values()])if(c.token===token){disconnect(c,false);c.res.end();}
   db.prepare('DELETE FROM sessions WHERE token=?').run(token);
   return json(res,200,{ok:true},{'Set-Cookie':`lab_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${req.headers['x-forwarded-proto']==='https'?'; Secure':''}`});
  }
  const s=auth(req);if(!s)return json(res,401,{error:'请先输入密钥'});
  if(url.pathname.startsWith('/api/tools/')){
   if(s.space!=='3d')return json(res,403,{error:'请先进入3D实验室'});
   toolServices ||= (await import('./tool-services.mjs')).createToolServices({root:ROOT,dataDir:DATA,body,json});
   return await toolServices.handle(req,res,url,s);
  }
  if(url.pathname==='/api/catalog'&&req.method==='GET')return json(res,200,catalog());
  if(s.space!=='118')return json(res,404,{error:'没有这个入口'});
  if(await community.handle(req,res,url,s))return;
  if(url.pathname==='/api/profile'&&req.method==='POST')return json(res,200,community.profile(s,await body(req)));
  if(url.pathname==='/api/events'&&req.method==='GET')return connect(req,res,url,s);
  if(url.pathname==='/api/presence'&&req.method==='GET')return json(res,200,presence());
  if(url.pathname==='/api/presence/pulse'&&req.method==='POST'){
   const c=clientFor(s,await body(req));if(!c)return json(res,409,{error:'连接已断开'});c.seen=Date.now();return json(res,200,{ok:true});
  }
  if(url.pathname==='/api/presence/leave'&&req.method==='POST'){
   const c=clientFor(s,await body(req));if(c){disconnect(c,false);c.res.end();}return json(res,200,{ok:true});
  }
  if(url.pathname==='/api/activity'&&req.method==='POST'){
   const input=await body(req),c=clientFor(s,input);if(!c)return json(res,409,{error:'连接已断开'});
   c.activity=['cat3d','gandengyan'].includes(input.activity)?input.activity:null;announce();return json(res,200,{ok:true});
  }
  if(url.pathname==='/api/chat/join'&&req.method==='POST'){
   const c=clientFor(s,await body(req));if(!c)return json(res,409,{error:'连接已断开'});
   c.chat=true;announce();return json(res,200,{messages:roomMessages.slice(-60)});
  }
  if(url.pathname==='/api/chat/leave'&&req.method==='POST'){
   const c=clientFor(s,await body(req));if(c){c.chat=false;announce();}return json(res,200,{ok:true});
  }
  if(url.pathname==='/api/chat/send'&&req.method==='POST'){
   const input=await body(req),c=clientFor(s,input);if(!c?.chat)return json(res,403,{error:'请先加入聊天室'});
   const text=typeof input.body==='string'?input.body.trim():'';if(!text||text.length>500)return json(res,400,{error:'消息需为1至500字'});
   if(!allowed('chat:'+s.token,700))return json(res,429,{error:'发送太快，请稍后再试'});
   const message={id:crypto.randomUUID(),author:c.name,body:text,created:Date.now()};roomMessages.push(message);if(roomMessages.length>100)roomMessages.shift();
   broadcast('chat-message',message,c=>c.chat);return json(res,201,{message});
  }
  if(url.pathname==='/api/messages'&&req.method==='GET'){
   const rows=db.prepare('SELECT id,author,body,created,owner FROM messages WHERE space=? ORDER BY created DESC LIMIT 200').all('118');
   return json(res,200,{messages:rows.map(({owner,...m})=>({...m,mine:owner===s.token}))});
  }
  if(url.pathname==='/api/messages'&&req.method==='POST'){
   const input=await body(req),author=s.name||(typeof input.author==='string'?input.author.trim():''),text=typeof input.body==='string'?input.body.trim():'';
   if(!author||author.length>24||!text||text.length>500)return json(res,400,{error:'请填写名字和留言，留言最多500字'});
   if(!allowed('board:'+s.token,2000))return json(res,429,{error:'请稍后再发布'});
   const message={id:crypto.randomUUID(),author,body:text,created:Date.now()};
   db.prepare('INSERT INTO messages VALUES(?,?,?,?,?,?)').run(message.id,'118',author,text,s.token,message.created);
   broadcast('board-message',message,c=>c.token!==s.token);community.legacyMessage(message,s);log('message_created','118');return json(res,201,{ok:true});
  }
  if(url.pathname.startsWith('/api/messages/')&&req.method==='DELETE'){
   const result=db.prepare('DELETE FROM messages WHERE id=? AND owner=? AND space=?').run(url.pathname.split('/').pop(),s.token,'118');
   return json(res,result.changes?200:404,result.changes?{ok:true}:{error:'只能删除自己的留言'});
  }
  return json(res,404,{error:'没有这个入口'});
 }catch(error){if(!res.headersSent)json(res,error.status||500,{error:error.status?error.message:'服务器暂时忙'});log('error',error.message);}
});
server.requestTimeout=30000;server.headersTimeout=10000;
function pidAlive(pid){try{if(!Number.isInteger(pid))return false;process.kill(pid,0);return true;}catch{return false;}}
function logTail(name){const file=path.join(ROOT,'logs',name+'.log');if(!fs.existsSync(file))return[];const stat=fs.statSync(file),length=Math.min(stat.size,90000),buffer=Buffer.alloc(length),fd=fs.openSync(file,'r');try{fs.readSync(fd,buffer,0,length,stat.size-length);}finally{fs.closeSync(fd);}return buffer.toString('utf8').split(/\r?\n/).slice(-100).map(line=>line.replace(/(password|authorization|cookie|token)([=: ]+)[^ ,;]+/gi,'$1$2[已隐藏]'));}
function gameInfo(handler,name,version){const rooms=[...handler.rooms.rooms.values()].filter(r=>!r.closed);return{name,version,rooms:rooms.length,playing:rooms.filter(r=>r.game&&r.game.s?.phase!=='finished').length};}
let tunnelReady=false;
async function checkTunnel(){try{let state=JSON.parse(fs.readFileSync(path.join(ROOT,'runtime/running.json')));if(state.root!==ROOT||!pidAlive(state.tunnel)){tunnelReady=false;return;}const response=await fetch('http://127.0.0.1:18766/ready',{signal:AbortSignal.timeout(1000)});const value=await response.json();tunnelReady=response.ok&&value.readyConnections>0;}catch{tunnelReady=false;}}
await checkTunnel();const tunnelCheck=setInterval(checkTunnel,3000);tunnelCheck.unref();
function adminStatus(){return{version:'3.1.0',services:{website:server.listening,websitePid:process.pid,tunnel:tunnelReady},modules:moduleRegistry.status(),people:presence(),games:[gameInfo(cat3DHandler,'猫猫牌 3D','内置'),...moduleRegistry.gameStats().map(g=>({...g,name:g.id==='gandengyan'?'干瞪眼':g.id==='cat-cards-3d'?'猫猫牌 3D':'猫猫牌'}))],logs:Object.fromEntries(['website','access','tunnel','launcher'].map(name=>[name,logTail(name)]))};}
adminServer=await startAdminServer({root:ROOT,dataDir:DATA,port:Number(process.env.ADMIN_PORT||18768),status:adminStatus,install:bytes=>moduleRegistry.install(bytes),log,requests:()=>community.adminRequests(),decide:(id,approve)=>community.adminDecide(id,approve)});
wsHub=createRealtime({server,world:()=>community.state(),authorize:(req,url)=>{if(!sameOrigin(req))return null;const s=auth(req),cid=url.searchParams.get('cid');if(s?.space!=='118'||!UUID.test(cid||''))return null;const c=streams.get(s.token+':'+cid);return c&&c.user_id===s.user_id?{id:c.id,cid,session:s,expires:s.expires}:null;},onInput:(identity,frames)=>community.applyInput(identity.session,{cid:identity.cid,frames})});
server.listen(PORT,'127.0.0.1',()=>{console.log(`3DAlab 3.1.0 ready: http://127.0.0.1:${PORT}`);log('server_started',String(PORT));});
const maintenance=setInterval(()=>{
 for(const c of [...streams.values()]){if(c.expires<Date.now()||Date.now()-c.seen>100000){disconnect(c,false);c.res.end();}else emit(c,'ping',{time:Date.now()});}
 for(const [id,value]of reconnectState)if(value.until<Date.now())reconnectState.delete(id);
 for(const [id,value]of attempts)if(value.until<Date.now())attempts.delete(id);
 for(const [id,value]of limits)if(Date.now()-value>60000)limits.delete(id);
},15000);maintenance.unref();
const gc=setInterval(()=>{db.prepare('DELETE FROM profiles WHERE session NOT IN(SELECT token FROM sessions WHERE expires>?)').run(Date.now());db.prepare('DELETE FROM sessions WHERE expires<?').run(Date.now());},3600000);gc.unref();
let shuttingDown=false;
function shutdown(){
 if(shuttingDown)return;shuttingDown=true;clearInterval(maintenance);clearInterval(gc);clearInterval(tunnelCheck);
 for(const c of streams.values())c.res.end();catHandler.close();cat3DHandler.close();wsHub?.close();community.close();moduleRegistry.close();adminServer?.close();toolServices?.close();
 const deadline=setTimeout(()=>server.closeAllConnections(),3000);deadline.unref();
 server.close(()=>{clearTimeout(deadline);setTimeout(()=>{log('server_stopped');db.close();process.exit(0);},1800);});
}
for(const signal of['SIGINT','SIGTERM'])process.on(signal,shutdown);
process.on('message',message=>{if(message?.type==='3dalab-shutdown')shutdown();});

