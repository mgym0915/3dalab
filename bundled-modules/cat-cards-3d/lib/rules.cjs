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
