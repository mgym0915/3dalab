const crypto = require('node:crypto');
const CatGame = require('./local-game.cjs');
const fail = message => { throw Object.assign(new Error(message), {status:409}); };

// The authoritative game remains on the server. Views use position IDs, never hidden card IDs.
class RoomGame extends CatGame {
  constructor() { super({rng:()=>crypto.randomInt(0, 0x100000000)/0x100000000}); this.ready=[false,false]; this.nextReady=[false,false]; }
  start(reset=false) {
    this.scoreBase=reset?[0,0]:[...this.scores];this.settlementId=crypto.randomUUID();
    this.listeners=[]; super.start(reset);
    this.initialPeeks=[this.s.initialPeek, this.shuffle([0,1,2,3]).slice(0,2)];
    this.s.phase='memorize'; this.ready=[false,false]; this.nextReady=[false,false];
  }
  end(events=[]) {
    this.s.turns++; this.s.selected=[]; this.s.peeked=null;
    if(this.s.caller!==null && this.s.current!==this.s.caller) {super.finish([]);events.push({type:'finish'});}
    else {this.s.current=1-this.s.current;this.s.phase='draw';}
    return events;
  }
  act(seat,input) {
    const s=this.s, action=input.action;
    if(action==='next') {
      if(s.phase!=='finished')fail('本局尚未结束');
      this.nextReady[seat]=true;
      if(this.nextReady.every(Boolean)){this.start(s.result.matchOver);return [{type:'deal'}];}
      return [{type:'next',actor:seat}];
    }
    if(action==='cover') {
      if(s.phase!=='memorize'||this.ready[seat])fail('已完成记牌');
      this.ready[seat]=true;
      if(this.ready.every(Boolean))s.phase='draw';
      return [{type:'cover',actor:seat}];
    }
    if(s.phase==='memorize'||s.phase==='finished'||s.current!==seat)fail('还没轮到你');
    if(action==='draw'){
      if(s.phase!=='draw'||!['deck','discard'].includes(input.source))fail('现在不能摸牌');
      const card=this.take(input.source);if(!card)fail('这个牌堆是空的');
      s.drawn=card;s.source=input.source;s.phase='choose';
      return [{type:'draw',actor:seat,source:input.source,card:{...card}}];
    }
    if(action==='replace'){
      if(s.phase!=='choose')fail('请先摸牌');
      const ids=input.indices;
      if(!Array.isArray(ids)||!ids.length||ids.length>s.hands[seat].length||ids.some(i=>!Number.isInteger(i)||i<0||!s.hands[seat][i])||new Set(ids).size!==ids.length)fail('请选择有效的手牌');
      const selected=[...ids].sort((a,b)=>a-b), cards=selected.map(i=>({...s.hands[seat][i]})), drawn={...s.drawn};
      const e=this.exchange(seat,selected,s.drawn);s.drawn=null;
      return this.end([{...e,actor:seat,indices:selected,cards,drawn}]);
    }
    if(action==='discard'||action==='use'){
      if(s.phase!=='choose')fail('请先摸牌');
      const card={...s.drawn},v=card.v;
      if(action==='use'&&![0,5,8,9,10,11,12].includes(v))fail('这张牌没有能力');
      s.discard.push(s.drawn);s.drawn=null;
      if(action==='discard')return this.end([{type:'discard',actor:seat,card}]);
      const events=[{type:'ability',actor:seat,card}];
      if(v===0){[s.hands[0],s.hands[1]]=[s.hands[1],s.hands[0]];return this.end([...events,{type:'rotate',actor:seat}]);}
      s.phase=[8,9,10].includes(v)?'peek':v===5?'shuffle':'swapOwn';
      return events;
    }
    if(action==='target'){
      const target=input.actor===0?seat:input.actor===1?1-seat:-1,index=input.index;
      if(target<0||!Number.isInteger(index)||index<0||!s.hands[target][index])fail('请选择有效的手牌');
      if(s.phase==='peek'){s.peeked={actor:target,index};s.phase='peekView';return [{type:'peek',actor:target,by:seat,index}];}
      if(s.phase==='shuffle'){this.shuffle(s.hands[target]);return this.end([{type:'shuffle',actor:target,by:seat}]);}
      if(['swapOwn','swapOther'].includes(s.phase)&&target===seat){s.swapIndex=index;s.phase='swapOther';return [{type:'swapSelect',actor:seat}];}
      if(s.phase==='swapOther'&&target!==seat){const a=s.swapIndex;[s.hands[seat][a],s.hands[target][index]]=[s.hands[target][index],s.hands[seat][a]];return this.end([{type:'swap',actor:seat,a,b:index}]);}
      fail('现在不能选择这张牌');
    }
    if(action==='closePeek'){
      if(s.phase!=='peekView')fail('没有正在查看的牌');return this.end([{type:'coverPeek',actor:seat}]);
    }
    if(action==='call'){
      if(s.phase!=='draw'||!this.canCall())fail('双方各行动五次后，在摸牌前喊 CATWIN');
      s.caller=seat;return this.end([{type:'call',actor:seat}]);
    }
    fail('无效操作');
  }
  view(seat) {
    const s=this.s,other=1-seat,order=[seat,other];
    const hands=order.map((p,local)=>s.hands[p].map((c,i)=>{
      const visible=s.phase==='finished'||(s.phase==='memorize'&&p===seat&&!this.ready[seat]&&this.initialPeeks[seat].includes(i))||(s.phase==='peekView'&&s.current===seat&&s.peeked?.actor===p&&s.peeked.index===i);
      return {id:`${this.round}:p${local}:${i}`,v:visible?c.v:null};
    }));
    let phase=s.phase;
    if(phase==='memorize'&&this.ready[seat])phase='waitingReady';
    else if(phase!=='memorize'&&phase!=='finished'&&s.current!==seat)phase='waiting';
    const result=s.result?{...s.result,sums:order.map(i=>s.result.sums[i]),points:order.map(i=>s.result.points[i]),notes:order.map(i=>s.result.notes[i]),scores:order.map(i=>this.scores[i]),winner:s.result.winner<0?-1:s.result.winner===seat?0:1,caller:s.result.caller===null?null:s.result.caller===seat?0:1,special:s.result.special<0?-1:s.result.special===seat?0:1}:null;
    return {phase,remotePhase:s.phase,hands,deck:Array.from({length:s.deck.length},(_,i)=>({id:`deck:${i}`,v:null})),discard:s.discard.map((c,i)=>({id:`discard:${i}`,v:c.v})),turns:s.turns,current:s.current===seat?0:1,caller:s.caller===null?null:s.caller===seat?0:1,
      drawn:s.drawn?{id:`drawn:${this.round}:${s.turns}`,v:s.current===seat?s.drawn.v:null}:null,source:s.source,selected:[],initialPeek:s.phase==='memorize'&&!this.ready[seat]?this.initialPeeks[seat]:[],
      peeked:s.phase==='peekView'&&s.current===seat?{actor:s.peeked.actor===seat?0:1,index:s.peeked.index}:null,swapIndex:s.current===seat?s.swapIndex:undefined,result,
      ready:order.map(i=>this.ready[i]),nextReady:order.map(i=>this.nextReady[i])};
  }
  eventsFor(events,seat){
    const local=p=>p===seat?0:1,who=p=>p===seat?'你':'对方';
    return events.map(e=>{
      const x={...e};delete x.text;
      if(e.actor!==undefined)x.actor=local(e.actor);
      if(e.by!==undefined)x.by=local(e.by);
      // Drawn values are sent only to their owner until publicly discarded.
      if(e.type==='draw'&&e.actor!==seat&&e.source==='deck')x.card={v:null};
      if(e.drawn)x.drawn={v:e.actor===seat?e.drawn.v:null};
      if(e.card)x.card={v:x.card.v};
      if(e.cards)x.cards=e.cards.map(c=>({v:c.v}));
      if(e.type==='swap'){x.own=e.actor===seat?e.a:e.b;x.other=e.actor===seat?e.b:e.a;delete x.a;delete x.b;}
      const text={deal:`第 ${this.round} 局开始。`,cover:`${who(e.actor)}完成记牌。`,draw:`${who(e.actor)}从${e.source==='deck'?'摸牌堆':'弃牌堆'}摸了一张。`,discard:`${who(e.actor)}弃掉了 ${e.card?.v}。`,ability:`${who(e.actor)}使用 ${e.card?.v} · ${CatGame.ability(e.card?.v)}。`,exchange:`${who(e.actor)}换出 ${e.cards?.map(c=>c.v).join('、')}。`,multi:`${who(e.actor)}一换多：${e.cards?.map(c=>c.v).join('、')}。`,mistake:`${who(e.actor)}一换多记错了，摸到的牌加入手牌。`,peek:`${who(e.by)}查看了${e.actor===seat?'你':'对方'}的第 ${e.index+1} 张。`,shuffle:`${who(e.by)}打乱了${e.actor===seat?'你':'对方'}的手牌。`,swap:`双方盲换：你的第 ${x.own+1} 张 ↔ 对方第 ${x.other+1} 张。`,rotate:'双方整手牌交换。',call:`${who(e.actor)}喊出 CATWIN，对方再行动一次。`,finish:'本局结束。',next:`${who(e.actor)}已准备下一局。`};
      x.text=text[e.type];return x;
    });
  }
}
module.exports=RoomGame;
