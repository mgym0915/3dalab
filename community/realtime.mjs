import {WebSocketServer} from './vendor/ws/wrapper.mjs';
export function createRealtime({server,authorize,onInput,world}){
 const wss=new WebSocketServer({noServer:true,maxPayload:16000,perMessageDeflate:false}),clients=new Map();
 function send(ws,data){if(ws.readyState!==1)return;if(ws.bufferedAmount>128000){ws.terminate();return;}ws.send(JSON.stringify(data));}
 server.on('upgrade',(req,socket,head)=>{
  socket.on('error',()=>{});let identity;try{const url=new URL(req.url,'http://localhost');if(url.pathname!=='/api/space/socket')throw Error();identity=authorize(req,url);if(!identity)throw Error();}catch{socket.end('HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n');return;}
  wss.handleUpgrade(req,socket,head,ws=>{const old=clients.get(identity.id);old?.close();clients.set(identity.id,ws);ws.alive=true;ws.identity=identity;ws.on('pong',()=>ws.alive=true);ws.on('error',()=>{});let count=0,since=Date.now();
   ws.on('message',(bytes,binary)=>{if(binary)return ws.close(1003);try{if(Date.now()-since>1000){count=0;since=Date.now();}if(++count>60)throw Error('移动请求过快');if(identity.expires<Date.now())return ws.close(1008);const data=JSON.parse(bytes.toString());if(data.type==='input')onInput(identity,data.frames);else if(data.type==='ping')send(ws,{type:'pong',nonce:data.nonce,time:Date.now()});else throw Error('输入格式无效');}catch(error){send(ws,{type:'error',error:error.message});}});
   ws.on('close',()=>{if(clients.get(identity.id)===ws)clients.delete(identity.id);});send(ws,{type:'world',world:world()});
  });
 });
 const timer=setInterval(()=>{for(const ws of clients.values()){if(!ws.alive||ws.identity.expires<Date.now()){ws.terminate();continue;}ws.alive=false;ws.ping();}},20000);timer.unref();
 return{has(id){return clients.get(id)?.readyState===1;},broadcast(data){for(const ws of clients.values())send(ws,{type:'world',world:data});},detach(id){clients.get(id)?.close();},close(){clearInterval(timer);for(const ws of clients.values())ws.terminate();wss.close();}};
}
