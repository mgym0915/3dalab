const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');const {createPractice}=require('./practice.cjs');
const Rooms=require('./rooms.cjs');
function createCatHandler(options={}){
  const base=(options.base||'').replace(/\/$/,''),root=options.publicDir||path.resolve(__dirname,'../public'),rooms=new Rooms();
  const send=(res,status,data)=>{if(res.destroyed||res.writableEnded)return;res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Vary':'Authorization'});res.end(JSON.stringify(data));};
  const body=async req=>{let text='';for await(const chunk of req){text+=chunk;if(Buffer.byteLength(text)>4096)throw Object.assign(new Error('内容过长'),{status:413});}try{return JSON.parse(text||'{}');}catch{throw Object.assign(new Error('请求格式有误'),{status:400});}};
  const practice=createPractice(options);
  async function handler(req,res){
    const url=new URL(req.url,'http://localhost');
    if(base&&url.pathname!==base&&!url.pathname.startsWith(base+'/'))return false;
    let route=url.pathname.slice(base.length)||'/';
    if(!route.startsWith('/api/')&&!['/','/index.html','/app.js','/style.css','/favicon.ico'].includes(route))return false;
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
      if(await practice(req,res,route))return true;
      if(route==='/api/rankings'){send(res,200,{rows:await options.getRankings?.()||[]});return true;}
      if(route==='/api/health'){send(res,200,{app:'猫猫牌',online:true});return true;}
      if(route==='/api/rooms'&&req.method==='POST'){
        rooms.limit('create:'+(options.rateKey?.(req)||req.headers['cf-connecting-ip']||req.socket.remoteAddress||''));const{r,seat}=rooms.create();r.accountId=crypto.randomUUID();r.accounts={[r.tokens[seat]]:options.getIdentity?.(req)?.id};send(res,201,{token:r.tokens[seat],packet:rooms.packet(r,seat)});return true;
      }
      if(route==='/api/join'&&req.method==='POST'){
        rooms.limit('join:'+(options.rateKey?.(req)||req.headers['cf-connecting-ip']||req.socket.remoteAddress||''));const input=await body(req);
        if(typeof input.code!=='string'||!/^\d{6}$/.test(input.code)){send(res,400,{error:'请输入六位房间码'});return true;}
        const userId=options.getIdentity?.(req)?.id,candidate=rooms.rooms.get(input.code);if(userId&&candidate&&Object.values(candidate.accounts||{}).includes(userId)){send(res,409,{error:'同一身份不能占两个座位'});return true;}
        const{r,seat}=rooms.join(input.code);r.accounts||={};r.accounts[r.tokens[seat]]=userId;send(res,200,{token:r.tokens[seat],packet:rooms.packet(r,seat,{kind:'deal',actor:seat},[{type:'deal'}])});return true;
      }
      const match=route.match(/^\/api\/rooms\/(\d{6})(?:\/(events|action|leave))?$/);
      if(match){
        const token=(req.headers.authorization||'').replace(/^Bearer /,'');const{r,seat}=rooms.auth(match[1],token);if(options.getIdentity&&r.accounts?.[token]!==options.getIdentity(req)?.id){send(res,403,{error:'房间凭证不属于当前身份'});return true;}
        if(!match[2]&&req.method==='GET'){send(res,200,{packet:rooms.packet(r,seat)});return true;}
        if(match[2]==='action'&&req.method==='POST'){
          const input=await body(req),current=rooms.act(r,seat,input);
          if(r.game?.s.phase==='finished'){const matchId=r.game.settlementId;if(r.lastSettled!==matchId){await options.settleGame?.({matchId,players:r.tokens.map((t,i)=>({userId:r.accounts?.[t],points:r.game.scores[i]-(r.game.scoreBase?.[i]||0)}))});r.lastSettled=matchId;}}send(res,200,{packet:current});return true;
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
      res.writeHead(200,{'Content-Type':name.endsWith('.html')?'text/html; charset=utf-8':name.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8','Cache-Control':'no-cache','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'"});
      if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);return true;
    }catch(error){send(res,error.status||500,{error:error.status?error.message:'服务器暂时忙，请重试'});return true;}
  }
  handler.close=()=>rooms.close();handler.rooms=rooms;return handler;
}
module.exports={createCatHandler};
