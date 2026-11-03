import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import crypto from 'node:crypto';
import {MAX_ZIP} from '../modules/archive.mjs';
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const derive=(password,salt)=>new Promise((resolve,reject)=>crypto.scrypt(password,salt,64,{N:32768,r:8,p:1,maxmem:64*1024*1024},(error,value)=>error?reject(error):resolve(value)));
export async function createAdminCredential(password){const salt=crypto.randomBytes(24).toString('hex');return{v:1,salt,hash:(await derive(password,salt)).toString('hex')};}
export async function startAdminServer({root,dataDir,port,status,install,log,requests,decide}){
 const directory=path.join(dataDir,'admin');fs.mkdirSync(directory,{recursive:true});
 const credentials=path.join(directory,'credentials.json'),nonce=crypto.randomBytes(32).toString('hex'),sessions=new Map(),streams=new Set();let failures={count:0,until:0},currentCredential=fs.existsSync(credentials)?JSON.parse(fs.readFileSync(credentials)):null;
 const allowedHosts=new Set(['127.0.0.1:'+port,'localhost:'+port]);
 function reply(res,code,value){res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));}
 function identity(req){const token=/^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization||'')?.[1];const key=token?hash(token):'',session=sessions.get(key);if(!session||session.expires<Date.now()){if(key)sessions.delete(key);return null;}return{...session,key};}
 async function bytes(req,max){let length=0;const chunks=[];for await(const chunk of req){length+=chunk.length;if(length>max)throw Object.assign(Error('文件或请求体积超限'),{status:413});chunks.push(chunk);}return Buffer.concat(chunks);}
 async function jsonBody(req){try{return JSON.parse((await bytes(req,8192)).toString('utf8')||'{}');}catch(error){if(error.status)throw error;throw Object.assign(Error('请求格式无效'),{status:400});}}
 function local(req){
  if(!['127.0.0.1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress)||!allowedHosts.has(req.headers.host)||req.headers['cf-connecting-ip']||req.headers['x-forwarded-for']||req.headers['x-forwarded-host'])return false;
  if(req.headers.origin){try{if(!allowedHosts.has(new URL(req.headers.origin).host)||new URL(req.headers.origin).protocol!=='http:')return false;}catch{return false;}}
  if(req.headers['sec-fetch-site']==='cross-site'&&req.headers['sec-fetch-mode']!=='navigate')return false;return true;
 }
 const server=http.createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
  if(!local(req))return reply(res,403,{error:'控制台仅允许本机同源访问'});
  try{
   const url=new URL(req.url,'http://'+req.headers.host),route=url.pathname;
   if(route==='/console/health'&&req.method==='GET')return reply(res,200,{app:'3DAlab Admin',status:'ok'});
   if(route==='/console/api/session'&&req.method==='GET')return reply(res,200,{authenticated:!!identity(req),configured:!!currentCredential,nonce});
   if(['/console/api/setup','/console/api/login'].includes(route)&&req.method==='POST'){
    if(req.headers['content-type']!=='application/json'||req.headers['x-admin-nonce']!==nonce)return reply(res,403,{error:'请重新打开本机控制台'});
    const now=Date.now();if(failures.until<now)failures={count:0,until:now+60000};if(failures.count>=10)return reply(res,429,{error:'请一分钟后再试'});
    const input=await jsonBody(req);if(typeof input.password!=='string'||input.password.length>256)return reply(res,400,{error:'管理员密码无效'});
    if(route.endsWith('/setup')){
     if(currentCredential)return reply(res,409,{error:'管理员已配置，请登录'});
     if(input.password.length<10||input.password!==input.confirm)return reply(res,400,{error:'密码至少10位，且两次输入须一致'});
     const candidate=await createAdminCredential(input.password);
     // Exclusive creation prevents two setup requests from replacing credentials.
     fs.writeFileSync(credentials,JSON.stringify(candidate),{flag:'wx',mode:0o600});currentCredential=candidate;log('admin_configured');
    }else{
     if(!currentCredential)return reply(res,409,{error:'请先设置管理员密码'});
     const actual=await derive(input.password,currentCredential.salt),expected=Buffer.from(currentCredential.hash,'hex');
     if(expected.length!==actual.length||!crypto.timingSafeEqual(actual,expected)){failures.count++;log('admin_login_failed');return reply(res,401,{error:'管理员密码无效'});}
    }
    failures.count=0;const token=crypto.randomBytes(32).toString('hex'),expires=Date.now()+8*3600000;sessions.set(hash(token),{expires});log('admin_login');return reply(res,200,{token,expires});
   }
   if(route.startsWith('/console/api/')){
    const session=identity(req);if(!session)return reply(res,401,{error:'请使用独立管理员身份登录'});
    if(route==='/console/api/logout'&&req.method==='POST'){sessions.delete(session.key);for(const stream of streams)if(stream.key===session.key)stream.res.end();return reply(res,200,{ok:true});}
    if(route==='/console/api/document-requests'&&req.method==='GET')return reply(res,200,{requests:requests?.()||[]});
    const decision=/^\/console\/api\/document-requests\/([0-9a-f-]{36})\/decision$/.exec(route);if(decision&&req.method==='POST'){const input=await jsonBody(req);return reply(res,200,decide(decision[1],input.approve));}
    if(route==='/console/api/status'&&req.method==='GET')return reply(res,200,status());
    if(route==='/console/api/events'&&req.method==='GET'){
     res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-store','Connection':'keep-alive'});res.flushHeaders();const stream={res,key:session.key,last:''};streams.add(stream);res.on('close',()=>streams.delete(stream));send(stream);return;
    }
    if(route==='/console/api/modules/load'&&req.method==='POST'){
     if(req.headers['content-type']!=='application/zip')return reply(res,415,{error:'请选择ZIP模块包'});
     const data=await bytes(req,MAX_ZIP),result=await install(data);return reply(res,200,result);
    }
    return reply(res,404,{error:'没有这个管理入口'});
   }
   const files={'/console/':'index.html','/console/app.mjs':'app.mjs','/console/style.css':'style.css'};
   const file=files[route];if(!file||!['GET','HEAD'].includes(req.method))return reply(res,404,{error:'页面不存在'});
   const data=fs.readFileSync(path.join(root,'admin',file));res.writeHead(200,{'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8','Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);
  }catch(error){log('admin_error',String(error.message).replace(/[\r\n]/g,' ').slice(0,300));if(!res.headersSent)reply(res,error.status||400,{error:error.status?error.message:'加载未完成：'+error.message});else res.end();}
 });
 function send(stream){if(stream.res.writableLength>512000||!sessions.has(stream.key)||sessions.get(stream.key).expires<Date.now()){stream.res.end();streams.delete(stream);return;}try{const value=JSON.stringify(status());if(value!==stream.last){stream.last=value;stream.res.write('data: '+value+'\n\n');}else stream.res.write(': heartbeat\n\n');}catch(error){log('admin_stream_error',error.message);stream.res.end();streams.delete(stream);}}
 const timer=setInterval(()=>{for(const s of streams)send(s);for(const [key,value]of sessions)if(value.expires<Date.now())sessions.delete(key);},1500);timer.unref();
 server.requestTimeout=120000;server.headersTimeout=10000;
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});
 return{url:'http://127.0.0.1:'+port+'/console/',close(){clearInterval(timer);for(const s of streams)s.res.end();sessions.clear();return new Promise(resolve=>server.close(resolve));}};
}
