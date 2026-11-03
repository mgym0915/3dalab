import {connectHost} from './host.mjs';
import { TableStage } from './scene.js';
let stage;try{stage=new TableStage(document.getElementById('sceneRoot'));}catch(error){console.error(error);document.getElementById('engineError').hidden=false;}
class CatGame {
  constructor(options={}){this.rng=options.rng||Math.random;this.round=0;this.scores=[0,0];this.listeners=[];this.s={phase:'intro',hands:[[],[]],deck:[],discard:[],turns:0,current:0,caller:null};}
  shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(this.rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  take(source){const s=this.s;if(source==='deck'){if(!s.deck.length&&s.discard.length>1){const top=s.discard.pop();s.deck=this.shuffle(s.discard.splice(0));s.discard=[top];}return s.deck.pop()||null;}return s.discard.pop()||null;}
  static ability(v){return({0:'乾坤大挪移',5:'乱序',8:'偷看',9:'偷看',10:'偷看',11:'盲换',12:'盲换'})[v]||'数字牌';}
}
if(typeof module!=='undefined')module.exports=CatGame;

const CatRulesBase=typeof module!=='undefined'?require('./local-game.cjs'):CatGame;
const fail = message => { throw Object.assign(new Error(message), {status:409}); };

// All game data stays on the server; client identifiers describe positions only.
class CatRules extends CatRulesBase {
  constructor(count=2,options={}) {
    super(options);
    if(!Number.isInteger(count)||count<2||count>5)throw new Error('人数应为 2–5 人');
    this.count=count;this.scores=Array(count).fill(0);this.betCounts=Array(count).fill(0);this.comboTenths=Array(count).fill(0);this.specialCounts=Array(count).fill(0);this.rewardTotals=Array(count).fill(0);
  }
  order(seat){return Array.from({length:this.count},(_,i)=>(seat+i)%this.count);}
  local(actor,seat){return (actor-seat+this.count)%this.count;}
  start(reset=false){
    if(reset){this.matchNumber=(this.matchNumber||0)+1;this.scores=Array(this.count).fill(0);this.round=0;this.betCounts.fill(0);this.comboTenths.fill(0);this.specialCounts.fill(0);this.rewardTotals.fill(0);}
    this.round++;
    const deck=[];let id=0;
    for(let v=0;v<=13;v++)for(let i=0;i<(v===0||v===13?2:4);i++)deck.push({id:++id,v,public:false,seenBy:new Set()});
    this.shuffle(deck);this.memory={};
    const hands=Array.from({length:this.count},()=>deck.splice(0,4));
    this.initialPeeks=hands.map(()=>[]);
    this.ready=Array(this.count).fill(false);this.nextReady=Array(this.count).fill(false);
    const first=deck.pop();first.public=true;
    this.s={phase:'memorize',hands,deck,discard:[first],turns:0,completed:Array(this.count).fill(0),current:(this.round-1)%this.count,caller:null,betCounts:this.betCounts,finalPending:[],selected:[],drawn:null,peeked:null,result:null};
    this.startEvents=[];const special=this.specialPlayer();if(special>=0){this.finish();this.s.finalPending=[];this.startEvents=[{type:'special1213',actor:special},{type:'finish'}];}
  }
  specialPlayer(){return this.s.hands.findIndex(h=>h.length===4&&h.filter(c=>c.v===12).length===2&&h.filter(c=>c.v===13).length===2);}
  multiplier(seat){return(10+this.betCounts[seat]+this.comboTenths[seat])/10*2**this.specialCounts[seat];}
  award(base,actor,payers,deltas,items,reason){
    if(!payers.length)return;
    const amount=(base/10)*(10+this.betCounts[actor]+this.comboTenths[actor])*2**this.specialCounts[actor];
    if(!Number.isSafeInteger(amount))throw Error('积分数值超过精确计算范围');
    deltas[actor]+=amount;
    const share=Math.floor(amount/payers.length),remainder=amount%payers.length,ordered=[...payers].sort((a,b)=>((a-actor+this.count)%this.count)-((b-actor+this.count)%this.count));
    const split=ordered.map((seat,i)=>{const points=share+(i<remainder?1:0);deltas[seat]-=points;return{actor:seat,points};});
    items.push({actor,reason,base,amount,multiplier:this.multiplier(actor),split});
  }
  canCall(){return this.s.completed.every(n=>n>=5)&&this.s.caller===null;}
  end(events=[]){
    const s=this.s;s.turns++;s.completed[s.current]++;s.selected=[];s.peeked=null;
    const special=this.specialPlayer();if(special>=0){this.finish();s.finalPending=[];events.push({type:'special1213',actor:special},{type:'finish'});return events;}
    if(s.caller!==null){
      s.finalPending=s.finalPending.filter(i=>i!==s.current);
      if(!s.finalPending.length){this.finish();events.push({type:'finish'});return events;}
    }
    s.current=(s.current+1)%this.count;s.phase='draw';return events;
  }
  finish(){
    const s=this.s;if(s.phase==='finished')return;
    const sums=s.hands.map(h=>h.reduce((n,c)=>n+c.v,0));
    const specials=s.hands.flatMap((h,i)=>h.length===4&&h.filter(c=>c.v===12).length===2&&h.filter(c=>c.v===13).length===2?[i]:[]);
    let points=[...sums],notes=Array(this.count).fill('');
    if(specials.length){specials.forEach(i=>this.specialCounts[i]++);notes=notes.map(()=> '1213 即刻结算 · 按手牌总和');}
    else if(s.caller!==null){
      if(sums[s.caller]===Math.min(...sums)){points[s.caller]=0;notes[s.caller]='CATWIN 成功 · 0 分';}
      else{points[s.caller]+=10;notes[s.caller]='CATWIN 失败 · 额外 +10 分';}
    }
    this.scores=this.scores.map((n,i)=>{const total=n+points[i];if(total===100){notes[i]+=' / 凑满 100，减 50';return 50;}return total;});
    const matchOver=this.scores.some(n=>n>100),basis=matchOver?this.scores:points,min=Math.min(...basis),winners=basis.flatMap((v,i)=>v===min?[i]:[]);
    const rewardDeltas=Array(this.count).fill(0),rewardItems=[],callSuccess=!specials.length&&s.caller!==null&&sums[s.caller]===Math.min(...sums);
    if(callSuccess)this.award(10,s.caller,this.order(s.caller).slice(1),rewardDeltas,rewardItems,'CATWIN');
    if(matchOver)for(const winner of winners)this.award(100,winner,this.order(winner).filter(i=>!winners.includes(i)),rewardDeltas,rewardItems,'整场胜利');
    this.rewardTotals=this.rewardTotals.map((v,i)=>v+rewardDeltas[i]);
    s.result={sums,points,notes,scores:[...this.scores],special:specials[0]??-1,specials,matchOver,winners,winner:winners.length===1?winners[0]:-1,caller:s.caller,callSuccess,rewardDeltas,rewardTotals:[...this.rewardTotals],rewardMultipliers:this.scores.map((_,i)=>this.multiplier(i)),betCounts:[...this.betCounts],comboTenths:[...this.comboTenths],specialCounts:[...this.specialCounts],rewardItems};s.phase='finished';
  }
  act(seat,input){
    const s=this.s,action=input.action;
    if(action==='next'){
      if(s.phase!=='finished')fail('本局尚未结束');if(this.nextReady[seat])fail('你已准备');this.nextReady[seat]=true;
      if(this.nextReady.every(Boolean)){this.start(s.result.matchOver);return[{type:'deal'},...this.startEvents];}return[{type:'next',actor:seat}];
    }
    if(action==='remember'){
      const index=input.index;
      if(s.phase!=='memorize'||this.ready[seat]||!Number.isInteger(index)||index<0||index>=4)fail('现在不能记这张牌');
      if(this.initialPeeks[seat].length>=2||this.initialPeeks[seat].includes(index))fail('初始只能选择两张不同的牌');
      this.initialPeeks[seat].push(index);s.hands[seat][index].seenBy.add(seat);return[{type:'remember',actor:seat,index}];
    }
    if(action==='cover'){
      if(s.phase!=='memorize'||this.ready[seat])fail('已完成记牌');if(this.initialPeeks[seat].length!==2)fail('请先选择两张牌记住');this.ready[seat]=true;if(this.ready.every(Boolean))s.phase='draw';return[{type:'cover',actor:seat}];
    }
    if(s.phase==='memorize'||s.phase==='finished'||s.current!==seat)fail('还没轮到你');
    if(action==='draw'){
      if(s.phase!=='draw'||!['deck','discard'].includes(input.source))fail('现在不能摸牌');const card=this.take(input.source);if(!card)fail('这个牌堆是空的');
      if(input.source==='discard')card.public=true;card.seenBy.add(seat);s.drawn=card;s.source=input.source;s.phase='choose';return[{type:'draw',actor:seat,source:input.source,card:{...card}}];
    }
    if(action==='replace'){
      if(s.phase!=='choose')fail('请先摸牌');const ids=input.indices;
      if(!Array.isArray(ids)||!ids.length||ids.length>s.hands[seat].length||ids.some(i=>!Number.isInteger(i)||i<0||!s.hands[seat][i])||new Set(ids).size!==ids.length)fail('请选择有效的手牌');
      const indices=[...ids].sort((a,b)=>a-b),hand=s.hands[seat],selected=indices.map(i=>hand[i]),drawn=s.drawn;
      const unknown=selected.some(c=>!c.public&&c.seenBy.size===0),match=selected.every(c=>c.v===selected[0].v);
      selected.forEach(c=>c.public=true);
      const cards=selected.map(c=>({v:c.v,public:true}));let type;
      if(!match){hand.push(drawn);type='mistake';}
      else{const first=indices[0];s.hands[seat]=hand.flatMap((c,i)=>i===first?[drawn]:indices.includes(i)?[]:[c]);s.discard.push(...selected);type=indices.length>1?'multi':'exchange';}
      s.drawn=null;const events=[{type,actor:seat,indices,cards,drawn:{v:drawn.v,public:drawn.public}}];
      if(match&&unknown){s.betCounts[seat]++;events.push({type:'gamble',actor:seat,count:s.betCounts[seat],multiplier:this.multiplier(seat)});}
      if(match&&[2,3].includes(indices.length)){const bonus=indices.length===2?1:3;this.comboTenths[seat]+=bonus;events.push({type:indices.length===2?'pair':'triple',actor:seat,bonus:bonus*10,multiplier:this.multiplier(seat)});}
      return this.end(events);
    }
    if(action==='discard'||action==='use'){
      if(s.phase!=='choose')fail('请先摸牌');const card={...s.drawn},v=card.v;
      if(action==='use'&&![0,5,8,9,10,11,12].includes(v))fail('这张牌没有能力');
      s.drawn.public=true;s.discard.push(s.drawn);s.drawn=null;if(action==='discard')return this.end([{type:'discard',actor:seat,card}]);
      const events=[{type:'ability',actor:seat,card}];
      if(v===0){s.phase='rotateChoice';return events;}
      s.phase=[8,9,10].includes(v)?'peek':v===5?'shuffle':'swapOwn';return events;
    }
    if(action==='rotate'){
      if(s.phase!=='rotateChoice'||!['cw','ccw'].includes(input.direction))fail('请选择顺时针或逆时针');
      const step=input.direction==='cw'?1:-1,old=s.hands;s.hands=old.map((_,i)=>old[(i-step+this.count)%this.count]);
      return this.end([{type:'rotate',actor:seat,direction:input.direction,step}]);
    }
    if(action==='target'){
      if(!Number.isInteger(input.actor)||input.actor<0||input.actor>=this.count)fail('请选择有效的玩家');
      const target=(seat+input.actor)%this.count,index=input.index;
      if(!Number.isInteger(index)||index<0||!s.hands[target][index])fail('请选择有效的手牌');
      if(s.phase==='peek'){s.hands[target][index].seenBy.add(seat);s.peeked={actor:target,index};s.phase='peekView';return[{type:'peek',actor:target,by:seat,index}];}
      if(s.phase==='shuffle'){const old=[...s.hands[target]];this.shuffle(s.hands[target]);const publicMoves=old.flatMap((c,from)=>c.public?[{from,to:s.hands[target].indexOf(c)}]:[]);return this.end([{type:'shuffle',actor:target,by:seat,publicMoves}]);}
      if(['swapOwn','swapOther'].includes(s.phase)&&target===seat){s.swapIndex=index;s.phase='swapOther';return[{type:'swapSelect',actor:seat}];}
      if(s.phase==='swapOther'&&target!==seat){const a=s.swapIndex;[s.hands[seat][a],s.hands[target][index]]=[s.hands[target][index],s.hands[seat][a]];return this.end([{type:'swap',actor:seat,target,a,b:index}]);}
      fail('现在不能选择这张牌');
    }
    if(action==='closePeek'){if(s.phase!=='peekView')fail('没有正在查看的牌');return this.end([{type:'coverPeek',actor:seat}]);}
    if(action==='call'){
      if(s.phase!=='draw'||!this.canCall())fail('所有玩家各行动五次后，在摸牌前喊 CATWIN');
      s.caller=seat;s.finalPending=this.order(seat).slice(1);return this.end([{type:'call',actor:seat}]);
    }
    fail('无效操作');
  }
  view(seat){
    const s=this.s,order=this.order(seat),local=p=>p===null?null:this.local(p,seat);
    const hands=order.map((p,a)=>s.hands[p].map((c,i)=>{
      const visible=c.public||s.phase==='finished'||(s.phase==='memorize'&&p===seat&&!this.ready[seat]&&this.initialPeeks[seat].includes(i))||(s.phase==='peekView'&&s.current===seat&&s.peeked?.actor===p&&s.peeked.index===i);
      return{id:`${this.round}:p${a}:${i}`,v:visible?c.v:null,public:!!c.public};
    }));
    let phase=s.phase;if(phase==='memorize'&&this.ready[seat])phase='waitingReady';else if(!['memorize','finished'].includes(phase)&&s.current!==seat)phase='waiting';
    const result=s.result?{...s.result,...Object.fromEntries(['sums','points','notes','scores','rewardDeltas','rewardTotals','rewardMultipliers','betCounts','comboTenths','specialCounts'].map(k=>[k,order.map(i=>s.result[k][i])])),rewardItems:s.result.rewardItems.map(item=>({...item,actor:local(item.actor),split:item.split.map(row=>({...row,actor:local(row.actor)}))})),winner:s.result.winner<0?-1:local(s.result.winner),winners:s.result.winners.map(local),caller:local(s.result.caller),special:s.result.special<0?-1:local(s.result.special),specials:s.result.specials.map(local)}:null;
    return{phase,remotePhase:s.phase,hands,betCounts:order.map(i=>s.betCounts[i]),multipliers:order.map(i=>this.multiplier(i)),comboTenths:order.map(i=>this.comboTenths[i]),specialCounts:order.map(i=>this.specialCounts[i]),deckTop:s.deck.at(-1)?.public?{v:s.deck.at(-1).v,public:true}:null,deck:Array.from({length:s.deck.length},(_,i)=>({id:`deck:${i}`,v:null})),discard:s.discard.map((c,i)=>({id:`discard:${i}`,v:c.v})),turns:s.turns,completed:order.map(i=>s.completed[i]),current:local(s.current),caller:local(s.caller),finalPending:s.finalPending.map(local),
      drawn:s.drawn?{id:`drawn:${this.round}:${s.turns}`,v:s.current===seat||s.drawn.public?s.drawn.v:null,public:!!s.drawn.public}:null,source:s.source,selected:[],initialPeek:s.phase==='memorize'&&!this.ready[seat]?this.initialPeeks[seat]:[],peeked:s.phase==='peekView'&&s.current===seat?{actor:local(s.peeked.actor),index:s.peeked.index}:null,swapIndex:s.current===seat?s.swapIndex:undefined,result,ready:order.map(i=>this.ready[i]),nextReady:order.map(i=>this.nextReady[i])};
  }
  eventsFor(events,seat){
    const local=p=>this.local(p,seat),who=p=>p===seat?'你':`猫友 ${p+1}`;
    return events.map(e=>{
      const x={...e};delete x.text;
      for(const k of ['actor','by','target'])if(e[k]!==undefined)x[k]=local(e[k]);
      if(e.card)x.card={v:['draw','aiDraw'].includes(e.type)&&e.actor!==seat&&!e.card.public?null:e.card.v,public:!!e.card.public};
      if(e.drawn)x.drawn={v:e.actor===seat||e.drawn.public?e.drawn.v:null,public:!!e.drawn.public};if(e.cards)x.cards=e.cards.map(c=>({v:c.v,public:true}));
      if(e.type==='remember'&&e.actor!==seat)delete x.index;
      const text={deal:`第 ${this.round} 局开始。`,cover:`${who(e.actor)}完成记牌。`,draw:`${who(e.actor)}从${e.source==='deck'?'摸牌堆':'弃牌堆'}摸了一张。`,discard:`${who(e.actor)}弃掉了 ${e.card?.v}。`,ability:`${who(e.actor)}使用 ${e.card?.v} · ${CatRulesBase.ability(e.card?.v)}。`,exchange:`${who(e.actor)}换出 ${e.cards?.map(c=>c.v).join('、')}。`,multi:`${who(e.actor)}一换多：${e.cards?.map(c=>c.v).join('、')}。`,mistake:`${who(e.actor)}一换多记错了，摸到的牌加入手牌。`,peek:`${who(e.by)}查看了${who(e.actor)}的第 ${e.index+1} 张。`,shuffle:`${who(e.by)}打乱了${who(e.actor)}的手牌。`,swap:`${who(e.actor)}的第 ${e.a+1} 张 ↔ ${who(e.target)}的第 ${e.b+1} 张。`,pair:`${who(e.actor)} · 对子，奖励倍率 +10%。`,triple:`${who(e.actor)} · 三张，奖励倍率 +30%。`,gamble:`${who(e.actor)} · 赌 ×${e.multiplier?.toFixed(1)}。`,remember:`${who(e.actor)}记住了一张初始牌。`,rotate:`所有玩家${e.direction==='ccw'?'逆时针':'顺时针'}传递整手牌。`,call:`${who(e.actor)}喊出 CATWIN，其余玩家各再行动一次。`,finish:'本局结束。',next:`${who(e.actor)}已准备下一局。`};
      x.text=e.type==='special1213'?who(e.actor)+'触发 1213，立即结算。':text[e.type];return x;
    });
  }
}
if(typeof module!=='undefined')module.exports=CatRules;

// Practice uses the same rules and public/private views as online rooms.
class LocalPractice {
  constructor(){this.rules=new CatRules(2);this.listeners=[];this.round=0;this.scores=[0,0];this.s={phase:'intro',hands:[[],[]],deck:[],discard:[],turns:0,current:0,caller:null};}
  on(fn){this.listeners.push(fn);}
  emit(events=[]){this.listeners.forEach(fn=>fn(this.s,events));}
  refresh(events=[]){this.s=this.rules.view(0);if(this.s.phase==='waiting')this.s.phase='ai';this.scores=this.rules.scores;this.round=this.rules.round;this.emit(this.rules.eventsFor(events,0));return true;}
  start(reset=false){
    this.rules.start(reset);if(this.rules.s.phase==='memorize'){const ids=this.rules.shuffle([0,1,2,3]).slice(0,2);ids.forEach(index=>this.rules.act(1,{action:'remember',index}));this.rules.act(1,{action:'cover'});}
    return this.refresh([{type:'deal'},...(this.rules.startEvents||[])]);
  }
  act(action,extra={}){return this.refresh(this.rules.act(0,{action,...extra}));}
  remember(index){return this.act('remember',{index});}
  cover(){return this.act('cover');}
  draw(source){return this.act('draw',{source});}
  discard(){return this.act('discard');}
  replace(){return this.act('replace',{indices:[...this.s.selected]});}
  use(){return this.act('use');}
  target(actor,index){return this.act('target',{actor,index});}
  rotate(direction){return this.act('rotate',{direction});}
  closePeek(){return this.act('closePeek');}
  call(){return this.act('call');}
  canCall(){return this.s.phase!=='intro'&&this.rules.canCall();}
  select(index){if(this.s.phase!=='choose'||!this.s.hands[0][index])return false;const i=this.s.selected.indexOf(index);if(i<0)this.s.selected.push(index);else this.s.selected.splice(i,1);this.emit();return true;}
  aiStep(){
    const g=this.rules,s=g.s;if(s.current!==1||s.phase!=='draw')return false;const events=[];
    const run=(action,extra={})=>{events.push(...g.act(1,{action,...extra}));};
    // The bot estimates unseen cards without reading their values or hidden IDs.
    const estimate=c=>c.public?c.v:6.5,total=s.hands[1].reduce((n,c)=>n+estimate(c),0);
    if(g.canCall()&&(total<=12||s.turns>=20)){run('call');return this.refresh(events);}
    const top=s.discard.at(-1),source=top&&top.v<=3?'discard':'deck';run('draw',{source});
    const card={v:s.drawn.v,public:s.drawn.public};
    if([0,5,8,9,10,11,12].includes(card.v)){
      run('use');if(s.phase==='peek'){run('target',{actor:0,index:Math.floor(g.rng()*s.hands[1].length)});run('closePeek');events.push({type:'aiPeek',actor:1});}
      else if(s.phase==='swapOwn'){const own=s.hands[1].map((c,i)=>({i,v:estimate(c)})).sort((a,b)=>b.v-a.v)[0].i;run('target',{actor:0,index:own});run('target',{actor:1,index:Math.floor(g.rng()*s.hands[0].length)});}
      else if(s.phase==='shuffle')run('target',{actor:1,index:0});else if(s.phase==='rotateChoice')run('rotate',{direction:g.rng()<.5?'cw':'ccw'});
    }else if(card.v<=5){const own=s.hands[1].map((c,i)=>({i,v:estimate(c)})).sort((a,b)=>b.v-a.v)[0].i;run('replace',{indices:[own]});}
    else run('discard');
    const draw=events.find(e=>e.type==='draw');if(draw)draw.type='aiDraw';return this.refresh(events);
  }
}

class OnlineGame {
  constructor(data){
    this.isOnline=true;this.code=data.packet.code;this.token=data.token;this.listeners=[];this.queue=new Map();this.applied=0;this.cursor=0;this.connected=true;this.stopped=false;this.pumping=false;this.controller=null;
    this.apply(data.packet,false);
  }
  on(fn){this.listeners.push(fn);}
  emit(events=[]){this.listeners.forEach(fn=>fn(this.s,events));}
  apply(packet,notify=true){
    if(packet.seq<this.applied)return false;
    this.applied=packet.seq;this.cursor=Math.max(this.cursor,packet.seq);this.round=packet.round;this.scores=packet.scores;this.s=packet.state;this.closed=packet.closed;this.isPractice=!!packet.practice;this.peerOnline=packet.online?.slice(1).every(Boolean)??true;this.playerCount=packet.players;this.seats=packet.seats;this.isHost=packet.host;
    for(const key of this.queue.keys())if(key<=this.applied)this.queue.delete(key);
    if(notify)this.emit([...packet.events,{type:'networkAction',...packet.meta}]);return true;
  }
  async request(endpoint,options={}){
    const response=await fetch(new URL('./api/'+endpoint,location.href),{...options,headers:{'Content-Type':'application/json',Authorization:'Bearer '+this.token,...options.headers},signal:options.signal||AbortSignal.timeout(25000)});
    const data=await response.json();if(!response.ok)throw Object.assign(new Error(data.error||'连接失败'),{status:response.status});return data;
  }
  async send(action,extra={}){
    if(this.stopped)throw new Error('房间已断开');
    const payload={action,id:crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),version:this.applied,round:this.round,...extra};
    let data;
    try{data=await this.request(`rooms/${this.code}/action`,{method:'POST',body:JSON.stringify(payload),signal:AbortSignal.timeout(10000)});}
    catch(error){
      if(error instanceof TypeError||error.name==='TimeoutError'){
        data=await this.request(`rooms/${this.code}/action`,{method:'POST',body:JSON.stringify(payload),signal:AbortSignal.timeout(10000)});
      }else{this.resync();throw error;}
    }
    this.apply(data.packet);return true;
  }
  canCall(){return (this.s.completed?.every(n=>n>=5)??false)&&this.s.caller===null;}
  begin(){return this.send("begin");}
  select(index){if(busy||this.s.phase!=='choose'||!this.s.hands[0][index])return false;const n=this.s.selected.indexOf(index);if(n<0)this.s.selected.push(index);else this.s.selected.splice(n,1);this.emit();return true;}
  remember(index){return this.send('remember',{index});}
  rotate(direction){return this.send('rotate',{direction});}
  cover(){return this.send('cover');}
  draw(source){return this.send('draw',{source});}
  discard(){return this.send('discard');}
  replace(){return this.send('replace',{indices:[...this.s.selected]});}
  use(){return this.send('use');}
  target(actor,index){return this.send('target',{actor,index});}
  closePeek(){return this.send('closePeek');}
  call(){return this.send('call');}
  start(){return this.send('next');}
  async resync(){try{const data=await this.request(`rooms/${this.code}`);this.queue.set(data.packet.seq,data.packet);this.flush();}catch(_){}}
  async poll(){
    let backoff=700;
    while(!this.stopped){
      try{
        this.controller=new AbortController();const timer=setTimeout(()=>this.controller?.abort(),24000);
        let data;try{data=await this.request(`rooms/${this.code}/events?after=${this.cursor}`,{signal:this.controller.signal});}finally{clearTimeout(timer);}
        if(this.stopped)return;this.connected=true;backoff=700;this.peerOnline=data.online?.slice(1).every(Boolean)??true;
        for(const packet of data.updates||[])if(packet.seq>this.applied){this.cursor=Math.max(this.cursor,packet.seq);this.queue.set(packet.seq,packet);}
        updateConnectionUI();this.flush();
        if(data.closed){if(!data.updates?.length)this.closed=true;break;}
        await new Promise(resolve=>setTimeout(resolve,500));
      }catch(error){if(this.stopped)return;if([401,403,404,410].includes(error.status)){this.stop();showHome();toast(error.message);break;}console.warn('房间同步重试：'+error.name+' / '+error.message);this.connected=false;updateConnectionUI();await new Promise(resolve=>setTimeout(resolve,backoff));backoff=Math.min(backoff*1.7,7000);}
    }
  }
  async flush(){
    if(this.pumping||busy||this.stopped||game!==this)return;
    this.pumping=true;
    try{
      while(this.queue.size&&!busy&&!this.stopped&&game===this){
        const seq=Math.min(...this.queue.keys()),packet=this.queue.get(seq);this.queue.delete(seq);
        if(seq<=this.applied)continue;
        if(packet.closed){this.stop();showHome();toast('有玩家退出，房间已结束');break;}
        if(packet.meta.kind==='deal'){
          roundToken++;busy=true;$('resultDialog').close();previousHands=[[],[]];previousPhase='intro';this.apply(packet);lockControls();await dealCurrentHand(roundToken);busy=false;render(this.s);
        }else if(packet.meta.kind==='sync'){
          roundToken++;clearTimeout(peekTimer);this.apply(packet);render(this.s);
        }else await playTransition('remote',()=>{this.apply(packet);return true;});
      }
    }finally{this.pumping=false;updateConnectionUI();}
  }
  stop(){this.stopped=true;this.controller?.abort();try{sessionStorage.removeItem(catSessionKey());}catch(_){};}
  async leave(){await this.request(`rooms/${this.code}/leave`,{method:'POST',body:'{}',signal:AbortSignal.timeout(5000)});this.stop();showHome();}
}
function catSessionKey(){return 'cat-3d-room:'+new URL('.',location.href).pathname;}
async function connectRoom(kind,code){
  if(busy)return;
  if(location.protocol==='file:'){toast('联机请从启动程序打开的网页进入');return;}
  busy=true;document.querySelectorAll('#startLobby button').forEach(b=>b.disabled=true);
  try{
    await stage?.artReady;
    const response=await fetch(new URL(kind==='practice'?'./api/practice':kind==='create'?'./api/rooms':'./api/join',location.href),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code}),signal:AbortSignal.timeout(10000)});
    const data=await response.json();if(!response.ok)throw new Error(data.error||'连接失败');
    await enterOnline(data,kind==='practice');
  }catch(error){busy=false;toast(error.message==='Failed to fetch'?'无法连接房间服务，请先启动猫猫牌':error.message);}
  finally{document.querySelectorAll('#startLobby button').forEach(b=>b.disabled=false);}
}
async function enterOnline(data,deal=false){
  await stage?.artReady;
  roundToken++;clearTimeout(aiTimer);clearTimeout(peekTimer);aiTimer=null;
  const next=new OnlineGame(data);network=next;game=next;game.on(gameListener);
  try{sessionStorage.setItem(catSessionKey(),JSON.stringify({code:next.code,token:next.token}));}catch(_){}
  previousHands=[[],[]];previousPhase='intro';$('gameLog').innerHTML='';busy=deal;render(game.s,data.packet.events||[]);
  if(deal){lockControls();await dealCurrentHand(roundToken);busy=false;render(game.s);}
  next.poll();updateConnectionUI();
}
function showHome(){
  roundToken++;clearTimeout(aiTimer);clearTimeout(peekTimer);aiTimer=null;busy=false;network=null;game=localGame;
  document.getAnimations().forEach(a=>a.cancel());$('fxLayer').innerHTML='';$('resultDialog').close();$('confirmDialog').close();
  localGame.scores=[0,0];localGame.round=0;localGame.s={phase:'intro',hands:[[],[]],deck:[],discard:[],turns:0,current:0,caller:null};
  for(const[id]of[['playerHand'],['aiHand']])$(id).innerHTML=[0,1,2,3].map(i=>`<div class="hand-card">${cardMarkup(null)}<span class="card-index">0${i+1}</span></div>`).join('');
  previousHands=[[],[]];previousPhase='intro';$('yourDelta').textContent='';$('aiDelta').textContent='';render(localGame.s);
}
function updateConnectionUI(){
  const online=!!game.isOnline&&!game.isPractice;
  $('modeLabel').textContent=online?`房间 ${game.code}`:game.s.phase==='intro'?'猫猫牌':'人机练习';
  $('connectionLabel').textContent=game.isOnline?(online&&game.s.phase==='lobby'?game.playerCount+'/5 人':game.connected?(game.peerOnline?'已连接':'有猫友暂时断线'):'重连中'):'本地';
  $('onlineBadge').classList.toggle('reconnecting',online&&!game.connected);
  $('roomCodeText').textContent=online?game.code:'';
  if(online&&game.s.phase==='lobby'){
    $('lobbyPlayers').innerHTML=game.seats.map(p=>'<span class="lobby-player">'+icon('cat')+'<b>'+p.label+'</b>'+(p.isHost?'<small>房主</small>':'')+'</span>').join('');
    $('lobbyStatus').textContent=game.playerCount+'/5 人 · '+(game.isHost?'至少两人即可开始':'等待房主开始');
    $('beginRoomBtn').hidden=!game.isHost;$('beginRoomBtn').disabled=!game.isHost||game.playerCount<2||busy;
  }
  $('resetBtn').setAttribute('aria-label',online?'退出房间':'重新开始');$('resetBtn').title=online?'退出房间':'重新开始';
  $('mainTitle').textContent=online?'猫友对战':'猫猫牌 · 3D';
  $('opponentName').textContent=playerName(1);$('opponentType').textContent=online?'猫友':'AI';
  $('confirmTitle').textContent=online?'退出房间？':'重新开一桌？';$('confirmDesc').textContent=online?(game.s.phase==='lobby'?'离开当前房间。':'退出后，本房间的对战结束。'):'当前牌局和累计积分会重置。';$('confirmResetBtn').textContent=online?'退出房间':'重新开桌';
  document.querySelector('footer span:last-child').textContent=online?game.playerCount+' 人联机':game.s.phase==='intro'?'':'人机练习';
}
async function animateRemoteTransition(before,after,events,token){
  const meta=events.find(e=>e.type==='networkAction');if(!meta)return;const actor=meta.actor??1;
  if(meta.kind==='draw'){
    const e=events.find(e=>e.type==='draw');if(e)await drawAnimation(e.card,e.source,actor,token);
  }else if(meta.kind==='rotate'){
    const e=events.find(e=>e.type==='rotate');if(e)await rotateAnimation(before,token,e.step);
  }else if(['discard','use'].includes(meta.kind)){
    const e=events.find(e=>e.type==='discard'||e.type==='ability');
    if(e){if(e.type==='ability'&&e.card.v!==0)abilityFX(e.card.v,pileTop());note(playerName(actor)+'出牌','展示区 → 弃牌堆');let el=$('drawnCard').querySelector('.card');if(!el)el=showTray(e.card,false,actor);await moveToDiscard(el,e.card,token,false);}
    if(events.some(e=>e.type==='rotate')&&token===roundToken)await rotateAnimation(before,token);
  }else if(meta.kind==='replace'){
    const e=events.find(e=>['exchange','multi','mistake'].includes(e.type));if(!e)return;
    if(!$('drawnCard').querySelector('.card'))showTray(null,false,actor);
    if(e.type!=='mistake')await exchangeAnimation(before,e,e.drawn||{v:null},actor,token);
    else{
      note(playerName(actor)+'一换多记错了','摸到的牌加入手牌。');await Promise.all(e.indices.map((i,j)=>flipCard(cardAt(actor,i),cardMarkup(e.cards[j],true))));await pause(350);
      if(token!==roundToken)return;await pause(150);
      if(token!==roundToken)return;const extra=document.createElement('div');extra.className='hand-card';extra.innerHTML=cardMarkup(e.drawn);handFor(actor).append(extra);const target=extra.querySelector('.card');target.style.visibility='hidden';
      const tray=$('drawnCard').querySelector('.card'),rect=tray.getBoundingClientRect();tray.style.visibility='hidden';await fly(rect,target,cardMarkup(e.drawn));if(token===roundToken)target.style.visibility='visible';
    }
  }else if(meta.kind==='target'){
    const swap=events.find(e=>e.type==='swap'),shuffle=events.find(e=>e.type==='shuffle'),peek=events.find(e=>e.type==='peek');
    if(swap)await swapAnimation(swap,token,before);if(shuffle)await shuffleAnimation(shuffle.actor,before,after,token,shuffle);
    if(peek){note(playerName(peek.by)+'正在偷看','牌面仅对使用者显示。');const el=cardAt(peek.actor,peek.index);abilityFX(8,el);el?.classList.add('move-target');await pause(350);}
  }else if(meta.kind==='closePeek'){note(playerName(actor)+'结束查看');await pause(150);}
}

