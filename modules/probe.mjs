import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import {pathToFileURL} from 'node:url';
const root=process.argv[2],dataDir=process.argv[3],m=JSON.parse(fs.readFileSync(path.join(root,'module.json')));
let handler,server;
try{
 const module=await import(pathToFileURL(path.join(root,m.backend.entry)).href),factory=module[m.backend.factory]||module.default?.[m.backend.factory];if(typeof factory!=='function')throw Error('模块工厂不存在');
 handler=await factory({base:'/probe',publicDir:path.join(root,'public'),dataDir,authorize:()=>true,rateKey:()=> 'probe',getIdentity:()=>({id:'probe',space:m.space,name:'模块自检'}),loginUrl:'/'});
 if(typeof handler!=='function')throw Error('模块处理器无效');
 server=http.createServer(async(req,res)=>{try{if(!await handler(req,res)){res.writeHead(404);res.end();}}catch{res.writeHead(500);res.end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const response=await fetch('http://127.0.0.1:'+server.address().port+'/probe/'+m.backend.health,{signal:AbortSignal.timeout(4000)});const result=await response.json();if(response.status!==200||!(result.online===true||result.ok===true))throw Error('后端健康检查失败');
 console.log('MODULE_PROBE_OK');
}catch(error){console.error('MODULE_PROBE_FAILED '+error.message);process.exitCode=1;}
finally{handler?.close?.();server?.closeAllConnections();if(server)await new Promise(resolve=>server.close(resolve));}
