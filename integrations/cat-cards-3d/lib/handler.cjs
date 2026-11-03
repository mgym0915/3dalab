const fs=require('node:fs');
const path=require('node:path');
const Rooms=require('./rooms.cjs');
const crypto=require('node:crypto');
const Settlements=require('./settlements.cjs');
const Practice=require('./practice.cjs');
function createCatHandler(options={}){
  const base=(options.base||'').replace(/\/$/,''),root=options.publicDir||path.resolve(__dirname,'../public'),rooms=new Rooms(),settlements=new Settlements(options);
  const practice=new Practice(rooms,recordResult);rooms.onChange=r=>practice.kick(r);
  const rateKey=req=>String(options.rateKey?.(req)||options.getIdentity?.(req)?.id||req.socket.remoteAddress||'');
  const send=(res,status,data)=>{if(res.destroyed||res.writableEnded)return;res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Vary':'Authorization'});res.end(JSON.stringify(data));};
  const body=async req=>{let text='';for await(const chunk of req){text+=chunk;if(Buffer.byteLength(text)>4096)throw Object.assign(new Error('内容过长'),{status:413});}try{return JSON.parse(text||'{}');}catch{throw Object.assign(new Error('请求格式有误'),{status:400});}};
  const pendingRetry=setInterval(()=>settlements.retry().catch(()=>{}),10000);pendingRetry.unref();settlements.retry().catch(()=>{});
  async function recordResult(r){
    if(r.game?.s.phase!=='finished')return;
    const result=r.game.s.result,id=r.accountId+':match:'+r.game.matchNumber+':round:'+r.game.round;
    const row=settlements.enqueue({matchId:id,players:r.tokens.map((token,i)=>({userId:r.accounts?.[token],points:result.rewardDeltas[i]}))});
    if(!row){result.rewardStatus='local';return;}
    try{await settlements.deliver(row);result.rewardStatus='posted';}catch{result.rewardStatus='pending';}
  }
  async function handler(req,res){
    const url=new URL(req.url,'http://localhost');
    if(base&&url.pathname!==base&&!url.pathname.startsWith(base+'/'))return false;
    let route=url.pathname.slice(base.length)||'/';
    const publicFiles=['/','/index.html','/app.js','/scene.js','/style.css','/favicon.ico','/vendor/three.module.js','/vendor/three.core.js'];
    const cardAsset=/^\/cards\/card-(?:[0-9]|1[0-3]|back)\.webp$/.test(route);
    if(!route.startsWith('/api/')&&!publicFiles.includes(route)&&!cardAsset)return false;
    try{
      if(options.authorize&&!await options.authorize(req)){
        if(!route.startsWith('/api/')){res.writeHead(302,{Location:options.loginUrl||'/'});res.end();}
        else send(res,401,{error:'请先进入 118 实验室'});return true;
      }
      if(req.method!=='GET'&&req.method!=='HEAD'){
        const origin=req.headers.origin;if(origin&&new URL(origin).host!==req.headers.host){send(res,403,{error:'请求来源不匹配'});return true;}
        if(!(req.headers['content-type']||'').startsWith('application/json')){send(res,415,{error:'请使用 JSON 请求'});return true;}
      }
      res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');
      if(route==='/api/health'){send(res,200,{app:'猫猫牌3D',online:true,minPlayers:2,maxPlayers:5,version:'3.2.0'});return true;}
      if(route==='/api/rankings'){send(res,200,{rows:await options.getRankings?.()||[]});return true;}
      if(['/api/rooms','/api/practice'].includes(route)&&req.method==='POST'){
        rooms.limit('create:'+rateKey(req));const{r,seat}=rooms.create();r.accountId=crypto.randomUUID();r.accounts={[r.tokens[seat]]:options.getIdentity?.(req)?.id};r.names={[r.tokens[seat]]:options.getIdentity?.(req)?.name};
        if(route==='/api/practice'){rooms.join(r.code);r.practice=true;rooms.act(r,0,{action:'begin',id:crypto.randomUUID(),version:r.seq,round:0});practice.kick(r);}
        send(res,201,{token:r.tokens[seat],packet:rooms.packet(r,seat)});return true;
      }
      if(route==='/api/join'&&req.method==='POST'){
        rooms.limit('join:'+rateKey(req));const input=await body(req);
        if(typeof input.code!=='string'||!/^\d{6}$/.test(input.code)){send(res,400,{error:'请输入六位房间码'});return true;}
        const existing=rooms.rooms.get(input.code),identity=options.getIdentity?.(req);
        if(identity?.id&&existing&&existing.tokens.some(t=>existing.accounts?.[t]===identity.id)){send(res,409,{error:'同一身份不能占两个座位'});return true;}
        const{r,seat}=rooms.join(input.code);r.accounts||={};r.names||={};r.accounts[r.tokens[seat]]=identity?.id;r.names[r.tokens[seat]]=identity?.name;send(res,200,{token:r.tokens[seat],packet:rooms.packet(r,seat)});return true;
      }
      const match=route.match(/^\/api\/rooms\/(\d{6})(?:\/(events|action|leave))?$/);
      if(match){
        const token=(req.headers.authorization||'').replace(/^Bearer /,'');const{r,seat}=rooms.auth(match[1],token);
        if(options.getIdentity&&r.accounts?.[token]!==options.getIdentity(req)?.id){send(res,403,{error:'座位与当前身份不匹配'});return true;}
        if(!match[2]&&req.method==='GET'){await recordResult(r);send(res,200,{packet:rooms.packet(r,seat)});return true;}
        if(match[2]==='action'&&req.method==='POST'){
          const input=await body(req);
          if(input.action==='next'&&r.game?.s.phase==='finished')await recordResult(r);
          const packet=rooms.act(r,seat,input);await recordResult(r);
          if(packet.state.result)packet.state.result.rewardStatus=r.game.s.result?.rewardStatus;
          send(res,200,{packet});return true;
        }
        if(match[2]==='leave'&&req.method==='POST'){if(!r.closed)rooms.leave(r,seat);send(res,200,{ok:true});return true;}
        if(match[2]==='events'&&req.method==='GET'){
          const after=Number(url.searchParams.get('after')),updates=rooms.updates(r,seat,after);
          if(updates.length||r.closed||url.searchParams.get('wait')!=='1'){send(res,200,{updates,online:rooms.packet(r,seat).online,closed:r.closed});return true;}
          // One held request per player; every change wakes both browsers immediately.
          for(const waiter of [...r.waiters])if(waiter.seat===seat)waiter();
          let done=false;
          const wake=(closing=false)=>{if(done)return;done=true;clearTimeout(timer);r.waiters.delete(wake);send(res,closing?503:200,closing?{error:'服务正在重启'}:{updates:rooms.updates(r,seat,after),online:rooms.packet(r,seat).online,closed:r.closed});};
          wake.seat=seat;const timer=setTimeout(wake,18000);r.waiters.add(wake);
          res.on('close',()=>{if(done)return;done=true;clearTimeout(timer);r.waiters.delete(wake);});return true;
        }
        send(res,405,{error:'不支持的请求'});return true;
      }
      if(route.startsWith('/api/')){send(res,404,{error:'没有这个入口'});return true;}
      if(req.method!=='GET'&&req.method!=='HEAD'){send(res,405,{error:'不支持的请求'});return true;}
      if(base&&url.pathname===base){res.writeHead(302,{Location:base+'/'});res.end();return true;}
      if(route==='/favicon.ico'){res.writeHead(204);res.end();return true;}
      const name=route==='/'?'index.html':route.slice(1),file=path.join(root,name);
      if(!fs.existsSync(file)){send(res,404,{error:'页面尚未构建'});return true;}
      res.writeHead(200,{'Content-Type':name.endsWith('.webp')?'image/webp':name.endsWith('.html')?'text/html; charset=utf-8':name.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8','Cache-Control':'no-cache','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'"});
      if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);return true;
    }catch(error){send(res,error.status||500,{error:error.status?error.message:'服务器暂时忙，请重试'});return true;}
  }
  handler.close=()=>{clearInterval(pendingRetry);practice.close();rooms.close();};handler.settlements=settlements;handler.rooms=rooms;handler.practice=practice;return handler;
}
module.exports={createCatHandler};