document.addEventListener('DOMContentLoaded',()=>{
  $('beginRoomBtn').addEventListener('click',()=>{if(!busy)playTransition('begin',()=>game.begin());});
  $('createRoomBtn').addEventListener('click',()=>connectRoom('create'));
  $('joinForm').addEventListener('submit',e=>{e.preventDefault();connectRoom('join',$('joinCode').value.trim());});
  $('copyRoomBtn').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(game.code);toast('房间码已复制');}catch(_){toast('房间码：'+game.code);}});
  $('leaveLobbyBtn').addEventListener('click',()=>network?.leave());
  (async()=>{try{
    const saved=JSON.parse(sessionStorage.getItem(catSessionKey())||'null');if(!saved||location.protocol==='file:')return;
    const res=await fetch(new URL(`./api/rooms/${saved.code}`,location.href),{headers:{Authorization:'Bearer '+saved.token},signal:AbortSignal.timeout(6000)});
    const data=await res.json();if(res.ok&&!data.packet.closed)await enterOnline({token:saved.token,packet:data.packet});else sessionStorage.removeItem(catSessionKey());
  }catch(_){toast('连接尚未恢复，可刷新后重试');}})();
});

const $ = id => document.getElementById(id);
const icon = (name, cls = '') => `<svg class="${cls}" aria-hidden="true"><use href="#${name}"/></svg>`;
const localGame = new LocalPractice();
let game = localGame, network = null;
let toastTimer, aiTimer, peekTimer, roundToken = 0, busy = false, previousPhase = 'intro', previousHands = [[],[]], capturing = false, captured = null;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let animationSpeed=1;
try{animationSpeed=localStorage.getItem('cat-animation-speed')==='2'?2:1;}catch(_){}
document.documentElement.style.setProperty('--motion-speed',animationSpeed);

