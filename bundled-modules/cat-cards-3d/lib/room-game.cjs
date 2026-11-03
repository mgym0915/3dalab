const crypto=require('node:crypto');
const CatRules=require('./rules.cjs');
module.exports=class RoomGame extends CatRules{
  constructor(count=2){super(count,{rng:()=>crypto.randomInt(0,0x100000000)/0x100000000});}
};
