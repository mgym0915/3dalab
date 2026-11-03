import {simulate,movementStep} from '../public/shared/world.mjs';
export function acceptFrames(player,client,frames,cid){
 if(!Array.isArray(frames)||!frames.length||frames.length>48)throw Object.assign(Error('移动输入无效'),{status:400});
 for(const f of frames)if(!f||!Number.isSafeInteger(f.seq)||f.seq<0||!Number.isInteger(f.epoch)||f.epoch<0||!Number.isFinite(f.dx)||!Number.isFinite(f.dz)||Math.abs(f.dx)>1.01||Math.abs(f.dz)>1.01||!Number.isInteger(f.jump)||f.jump<0||f.jump>1e9)throw Object.assign(Error('移动输入无效'),{status:400});
 if(player.inputClient!==cid){player.commandQueue=[];player.credit=.1;}
 player.inputClient=cid;player.mode='frames';player.commandQueue||=[];
 for(const f of frames){if(f.epoch!==(player.epoch||0)||f.seq<=(client.lastSeq??-1))continue;if(player.commandQueue.length>=256)break;client.lastSeq=f.seq;player.commandQueue.push({...f,run:f.run===true});}
 client.seen=Date.now();player.inputAt=Date.now();player.driver=client.id;
 return{ok:true};
}
export function tickMovement(player,dt){
 if(player.mode!=='frames'){const active=Date.now()-player.inputAt<2500;player.input=active?player.input:{dx:0,dz:0,run:false,jump:player.jump};simulate(player,player.input,dt);return;}
 player.credit=Math.min(1,(player.credit||0)+dt);let processed=0;
 while(player.commandQueue?.length&&player.credit+1e-7>=movementStep&&processed<20){const f=player.commandQueue.shift();simulate(player,f,movementStep);player.seq=f.seq;player.credit-=movementStep;processed++;}
 if(!processed&&Date.now()-player.inputAt>250){player.moving=false;player.running=false;if(!player.grounded)simulate(player,{dx:0,dz:0,jump:player.jump},dt);}
}
