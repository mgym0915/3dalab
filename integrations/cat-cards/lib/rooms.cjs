const crypto=require('node:crypto');
const RoomGame=require('./room-game.cjs');
const fault=(status,message)=>{throw Object.assign(new Error(message),{status});};
class Rooms {
  constructor(){this.rooms=new Map();this.requests=new Map();this.timer=setInterval(()=>this.cleanup(),60000);this.timer.unref();}
  code(){let n;do{n=String(crypto.randomInt(100000,1000000));}while(this.rooms.has(n));return n;}
  create(){if(this.rooms.size>=200)fault(503,'房间已满，请稍后重试');const r={code:this.code(),tokens:[crypto.randomBytes(24).toString('hex'),null],seq:1,game:null,closed:false,journal:[[],[]],waiters:new Set(),dedup:new Map(),seen:[Date.now(),0],updated:Date.now()};this.rooms.set(r.code,r);return {r,seat:0};}
  join(code){const r=this.rooms.get(String(code));if(!r||r.closed)fault(404,'房间不存在或已结束');if(r.tokens[1])fault(409,'房间已有两位玩家');r.tokens[1]=crypto.randomBytes(24).toString('hex');r.seen[1]=Date.now();r.game=new RoomGame();r.game.start(true);this.publish(r,{kind:'deal',actor:1},[{type:'deal'}]);return{r,seat:1};}
  auth(code,token){const r=this.rooms.get(code);if(!r)fault(404,'房间不存在或已结束');if(typeof token!=='string'||!/^[a-f0-9]{48}$/.test(token))fault(403,'房间凭证无效');const seat=r.tokens.findIndex(t=>t&&crypto.timingSafeEqual(Buffer.from(t),Buffer.from(token)));if(seat<0)fault(403,'房间凭证无效');r.seen[seat]=Date.now();r.updated=Date.now();return{r,seat};}
  packet(r,seat,meta={kind:'sync'},events=[]){return{code:r.code,seq:r.seq,round:r.game?.round||0,scores:r.game?[r.game.scores[seat],r.game.scores[1-seat]]:[0,0],closed:r.closed,players:r.tokens.filter(Boolean).length,online:[seat,1-seat].map(i=>!!r.tokens[i]&&Date.now()-r.seen[i]<45000),state:r.game?r.game.view(seat):{phase:'lobby',hands:[[],[]],deck:[],discard:[],turns:0,current:0,caller:null,selected:[],drawn:null,initialPeek:[]},meta:{...meta,actor:meta.actor===undefined?undefined:meta.actor===seat?0:1},events:r.game?r.game.eventsFor(events,seat):[]};}
  publish(r,meta,events){r.seq++;r.updated=Date.now();for(let seat=0;seat<2;seat++){r.journal[seat].push(this.packet(r,seat,meta,events));if(r.journal[seat].length>256)r.journal[seat].shift();}for(const wake of [...r.waiters])wake();}
  act(r,seat,input){
    if(r.closed)fault(410,'房间已结束');
    if(typeof input.id!=='string'||!/^[a-zA-Z0-9-]{8,80}$/.test(input.id))fault(400,'操作编号无效');
    const key=seat+':'+input.id;if(r.dedup.has(key))return r.dedup.get(key);
    if(input.version!==r.seq)fault(409,'牌桌已更新，正在同步');
    if(!r.game)fault(409,'等待另一位玩家加入');
    const events=r.game.act(seat,input);const kind=events.some(e=>e.type==='deal')?'deal':input.action;
    this.publish(r,{kind,actor:seat},events);const result=this.packet(r,seat,{kind,actor:seat},events);
    r.dedup.set(key,result);if(r.dedup.size>512)r.dedup.delete(r.dedup.keys().next().value);return result;
  }
  updates(r,seat,after){if(!Number.isSafeInteger(after)||after<0||after>r.seq)fault(400,'同步编号无效');if(after===r.seq)return[];const journal=r.journal[seat];return journal.length&&after>=journal[0].seq-1?journal.filter(p=>p.seq>after):[this.packet(r,seat)];}
  leave(r,seat){r.closed=true;r.seen[seat]=0;this.publish(r,{kind:'leave',actor:seat},[]);}
  cleanup(){const now=Date.now();for(const[code,r]of this.rooms){if(now-r.updated>30*60000||(r.closed&&now-r.updated>60000)){for(const wake of [...r.waiters])wake(true);this.rooms.delete(code);}}for(const[key,row]of this.requests)if(row.until<now)this.requests.delete(key);}
  limit(key){const now=Date.now(),row=this.requests.get(key)||{count:0,until:now+60000};if(row.until<now){row.count=0;row.until=now+60000;}if(++row.count>25)fault(429,'操作较频繁，请稍后重试');this.requests.set(key,row);}
  close(){clearInterval(this.timer);for(const r of this.rooms.values())for(const wake of [...r.waiters])wake(true);}
}
module.exports=Rooms;
