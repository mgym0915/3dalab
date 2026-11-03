/* 猫猫牌 · pure local game engine. No DOM or hidden-information AI shortcuts. */
class CatGame {
  constructor(options = {}) {
    this.rng = options.rng || Math.random;
    this.difficulty = options.difficulty || 'smart';
    this.scores = [0, 0]; this.round = 0; this.listeners = [];
    this.s = { phase: 'intro', hands: [[], []], deck: [], discard: [], turns: 0, current: 0, caller: null };
  }
  on(fn) { this.listeners.push(fn); }
  emit(events = []) { this.listeners.forEach(fn => fn(this.s, events)); }
  shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(this.rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  start(reset = false) {
    if (reset) { this.scores = [0, 0]; this.round = 0; }
    this.round++;
    let id = 0; const deck = [];
    for (let v = 0; v <= 13; v++) for (let n = 0; n < (v === 0 ? 2 : 4); n++) deck.push({ id: ++id, v });
    this.shuffle(deck);
    const hands = [deck.splice(0, 4), deck.splice(0, 4)];
    this.memory = {};
    this.shuffle([0, 1, 2, 3]).slice(0, 2).forEach(i => this.memory[hands[1][i].id] = hands[1][i].v);
    this.s = { phase: 'memorize', hands, deck, discard: [deck.pop()], turns: 0, current: (this.round - 1) % 2,
      caller: null, drawn: null, selected: [], initialPeek: this.shuffle([0, 1, 2, 3]).slice(0, 2), peeked: null, result: null };
    this.emit([{ type: 'deal', text: `第 ${this.round} 局，给每位猫友发了 4 张牌。` }]);
  }
  cover() {
    if (this.s.phase !== 'memorize') return false;
    this.s.initialPeek = []; this.s.phase = this.s.current === 0 ? 'draw' : 'ai';
    this.emit([{ type: 'turn', text: this.s.current === 0 ? '你先来，从任意牌堆摸一张吧。' : '这一局，布丁先行动。' }]); return true;
  }
  canCall() { return this.s.turns >= 10 && this.s.caller === null; }
  take(source) {
    const s = this.s;
    if (source === 'deck') {
      if (!s.deck.length && s.discard.length > 1) {
        const top = s.discard.pop(); s.deck = this.shuffle(s.discard.splice(0)); s.discard = [top];
      }
      return s.deck.pop() || null;
    }
    return s.discard.pop() || null;
  }
  draw(source) {
    const s = this.s;
    if (s.current !== 0 || s.phase !== 'draw' || !['deck', 'discard'].includes(source)) return false;
    const card = this.take(source); if (!card) return false;
    s.drawn = card; s.source = source; s.selected = []; s.phase = 'choose';
    this.emit([{ type: 'draw', source, text: source === 'deck' ? '你从摸牌堆摸了一张牌。' : `你拿走了弃牌堆的 ${card.v}。` }]); return true;
  }
  select(index) {
    const s = this.s;
    if (s.phase !== 'choose' || !s.hands[0][index]) return false;
    const j = s.selected.indexOf(index); if (j < 0) s.selected.push(index); else s.selected.splice(j, 1);
    this.emit(); return true;
  }
  exchange(actor, indices, card) {
    const s = this.s, hand = s.hands[actor];
    indices = [...new Set(indices)].sort((a,b) => a-b);
    if (!indices.length || indices.some(i => !hand[i])) return null;
    const removed = indices.map(i => hand[i]);
    if (removed.some(c => c.v !== removed[0].v)) {
      hand.push(card); if (actor === 1) this.memory[card.id] = card.v;
      return { type: 'mistake', actor, text: `${actor === 0 ? '你' : '布丁'}的一换多记错了，原牌保留，摸到的 ${card.v} 加入手牌。` };
    }
    const first = indices[0];
    s.hands[actor] = hand.flatMap((c,i) => i === first ? [card] : indices.includes(i) ? [] : [c]);
    s.discard.push(...removed);
    removed.forEach(c => this.memory[c.id] = c.v);
    if (actor === 1) this.memory[card.id] = card.v;
    return { type: indices.length > 1 ? 'multi' : 'exchange', actor, indices, values: removed.map(c=>c.v), text: `${actor === 0 ? '你' : '布丁'}${indices.length > 1 ? '一换多！' : '换出'} ${removed.map(c=>c.v).join('、')}${actor === 0 ? `，换入 ${card.v}` : ''}。` };
  }
  replace() {
    const s = this.s; if (s.phase !== 'choose' || !s.selected.length) return false;
    const ev = this.exchange(0, s.selected, s.drawn); if (!ev) return false;
    s.drawn = null; s.selected = []; this.endTurn([ev]); return true;
  }
  discard() {
    const s = this.s; if (s.phase !== 'choose') return false;
    const c = s.drawn; s.discard.push(c); s.drawn = null; s.selected = [];
    this.endTurn([{ type: 'discard', actor: 0, text: `你弃掉了 ${c.v}。` }]); return true;
  }
  use() {
    const s = this.s; if (s.phase !== 'choose') return false;
    const v = s.drawn.v;
    if (![0,5,8,9,10,11,12].includes(v)) return false;
    s.discard.push(s.drawn); s.drawn = null; s.selected = [];
    if ([8,9,10].includes(v)) s.phase = 'peek';
    else if (v === 5) s.phase = 'shuffle';
    else if ([11,12].includes(v)) s.phase = 'swapOwn';
    else {
      [s.hands[0], s.hands[1]] = [s.hands[1], s.hands[0]];
      this.endTurn([{ type: 'rotate', actor: 0, text: '你打出 0 · 乾坤大挪移，双方整手牌互换！' }]); return true;
    }
    this.emit([{ type: 'ability', text: `你打出 ${v} · ${CatGame.ability(v)}。` }]); return true;
  }
  target(actor, index) {
    const s = this.s; if (![0,1].includes(actor) || !s.hands[actor][index]) return false;
    if (s.phase === 'peek') {
      s.peeked = { actor, index }; s.phase = 'peekView';
      this.emit([{ type: 'peek', actor, index, text: `你偷看了${actor === 0 ? '自己' : '布丁'}的第 ${index+1} 张牌。` }]); return true;
    }
    if (s.phase === 'shuffle') {
      s.hands[actor].forEach(c => delete this.memory[c.id]); this.shuffle(s.hands[actor]);
      this.endTurn([{ type: 'shuffle', actor, text: `你打乱了${actor === 0 ? '自己' : '布丁'}的手牌顺序。` }]); return true;
    }
    if (s.phase === 'swapOwn' && actor === 0) {
      s.swapIndex = index; s.phase = 'swapOther'; this.emit(); return true;
    }
    if (s.phase === 'swapOther' && actor === 0) { s.swapIndex = index; this.emit(); return true; }
    if (s.phase === 'swapOther' && actor === 1) {
      const a = s.swapIndex;
      [s.hands[0][a], s.hands[1][index]] = [s.hands[1][index], s.hands[0][a]];
      this.endTurn([{ type: 'swap', actor: 0, own: a, other: index, text: `你将自己的第 ${a+1} 张，与布丁的第 ${index+1} 张盲换。` }]); return true;
    }
    return false;
  }
  closePeek() { if (this.s.phase !== 'peekView') return false; this.s.peeked = null; this.endTurn(); return true; }
  call() {
    const s = this.s; if (s.phase !== 'draw' || !this.canCall()) return false;
    s.caller = 0; this.endTurn([{ type: 'call', actor: 0, text: '你喊出 CATWIN！布丁再行动一次，本局结束。' }]); return true;
  }
  endTurn(events = []) {
    const s = this.s; s.turns++; s.selected = []; s.peeked = null;
    if (s.caller !== null && s.current !== s.caller) { this.finish(events); return; }
    s.current = 1 - s.current; s.phase = s.current === 0 ? 'draw' : 'ai'; this.emit(events);
  }
  estimate(card) { return this.memory[card.id] === undefined ? 6.7 : this.memory[card.id]; }
  aiStep() {
    const s = this.s; if (s.phase !== 'ai' || s.current !== 1) return false;
    const hand = s.hands[1], opp = s.hands[0], smart = this.difficulty === 'smart';
    const total = hand.reduce((n,c)=>n+this.estimate(c),0);
    const known = hand.every(c => this.memory[c.id] !== undefined);
    if (this.canCall() && ((known && total <= (smart ? 14 : 10)) || total <= (smart ? 10 : 7) || s.turns >= 38)) {
      s.caller = 1; this.endTurn([{ type:'call', actor:1, text:'布丁喊出了 CATWIN！这是你的最后一次行动。' }]); return true;
    }
    const ranked = hand.map((c,i)=>({i, v:this.estimate(c)})).sort((a,b)=>b.v-a.v);
    const top = s.discard.at(-1);
    const source = top && top.v < ranked[0].v - 1.5 ? 'discard' : 'deck';
    const c = this.take(source) || this.take(source === 'deck' ? 'discard' : 'deck');
    if (!c) { s.caller = 1; this.endTurn([{type:'call',actor:1,text:'牌堆已空，布丁喊出了 CATWIN。'}]); return true; }
    let events = [{ type: 'aiDraw', source, card: { ...c } }];
    const duplicates = hand.filter(x=>this.memory[x.id] !== undefined).reduce((m,x)=>(m[x.v] = [...(m[x.v]||[]),hand.indexOf(x)],m),{});
    const group = Object.entries(duplicates).filter(([v,ids])=>ids.length>1 && (+v)*ids.length>c.v).sort((a,b)=>(+b[0])*b[1].length-(+a[0])*a[1].length)[0];
    if (group && smart) events.push(this.exchange(1, group[1], c));
    else if (c.v < ranked[0].v - (smart ? .5 : 1.2)) events.push(this.exchange(1,[ranked[0].i],c));
    else {
      s.discard.push(c); this.memory[c.id] = c.v;
      if ([8,9,10].includes(c.v)) {
        const unknown = hand.filter(x=>this.memory[x.id] === undefined);
        const target = unknown.length ? unknown[Math.floor(this.rng()*unknown.length)] : opp[Math.floor(this.rng()*opp.length)];
        this.memory[target.id] = target.v;
        events.push({type:'aiPeek',text:`布丁使用 ${c.v} · 偷看，悄悄记住了一张牌。`});
      } else if ([11,12].includes(c.v)) {
        const bestOpp = opp.map((x,i)=>({i,v:this.estimate(x)})).sort((a,b)=>a.v-b.v)[0];
        const a = ranked[0].i, b = bestOpp.i;
        [s.hands[1][a],s.hands[0][b]] = [s.hands[0][b],s.hands[1][a]];
        events.push({type:'swap',actor:1,own:b,other:a,text:`布丁使用 ${c.v} · 盲换，交换了你的第 ${b+1} 张和它的第 ${a+1} 张。`});
      } else if (c.v === 5) {
        opp.forEach(x=>delete this.memory[x.id]); this.shuffle(opp);
        events.push({type:'shuffle',actor:0,text:'布丁使用 5 · 乱序，打乱了你的手牌。'});
      } else events.push({type:'discard',actor:1,text:`布丁弃掉了 ${c.v}。`});
    }
    this.endTurn(events.filter(Boolean)); return true;
  }
  finish(events) {
    const s = this.s;
    const sums = s.hands.map(h=>h.reduce((n,c)=>n+c.v,0));
    const special = s.hands.findIndex(h=>h.length===4 && h.filter(c=>c.v===12).length===2 && h.filter(c=>c.v===13).length===2);
    let points = [...sums], notes = ['', ''];
    if (special >= 0) { points[special] = 0; points[1-special] = 50; notes[special] = '神叠特工队 · 0 分'; notes[1-special] = '神叠特工队 · +50 分'; }
    else if (s.caller !== null) {
      if (sums[s.caller] <= sums[1-s.caller]) { points[s.caller] = 0; notes[s.caller] = 'CATWIN 成功 · 0 分'; }
      else { points[s.caller] += 10; notes[s.caller] = 'CATWIN 失败 · 额外 +10 分'; }
    }
    this.scores = this.scores.map((n,i)=>{ const score = n+points[i]; if(score===100){notes[i]+=' / 凑满 100，减 50';return 50;}return score; });
    const matchOver = this.scores.some(n=>n>100);
    const winner = matchOver ? (this.scores[0] === this.scores[1] ? -1 : this.scores[0]<this.scores[1]?0:1) : (points[0]===points[1]?-1:points[0]<points[1]?0:1);
    s.result = { sums, points, notes, scores:[...this.scores], special, matchOver, winner, caller:s.caller };
    s.phase = 'finished'; this.emit([...events,{type:'finish',text:`本局结算：你 +${points[0]}，布丁 +${points[1]}。`}]);
  }
  static ability(v) { return ({0:'乾坤大挪移',5:'乱序',8:'偷看',9:'偷看',10:'偷看',11:'盲换',12:'盲换'})[v] || '数字牌'; }
}
if (typeof module !== 'undefined') module.exports = CatGame;


class ServerPractice extends CatGame {
 constructor(){super();this.serverId=null;this.version=0;this.isOnline=false;}
 async send(action,extra={}){if(!this.serverId){const r=await fetch(new URL('./api/practice',location.href),{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});const d=await r.json();if(!r.ok)throw Error(d.error);this.serverId=d.id;this.version=d.version;}
 const payload={action,id:crypto.randomUUID(),version:this.version,...extra};let response;try{response=await fetch(new URL('./api/practice/'+this.serverId+'/action',location.href),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)});}catch{response=await fetch(new URL('./api/practice/'+this.serverId+'/action',location.href),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)});}const data=await response.json();if(!response.ok)throw Error(data.error);this.version=data.version;this.round=data.round;this.scores=data.scores;this.s=data.state;this.emit(data.events);return true;}
 async start(reset=false){if(reset)this.serverId=null;return this.send('start',{reset});}
 cover(){return this.send('cover');}draw(source){return this.send('draw',{source});}discard(){return this.send('discard');}replace(){return this.send('replace',{indices:[...this.s.selected]});}use(){return this.send('use');}target(actor,index){return this.send('target',{actor,index});}closePeek(){return this.send('closePeek');}call(){return this.send('call');}aiStep(){return this.send('aiStep');}
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
    this.applied=packet.seq;this.cursor=Math.max(this.cursor,packet.seq);this.round=packet.round;this.scores=packet.scores;this.s=packet.state;this.closed=packet.closed;this.peerOnline=packet.online?.[1]??true;
    for(const key of this.queue.keys())if(key<=this.applied)this.queue.delete(key);
    if(notify)this.emit([...packet.events,{type:'networkAction',...packet.meta}]);return true;
  }
  async request(endpoint,options={}){
    const response=await fetch(new URL('./api/'+endpoint,location.href),{...options,headers:{'Content-Type':'application/json',Authorization:'Bearer '+this.token,...options.headers},signal:options.signal||AbortSignal.timeout(25000)});
    const data=await response.json();if(!response.ok)throw Object.assign(new Error(data.error||'连接失败'),{status:response.status});return data;
  }
  async send(action,extra={}){
    if(this.stopped)throw new Error('房间已断开');
    const payload={action,id:crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),version:this.applied,...extra};
    let data;
    try{data=await this.request(`rooms/${this.code}/action`,{method:'POST',body:JSON.stringify(payload),signal:AbortSignal.timeout(10000)});}
    catch(error){
      if(error instanceof TypeError||error.name==='TimeoutError'){
        data=await this.request(`rooms/${this.code}/action`,{method:'POST',body:JSON.stringify(payload),signal:AbortSignal.timeout(10000)});
      }else{this.resync();throw error;}
    }
    this.apply(data.packet);return true;
  }
  canCall(){return this.s.turns>=10&&this.s.caller===null;}
  select(index){if(busy||this.s.phase!=='choose'||!this.s.hands[0][index])return false;const n=this.s.selected.indexOf(index);if(n<0)this.s.selected.push(index);else this.s.selected.splice(n,1);this.emit();return true;}
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
        if(this.stopped)return;this.connected=true;backoff=700;this.peerOnline=data.online?.[1]??true;
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
        if(packet.closed){this.stop();showHome();toast('对方已离开，房间已结束');break;}
        if(packet.meta.kind==='deal'){
          roundToken++;busy=true;$('resultDialog').close();previousHands=[[],[]];previousPhase='intro';this.apply(packet);lockControls();await dealCurrentHand(roundToken);busy=false;render(this.s);
        }else if(packet.meta.kind==='sync'){
          roundToken++;clearTimeout(peekTimer);this.apply(packet);render(this.s);
        }else await playTransition('remote',()=>{this.apply(packet);return true;});
      }
    }finally{this.pumping=false;updateConnectionUI();}
  }
  stop(){this.stopped=true;this.controller?.abort();try{sessionStorage.removeItem(catSessionKey());}catch(_){};}
  async leave(){try{await this.request(`rooms/${this.code}/leave`,{method:'POST',body:'{}',signal:AbortSignal.timeout(5000)});}catch(_){}finally{this.stop();showHome();}}
}
function catSessionKey(){return 'cat-room:'+new URL('.',location.href).pathname;}
async function connectRoom(kind,code){
  if(busy)return;
  if(location.protocol==='file:'){toast('联机请从启动程序打开的网页进入');return;}
  busy=true;document.querySelectorAll('#startLobby button').forEach(b=>b.disabled=true);
  try{
    const response=await fetch(new URL(kind==='create'?'./api/rooms':'./api/join',location.href),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code}),signal:AbortSignal.timeout(10000)});
    const data=await response.json();if(!response.ok)throw new Error(data.error||'连接失败');
    await enterOnline(data,kind==='join');
  }catch(error){busy=false;toast(error.message==='Failed to fetch'?'无法连接房间服务，请先启动猫猫牌':error.message);}
  finally{document.querySelectorAll('#startLobby button').forEach(b=>b.disabled=false);}
}
async function enterOnline(data,deal=false){
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
  const online=!!game.isOnline;
  $('modeLabel').textContent=online?`房间 ${game.code}`:game.s.phase==='intro'?'猫猫牌':'人机练习';
  $('connectionLabel').textContent=online?(game.s.phase==='lobby'?'等待加入':game.connected?(game.peerOnline?'已连接':'对方暂时断线'):'重连中'):'本地';
  $('onlineBadge').classList.toggle('reconnecting',online&&!game.connected);
  $('roomCodeText').textContent=online?game.code:'';
  $('resetBtn').setAttribute('aria-label',online?'退出房间':'重新开始');$('resetBtn').title=online?'退出房间':'重新开始';
  $('mainTitle').textContent=online?'猫友对战':'猫猫牌，来一局。';
  $('opponentName').textContent=online?'对方':'布丁';$('opponentType').textContent=online?'猫友':'AI';$('scoreOpponent').textContent=online?'对方':'布丁';
  $('confirmTitle').textContent=online?'退出房间？':'重新开一桌？';$('confirmDesc').textContent=online?'退出后，本房间的对战结束。':'当前牌局和累计积分会重置。';$('confirmResetBtn').textContent=online?'退出房间':'重新开桌';
  document.querySelector('footer span:last-child').textContent=online?'双人联机':game.s.phase==='intro'?'':'人机练习';
}
async function animateRemoteTransition(before,after,events,token){
  const meta=events.find(e=>e.type==='networkAction');if(!meta)return;
  const actor=meta.actor??1;
  if(meta.kind==='draw'){
    const e=events.find(e=>e.type==='draw');if(e)await drawAnimation(e.card,e.source,actor,token);
  }else if(['discard','use'].includes(meta.kind)){
    const e=events.find(e=>e.type==='discard'||e.type==='ability');
    if(e){note('对方出牌','展示区 → 弃牌堆');let el=$('drawnCard').querySelector('.card');if(!el)el=showTray(e.card,false,1);await moveToDiscard(el,e.card,token,false);}
    if(events.some(e=>e.type==='rotate')&&token===roundToken)await rotateAnimation(before,token);
  }else if(meta.kind==='replace'){
    const e=events.find(e=>['exchange','multi','mistake'].includes(e.type));if(!e)return;
    if(!$('drawnCard').querySelector('.card'))showTray(null,false,1);
    if(e.type!=='mistake')await exchangeAnimation(before,e,e.drawn||{v:null},1,token);
    else {
      note('对方一换多记错了','摸到的牌加入对方手牌。');await Promise.all(e.indices.map((i,j)=>flipCard(cardAt(1,i),cardMarkup(e.cards[j],true))));await pause(350);
      if(token!==roundToken)return;await Promise.all(e.indices.map(i=>flipCard(cardAt(1,i),cardMarkup(null))));
      if(token!==roundToken)return;const extra=document.createElement('div');extra.className='hand-card';extra.innerHTML=cardMarkup(null);$('aiHand').append(extra);const target=extra.querySelector('.card');target.style.visibility='hidden';
      const tray=$('drawnCard').querySelector('.card'),rect=tray.getBoundingClientRect();tray.style.visibility='hidden';await fly(rect,target,cardMarkup(null));if(token===roundToken)target.style.visibility='visible';
    }
  }else if(meta.kind==='target'){
    const swap=events.find(e=>e.type==='swap'),shuffle=events.find(e=>e.type==='shuffle'),peek=events.find(e=>e.type==='peek');
    if(swap)await swapAnimation(swap,token);
    if(shuffle)await shuffleAnimation(shuffle.actor,before,after,token);
    if(peek){note('对方正在偷看','牌面仅对使用者显示。');const el=cardAt(peek.actor,peek.index);el?.classList.add('move-target');await pause(350);}
  }else if(meta.kind==='coverPeek'){note('对方结束查看');await pause(150);}
}
document.addEventListener('DOMContentLoaded',()=>{
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
const localGame = new ServerPractice();
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
  const value = card?.v ?? 0, ability = CatGame.ability(value), abilityIcon = ({0:'spark',5:'shuffle',8:'eye',9:'eye',10:'eye',11:'swap',12:'swap'})[value];
  const style = value === 0 ? 'zero-card' : value===5 ? 'shuffle-card' : [8,9,10].includes(value) ? 'peek-card' : [11,12].includes(value) ? 'swap-card' : value>=7 ? 'high-card' : '';
  const classes = `card ${face ? 'card-face '+style : 'card-back'} ${options.selected?'selected':''} ${options.selectable?'selectable':''} ${options.reveal?'peek-reveal':''}`;
  const tag = options.button ? 'button' : 'span';
  const attrs = options.button ? `type="button" data-actor="${options.actor}" data-index="${options.index}" ${!options.selectable?'disabled':''} aria-label="${options.actor===0?'你的':game.isOnline?'对方的':'布丁的'}第 ${options.index+1} 张牌${face?'，'+value+'，'+ability:'，牌面朝下'}" ${options.selected?'aria-pressed="true"':''}` : '';
  return `<${tag} class="${classes}" ${attrs}>${face ? `<span class="card-corner">${value}${icon('paw')}</span>${icon(abilityIcon || 'cat',abilityIcon?'face-glyph':'face-cat')}<span class="face-label">${ability==='数字牌'?'猫猫牌':ability}</span><span class="card-corner bottom">${value}${icon('paw')}</span>` : `<span class="back-outline"></span>${icon('cat-sleep','back-cat')}<span class="back-brand">猫猫牌</span><span class="back-star s1">✧</span><span class="back-star s2">✧</span>`}${options.selected?'<span class="selected-tick">✓</span>':''}</${tag}>`;
}
const pace = { move: 420, flip: 300, hold: 180, swap: 520 };
const pause = ms => new Promise(resolve=>setTimeout(resolve,reducedMotion?0:ms/animationSpeed));
const cardAt = (actor,index) => document.querySelector(`#${actor===0?'playerHand':'aiHand'} [data-index="${index}"]`);
function note(title,desc='') { $('promptTitle').textContent=title; $('promptDesc').textContent=desc; }
function lockControls() { document.querySelectorAll('.actions button,.hand button,#deckBtn,#discardBtn,#catwinBtn').forEach(b=>b.disabled=true); }
async function runAnimation(el,keyframes,options) {
  if(reducedMotion)return;
  const a=el.animate(keyframes,options);
  a.playbackRate=animationSpeed;
  try {await a.finished;}catch(_){}finally{a.cancel();}
}
async function fly(from, to, html, duration = pace.move, rotation = 8) {
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
  await runAnimation(el,[{transform:'rotateY(0deg)'},{transform:'rotateY(90deg)'}],{duration:reducedMotion?0:duration/2,easing:'ease-in',fill:'forwards'});
  if(!el.isConnected)return;
  const template=document.createElement('template');template.innerHTML=html;
  el.className=template.content.firstElementChild.className;el.innerHTML=template.content.firstElementChild.innerHTML;
  await runAnimation(el,[{transform:'rotateY(-90deg)'},{transform:'rotateY(0deg)'}],{duration:reducedMotion?0:duration/2,easing:'ease-out'});
}
function showTray(card,face,actor=0){
  $('drawnTray').hidden=false;$('drawnTray').querySelector('.tray-label').textContent=actor===0?'你摸到的牌':'布丁摸到的牌';
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
  note(actor===0?'正在摸牌':game.isOnline?'对方正在摸牌':'布丁正在摸牌',source==='deck'?'摸牌堆 → 展示区':'弃牌堆 → 展示区');
  const from=source==='deck'?$('deckBtn').querySelector('.card'):pileTop();
  const rect=from.getBoundingClientRect();if(source==='discard')from.style.visibility='hidden';
  const target=showTray(card,source==='discard',actor);target.style.visibility='hidden';
  sound('draw');await fly(rect,target,cardMarkup(card,source==='discard'),pace.move,-7);
  if(token!==roundToken)return;
  target.style.visibility='visible';
  if(actor===0 && source==='deck'){note('看看摸到了什么','翻开后，再选择如何使用。');await flipCard(target,cardMarkup(card,true));sound('flip');}
  await pause(pace.hold);
}
async function exchangeAnimation(before,event,drawn,actor,token){
  const ids=event.indices, old=ids.map(i=>cardAt(actor,i));
  note(actor===0?'翻开要换出的牌':'布丁正在换牌','原手牌 → 弃牌堆');
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
  if(actor===0)await flipCard(tray,cardMarkup(drawn,false));
  if(token!==roundToken)return;
  const rect=tray.getBoundingClientRect();tray.style.visibility='hidden';
  await fly(rect,old[0],cardMarkup(drawn,false),pace.move,-8);
  if(token!==roundToken)return;
  old[0].className='card card-back';old[0].innerHTML=cardMarkup(drawn,false).replace(/^<span[^>]*>|<\/span>$/g,'');old[0].style.visibility='visible';
  await pause(250);
}
async function swapAnimation(event,token){
  const a=cardAt(0,event.own),b=cardAt(1,event.other);if(!a||!b)return;
  note('双方盲换手牌',`你的第 ${event.own+1} 张 ↔ 布丁的第 ${event.other+1} 张`);
  const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect();a.classList.add('move-target');b.classList.add('move-target');
  await pause(130);if(token!==roundToken)return;
  a.style.visibility='hidden';b.style.visibility='hidden';sound('swap');
  await Promise.all([fly(ar,br,cardMarkup(null),pace.swap,15),fly(br,ar,cardMarkup(null),pace.swap,-15)]);
  if(token!==roundToken)return;
  a.style.visibility='visible';b.style.visibility='visible';await pause(130);
}
async function rotateAnimation(before,token){
  note('乾坤大挪移','双方整手牌交换，顺序不变。');
  const jobs=[];
  [0,1].forEach(actor=>before.hands[actor].forEach((c,i)=>{
    const from=cardAt(actor,i),to=cardAt(1-actor,i)||document.querySelector(actor===0?'#aiHand .card':'#playerHand .card');
    if(from&&to)jobs.push({from,rect:from.getBoundingClientRect(),to:to.getBoundingClientRect()});
  }));
  await pause(100);if(token!==roundToken)return;
  jobs.forEach(j=>j.from.style.visibility='hidden');
  await Promise.all(jobs.map((j,i)=>fly(j.rect,j.to,cardMarkup(null),pace.swap+200,i%2?12:-12)));
  if(token===roundToken)await pause(120);
}
async function shuffleAnimation(actor,before,after,token){
  note('手牌重新排序',actor===0?'你的全部手牌正在打乱':'布丁的全部手牌正在打乱');
  const cards=before.hands[actor].map((c,i)=>({c,el:cardAt(actor,i)}));
  const rects=cards.map(x=>x.el.getBoundingClientRect());
  const hand=$(actor===0?'playerHand':'aiHand'),h=hand.getBoundingClientRect();
  cards.forEach(x=>x.el.style.visibility='hidden');
  const middle={left:h.left+h.width/2-rects[0].width/2,top:h.top-12,width:rects[0].width,height:rects[0].height};
  await Promise.all(cards.map((x,i)=>fly(rects[i],middle,cardMarkup(null),310,(i-1)*7)));
  if(token!==roundToken)return;
  const stack=document.createElement('div');stack.className='fly-card';stack.innerHTML=cardMarkup(null);Object.assign(stack.style,{left:middle.left+'px',top:middle.top+'px',width:middle.width+'px',height:middle.height+'px'});$('fxLayer').append(stack);
  await pause(130);if(token!==roundToken){stack.remove();return;}stack.remove();
  await Promise.all(cards.map((x,i)=>fly(middle,rects[after.hands[actor].findIndex(c=>c.id===x.c.id)],cardMarkup(null),350,(i-1)*-6)));
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
    if(kind==='next'&&events.some(e=>e.type==='deal')){
      $('resultDialog').close();previousHands=[[],[]];previousPhase='intro';render(game.s);lockControls();await dealCurrentHand(token);
    }else if(kind==='remote')await animateRemoteTransition(before,after,events,token);
    else if(kind==='cover'){
      note('把手牌盖回','记住它们的位置。');
      await Promise.all(before.initialPeek.map(i=>flipCard(cardAt(0,i),cardMarkup(null,false))));await pause(300);
    }else if(kind==='draw')await drawAnimation(after.drawn,after.source,0,token);
    else if(kind==='discard'||kind==='use'){
      note('把牌放入弃牌堆','展示区 → 弃牌堆');
      await moveToDiscard($('drawnCard').querySelector('.card'),before.drawn,token);
      if(kind==='use'&&events.some(e=>e.type==='rotate')&&token===roundToken)await rotateAnimation(before,token);
    }else if(kind==='replace'){
      const e=events.find(e=>['exchange','multi','mistake'].includes(e.type));
      if(e.type==='mistake'){
        note('选中的数字不相同','原手牌保留，摸到的牌加入手牌。');
        await Promise.all(before.selected.map(i=>flipCard(cardAt(0,i),cardMarkup(e.cards?.[e.indices.indexOf(i)]||before.hands[0][i],true))));await pause(400);
        if(token!==roundToken)return;
        await Promise.all(before.selected.map(i=>flipCard(cardAt(0,i),cardMarkup(null))));
        if(token!==roundToken)return;
        const extra=document.createElement('div');extra.className='hand-card';extra.innerHTML=cardMarkup(null);$('playerHand').append(extra);
        const destination=extra.querySelector('.card');destination.style.visibility='hidden';
        const tray=$('drawnCard').querySelector('.card');await flipCard(tray,cardMarkup(null));
        if(token!==roundToken)return;const rect=tray.getBoundingClientRect();tray.style.visibility='hidden';
        note('增加一张手牌','展示区 → 手牌末尾');await fly(rect,destination,cardMarkup(null));
        if(token!==roundToken)return;destination.style.visibility='visible';await pause(300);
      }else await exchangeAnimation(before,e,before.drawn,0,token);
    }else if(kind==='target'){
      const e=events.find(e=>['swap','shuffle','peek'].includes(e.type));
      if(e?.type==='swap')await swapAnimation(e,token);
      if(e?.type==='shuffle')await shuffleAnimation(e.actor,before,after,token);
      if(e?.type==='peek'){note('翻开这张牌','只有你能看到这张牌。');await flipCard(cardAt(e.actor,e.index),cardMarkup(after.hands[e.actor][e.index],true));await pause(400);}
    }else if(kind==='coverPeek'){
      const p=before.peeked;note('把牌盖回','本次行动结束。');await flipCard(cardAt(p.actor,p.index),cardMarkup(null));await pause(200);
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
          if(swap)await swapAnimation(swap,token);
          if(shuffle)await shuffleAnimation(shuffle.actor,before,after,token);
          if(events.some(e=>e.type==='aiPeek')){
            note('布丁使用偷看','它正在记住一张牌，牌面只对它可见。');
            const h=$('aiHand');h.classList.add('ai-looking');await pause(1100);h.classList.remove('ai-looking');
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
  [0,1].forEach(actor=>{
    const hand = actor===0?$('playerHand'):$('aiHand');
    hand.innerHTML = s.hands[actor].map((c,i)=>{
      const face = s.phase==='finished' || (s.phase==='memorize' && actor===0 && s.initialPeek.includes(i)) || (s.phase==='peekView' && s.peeked?.actor===actor && s.peeked?.index===i);
      let selectable = false;
      if(actor===0 && s.phase==='choose') selectable=true;
      if(targetPhases.includes(s.phase)) selectable = s.phase==='swapOwn' ? actor===0 : true;
      const selected = actor===0 && ((s.phase==='choose'&&s.selected.includes(i)) || (s.phase==='swapOther'&&s.swapIndex===i));
      const changed = previousHands[actor][i]!==c.id;
      const flipping = !changed && (previousPhase==='memorize'&&s.phase!=='memorize' || s.phase==='peekView' || previousPhase==='peekView' || s.phase==='finished');
      return `<div class="hand-card ${previousPhase==='intro' || previousPhase==='finished' && s.phase==='memorize'?'dealt':''} ${flipping?'flipping':''}" style="--i:${i}" data-card-id="${c.id}">${cardMarkup(c,face,{button:true,actor,index:i,selectable,selected,reveal:face&&s.phase!=='finished'})}<span class="card-index">${String(i+1).padStart(2,'0')}</span></div>`;
    }).join('');
    hand.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
      if(busy)return; sound('tap');
      const a=+btn.dataset.actor,i=+btn.dataset.index;
      if(game.s.phase==='choose')game.select(i);else playTransition('target',()=>game.target(a,i));
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
    memorize:['记住这两张，准备盖牌','本局随机亮出两张手牌。记住它们的数字和位置，然后开始。'],
    draw:[s.caller===1?'最后一次行动，想好再出招':'轮到你啦，摸一张吧','点击摸牌堆，或拿走弃牌堆顶的明牌。'],
    choose:['这张牌，留下还是送走？','选中自己的手牌来交换；多选相同数字，即可一换多。'],
    peek:['偷偷看一眼','点击自己或布丁的任意一张手牌。'],
    peekView:['记住了吗？','这张牌只展示给你。盖回后结束本次行动。'],
    shuffle:['让记忆重新洗牌','点击任意一方的手牌，将该方整手牌打乱顺序。'],
    swapOwn:['先选自己的牌','选择一张自己想换走的手牌，牌面不会翻开。'],
    swapOther:['再选布丁的牌','点击布丁的一张手牌完成盲换。也可以重新选择自己的牌。'],
    ai:[s.caller===0?'等待布丁的最后一步':'布丁正在思考…','留意它换走了哪些牌。'],
    lobby:['等待另一位玩家','让对方输入房间码加入。'],
    waitingReady:['已完成记牌','等待对方盖牌。'],
    waiting:[s.caller===0?'等待对方的最后一步':'对方正在行动','留意对方的摸牌与换牌。'],
    finished:['这一局的秘密，全部揭晓','所有手牌已翻开，可以查看结算或继续下一局。']
  };
  const p=prompts[s.phase]||['一切就绪，等你开局','每局从 4 张手牌开始，手牌总和越小越好。'];
  $('promptTitle').textContent=game.isOnline?p[0].replaceAll('布丁','对方'):p[0];$('promptDesc').textContent=game.isOnline?p[1].replaceAll('布丁','对方'):p[1];
  if(s.phase==='memorize') action(`记住了，盖牌 ${icon('arrow')}`,()=>{sound('flip');playTransition('cover',()=>game.cover());});
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
    action(waiting?'等待对方准备':s.result.matchOver?'新的一场':`第 ${game.round+1} 局 ${icon('arrow')}`,()=>startRound(s.result.matchOver),'primary',waiting);
  }
}
let labReportedPlaying=null;
function render(s,events=[]) {
  const labPlaying=!['intro','lobby','finished'].includes(s.phase);
  if(labPlaying!==labReportedPlaying){labReportedPlaying=labPlaying;if(parent!==window)parent.postMessage({type:'3dalab-game-activity',playing:labPlaying},location.origin);}
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
  $('deckBtn').disabled=s.phase!=='draw'||busy||(!s.deck.length&&s.discard.length<=1);
  $('discardBtn').disabled=s.phase!=='draw'||busy||!s.discard.length;
  $('drawnTray').hidden=!s.drawn;
  if(s.drawn){const own=s.current===0;$('drawnTray').querySelector('.tray-label').textContent=own?'你摸到的牌':'对方摸到的牌';$('drawnCard').innerHTML=cardMarkup(s.drawn,own);$('drawnHint').textContent=own?(CatGame.ability(s.drawn.v)==='数字牌'?'数字牌':CatGame.ability(s.drawn.v)):'';}
  $('roundPill').textContent=intro||lobby?'准备开桌':`第 ${String(game.round).padStart(2,'0')} 局`;
  $('tableStatus').innerHTML=`<i></i> ${intro?'等待开始':s.phase==='memorize'?'准备阶段 · 记住两张':final?'本局已结束':s.current===0?'你的行动时间':'布丁的行动时间'}`;
  $('thinking').classList.toggle('active',s.phase==='ai');
  $('aiStatus').textContent=lobby?'等待加入':intro?'人机对手':s.phase==='ai'?'思考中…':final?`手牌合计 ${s.result.sums[1]} 分`:`${s.hands[1].length} 张手牌`;
  $('playerStatus').textContent=final?`手牌合计 ${s.result.sums[0]} 分`:intro?'玩家':lobby?'等待发牌':`${s.hands[0].length} 张手牌`;
  $('handTip').textContent=s.phase==='memorize'?'两张小秘密，要记住哦':s.phase==='choose'?'可多选相同数字的牌':final?'本局手牌已全部翻开':'盖住的牌，靠记忆找回来';
  $('yourScore').innerHTML=`${game.scores[0]}<small>分</small>`;$('aiScore').innerHTML=`${game.scores[1]}<small>分</small>`;
  const laps=Math.floor(s.turns/2), unlocked=s.turns>=10;
  $('turnIndex').textContent=intro||lobby?'准备':s.phase==='memorize'?'记牌':final?'结束':`第 ${laps+1} 回合`;
  $('progressPaws').innerHTML=Array.from({length:5},(_,i)=>`${i?'<span class="progress-line"></span>':''}${icon('paw',laps>i?'filled':'')}`).join('');
  $('catwinBtn').disabled=!(s.phase==='draw'&&game.canCall())||busy;
  $('catwinHint').textContent=s.caller!==null?'已喊出 · 最后一次行动':unlocked?(s.current===0?'摸牌前可喊出':'等待你的回合'):`还需 ${5-laps} 个完整回合`;
  if(intro)$('catwinHint').textContent='第 5 回合后解锁';
  $('turnTitle').textContent=s.caller!==null?'最后一次，小心出牌':unlocked?'相信自己的记忆吗？':'先记住，再出招';
  $('turnNote').innerHTML=s.caller!==null?`${s.caller===0?'你':'布丁'}喊出了 <b>CATWIN</b>。<br>${s.caller===0?'布丁':'你'}再行动一次，即刻结算。`:unlocked?'喊出 <b>CATWIN</b> 后对方再动一次。<br>喊对记 0 分，喊错额外加 10 分。':'双方各行动 5 次后，即可喊<br><b>CATWIN</b>，争取本局 0 分。';
  if(game.isOnline)$('turnNote').innerHTML=$('turnNote').innerHTML.replaceAll('布丁','对方');
  if(final){$('turnTitle').textContent='本局已结束';$('turnNote').textContent='本局已结算。';$('catwinHint').textContent='本局已结束';}
  $('actionDock').classList.toggle('final-turn',s.caller!==null&&!final);
  renderPrompt(s);
  events.forEach(e=>{if(e.text)log(e.text);handleEvent(e);});
  if(!game.isOnline&&s.phase==='ai'&&!aiTimer){const token=roundToken;aiTimer=setTimeout(()=>{aiTimer=null;if(token===roundToken)playTransition('ai',()=>game.aiStep());},650);}
  if(s.phase==='peekView'&&previousPhase!=='peekView'){const token=roundToken;peekTimer=setTimeout(()=>{if(token===roundToken&&game.s.phase==='peekView')playTransition('coverPeek',()=>game.closePeek());},6500);}
  previousPhase=s.phase;
  if(game.isOnline&&final){const wait=!!s.nextReady?.[0];$('nextRoundBtn').disabled=wait;if(wait)$('nextRoundBtn').textContent='等待对方准备';}
  else $('nextRoundBtn').disabled=false;
  if(game.isOnline){$('tableStatus').innerHTML=`<i></i> ${lobby?'等待加入':s.phase==='memorize'?'记牌阶段':s.phase==='waitingReady'?'等待对方记牌':final?'本局已结束':s.current===0?'你的行动时间':'对方的行动时间'}`;}
  updateConnectionUI();
}
function handleEvent(e){
  if(e.type==='draw')sound('draw');
  if(e.type==='peek'){sound('flip');burst(document.querySelector(`#${e.actor===0?'playerHand':'aiHand'} [data-index="${e.index}"]`));}
  if(['swap','rotate','shuffle'].includes(e.type))sound('swap');
  if(e.type==='multi'){burst(e.actor===0?$('playerHand'):$('aiHand'));toast('一换多成功！小猫记忆力 +1');sound('swap');}
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
  game.difficulty='smart'; previousHands=[[],[]];previousPhase='intro';try{await game.start(reset);}catch(error){busy=false;toast(error.message);return;}lockControls();sound('draw');
  await dealCurrentHand(token);
  if(token!==roundToken)return;busy=false;render(game.s);
}
async function dealCurrentHand(token){
  note('正在发牌','每人四张，依次发到手牌区。');
  const cards=[0,1,2,3].flatMap(i=>[cardAt(0,i),cardAt(1,i)]),source=$('deckBtn').querySelector('.card');
  cards.forEach(el=>{el.style.visibility='hidden';});
  await Promise.all(cards.map(async(el,i)=>{
    await pause(i*65);if(token!==roundToken)return;
    await fly(source,el,cardMarkup(null),380,i%2?6:-6);
    if(token!==roundToken)return;
    el.className='card card-back';el.innerHTML=cardMarkup(null).replace(/^<span[^>]*>|<\/span>$/g,'');el.style.visibility='visible';
  }));
  if(token!==roundToken)return;
  note('翻开你的两张手牌','记住数字和位置。');await pause(100);
  await Promise.all(game.s.initialPeek.map(i=>flipCard(cardAt(0,i),cardMarkup(game.s.hands[0][i],true))));
}
function showResult(){
  const r=game.s.result;
  $('resultEyebrow').textContent=r.matchOver?'整场结束':`第 ${game.round} 局结算`;
  $('resultTitle').textContent=r.winner===0?(r.matchOver?'你赢得了整场！':'这局你赢了！'):r.winner===1?(r.matchOver?'布丁赢得了整场':'这局布丁赢了'):'平局';
  $('resultSubtitle').textContent=r.matchOver?'有人累计超过 100 分，累计分数更少的猫友获胜。':r.special>=0?'神叠特工队出现！两张 12 + 两张 13。':r.caller===0?(r.points[0]===0?'CATWIN 成功！你的手牌和最小，本局记 0 分。':'CATWIN 没喊准，本局额外加 10 分。'):(r.points[1]===0?'布丁 CATWIN 成功，本局记 0 分。':'布丁 CATWIN 没喊准，本局额外加 10 分。');
  $('resultHands').innerHTML=game.s.hands.map((h,i)=>`<div class="result-hand-row"><span>${i===0?'你':'布丁'}</span>${h.map(c=>`<span class="result-mini-card">${c.v}</span>`).join('')}<strong>合计 ${r.sums[i]}</strong></div>`).join('');
  $('resultScores').innerHTML=r.points.map((p,i)=>`<div class="result-score ${p>r.points[1-i]?'negative':''}"><span>${i===0?'你':'布丁'} · 本局计分</span><b>+${p}</b><small>${r.notes[i]||'按手牌数字和计分'}</small><span class="total">累计 ${r.scores[i]} 分</span></div>`).join('');
  $('yourDelta').textContent=`本局 +${r.points[0]} · ${r.notes[0].startsWith('CATWIN')?'CATWIN':'已结算'}`;
  $('aiDelta').textContent=`本局 +${r.points[1]} · ${r.notes[1].startsWith('CATWIN')?'CATWIN':'已结算'}`;
  $('nextRoundBtn').innerHTML=r.matchOver?`再开一场 ${icon('arrow')}`:`再来一局 ${icon('arrow')}`;
  if(game.isOnline){$('resultTitle').textContent=$('resultTitle').textContent.replaceAll('布丁','对方');$('resultSubtitle').textContent=$('resultSubtitle').textContent.replaceAll('布丁','对方');$('resultHands').innerHTML=$('resultHands').innerHTML.replaceAll('布丁','对方');$('resultScores').innerHTML=$('resultScores').innerHTML.replaceAll('布丁','对方');}
}
function openDialog(id){const d=$(id);if(!d.open)d.showModal();}
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
$('rulesBtn').addEventListener('click',()=>openDialog('rulesDialog'));
$('startBtn').addEventListener('click',()=>startRound(true));
$('nextRoundBtn').addEventListener('click',()=>startRound(game.s.result.matchOver));
$('resetBtn').addEventListener('click',()=>{if(game.s.phase==='intro')startRound(true);else openDialog('confirmDialog');});
$('confirmResetBtn').addEventListener('click',()=>{if(network)network.leave();else startRound(true);});
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

const rankingButton=document.createElement('button');rankingButton.textContent='积分榜';rankingButton.className='tool-btn';document.querySelector('.top-tools, .header-tools, .tools')?.append(rankingButton);if(!rankingButton.isConnected)document.querySelector('header').append(rankingButton);const rankingDialog=document.createElement('dialog');rankingDialog.innerHTML='<button class="close-rank">关闭</button><h2>猫猫牌积分榜</h2><div></div>';document.body.append(rankingDialog);rankingDialog.querySelector('button').onclick=()=>rankingDialog.close();rankingButton.onclick=async()=>{try{const r=await fetch(new URL('./api/rankings',location.href)),d=await r.json();const list=rankingDialog.querySelector('div');list.replaceChildren();for(const [i,p]of d.rows.entries()){const row=document.createElement('p');row.textContent=(i+1)+' · '+p.name+' · '+p.points;list.append(row);}if(!d.rows.length)list.textContent='暂无积分记录';rankingDialog.showModal();}catch{toast('连接暂时中断');}};