function sound() {}
function toast(message, duration = 3200) {
  clearTimeout(toastTimer); $('toast').textContent = message; $('toast').classList.add('visible');
  toastTimer = setTimeout(()=>$('toast').classList.remove('visible'), duration);
}
function cardMarkup(card, face = false, options = {}) {
  face=face||!!card?.public;
  const value = card?.v ?? 0, ability = CatGame.ability(value), abilityIcon = ({0:'spark',5:'shuffle',8:'eye',9:'eye',10:'eye',11:'swap',12:'swap'})[value];
  const style = value === 0 ? 'zero-card' : value===5 ? 'shuffle-card' : [8,9,10].includes(value) ? 'peek-card' : [11,12].includes(value) ? 'swap-card' : value>=7 ? 'high-card' : '';
  const classes = `card ${face ? 'card-face '+style : 'card-back'} ${options.selected?'selected':''} ${options.selectable?'selectable':''} ${options.reveal?'peek-reveal':''} ${card?.public?'card-public':''}`;
  const tag = options.button ? 'button' : 'span';
  const attrs = options.button ? `type="button" data-actor="${options.actor}" data-index="${options.index}" ${!options.selectable?'disabled':''} aria-label="${playerName(options.actor)}的第 ${options.index+1} 张牌${face?'，'+value+'，'+ability:'，牌面朝下'}" ${options.selected?'aria-pressed="true"':''}` : '';
  return `<${tag} class="${classes}" ${attrs}>${face ? `<span class="card-corner">${value}${icon('paw')}</span>${icon(abilityIcon || 'cat',abilityIcon?'face-glyph':'face-cat')}<span class="face-label">${ability==='数字牌'?'猫猫牌':ability}</span><span class="card-corner bottom">${value}${icon('paw')}</span>` : `<span class="back-outline"></span>${icon('cat-sleep','back-cat')}<span class="back-brand">猫猫牌</span><span class="back-star s1">✧</span><span class="back-star s2">✧</span>`}${face?'<span class="card-readout" aria-hidden="true">'+value+'</span>':''}${options.selected?'<span class="selected-tick">✓</span>':''}</${tag}>`;
}
const pace = { move: 420, flip: 300, hold: 180, swap: 520 };
const pause = ms => new Promise(resolve=>setTimeout(resolve,reducedMotion?0:ms/animationSpeed));
const handFor = actor => $(actor===0?'playerHand':actor===1?'aiHand':'peerHand'+actor);
const playerName = actor => actor===0?'你':game.isOnline?(game.seats?.[actor]?.label||'猫友 '+(actor+1)):'布丁';
const cardAt = (actor,index) => handFor(actor)?.querySelector('[data-index="'+index+'"]');
function abilityFX(type,a,b){stage?.effect(type,a,b);}
let seatLayoutKey='';
function prepareSeats(s){
  const count=Math.max(2,s.hands.length),key=(game.isOnline?game.seats?.map(p=>p.seat).join(','):'local')+':'+count;
  document.body.dataset.players=count;document.body.classList.toggle('multiplayer',count>2);
  if(key===seatLayoutKey)return;seatLayoutKey=key;
  document.querySelectorAll('.extra-opponent').forEach(el=>el.remove());
  for(let actor=2;actor<count;actor++){
    const el=document.createElement('div');el.className='opponent-zone extra-opponent';el.dataset.seat=actor;
    el.innerHTML='<div class="player-identity"><span class="avatar pudding">'+icon('cat')+'</span><div><strong class="peer-name"></strong><small class="peer-status"></small></div></div><div class="hand opponent-hand" id="peerHand'+actor+'" aria-label="'+playerName(actor)+'的手牌"></div>';
    $('opponents').append(el);
  }
  $('scoreRows').innerHTML=Array.from({length:count},(_,i)=>'<div class="score-row" data-score-seat="'+i+'"><span class="mini-avatar '+(i===0?'human':'pudding')+'">'+icon(i===0?'paw':'cat')+'</span><div><span class="score-name">'+playerName(i)+'</span><small id="'+(i===0?'yourDelta':i===1?'aiDelta':'peerDelta'+i)+'"></small></div><strong id="'+(i===0?'yourScore':i===1?'aiScore':'peerScore'+i)+'">0<small>分</small></strong></div>').join('');
}
function renderSeatInfo(s){
  document.querySelectorAll('.opponent-zone').forEach(el=>{
    const a=+el.dataset.seat;el.classList.toggle('active-seat',!['intro','lobby','finished'].includes(s.phase)&&s.current===a);
    const name=el.querySelector('.peer-name');if(name)name.textContent=playerName(a);
    const status=el.querySelector('.peer-status')||el.querySelector('#aiStatus');if(status)status.textContent=s.phase==='finished'?'合计 '+s.result.sums[a]+' 分':s.phase==='memorize'||s.phase==='waitingReady'?(s.ready?.[a]?'已盖牌':'记牌中'):s.current===a?'行动中':(s.hands[a]?.length||0)+' 张手牌';
    if(status&&s.multipliers?.[a]>1)status.textContent+=' · ×'+s.multipliers[a].toFixed(1);
  });
  document.querySelector('.player-zone').classList.toggle('active-seat',s.current===0&&!['intro','lobby','finished'].includes(s.phase));
  document.querySelectorAll('[data-score-seat]').forEach(el=>{
    const i=+el.dataset.scoreSeat;el.querySelector('.score-name').textContent=playerName(i);el.querySelector('strong').innerHTML=(game.scores[i]||0)+'<small>分</small>';
    el.classList.toggle('current-player',s.current===i&&!['intro','lobby','finished'].includes(s.phase));
    const multiplier=el.querySelector('div>small');multiplier.textContent=s.multipliers?.[i]>1?'×'+s.multipliers[i].toFixed(1):'';el.querySelector('strong').title='局内累计分数';
  });
}
function note(title,desc='') { $('promptTitle').textContent=title; $('promptDesc').textContent=desc; }
function lockControls() { document.querySelectorAll('.actions button,.hand button,#deckBtn,#discardBtn,#catwinBtn').forEach(b=>b.disabled=true); }
async function runAnimation(el,keyframes,options) {
  if(reducedMotion)return;
  const a=el.animate(keyframes,options);
  a.playbackRate=animationSpeed;
  try {await a.finished;}catch(_){}finally{a.cancel();}
}
async function fly(from, to, html, duration = pace.move, rotation = 8) {
  if(stage)return stage.fly(from,to,html,duration,rotation);
  if (!from || !to || reducedMotion) return;
  const a = from.getBoundingClientRect ? from.getBoundingClientRect() : from, b = to.getBoundingClientRect ? to.getBoundingClientRect() : to;
  if (!a.width || !b.width) return;
  const el = document.createElement('div'); el.className = 'fly-card'; el.innerHTML = html;
  Object.assign(el.style,{left:a.left+'px',top:a.top+'px',width:a.width+'px',height:a.height+'px',transformOrigin:'top left'}); $('fxLayer').append(el);
  const dx=b.left-a.left,dy=b.top-a.top,sx=b.width/a.width,sy=b.height/a.height;
  try {await runAnimation(el,[{transform:'translate(0,0) rotate(0deg) scale(1,1)',offset:0},{transform:`translate(${dx*.5}px,${dy*.5-20}px) rotate(${rotation}deg) scale(${(1+sx)*.5},${(1+sy)*.5})`,offset:.5},{transform:`translate(${dx}px,${dy}px) rotate(0deg) scale(${sx},${sy})`,offset:1}],{duration,easing:'cubic-bezier(.65,0,.2,1)',fill:'forwards'});}finally{el.remove();}
}
async function flipCard(el,html,duration=pace.flip) {
  if(!el)return;
  if(stage)return stage.flip(el,html,duration);
  await runAnimation(el,[{transform:'rotateY(0deg)'},{transform:'rotateY(90deg)'}],{duration:reducedMotion?0:duration/2,easing:'ease-in',fill:'forwards'});
  if(!el.isConnected)return;
  const template=document.createElement('template');template.innerHTML=html;
  el.className=template.content.firstElementChild.className;el.innerHTML=template.content.firstElementChild.innerHTML;
  await runAnimation(el,[{transform:'rotateY(-90deg)'},{transform:'rotateY(0deg)'}],{duration:reducedMotion?0:duration/2,easing:'ease-out'});
}
function showTray(card,face,actor=0){
  $('drawnTray').dataset.actor=actor;
  $('drawnTray').hidden=false;$('drawnTray').querySelector('.tray-label').textContent=playerName(actor)+'摸到的牌';
  $('drawnCard').innerHTML=cardMarkup(card,face);$('drawnHint').textContent='';return $('drawnCard').querySelector('.card');
}
function pileTop(){return $('discardCard').querySelector('.card')||$('discardBtn');}
function setDiscard(card){$('discardCard').innerHTML=cardMarkup(card,true);}
async function moveToDiscard(el,card,token,face=true){
  if(token!==roundToken)return;
  if(!face)await flipCard(el,cardMarkup(card,true));
  if(token!==roundToken)return;
  await pause(pace.hold);
  const rect=el.getBoundingClientRect();el.style.visibility='hidden';
  await fly(rect,pileTop(),cardMarkup(card,true));
  if(token===roundToken){setDiscard(card);sound('tap');await pause(200);}
}
async function drawAnimation(card,source,actor,token){
  note(playerName(actor)+'正在摸牌',source==='deck'?'摸牌堆 → 展示区':'弃牌堆 → 展示区');
  const from=source==='deck'?$('deckBtn').querySelector('.card'):pileTop();
  const rect=from.getBoundingClientRect();if(source==='discard')from.style.visibility='hidden';
  const target=showTray(card,!!card.public||source==='discard',actor);target.style.visibility='hidden';
  sound('draw');await fly(rect,target,cardMarkup(card,!!card.public||source==='discard'),pace.move,-7);
  if(token!==roundToken)return;
  target.style.visibility='visible';
  if(actor===0 && source==='deck'&&!card.public){note('看看摸到了什么','翻开后，再选择如何使用。');await flipCard(target,cardMarkup(card,true));sound('flip');}
  await pause(pace.hold);
}
async function exchangeAnimation(before,event,drawn,actor,token){
  const ids=event.indices, old=ids.map(i=>cardAt(actor,i));
  note(playerName(actor)+'正在换牌','原手牌 → 弃牌堆');
  await Promise.all(old.map((el,j)=>flipCard(el,cardMarkup(event.cards?.[j]||before.hands[actor][ids[j]],true))));
  if(token!==roundToken)return;
  await pause(pace.hold);
  // One trip at a time keeps every outgoing card readable.
  for(let j=0;j<old.length;j++){
    if(token!==roundToken)return;
    const rect=old[j].getBoundingClientRect();old[j].style.visibility='hidden';
    const removed=event.cards?.[j]||before.hands[actor][ids[j]];
    await fly(rect,pileTop(),cardMarkup(removed,true),pace.move,9);
    if(token!==roundToken)return;setDiscard(removed);
  }
  note('放入新手牌','展示区 → 原手牌位置');
  const tray=$('drawnCard').querySelector('.card');
  if(actor===0&&!drawn.public)await flipCard(tray,cardMarkup(drawn,false));
  if(token!==roundToken)return;
  const rect=tray.getBoundingClientRect();tray.style.visibility='hidden';
  await fly(rect,old[0],cardMarkup(drawn,false),pace.move,-8);
  if(token!==roundToken)return;
  const template=document.createElement('template');template.innerHTML=cardMarkup(drawn,false);old[0].className=template.content.firstElementChild.className;old[0].innerHTML=template.content.firstElementChild.innerHTML;old[0].style.visibility='visible';
  await pause(250);
}
async function swapAnimation(event,token,before){
  const actor=event.target===undefined?0:event.actor,target=event.target??1,ai=event.a??event.own,bi=event.b??event.other;
  const a=cardAt(actor,ai),b=cardAt(target,bi);if(!a||!b)return;
  abilityFX(11,a,b);note('盲换手牌',playerName(actor)+'的第 '+(ai+1)+' 张 ↔ '+playerName(target)+'的第 '+(bi+1)+' 张');
  const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect();a.classList.add('move-target');b.classList.add('move-target');
  await pause(130);if(token!==roundToken)return;a.style.visibility='hidden';b.style.visibility='hidden';sound('swap');
  await Promise.all([fly(ar,br,cardMarkup(before?.hands[actor][ai]),pace.swap,15),fly(br,ar,cardMarkup(before?.hands[target][bi]),pace.swap,-15)]);
  if(token!==roundToken)return;a.style.visibility='visible';b.style.visibility='visible';await pause(130);
}
async function rotateAnimation(before,token,step=1){
  abilityFX(0);note('乾坤大挪移',step===1?'所有手牌顺时针传递':'所有手牌逆时针传递');
  const count=before.hands.length,jobs=[];
  before.hands.forEach((hand,actor)=>hand.forEach((c,i)=>{
    const from=cardAt(actor,i);if(from)jobs.push({actor,index:i,card:c,rect:from.getBoundingClientRect()});
  }));
  await pause(100);if(token!==roundToken)return;
  renderHands(game.s);
  for(let a=0;a<count;a++)handFor(a).querySelectorAll('.card').forEach(el=>el.style.visibility='hidden');
  await Promise.all(jobs.map((j,i)=>fly(j.rect,cardAt((j.actor+step+count)%count,j.index),cardMarkup(j.card),pace.swap+200,i%2?12:-12)));
  if(token===roundToken){for(let a=0;a<count;a++)handFor(a).querySelectorAll('.card').forEach(el=>el.style.visibility='visible');await pause(120);}
}
async function shuffleAnimation(actor,before,after,token,event){
  if(stage){note("手牌重新排序",playerName(actor)+"的手牌正在打乱");await stage.shuffle(actor,event?.publicMoves);return;}
  note('手牌重新排序',playerName(actor)+'的全部手牌正在打乱');
  const cards=before.hands[actor].map((c,i)=>({c,el:cardAt(actor,i)}));
  const rects=cards.map(x=>x.el.getBoundingClientRect());if(!rects.length)return;
  const hand=handFor(actor),h=hand.getBoundingClientRect();
  cards.forEach(x=>x.el.style.visibility='hidden');
  const middle={left:h.left+h.width/2-rects[0].width/2,top:h.top-12,width:rects[0].width,height:rects[0].height};
  await Promise.all(cards.map((x,i)=>fly(rects[i],middle,cardMarkup(null),310,(i-1)*7)));
  if(token!==roundToken)return;
  const stack=document.createElement('div');stack.className='fly-card';stack.innerHTML=cardMarkup(null);Object.assign(stack.style,{left:middle.left+'px',top:middle.top+'px',width:middle.width+'px',height:middle.height+'px'});$('fxLayer').append(stack);
  await pause(130);if(token!==roundToken){stack.remove();return;}stack.remove();
  await Promise.all(cards.map((x,i)=>fly(middle,rects[game.isOnline?(i+1)%rects.length:after.hands[actor].findIndex(c=>c.id===x.c.id)],cardMarkup(null),350,(i-1)*-6)));
  if(token!==roundToken)return;cards.forEach(x=>x.el.style.visibility='visible');await pause(250);
}
async function playTransition(kind,fn){
  if(busy)return;const token=roundToken;
  const before=JSON.parse(JSON.stringify(game.s));busy=true;lockControls();capturing=true;captured=null;
  let ok;
  try{ok=await fn();}catch(error){busy=false;toast(error.message);render(game.s);network?.flush();return;}finally{capturing=false;}
  if(ok===false||!captured){busy=false;render(game.s);return;}
  const data=captured,after=JSON.parse(JSON.stringify(game.s)),events=data.events;
  try{
    if(['next','begin'].includes(kind)&&events.some(e=>e.type==='deal')){
      $('resultDialog').close();previousHands=[[],[]];previousPhase='intro';render(game.s);lockControls();await dealCurrentHand(token);
    }else if(kind==='remote')await animateRemoteTransition(before,after,events,token);
    else if(kind==='remember'){
      const e=events.find(e=>e.type==='remember');if(e){await flipCard(cardAt(0,e.index),cardMarkup(after.hands[0][e.index],true));await pause(180);}
    }else if(kind==='rotate'){
      const e=events.find(e=>e.type==='rotate');if(e)await rotateAnimation(before,token,e.step);
    }else if(kind==='cover'){
      note('把手牌盖回','记住它们的位置。');
      await Promise.all(before.initialPeek.map(i=>flipCard(cardAt(0,i),cardMarkup(null,false))));await pause(300);
    }else if(kind==='draw')await drawAnimation(after.drawn,after.source,0,token);
    else if(kind==='discard'||kind==='use'){
      note('把牌放入弃牌堆','展示区 → 弃牌堆');
      await moveToDiscard($('drawnCard').querySelector('.card'),before.drawn,token);
      if(kind==='use'&&before.drawn.v!==0)abilityFX(before.drawn.v,pileTop());
      if(kind==='use'&&events.some(e=>e.type==='rotate')&&token===roundToken)await rotateAnimation(before,token);
    }else if(kind==='replace'){
      const e=events.find(e=>['exchange','multi','mistake'].includes(e.type));
      if(e.type==='mistake'){
        note('选中的数字不相同','原手牌保留，摸到的牌加入手牌。');
        await Promise.all(before.selected.map(i=>flipCard(cardAt(0,i),cardMarkup(e.cards?.[e.indices.indexOf(i)]||before.hands[0][i],true))));await pause(400);
        if(token!==roundToken)return;
        // Mismatched cards stay public after being revealed.
        await pause(150);
        if(token!==roundToken)return;
        const extra=document.createElement('div');extra.className='hand-card';extra.innerHTML=cardMarkup(e.drawn);$('playerHand').append(extra);
        const destination=extra.querySelector('.card');destination.style.visibility='hidden';
        const tray=$('drawnCard').querySelector('.card');if(!e.drawn.public)await flipCard(tray,cardMarkup(null));
        if(token!==roundToken)return;const rect=tray.getBoundingClientRect();tray.style.visibility='hidden';
        note('增加一张手牌','展示区 → 手牌末尾');await fly(rect,destination,cardMarkup(e.drawn));
        if(token!==roundToken)return;destination.style.visibility='visible';await pause(300);
      }else await exchangeAnimation(before,e,before.drawn,0,token);
    }else if(kind==='target'){
      const e=events.find(e=>['swap','shuffle','peek'].includes(e.type));
      if(e?.type==='swap')await swapAnimation(e,token,before);
      if(e?.type==='shuffle')await shuffleAnimation(e.actor,before,after,token,e);
      if(e?.type==='peek'){abilityFX(8,cardAt(e.actor,e.index));note('翻开这张牌','只有你能看到这张牌。');await flipCard(cardAt(e.actor,e.index),cardMarkup(after.hands[e.actor][e.index],true));await pause(400);}
    }else if(kind==='coverPeek'){
      const p=before.peeked;note('查看结束');if(!before.hands[p.actor][p.index].public)await flipCard(cardAt(p.actor,p.index),cardMarkup(null));await pause(200);
    }else if(kind==='ai'){
      const d=events.find(e=>e.type==='aiDraw');
      if(d){
        await drawAnimation(d.card,d.source,1,token);if(token!==roundToken)return;
        const e=events.find(e=>['exchange','multi','mistake'].includes(e.type));
        if(e)await exchangeAnimation(before,e,d.card,1,token);
        else{
          note('布丁展示弃牌','先翻开，再放入弃牌堆。');
          await moveToDiscard($('drawnCard').querySelector('.card'),d.card,token,d.source==='discard');
          if(token!==roundToken)return;
          const swap=events.find(e=>e.type==='swap'),shuffle=events.find(e=>e.type==='shuffle');
          if(swap)await swapAnimation(swap,token,before);
          if(shuffle)await shuffleAnimation(shuffle.actor,before,after,token,shuffle);
          const rotation=events.find(e=>e.type==='rotate');if(rotation)await rotateAnimation(before,token,rotation.step);
          if(events.some(e=>e.type==='aiPeek')){
            note('布丁使用偷看','它正在记住一张牌，牌面只对它可见。');
            abilityFX(8,cardAt(1,0));const h=$('aiHand');h.classList.add('ai-looking');await pause(1100);h.classList.remove('ai-looking');
          }
        }
      }
    }
  }catch(err){console.error('Card animation:',err);}
  finally{
    if(token===roundToken){busy=false;render(game.s,events);network?.flush();}
  }
}
function burst(target) {
  if (!target || reducedMotion) return; const r = target.getBoundingClientRect();
  for(let i=0;i<9;i++) {const s=document.createElement('span');s.className='fx-star';s.textContent=i%2?'✦':'✧';Object.assign(s.style,{left:r.left+r.width/2+'px',top:r.top+r.height/2+'px',fontSize:10+Math.random()*12+'px','--dx':Math.cos(i*7)*65+'px','--dy':Math.sin(i*7)*65+'px'});$('fxLayer').append(s);setTimeout(()=>s.remove(),900);}
}
function confetti() {
  if (reducedMotion) return;
  for(let i=0;i<35;i++){const p=document.createElement('span');p.className='confetti';Object.assign(p.style,{left:15+Math.random()*70+'vw',top:'0',background:['#9db786','#d9bd8d','#d5b6a2','#c0c9b0'][i%4],animationDelay:Math.random()*.5+'s'});$('fxLayer').append(p);setTimeout(()=>p.remove(),3500);}
}
function log(text) {
  const list = $('gameLog'); list.querySelector('.log-empty')?.remove();
  const li = document.createElement('li');li.textContent = text; list.prepend(li); while(list.children.length>50)list.lastElementChild.remove();list.scrollTop=0;
}
function renderHands(s) {
  const targetPhases=['peek','swapOwn','swapOther','shuffle'];
  s.hands.forEach((_,actor)=>{
    const hand = handFor(actor);
    hand.innerHTML = s.hands[actor].map((c,i)=>{
      const face = c.public || s.phase==='finished' || (s.phase==='memorize' && actor===0 && s.initialPeek.includes(i)) || (s.phase==='peekView' && s.peeked?.actor===actor && s.peeked?.index===i);
      let selectable = false;
      if(actor===0 && s.phase==='choose') selectable=true;
      if(actor===0&&s.phase==='memorize'&&(s.initialPeek?.length||0)<2&&!s.initialPeek.includes(i))selectable=true;
      if(targetPhases.includes(s.phase)) selectable = s.phase==='swapOwn' ? actor===0 : true;
      const selected = actor===0 && ((s.phase==='choose'&&s.selected.includes(i)) || (s.phase==='swapOther'&&s.swapIndex===i));
      const changed = previousHands[actor]?.[i]!==c.id;
      const flipping = !changed && (previousPhase==='memorize'&&s.phase!=='memorize' || s.phase==='peekView' || previousPhase==='peekView' || s.phase==='finished');
      return `<div class="hand-card ${previousPhase==='intro' || previousPhase==='finished' && s.phase==='memorize'?'dealt':''} ${flipping?'flipping':''}" style="--i:${i}" data-card-id="${c.id}">${cardMarkup(c,face,{button:true,actor,index:i,selectable,selected,reveal:face&&s.phase!=='finished'})}<span class="card-index">${String(i+1).padStart(2,'0')}</span></div>`;
    }).join('');
    hand.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
      if(busy)return; sound('tap');
      const a=+btn.dataset.actor,i=+btn.dataset.index;
      if(game.s.phase==='memorize')playTransition('remember',()=>game.remember(i));else if(game.s.phase==='choose')game.select(i);else playTransition('target',()=>game.target(a,i));
    }));
  });
  previousHands=s.hands.map(h=>h.map(c=>c.id));
}
function action(label, fn, style='primary', disabled=false) {
  const b=document.createElement('button');b.className=style;b.innerHTML=label;b.disabled=disabled;b.addEventListener('click',()=>{if(busy)return;sound('tap');fn();});$('actions').append(b);return b;
}
function renderPrompt(s) {
  $('actions').innerHTML='';
  const prompts={
    memorize:[(s.initialPeek?.length||0)===2?'记住位置，准备盖牌':(s.initialPeek?.length||0)===1?'再选一张牌':'选择两张牌记住','初始牌只展示给你 · '+(s.initialPeek?.length||0)+'/2'],
    draw:[s.caller!==null&&s.caller!==0?'最后一次行动，想好再出招':'轮到你啦，摸一张吧','点击摸牌堆，或拿走弃牌堆顶的明牌。'],
    choose:['这张牌，留下还是送走？','选中自己的手牌来交换；多选相同数字，即可一换多。'],
    peek:['偷偷看一眼','点击任意玩家的一张手牌。'],
    peekView:['这张牌：'+(s.hands[s.peeked?.actor]?.[s.peeked?.index]?.v??''),'仅你可见 · 记住后盖回'],
    shuffle:['让记忆重新洗牌','点击任意一方的手牌，将该方整手牌打乱顺序。'],
    rotateChoice:['选择传牌方向','所有人整手牌一起移动'],
    swapOwn:['先选自己的牌','选择一张自己想换走的手牌，牌面不会翻开。'],
    swapOther:['再选一位猫友的牌','点击任意其他玩家的一张手牌完成盲换。'],
    ai:[s.caller===0?'等待布丁的最后一步':'布丁正在思考…','留意它换走了哪些牌。'],
    lobby:['等待开局 · 2–5 人','房主可在至少两人加入后开始。'],
    waitingReady:['已完成记牌','等待其他玩家盖牌。'],
    waiting:[playerName(s.current)+'正在行动',s.caller!==null?'最后一轮 · 其余玩家各行动一次':'等待轮到你。'],
    finished:['这一局的秘密，全部揭晓','所有手牌已翻开，可以查看结算或继续下一局。']
  };
  const p=prompts[s.phase]||['一切就绪，等你开局','每局从 4 张手牌开始，手牌总和越小越好。'];
  $('promptTitle').textContent=game.isOnline?p[0].replaceAll('布丁','对方'):p[0];$('promptDesc').textContent=game.isOnline?p[1].replaceAll('布丁','对方'):p[1];
  if(s.phase==='memorize') action(`记住了，盖牌 ${icon('arrow')}`,()=>{sound('flip');playTransition('cover',()=>game.cover());},'primary',(s.initialPeek?.length||0)!==2);
  if(s.phase==='rotateChoice'){action('↻ 顺时针',()=>playTransition('rotate',()=>game.rotate('cw')));action('↺ 逆时针',()=>playTransition('rotate',()=>game.rotate('ccw')),'secondary');}
  if(s.phase==='choose'){
    action('直接弃牌',()=>playTransition('discard',()=>game.discard()),'subtle');
    if(CatGame.ability(s.drawn.v)!=='数字牌')action(`使用${CatGame.ability(s.drawn.v)==='乾坤大挪移'?'大挪移':CatGame.ability(s.drawn.v)}`,()=>playTransition('use',()=>game.use()),'secondary');
    action(s.selected.length>1?`一换 ${s.selected.length} 张`:'交换手牌',()=>playTransition('replace',()=>game.replace()),'primary',!s.selected.length);
  }
  if(s.phase==='peekView')action('记住了，盖回',()=>{clearTimeout(peekTimer);sound('flip');playTransition('coverPeek',()=>game.closePeek());});
  if(s.phase==='swapOther')action('重选自己的牌',()=>{game.s.phase='swapOwn';game.emit();},'secondary');
  if(s.phase==='ai'){ const b=action('布丁思考中 ···',()=>{},'secondary',true);b.setAttribute('aria-live','polite'); }
  if(s.phase==='finished'){
    action('查看结算',()=>openDialog('resultDialog'),'secondary');
    const waiting=game.isOnline&&s.nextReady?.[0];
    action(waiting?'等待其他玩家准备':s.result.matchOver?'新的一场':`第 ${game.round+1} 局 ${icon('arrow')}`,()=>startRound(s.result.matchOver),'primary',waiting);
  }
}
function render(s,events=[]) {
  if(parent!==window)parent.postMessage({type:'3dalab-game-activity',playing:!['intro','lobby','finished'].includes(s.phase)},location.origin);
  document.body.dataset.phase=s.phase;prepareSeats(s);document.body.classList.toggle('room-waiting',s.phase==='lobby');
  const intro=s.phase==='intro', lobby=s.phase==='lobby', final=s.phase==='finished';
  if(final)showResult();
  document.querySelector('.game-table').classList.toggle('intro-muted',intro||lobby);
  document.querySelector('.game-table').classList.toggle('finished-table',final);
  document.body.classList.toggle('ability-active',['peek','peekView','swapOwn','swapOther','shuffle'].includes(s.phase));
  $('welcomeCard').style.display=intro||lobby?'flex':'none';
  $('startLobby').hidden=!intro;$('roomLobby').hidden=!lobby;
  if(!intro&&!lobby)renderHands(s);
  $('discardCard').innerHTML=s.discard.length?cardMarkup(s.discard.at(-1),true):'';
  $('deckCount').textContent=s.deck.length;
  const deckCard=$('deckBtn').querySelector('.card'),deckTemplate=document.createElement('template');deckTemplate.innerHTML=cardMarkup(s.deckTop);deckCard.className=deckTemplate.content.firstElementChild.className+' pile-card';deckCard.innerHTML=deckTemplate.content.firstElementChild.innerHTML;
  $('deckBtn').disabled=s.phase!=='draw'||busy||(!s.deck.length&&s.discard.length<=1);
  $('discardBtn').disabled=s.phase!=='draw'||busy||!s.discard.length;
  $('drawnTray').hidden=!s.drawn;$('drawnTray').dataset.actor=s.current;
  if(s.drawn){const own=s.current===0;$('drawnTray').querySelector('.tray-label').textContent=own?'你摸到的牌':'对方摸到的牌';$('drawnCard').innerHTML=cardMarkup(s.drawn,own||s.drawn.public);$('drawnHint').textContent=own?(CatGame.ability(s.drawn.v)==='数字牌'?'数字牌':CatGame.ability(s.drawn.v)):'';}
  $('roundPill').textContent=intro||lobby?'准备开桌':`第 ${String(game.round).padStart(2,'0')} 局`;
  $('tableStatus').innerHTML=`<i></i> ${intro?'等待开始':s.phase==='memorize'?'准备阶段 · 记住两张':final?'本局已结束':s.current===0?'你的行动时间':'布丁的行动时间'}`;
  $('thinking').classList.toggle('active',s.phase==='ai');
  $('aiStatus').textContent=lobby?'等待加入':intro?'人机对手':s.phase==='ai'?'思考中…':final?`手牌合计 ${s.result.sums[1]} 分`:`${s.hands[1].length} 张手牌`;
  $('playerStatus').textContent=(final?`手牌合计 ${s.result.sums[0]} 分`:intro?'玩家':lobby?'等待发牌':`${s.hands[0].length} 张手牌`)+(s.multipliers?.[0]>1?' · ×'+s.multipliers[0].toFixed(1):'');
  $('handTip').textContent=s.phase==='memorize'?'两张小秘密，要记住哦':s.phase==='choose'?'可多选相同数字的牌':final?'本局手牌已全部翻开':'盖住的牌，靠记忆找回来';
  $('yourScore').innerHTML=`${game.scores[0]}<small>分</small>`;$('aiScore').innerHTML=`${game.scores[1]}<small>分</small>`;
  const count=s.hands.length||2,laps=Math.floor(s.turns/count), unlocked=game.canCall()||s.caller!==null;
  $('turnIndex').textContent=intro||lobby?'准备':s.phase==='memorize'?'记牌':final?'结束':`第 ${laps+1} 回合`;
  $('progressPaws').innerHTML=Array.from({length:5},(_,i)=>`${i?'<span class="progress-line"></span>':''}${icon('paw',laps>i?'filled':'')}`).join('');
  $('catwinBtn').disabled=!(s.phase==='draw'&&game.canCall())||busy;
  $('catwinHint').textContent=s.caller!==null?'已喊出 · 最后一次行动':unlocked?(s.current===0?'摸牌前可喊出':'等待你的回合'):`还需 ${5-laps} 个完整回合`;
  if(intro)$('catwinHint').textContent='第 5 回合后解锁';
  $('turnTitle').textContent=s.caller!==null?'最后一次，小心出牌':unlocked?'相信自己的记忆吗？':'先记住，再出招';
  $('turnNote').innerHTML=s.caller!==null?`${playerName(s.caller)}喊出 <b>CATWIN</b>。<br>${game.isOnline?'还剩 '+s.finalPending.length+' 位玩家行动':'对方再行动一次'}。`:unlocked?'成功 CATWIN：局内 0 分，通用积分 +10 × 个人倍率。':'每人各行动 5 次后可喊 CATWIN。';
  if(game.isOnline)$('turnNote').innerHTML=$('turnNote').innerHTML.replaceAll('布丁','对方');
  if(final){$('turnTitle').textContent='本局已结束';$('turnNote').textContent='本局已结算。';$('catwinHint').textContent='本局已结束';}
  $('actionDock').classList.toggle('final-turn',s.caller!==null&&!final);
  renderPrompt(s);
  events.forEach(e=>{if(e.text)log(e.text);handleEvent(e);});
  if(!game.isOnline&&s.phase==='ai'&&!aiTimer){const token=roundToken;aiTimer=setTimeout(()=>{aiTimer=null;if(token===roundToken)playTransition('ai',()=>game.aiStep());},650);}
  if(s.phase==='peekView'&&previousPhase!=='peekView'){const token=roundToken;peekTimer=setTimeout(()=>{if(token===roundToken&&game.s.phase==='peekView')playTransition('coverPeek',()=>game.closePeek());},6500);}
  previousPhase=s.phase;
  if(game.isOnline&&final){const wait=!!s.nextReady?.[0];$('nextRoundBtn').disabled=wait;if(wait)$('nextRoundBtn').textContent='等待其他玩家准备';}
  else $('nextRoundBtn').disabled=false;
  if(game.isOnline){$('tableStatus').innerHTML=`<i></i> ${lobby?'等待加入':s.phase==='memorize'?'记牌阶段':s.phase==='waitingReady'?'等待其他玩家记牌':final?'本局已结束':playerName(s.current)+'的行动时间'}`;}
  renderSeatInfo(s);updateConnectionUI();stage?.syncDOM();
}
function handleEvent(e){
  if(['pair','triple'].includes(e.type)){stage?.effect(e.type,handFor(e.actor)?.querySelector('.card'));stage?.banner(e.type,'累计 ×'+e.multiplier.toFixed(1));}
  if(e.type==='gamble'){stage?.effect('gamble',handFor(e.actor)?.querySelector('.card'));stage?.banner('gamble','累计 ×'+e.multiplier.toFixed(1));}
  if(e.type==='special1213'){stage?.effect('1213');stage?.banner('1213');}
  if(e.type==="multi"){stage?.effect(0);stage?.banner("multi");}
  if(e.type==="call"){stage?.effect(0);stage?.banner("catwin");}
  if(e.type==='draw')sound('draw');
  if(e.type==='peek'){sound('flip');burst(cardAt(e.actor,e.index));}
  if(['swap','rotate','shuffle'].includes(e.type))sound('swap');
  if(e.type==='multi'){burst(handFor(e.actor));toast('一换多成功！小猫记忆力 +1');sound('swap');}
  if(e.type==='mistake'){toast(e.text,4500);sound('mistake');}
  if(e.type==='call'){toast(e.text,4800);sound('call');burst($('catwinBtn'));}
  if(e.type==='aiPeek')sound('flip');
  if(e.type==='finish'){
    showResult();sound('finish');const token=roundToken;setTimeout(()=>{if(token===roundToken&&game.s.phase==='finished'){openDialog('resultDialog');if(game.s.result.winner===0)confetti();}},550/animationSpeed);
  }
}
async function startRound(reset=false){
  if(game.isOnline)return playTransition('next',()=>game.start(reset));
  roundToken++;const token=roundToken;clearTimeout(aiTimer);clearTimeout(peekTimer);aiTimer=null;busy=true;
  $('resultDialog').close();$('confirmDialog').close();
  document.getAnimations().forEach(a=>a.cancel());$('fxLayer').innerHTML='';capturing=false;captured=null;
  if(reset){$('gameLog').innerHTML='';$('yourDelta').textContent='';$('aiDelta').textContent='';}
  game.difficulty='smart'; previousHands=[[],[]];previousPhase='intro';game.start(reset);lockControls();sound('draw');
  await dealCurrentHand(token);
  if(token!==roundToken)return;busy=false;render(game.s);
}
async function dealCurrentHand(token){
  if(game.s.phase==='finished')return;
  note('正在发牌','每人四张，依次发到手牌区。');
  const cards=[0,1,2,3].flatMap(i=>game.s.hands.map((h,a)=>cardAt(a,i))).filter(Boolean),source=$('deckBtn').querySelector('.card');
  cards.forEach(el=>{el.style.visibility='hidden';});
  await Promise.all(cards.map(async(el,i)=>{
    await pause(i*65);if(token!==roundToken)return;
    await fly(source,el,cardMarkup(null),380,i%2?6:-6);
    if(token!==roundToken)return;
    el.className='card card-back';el.innerHTML=cardMarkup(null).replace(/^<span[^>]*>|<\/span>$/g,'');el.style.visibility='visible';
  }));
  if(token!==roundToken)return;
  note('选择两张牌记住','点击你想查看的牌。');await pause(100);
  await Promise.all(game.s.initialPeek.map(i=>flipCard(cardAt(0,i),cardMarkup(game.s.hands[0][i],true))));
}
function showResult(){
  const r=game.s.result,winners=r.winners|| (r.winner<0?[0,1]:[r.winner]);
  $('resultEyebrow').textContent=r.matchOver?'整场结束':'第 '+game.round+' 局结算';
  $('resultTitle').textContent=winners.length>1?winners.map(playerName).join('、')+'并列获胜':playerName(winners[0])+'赢得了'+(r.matchOver?'整场':'本局');
  $('resultSubtitle').textContent=r.special>=0?'1213 即刻结算 · 按每人手牌总和计分':r.caller!==null?playerName(r.caller)+(r.callSuccess?' CATWIN 成功':' CATWIN 失败，局内额外 +10 分'):'';
  $('resultHands').innerHTML=game.s.hands.map((h,i)=>'<div class="result-hand-row"><span>'+playerName(i)+'</span>'+h.map(c=>'<span class="result-mini-card">'+c.v+'</span>').join('')+'<strong>合计 '+r.sums[i]+'</strong></div>').join('');
  $('resultScores').innerHTML=r.points.map((p,i)=>'<div class="result-score"><span>'+playerName(i)+' · 局内分数</span><b>+'+p+'</b><small>'+(r.notes[i]||'按手牌总和计分')+'</small><span class="total">局内累计 '+r.scores[i]+' 分</span><span class="reward-delta '+(r.rewardDeltas[i]>0?'positive':r.rewardDeltas[i]<0?'negative':'')+'">通用积分 '+(r.rewardDeltas[i]>0?'+':'')+r.rewardDeltas[i]+'</span><small>个人奖励倍率 ×'+r.rewardMultipliers[i].toFixed(1)+'</small></div>').join('');
  $('nextRoundBtn').innerHTML=r.matchOver?'再开一场 '+icon('arrow'):'再来一局 '+icon('arrow');
}
function openDialog(id){const d=$(id);if(!d.open)d.showModal();}
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
$('rulesBtn').addEventListener('click',()=>openDialog('rulesDialog'));
$('startBtn').addEventListener('click',()=>connectRoom('practice'));
$('nextRoundBtn').addEventListener('click',()=>startRound(game.s.result.matchOver));
$('resetBtn').addEventListener('click',()=>{if(game.s.phase==='intro')connectRoom('practice');else openDialog('confirmDialog');});
$('confirmResetBtn').addEventListener('click',()=>{if(network)network.leave();else showHome();});
$('catwinBtn').addEventListener('click',()=>{if(!busy)playTransition('call',()=>game.call());});
function takeCard(source){if(!busy&&game.s.phase==='draw')playTransition('draw',()=>game.draw(source));}
$('deckBtn').addEventListener('click',()=>takeCard('deck'));
$('discardBtn').addEventListener('click',()=>takeCard('discard'));
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();if(game.s.phase!=='intro')openDialog('confirmDialog');});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&game.s.phase==='peekView'&&!busy){clearTimeout(peekTimer);playTransition('coverPeek',()=>game.closePeek());}});
// A calm, deliberately covered table before the player starts.
for(const [id,actor]of [['playerHand',0],['aiHand',1]])$(id).innerHTML=[0,1,2,3].map(i=>`<div class="hand-card" style="--i:${i}">${cardMarkup(null,false)}<span class="card-index">${String(i+1).padStart(2,'0')}</span></div>`).join('');
function gameListener(s,events){if(capturing)captured={s,events};else render(s,events);}
game.on(gameListener);render(game.s);
$('speedBtn').textContent=animationSpeed+'×';$('speedBtn').setAttribute('aria-pressed',String(animationSpeed===2));$('speedBtn').title=animationSpeed===2?'动画 2 倍速，点击恢复':'动画 1 倍速，点击加速';
$('speedBtn').addEventListener('click',()=>{animationSpeed=animationSpeed===1?2:1;$('speedBtn').textContent=animationSpeed+'×';$('speedBtn').setAttribute('aria-pressed',String(animationSpeed===2));$('speedBtn').title=animationSpeed===2?'动画 2 倍速，点击恢复':'动画 1 倍速，点击加速';document.documentElement.style.setProperty('--motion-speed',animationSpeed);document.getAnimations().forEach(a=>a.updatePlaybackRate(animationSpeed));try{localStorage.setItem('cat-animation-speed',String(animationSpeed));}catch(_){};});
document.addEventListener('animationstart',event=>event.target.getAnimations().forEach(a=>a.updatePlaybackRate(animationSpeed)));

if(stage){stage.speed=animationSpeed;$("speedBtn").addEventListener("click",()=>stage.speed=animationSpeed);stage.syncDOM();}

connectHost(async()=>{if(network)await network.leave();});
