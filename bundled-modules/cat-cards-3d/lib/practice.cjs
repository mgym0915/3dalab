const crypto=require('node:crypto');
// The bot chooses from its filtered view. It never reads hidden card values.
class Practice{
  constructor(rooms,onResult){this.rooms=rooms;this.onResult=onResult;this.timers=new Map();}
  needed(r){const g=r.game,s=g?.s;return r.practice&&!r.closed&&s&&(s.phase==='memorize'?!g.ready[1]:s.phase==='finished'?!g.nextReady[1]:s.current===1);}
  kick(r){if(!this.needed(r)||this.timers.has(r.code))return;const timer=setTimeout(()=>{this.timers.delete(r.code);this.step(r);},650);timer.unref();this.timers.set(r.code,timer);}
  step(r){
    if(!this.needed(r))return;
    const g=r.game,s=g.view(1),act=(action,extra={})=>this.rooms.act(r,1,{action,...extra,id:crypto.randomUUID(),version:r.seq,round:g.round});
    const estimate=c=>c.v===null?6.5:c.v;
    try{
      if(s.phase==='memorize'){if(s.initialPeek.length<2){const choices=[0,1,2,3].filter(i=>!s.initialPeek.includes(i));act('remember',{index:choices[crypto.randomInt(choices.length)]});}else act('cover');}
      else if(s.phase==='finished')act('next');
      else if(s.phase==='draw'){
        const total=s.hands[0].reduce((n,c)=>n+estimate(c),0);
        if(g.canCall()&&(total<=13||s.turns>=24))act('call');
        else act('draw',{source:s.discard.at(-1)?.v<=3?'discard':'deck'});
      }else if(s.phase==='choose'){
        const groups=new Map();s.hands[0].forEach((c,i)=>{if(c.v!==null){if(!groups.has(c.v))groups.set(c.v,[]);groups.get(c.v).push(i);}});
        const group=[...groups.values()].sort((a,b)=>b.length-a.length)[0];
        if(group?.length>=2)act('replace',{indices:group});
        else if([0,5,8,9,10,11,12].includes(s.drawn.v))act('use');
        else {const worst=s.hands[0].map((c,i)=>({i,v:estimate(c)})).sort((a,b)=>b.v-a.v)[0];if(s.drawn.v<worst.v)act('replace',{indices:[worst.i]});else act('discard');}
      }else if(s.phase==='peek')act('target',{actor:0,index:crypto.randomInt(s.hands[0].length)});
      else if(s.phase==='peekView')act('closePeek');
      else if(s.phase==='swapOwn')act('target',{actor:0,index:s.hands[0].map((c,i)=>({i,v:estimate(c)})).sort((a,b)=>b.v-a.v)[0].i});
      else if(s.phase==='swapOther')act('target',{actor:1,index:crypto.randomInt(s.hands[1].length)});
      else if(s.phase==='shuffle')act('target',{actor:1,index:0});
      else if(s.phase==='rotateChoice')act('rotate',{direction:crypto.randomInt(2)?'cw':'ccw'});
      Promise.resolve(this.onResult(r)).catch(()=>{});
    }catch(error){console.error('Practice action:',error.message);}
    this.kick(r);
  }
  close(){for(const timer of this.timers.values())clearTimeout(timer);this.timers.clear();}
}
module.exports=Practice;
