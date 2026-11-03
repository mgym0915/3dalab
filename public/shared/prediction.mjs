import {simulate,movementStep} from './world.mjs';
export class MovementPrediction{
 constructor(cid,onFrame){this.cid=cid;this.onFrame=onFrame;this.seq=0;this.pending=[];this.accumulator=0;this.state=null;this.lastMoving=false;}
 seed(state){this.state={...state};this.epoch=state.epoch||0;if(state.inputClient===this.cid)this.seq=Math.max(this.seq,state.seq||0);this.pending=[];this.accumulator=0;}
 command(input){if(!this.state||this.pending.length>=200)return;const frame={...input,seq:++this.seq,epoch:this.epoch};simulate(this.state,frame,movementStep);this.pending.push(frame);this.lastMoving=!!(frame.dx||frame.dz);this.onFrame?.(frame);return frame;}
 advance(dt,input){if(!this.state)return;this.accumulator=Math.min(.25,this.accumulator+dt);while(this.accumulator>=movementStep){this.accumulator-=movementStep;if(input.dx||input.dz||!this.state.grounded||input.jump>this.state.jump||this.lastMoving)this.command(input);}}
 reconcile(authority){if(!this.state||(authority.epoch||0)!==this.epoch){this.seed(authority);return{reset:true};}if(authority.inputClient!==this.cid){if(!this.pending.length)this.state={...authority};return{};}
  this.pending=this.pending.filter(f=>f.seq>authority.seq);const corrected={...authority};for(const f of this.pending)simulate(corrected,f,movementStep);const distance=Math.hypot(corrected.x-this.state.x,corrected.z-this.state.z);this.state=corrected;return{distance};
 }
 display(input){if(!this.state)return null;const value={...this.state};if(this.accumulator>0&&(input.dx||input.dz||!value.grounded))simulate(value,input,this.accumulator);return value;}
}
