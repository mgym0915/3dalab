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
