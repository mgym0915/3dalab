import * as THREE from './vendor/three-r180/three.module.min.js';
import {GLTFLoader} from './vendor/three-r180/GLTFLoader.js';
import {clone} from './vendor/three-r180/SkeletonUtils.js';
import {characters} from './shared/world.mjs';

const cache=new Map(),clamp=THREE.MathUtils.clamp;
const clipAliases={Idle:/^idle(?:_|$)/i,Walk:/^walk$/i,Jump:/^jump$/i,Talk:/^talk$/i,Nod:/^nod$/i,ShakeHead:/^shakehead$/i};

export function createCharacter(g,descriptor={}){
 const model=clone(g.scene),rig=new THREE.Group();rig.add(model);model.updateMatrixWorld(true);
 const bounds=new THREE.Box3().setFromObject(model),height=descriptor.height||bounds.max.y-bounds.min.y;
 rig.scale.setScalar(.83/Math.max(.01,height));
 const bones={},morphs=[],materials=[],copies=new Map();let spec={};
 model.traverse(o=>{
  if(o.isBone)bones[o.name]=o;
  if(o.userData?.characterSpec){try{spec=typeof o.userData.characterSpec==='string'?JSON.parse(o.userData.characterSpec):o.userData.characterSpec;}catch{}}
  if(!o.isMesh)return;
  const copy=m=>{if(!copies.has(m))copies.set(m,m.clone());return copies.get(m);};
  o.material=Array.isArray(o.material)?o.material.map(copy):copy(o.material);
  if(o.morphTargetDictionary&&o.morphTargetInfluences)morphs.push(o);
 });
 materials.push(...copies.values());
 const mixer=new THREE.AnimationMixer(model),actions={};
 for(const [key,alias]of Object.entries(clipAliases)){
  const name=spec.clips?.[key],clip=g.animations.find(c=>name?c.name===name:alias.test(c.name));
  if(clip){actions[key]=mixer.clipAction(clip);if(key==='Jump')actions[key].setLoop(THREE.LoopOnce,1);actions[key].clampWhenFinished=key==='Jump';}
 }
 const head=bones[spec.bones?.head||'head']||bones.torso;
 const mouthName=spec.morphs?.mouthOpen||'mouthOpen';
 const mouths=morphs.filter(o=>o.morphTargetDictionary[mouthName]!==undefined).map(o=>({o,index:o.morphTargetDictionary[mouthName]}));
 actions.Idle?.play();
 return {rig,model,mixer,bones,materials,morphs,mouths,actions,spec,head,id:descriptor.id||'custom',
  basePosition:model.position.clone(),baseScale:model.scale.clone(),baseQuaternion:model.quaternion.clone(),
  rest:Object.values(bones).map(b=>({b,q:b.quaternion.clone(),p:b.position.clone(),s:b.scale.clone()})),
  current:'Idle',blendSpeed:0,wasAirborne:false,landing:0,
  capabilities:{head:!!head,mouth:mouths.length>0,walk:!!actions.Walk,jump:!!actions.Jump}};
}

export async function loadCharacter(id){
 const c=characters.find(c=>c.id===id)||characters[0];
 if(!cache.has(c.model))cache.set(c.model,new GLTFLoader().loadAsync(c.model).catch(e=>{cache.delete(c.model);throw e;}));
 return createCharacter(await cache.get(c.model),c);
}

function transition(item,key){
 if(item.current===key)return;
 const next=item.actions[key];if(!next)return;
 item.actions[item.current]?.fadeOut(.14);next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(.14).play();item.current=key;
}

export function animateCharacter(item,dt,motion={}){
 dt=clamp(Number(dt)||0,0,.1);const time=Number(motion.time)||0;
 for(const r of item.rest){r.b.quaternion.copy(r.q);r.b.position.copy(r.p);r.b.scale.copy(r.s);}
 item.model.position.copy(item.basePosition);item.model.scale.copy(item.baseScale);item.model.quaternion.copy(item.baseQuaternion);
 const airborne=motion.grounded===false||(Number(motion.y)||0)>.015;
 if(item.wasAirborne&&!airborne)item.landing=.18;
 item.landing=Math.max(0,item.landing-dt);
 const desired=airborne||item.landing>0?'Jump':motion.moving?'Walk':'Idle';
 transition(item,desired);
 if(desired==='Walk'&&item.actions.Walk)item.actions.Walk.timeScale=motion.running?1.45:1;
 item.mixer.update(dt);
 if(desired==='Jump'&&item.actions.Jump){
  const a=item.actions.Jump,duration=a.getClip().duration;
  a.paused=true;
  const progress=airborne?.22+.56*clamp((3.7-(Number(motion.vy)||0))/7.4,0,1):.8+.2*(1-item.landing/.18);
  a.time=duration*progress;item.mixer.update(0);
 }
 item.wasAirborne=airborne;
 // Existing geometry without Walk/Jump remains usable with a body or limb fallback.
 if(motion.moving&&!airborne&&!item.actions.Walk){
  const phase=time*(motion.running?13:9),swing=motion.running?.72:.55;
  let legs=0;
  for(const [side,sign]of [['L',1],['R',-1]]){
   const leg=item.bones['leg.'+side],arm=item.bones['arm.'+side];
   if(leg){leg.rotation.x+=Math.sin(phase)*swing*sign;legs++;}
   if(arm)arm.rotation.x-=Math.sin(phase)*swing*.7*sign;
  }
  item.model.position.y+=Math.abs(Math.sin(phase))*(legs?.025:.065);
  item.model.rotation.z+=Math.sin(phase)*(legs?.035:.16);
 }
 if(airborne&&!item.actions.Jump)item.model.scale.set(1.05,.9,1.05).multiply(item.baseScale);
 // Head input is expressed in radians. The v2 cookie and carrot have weighted head controls.
 if(item.head){item.head.rotation.y+=clamp(Number(motion.shake)||0,-.65,.65);item.head.rotation.x+=clamp(Number(motion.nod)||0,-.5,.5);}
 item.mouthValue??=0;
 const target=clamp(Number(motion.mouth)||0,0,1);
 item.mouthValue+=(target-item.mouthValue)*(1-Math.exp(-dt*24));
 for(const {o,index}of item.mouths)o.morphTargetInfluences[index]=item.mouthValue;
}

export function releaseCharacter(item){
 item.mixer.stopAllAction();item.mixer.uncacheRoot(item.model);
 item.model.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.dispose();});
 for(const material of item.materials||[])material.dispose();
 item.shadow?.removeFromParent();item.rig.removeFromParent();item.label?.remove();
}
