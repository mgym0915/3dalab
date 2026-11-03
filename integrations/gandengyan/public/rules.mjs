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
