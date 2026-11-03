import crypto from 'node:crypto';
const fault=message=>{throw Object.assign(Error(message),{status:409});};
export function combinations(cards){
 if(!Array.isArray(cards)||!cards.length)return[];const n=cards.length,wild=cards.filter(c=>c.r>=16).length,real=cards.filter(c=>c.r<16),out=[];const add=(kind,rank,length,power=0,multiplier=1)=>out.push({kind,rank,length,count:n,power,multiplier,key:[kind,rank,length].join(':')});
 if(n===2&&wild===2)add('rocket',18,1,3,4);
 if(n===1&&wild===0)add('single',real[0].r,1);
 if(real.length&&real.every(c=>c.r===real[0].r)){
  if(n===2)add('pair',real[0].r,1);
  if(n===3)add('tripleBomb',real[0].r,1,1,2);
  if(n===4)add('fourBomb',real[0].r,1,2,4);
 }
 if(real.length&&real.every(c=>c.r<15)){
  if(n>=3&&n<=12){for(let start=3;start+n-1<=14;start++){const counts=new Map();for(const c of real)counts.set(c.r,(counts.get(c.r)||0)+1);if([...counts].every(([r,c])=>r>=start&&r<start+n&&c===1))add('straight',start,n);}}
  if(n>=4&&n%2===0){const len=n/2;for(let start=3;start+len-1<=14;start++){const counts=new Map();for(const c of real)counts.set(c.r,(counts.get(c.r)||0)+1);if([...counts].every(([r,c])=>r>=start&&r<start+len&&c<=2))add('pairs',start,len);}}
 }
 return out;
}
export function beats(next,previous){if(!previous)return true;if(next.power){if(!previous.power)return true;return next.power>previous.power||(next.power===previous.power&&next.rank>previous.rank);}if(previous.power||next.kind!==previous.kind||next.count!==previous.count)return false;if(['single','pair'].includes(next.kind)&&next.rank===15&&previous.rank<15)return true;return next.rank<15&&next.rank===previous.rank+1;}
export function scoreHands(hands,winner,bombMultiplier){return hands.map((h,i)=>i===winner?0:-10*h.length*bombMultiplier*(h.length===5?2:1)).map((v,i,a)=>i===winner?-a.reduce((n,x)=>n+x,0):v);}
function chooseGroups(hand,max=4){const result=[];function walk(start,picked,n){if(picked.length===n){result.push([...picked]);return;}for(let i=start;i<hand.length;i++){picked.push(hand[i]);walk(i+1,picked,n);picked.pop();}}for(let n=1;n<=Math.min(max,hand.length);n++)walk(0,[],n);return result;}
export class Game{
 constructor(count,{rng,deck,first=0}={}){if(!Number.isInteger(count)||count<2||count>4)throw Error('人数应为2–4人');this.count=count;this.matchId=crypto.randomUUID();this.deck=deck?[...deck]:Array.from({length:54},(_,id)=>({id,r:id<52?3+Math.floor(id/4):16+(id-52),suit:id<52?id%4:4}));if(!deck){for(let i=this.deck.length-1;i>0;i--){const j=rng?Math.floor(rng()*(i+1)):crypto.randomInt(0,i+1);[this.deck[i],this.deck[j]]=[this.deck[j],this.deck[i]];}}
 this.hands=Array.from({length:count},()=>[]);for(let j=0;j<5;j++)for(let i=0;i<count;i++)this.hands[i].push(this.deck.pop());this.hands[first].push(this.deck.pop());this.turn=first;this.dealer=first;this.leader=first;this.previous=null;this.passes=0;this.bombMultiplier=1;this.phase='playing';this.winner=null;this.scores=null;this.seq=1;this.last={type:'deal'};this.history=[];this.onlyKingAt=Array(count).fill(null);}
 moves(seat=this.turn){if(this.phase!=='playing')return[];const hand=this.hands[seat],groups=chooseGroups(hand);for(let n=5;n<=Math.min(12,hand.length);n++){const sorted=[...hand].sort((a,b)=>a.r-b.r);for(let start=0;start+n<=sorted.length;start++)groups.push(sorted.slice(start,start+n));}
 const out=[];for(const cards of groups){const combo=combinations(cards).filter(c=>beats(c,this.previous)).sort((a,b)=>a.power-b.power||a.rank-b.rank)[0];if(combo)out.push({ids:cards.map(c=>c.id),combo});}return out.sort((a,b)=>a.combo.power-b.combo.power||b.ids.length-a.ids.length||a.combo.rank-b.combo.rank);}
 act(seat,input){if(this.phase!=='playing')fault('本局已结束');if(seat!==this.turn)fault('还没轮到你');if(input.action==='pass'){
  if(!this.previous){if(this.moves().length)fault('首家有可出牌时不能过');this.last={type:'pass',actor:seat};this.turn=(this.turn+1)%this.count;this.leader=this.turn;}
  else{this.passes++;this.last={type:'pass',actor:seat};if(this.passes>=this.count-1){const owner=this.leader;if(this.deck.length){this.hands[owner].push(this.deck.pop());this.last={type:'refill',actor:owner};}else this.last={type:'new-trick',actor:owner};this.turn=owner;this.previous=null;this.passes=0;}else this.turn=(this.turn+1)%this.count;}
 }else if(input.action==='play'){
  if(!Array.isArray(input.ids)||!input.ids.length||input.ids.length>this.hands[seat].length||new Set(input.ids).size!==input.ids.length)fault('请选择有效手牌');const cards=input.ids.map(id=>this.hands[seat].find(c=>c.id===id));if(cards.some(c=>!c))fault('手牌不存在');const choices=combinations(cards).filter(c=>beats(c,this.previous));const combo=input.declaration?choices.find(c=>c.key===input.declaration):choices.sort((a,b)=>a.power-b.power||a.rank-b.rank)[0];if(!combo)fault('此牌型不能接当前出牌');
  this.hands[seat]=this.hands[seat].filter(c=>!input.ids.includes(c.id));this.previous={...combo,cards,actor:seat};this.leader=seat;this.passes=0;this.bombMultiplier=Math.max(this.bombMultiplier,combo.multiplier);this.last={type:'play',actor:seat,cards,combo};
  if(!this.hands[seat].length){this.phase='finished';this.winner=seat;this.scores=scoreHands(this.hands,seat,this.bombMultiplier);this.last={type:'finish',actor:seat,cards,combo};}else this.turn=(this.turn+1)%this.count;
  }else fault('无效操作');
 for(let i=0;i<this.count;i++)if(this.hands[i].length===1&&this.hands[i][0].r>=16&&this.onlyKingAt[i]===null)this.onlyKingAt[i]=this.seq;
 if(this.phase==='playing'&&!this.deck.length&&this.hands.every(h=>h.length===1&&h[0].r>=16)){const winner=this.onlyKingAt.reduce((a,v,i)=>v<this.onlyKingAt[a]?i:a,0);this.phase='finished';this.winner=winner;this.scores=scoreHands(this.hands,winner,this.bombMultiplier);this.last={type:'king-standoff',actor:winner};}
 this.seq++;this.history.push(this.last);return this.last;}
 view(seat){return{phase:this.phase,turn:this.turn,dealer:this.dealer,leader:this.leader,previous:this.previous,passes:this.passes,bombMultiplier:this.bombMultiplier,deckCount:this.deck.length,hands:this.hands.map((h,i)=>i===seat||this.phase==='finished'?h:h.map((_,n)=>({hidden:true,index:n}))),counts:this.hands.map(h=>h.length),alarm:this.hands.map(h=>h.length===1),winner:this.winner,scores:this.scores,last:this.last,matchId:this.matchId};}
}
