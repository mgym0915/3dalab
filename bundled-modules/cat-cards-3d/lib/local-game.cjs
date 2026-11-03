class CatGame {
  constructor(options={}){this.rng=options.rng||Math.random;this.round=0;this.scores=[0,0];this.listeners=[];this.s={phase:'intro',hands:[[],[]],deck:[],discard:[],turns:0,current:0,caller:null};}
  shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(this.rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  take(source){const s=this.s;if(source==='deck'){if(!s.deck.length&&s.discard.length>1){const top=s.discard.pop();s.deck=this.shuffle(s.discard.splice(0));s.discard=[top];}return s.deck.pop()||null;}return s.discard.pop()||null;}
  static ability(v){return({0:'乾坤大挪移',5:'乱序',8:'偷看',9:'偷看',10:'偷看',11:'盲换',12:'盲换'})[v]||'数字牌';}
}
if(typeof module!=='undefined')module.exports=CatGame;
