import {ydName,presentTool} from './presentation.mjs';
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import zlib from 'node:zlib';import {spawn} from 'node:child_process';import {pathToFileURL,fileURLToPath} from 'node:url';
import {unpackZip,safeName} from './archive.mjs';import {definitions} from './definitions.mjs';
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const compare=(a,b)=>{const x=a.split('.').map(Number),y=b.split('.').map(Number);for(let i=0;i<3;i++)if(x[i]!==y[i])return x[i]-y[i];return 0;};
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.wasm':'application/wasm','.glb':'model/gltf-binary'};
export async function createModuleRegistry({root,dataDir,auth,json,log,handleTool,settleGame,rankings}){
 const store=path.join(dataDir,'modules');fs.mkdirSync(store,{recursive:true});
 const statePath=path.join(store,'active.json'),instances=new Map(),known=new Map(definitions.map(d=>[d.id,d])),cache=new Map();let busy=false,lastResult=null,state={schema:1,active:{},history:{}};
 try{if(fs.existsSync(statePath)){const value=JSON.parse(fs.readFileSync(statePath));if(value.schema!==1||!value.active||!value.history)throw Error('版本记录格式无效');state=value;}}catch(error){log('module_state_error',error.message);}
 const folder=r=>path.join(store,r.id,r.version,r.hash),base=r=>'/modules/'+r.id+'/'+r.version+'/'+r.hash;
 function validate(files){
  const bytes=files.get('module.json');if(!bytes||bytes.length>256000)throw Error('缺少有效module.json');let m;try{m=JSON.parse(bytes);}catch{throw Error('模块说明JSON无效');}
  const d=known.get(m.id);if(d?.disabled)throw Error('平面版已停用');if(!d||m.schema!==1||m.hostApi!==1||m.name!==d.name||m.space!==d.space||m.kind!==d.kind)throw Error('模块标识、名称、空间或接入版本不兼容');
  if(typeof m.version!=='string'||!/^\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(m.version)||m.version.split('.').some(v=>String(Number(v))!==v))throw Error('模块版本须为x.y.z');
  if(typeof m.entry!=='string'||!/^[-a-zA-Z0-9_]+\.html$/.test(m.entry)||!files.has('public/'+m.entry))throw Error('缺少模块前端入口');
  if(!m.files||typeof m.files!=='object'||Array.isArray(m.files))throw Error('缺少模块文件校验清单');
  for(const [name,value]of files){
   safeName(name);if(name==='module.json')continue;
   if(!/^(public\/|lib\/|backend\/|package\.json$|LICENSE(?:\.txt)?$|README\.md$)/.test(name))throw Error('模块包含运行目录以外的文件');
   if(m.files[name]!==digest(value))throw Error('模块文件哈希不一致: '+name);
  }
  if(Object.keys(m.files).length!==files.size-1||Object.keys(m.files).some(f=>f==='module.json'||!files.has(f)))throw Error('模块清单与实际文件不一致');
  function resource(from,reference){const raw=reference.split(/[?#]/)[0];if(!raw||/^(data:|blob:|https?:)/i.test(raw))return;if(raw.startsWith('/'))throw Error('模块资源必须使用包内相对路径');const target=path.posix.normalize(path.posix.join(path.posix.dirname(from),raw));safeName(target);if(!target.startsWith('public/')||!files.has(target))throw Error('模块资源缺失: '+reference);}
  for(const [file,bytes]of files){if(!file.startsWith('public/'))continue;const text=bytes.toString('utf8');if(/\.(js|mjs)$/.test(file)){for(const match of text.matchAll(/(?:\bfrom\s*|\bimport\s*\(?)['"]([^'"]+)['"]/g))if(match[1].startsWith('.'))resource(file,match[1]);}if(file.endsWith('.html')){for(const match of text.matchAll(/<(?:script|img|source|link)\b[^>]*\b(?:src|href)\s*=\s*["']([^"']+)["']/gi))resource(file,match[1]);}}
  const html=files.get('public/'+m.entry).toString('utf8');if(!/<html[\s>]/i.test(html))throw Error('前端入口不是HTML');
  for(const match of html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)){
   const source=match[1].split(/[?#]/)[0];if(/^(data:|blob:)/.test(source))continue;if(source.startsWith('/')||/^[a-z]+:/i.test(source))throw Error('模块脚本必须使用包内相对路径');
   const target=safeName('public/'+source.replace(/^\.\//,''));if(!files.has(target))throw Error('前端脚本缺失: '+source);
  }
  if(m.backend){
   if(m.backend.kind==='host-tool-v1'){if(d.kind!=='tool'||!['depth','knit'].includes(d.provider)||d.provider!==m.backend.provider)throw Error('模块声明了不匹配的工具能力');}
   else if(m.backend.kind==='node-handler-v1'){
    if(typeof m.backend.entry!=='string'||!/^((lib|backend)\/).+\.(cjs|mjs|js)$/.test(m.backend.entry)||!files.has(safeName(m.backend.entry))||!/^\w{1,64}$/.test(m.backend.factory||'')||!/^api\/[a-zA-Z0-9/_-]{1,80}$/.test(m.backend.health||''))throw Error('模块后端接入声明无效');
   }else throw Error('不支持的模块后端协议');
  }
  return m;
 }
 async function probe(record,m){
  const checker=path.join(path.dirname(fileURLToPath(import.meta.url)),'check-source.mjs');
  await new Promise((resolve,reject)=>{
   const child=spawn(process.execPath,['--no-warnings','--experimental-vm-modules',checker,folder(record)],{stdio:['ignore','pipe','pipe'],windowsHide:true});let output='';const timer=setTimeout(()=>{child.kill();reject(Error('模块源码检查超时'));},12000);
   for(const stream of[child.stdout,child.stderr])stream.on('data',b=>{output=(output+b.toString()).slice(-2048);});
   child.once('error',error=>{clearTimeout(timer);reject(error);});child.once('exit',code=>{clearTimeout(timer);if(code===0&&output.includes('MODULE_SOURCE_OK'))resolve();else reject(Error((/MODULE_SOURCE_FAILED (.*)/.exec(output)||[])[1]||'模块源码检查失败'));});
  });
  if(m.backend?.kind!=='node-handler-v1')return;
  const probeData=path.join(store,'_probes',crypto.randomUUID());fs.mkdirSync(probeData,{recursive:true});
  const worker=path.join(path.dirname(fileURLToPath(import.meta.url)),'probe.mjs');
  await new Promise((resolve,reject)=>{
   const child=spawn(process.execPath,['--no-warnings',worker,folder(record),probeData],{stdio:['ignore','pipe','pipe'],windowsHide:true});let output='';const timer=setTimeout(()=>{child.kill();reject(Error('模块后端健康检查超时'));},7000);
   for(const stream of[child.stdout,child.stderr])stream.on('data',b=>{output=(output+b.toString()).slice(-4096);});
   child.once('error',error=>{clearTimeout(timer);reject(error);});child.once('exit',code=>{clearTimeout(timer);if(code===0&&output.includes('MODULE_PROBE_OK'))resolve();else reject(Error((/MODULE_PROBE_FAILED (.*)/.exec(output)||[])[1]||'模块后端未通过健康检查'));});
  });
 }
 async function instance(record,m){
  const key=base(record);if(instances.has(key))return instances.get(key);
  const item={record,manifest:m,handler:null};
  if(m.backend?.kind==='node-handler-v1'){
   const module=await import(pathToFileURL(path.join(folder(record),m.backend.entry)).href),factory=module[m.backend.factory]||module.default?.[m.backend.factory];if(typeof factory!=='function')throw Error('模块工厂不存在');
   const persistent=path.join(store,m.id,'persistent');fs.mkdirSync(persistent,{recursive:true});
   item.handler=await factory({base:key,publicDir:path.join(folder(record),'public'),dataDir:persistent,authorize:req=>auth(req)?.space===m.space,rateKey:req=>auth(req)?.token,getIdentity:req=>{const s=auth(req);return s?{id:s.user_id||digest(s.token).slice(0,16),name:s.name,space:s.space}:null;},loginUrl:'/',hostTool:known.get(m.id).provider?async(req,res,suffix)=>{if(typeof suffix!=='string'||(suffix!==''&&!suffix.startsWith('/'))||suffix.includes('..'))throw Error('工具路径无效');const target=new URL(req.url,'http://localhost');target.pathname='/api/tools/'+known.get(m.id).provider+suffix;return handleTool(req,res,target,auth(req));}:undefined,settleGame:result=>settleGame?.(m.id==='gandengyan'?'gandengyan':'cat',result),getRankings:()=>rankings?.(m.id==='gandengyan'?'gandengyan':'cat')||[]});
   if(typeof item.handler!=='function')throw Error('模块处理器无效');
  }
  instances.set(key,item);return item;
 }
 function readInstalled(record){
  if(!record||!known.has(record.id)||!/^\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(record.version)||!/^[a-f0-9]{64}$/.test(record.hash))throw Error('模块版本引用无效');
  const dir=folder(record),files=new Map();function scan(p){for(const entry of fs.readdirSync(p,{withFileTypes:true})){const full=path.join(p,entry.name);if(entry.isSymbolicLink())throw Error('模块中存在链接');if(entry.isDirectory())scan(full);else files.set(path.relative(dir,full).replaceAll('\\','/'),fs.readFileSync(full));}}scan(dir);return validate(files);
 }
 for(const [id,record]of Object.entries(state.active)){if(known.get(id)?.disabled)continue;
  try{await instance(record,readInstalled(record));}catch(error){log('module_restore_error',id+' '+error.message);delete state.active[id];for(const old of state.history[id]||[]){try{await instance(old,readInstalled(old));state.active[id]=old;break;}catch{}}}
 }
 function statuses(){return definitions.filter(d=>!d.disabled).map(d=>{const r=state.active[d.id];return{id:d.id,name:ydName(d.id)||d.name,kind:d.kind,space:d.space,softwareVersion:r?.softwareVersion||d.softwareVersion,version:r?.version||'内置',url:r?base(r)+'/':d.url,retainedVersions:(state.history[d.id]||[]).length+(r?1:0)};});}
 async function install(bytes){
  if(busy)throw Error('正在加载另一个模块');busy=true;let created=null;
  try{
   const files=unpackZip(bytes),m=validate(files),previous=state.active[m.id];
   const hash=digest(bytes),record={id:m.id,version:m.version,hash,softwareVersion:String(m.softwareVersion||'').slice(0,80),loaded:new Date().toISOString()};
   if(previous?.hash===hash)return{ok:true,unchanged:true,module:statuses().find(d=>d.id===m.id)};
   if(previous&&compare(m.version,previous.version)<=0)throw Error('必须加载高于当前版本的模块，已有版本不能覆盖');
   const staging=path.join(store,'_incoming',crypto.randomUUID());fs.mkdirSync(staging,{recursive:true});
   for(const [name,data]of files){const target=path.join(staging,name);if(!target.startsWith(staging+path.sep))throw Error('模块文件路径越界');fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data);}
   const destination=folder(record);if(fs.existsSync(destination)){readInstalled(record);fs.rmSync(staging,{recursive:true});}else{fs.mkdirSync(path.dirname(destination),{recursive:true});fs.renameSync(staging,destination);}
   await probe(record,m);created=await instance(record,m);
   const next=structuredClone(state);next.active[m.id]=record;next.history[m.id]=previous?[previous,...(next.history[m.id]||[])]:next.history[m.id]||[];
   const temporary=statePath+'.'+crypto.randomUUID()+'.tmp';fs.writeFileSync(temporary,JSON.stringify(next,null,2),{mode:0o600});fs.renameSync(temporary,statePath);state=next;
   lastResult={ok:true,id:m.id,version:m.version,time:new Date().toISOString()};log('module_loaded',m.id+' '+m.version);return{ok:true,module:statuses().find(d=>d.id===m.id),effect:'新打开入口使用新版，已经打开的页面及旧牌局继续使用原版本'};
  }catch(error){if(created){created.handler?.close?.();instances.delete(base(created.record));}lastResult={ok:false,error:error.message,time:new Date().toISOString()};log('module_rejected',String(error.message).slice(0,300));throw error;}finally{busy=false;}
 }
 function catalog(original){
  const result=structuredClone(original);result.cat=null;for(const d of statuses()){
   if(d.kind==='tool'){const tool=result.tools.find(t=>t.id===d.id);if(tool){tool.url=d.url;tool.name=d.name;tool.moduleVersion=d.version;}}
   else{const key=known.get(d.id).catalogKey;result[key]={...result[key],url:d.url,moduleVersion:d.version};}
  }return result;
 }
 function asset(req,res,item,url,relative){
  const publicRoot=path.join(folder(item.record),'public'),name=relative||item.manifest.entry;
  let safe;try{safe=safeName(decodeURIComponent(name));}catch{return json(res,404,{error:'模块资源不存在'});}
  const file=path.resolve(publicRoot,safe);if(!file.startsWith(publicRoot+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile())return json(res,404,{error:'模块资源不存在'});
  const stat=fs.statSync(file),contentType=mime[path.extname(file)]||'application/octet-stream',etag='"'+item.record.hash+'-'+safe+(ydName(item.record.id)?'-display20261102':'')+'"';
  const headers={'Content-Type':contentType,'Cache-Control':'private, max-age=31536000, immutable',ETag:etag,Vary:'Accept-Encoding'};
  if(req.headers['if-none-match']===etag){res.writeHead(304,headers);return res.end();}
  if(/text\/|application\/(json|javascript|wasm)|model\/gltf-binary/.test(contentType)){
   let c=cache.get(file);if(!c){const data=presentTool(item.record.id,safe,fs.readFileSync(file));c={data,br:zlib.brotliCompressSync(data,{params:{[zlib.constants.BROTLI_PARAM_QUALITY]:5}}),gz:zlib.gzipSync(data)};cache.set(file,c);}
   const accept=req.headers['accept-encoding']||'';let data=c.data;if(/\bbr\b/.test(accept)){data=c.br;headers['Content-Encoding']='br';}else if(/\bgzip\b/.test(accept)){data=c.gz;headers['Content-Encoding']='gzip';}headers['Content-Length']=data.length;res.writeHead(200,headers);return res.end(req.method==='HEAD'?undefined:data);
  }
  headers['Content-Length']=stat.size;res.writeHead(200,headers);if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
 }
 async function handle(req,res,url){
  if(!url.pathname.startsWith('/modules/'))return false;
  const match=/^\/modules\/([a-z0-9-]+)\/(\d+\.\d+\.\d+)\/([a-f0-9]{64})\/(.*)$/.exec(url.pathname);
  if(!match||!known.has(match[1])){json(res,404,{error:'模块入口不存在'});return true;}
  const record={id:match[1],version:match[2],hash:match[3]},key=base(record);let item=instances.get(key);
  if(![state.active[record.id],...(state.history[record.id]||[])].some(r=>r?.version===record.version&&r.hash===record.hash)){json(res,404,{error:'模块版本未启用'});return true;}
  const session=auth(req);if(session?.space!==known.get(record.id).space){json(res,401,{error:'请先进入对应实验室'});return true;}
  if(known.get(record.id).disabled){json(res,410,{error:'平面版已停用'});return true;}
  if(!item){try{item=await instance(record,readInstalled(record));}catch{json(res,404,{error:'模块版本不存在'});return true;}}
  if(!['GET','HEAD'].includes(req.method)){try{if(req.headers.origin&&new URL(req.headers.origin).host!==req.headers.host){json(res,403,{error:'请求来源不匹配'});return true;}}catch{json(res,403,{error:'请求来源不匹配'});return true;}}
  const kind=item.manifest.kind,policy="default-src 'self' data: blob:; script-src 'self'"+(kind==='tool'?" 'unsafe-inline' 'unsafe-eval' blob:":'')+"; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' blob:; worker-src 'self' blob:; frame-ancestors 'self'; base-uri 'none'; form-action 'self'";
  const original=res.writeHead;res.writeHead=function(status,a,b){const headers=typeof a==='string'?b:a;const next={...(headers||{}),'X-Content-Type-Options':'nosniff','X-Frame-Options':'SAMEORIGIN','Content-Security-Policy':policy};if(!match[4].startsWith('api/'))next['Cache-Control']=ydName(record.id)?'private, no-cache':'private, max-age=31536000, immutable';return typeof a==='string'?original.call(this,status,a,next):original.call(this,status,next);};
  if(match[4]==='api/identity'&&req.method==='GET'){json(res,200,{id:session.user_id||digest(session.token).slice(0,16),space:session.space,name:session.name});return true;}
  if(item.manifest.backend?.kind==='host-tool-v1'&&match[4].startsWith('api/')){
   if(match[4]==='api/health'){json(res,200,{ok:true,provider:item.manifest.backend.provider});return true;}
   const forwarded=new URL(url);forwarded.pathname='/api/tools/'+item.manifest.backend.provider+match[4].slice(3);await handleTool(req,res,forwarded,session);return true;
  }
  if(match[4].startsWith('api/')&&item.handler&&await item.handler(req,res))return true;
  if(match[4].startsWith('api/'))json(res,404,{error:'模块接口不存在'});
  else if(!['GET','HEAD'].includes(req.method))json(res,405,{error:'不支持的请求'});
  else asset(req,res,item,url,match[4]);return true;
 }
 function gameStats(){return[...instances.values()].filter(i=>i.handler?.rooms).map(i=>({id:i.record.id,version:i.record.version,rooms:[...i.handler.rooms.rooms.values()].filter(r=>!r.closed).length,playing:[...i.handler.rooms.rooms.values()].filter(r=>!r.closed&&r.game&&(r.game.s?.phase||r.game.phase)!=='finished').length}));}
 return{install,handle,catalog,status:()=>({modules:statuses(),busy,lastResult}),gameStats,async close(){await Promise.allSettled([...instances.values()].map(async i=>i.handler?.close?.()));}};
}
