import * as THREE from './vendor/three-r180/three.module.min.js';
import {Scene as EntryScene} from './scene-sun.mjs';
import {loadCharacter,animateCharacter,releaseCharacter} from './characters.mjs';
import {freshPlayer,simulate,nearZone,zones} from './shared/world.mjs';
import {MovementPrediction} from './shared/prediction.mjs';

export class Scene extends EntryScene{
 constructor(world,canvas){
  super(world,canvas);this.actors=new Map();this.localInput={dx:0,dz:0,run:false,jump:0};this.live=false;this.day=1;this.dayTarget=1;this.followTarget=new THREE.Vector3();this.actorTime=0;this.pendingLoads=new Map();this.extra=new THREE.Group();this.rings=new Map();this.names=document.createElement('div');this.names.className='avatar-labels';this.names.hidden=true;this.world.append(this.names);this.clip=new THREE.Plane(new THREE.Vector3(0,-1,0),2.94);this.renderer.localClippingEnabled=true;this.temp=new THREE.Vector3();this.look=new THREE.Vector3();this.projected=new THREE.Vector3();this.raycaster=new THREE.Raycaster();this.qualityScale=1;this.perf=[];this.lastDebug=0;
 }
 resize(){
  if(!this.live)return super.resize();this.frameBudget=1000/(innerWidth<700?45:60);this.width=innerWidth;this.height=innerHeight;this.dpr=Math.min(devicePixelRatio||1,innerWidth<700?1.5:1.8,Math.sqrt(2600000/(innerWidth*innerHeight)))*(this.qualityScale||1);this.world.style.width=this.width+'px';this.world.style.height=this.height+'px';this.pan=0;this.applyPan();this.renderer.setPixelRatio(this.dpr);this.renderer.setSize(this.width,this.height,false);this.canvas.style.width=this.width+'px';this.canvas.style.height=this.height+'px';this.camera.aspect=this.width/this.height;this.camera.fov=innerWidth<700?54:48;this.camera.updateProjectionMatrix();
 }
 async enter(me,world){
  this.myId=me.id;this.live=true;this.worldRevision=-1;this.names.hidden=false;this.localInput={dx:0,dz:0,run:false,jump:0};this.actorTime=0;this.motion=new MovementPrediction(this.clientId,frame=>this.onInputFrame?.(frame));document.body.classList.add('interactive-118');this.rooms[1].add(this.extra);this.roomMeshes=[];this.roomMaterials=[];
  this.rooms[1].traverse(o=>{if(o.isMesh&&o.material.lightMap){o.material.clippingPlanes=[this.clip];this.roomMeshes.push(o);if(!this.roomMaterials.includes(o.material))this.roomMaterials.push(o.material);}});
  if(!this.skyLight){this.skyLight=new THREE.HemisphereLight(0xe9f3ff,0x6d6b50,2.1);this.keyLight=new THREE.DirectionalLight(0xffe5bb,2.5);this.keyLight.position.set(5,6,1);this.fillLight=new THREE.DirectionalLight(0xd6e7ff,.65);this.fillLight.position.set(-3,4,4);this.extra.add(this.skyLight,this.keyLight,this.fillLight);}
  this.buildZones();this.resize();this.receive(world);this.day=this.dayTarget;this.lastTint=null;this.animate();
 }
 buildZones(){
  if(this.rings.size)return;
  for(const zone of zones){const group=new THREE.Group(),ring=new THREE.Mesh(new THREE.RingGeometry(.26,.29,48),new THREE.MeshBasicMaterial({color:0xc8dfbf,transparent:true,opacity:.45,side:THREE.DoubleSide,depthWrite:false}));ring.rotation.x=-Math.PI/2;const x=(zone.box[0]+zone.box[1])/2,z=(zone.box[2]+zone.box[3])/2;group.position.set(x,zone.id==='light'?1.04:.807,z);group.add(ring);
   if(zone.id==='light'){ring.rotation.x=0;ring.rotation.y=Math.PI/2;group.add(new THREE.Mesh(new THREE.BoxGeometry(.035,.19,.13),new THREE.MeshBasicMaterial({color:0xe8eee4})));group.add(new THREE.Mesh(new THREE.BoxGeometry(.046,.07,.055),new THREE.MeshBasicMaterial({color:0x66806a})));}
   const label=document.createElement('button');label.type='button';label.className='zone-label';label.textContent=zone.name;label.setAttribute('aria-label','打开'+zone.name);label.onclick=()=>this.onZone?.(zone);this.names.append(label);this.extra.add(group);this.rings.set(zone.id,{group,ring,label,zone});
  }
  const canvas=document.createElement('canvas');canvas.width=768;canvas.height=540;this.rankCanvas=canvas;this.rankTexture=new THREE.CanvasTexture(canvas);this.rankTexture.colorSpace=THREE.SRGBColorSpace;const sign=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.26),new THREE.MeshBasicMaterial({map:this.rankTexture}));sign.position.set(-.65,2.18,-3.96);this.extra.add(sign);this.setRanks([]);
 }
 setRanks(rows){if(!this.rankCanvas)return;const ctx=this.rankCanvas.getContext('2d');ctx.fillStyle='#edf1e7';ctx.fillRect(0,0,768,540);ctx.fillStyle='#31493d';ctx.font='bold 48px sans-serif';ctx.fillText('总积分榜',42,70);ctx.font='29px sans-serif';if(!rows.length)ctx.fillText('暂无积分记录',42,135);for(let i=0;i<Math.min(rows.length,7);i++){const r=rows[i];ctx.fillText((i+1)+'  '+r.name.slice(0,12),42,136+i*54);ctx.textAlign='right';ctx.fillText(String(r.points),720,136+i*54);ctx.textAlign='left';}this.rankTexture.needsUpdate=true;}
 makeShadow(){
  if(!this.shadowTexture){const bytes=new Uint8Array(64*64*4);for(let y=0;y<64;y++)for(let x=0;x<64;x++){const r=Math.hypot((x-31.5)/31.5,(y-31.5)/31.5),i=(y*64+x)*4;bytes[i]=35;bytes[i+1]=39;bytes[i+2]=37;bytes[i+3]=Math.round(Math.pow(Math.max(0,1-r),2)*155);}this.shadowTexture=new THREE.DataTexture(bytes,64,64);this.shadowTexture.needsUpdate=true;}
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(.95,.7),new THREE.MeshBasicMaterial({map:this.shadowTexture,transparent:true,depthWrite:false,opacity:.75}));shadow.rotation.x=-Math.PI/2;shadow.renderOrder=1;this.extra.add(shadow);return shadow;
 }
 async addActor(data){if(this.pendingLoads.has(data.id))return;const id=data.character,promise=loadCharacter(id);this.pendingLoads.set(data.id,promise);try{const actor=await promise;if(!this.live||!this.remotePlayers?.some(p=>p.id===data.id&&p.character===id)){releaseCharacter(actor);return;}const old=this.actors.get(data.id);if(old){old.shadow?.geometry.dispose();old.shadow?.material.dispose();releaseCharacter(old);}const label=document.createElement('span');label.className='avatar-label';label.textContent=data.name;this.names.append(label);this.extra.add(actor.rig);actor.rig.position.set(data.x,data.y,data.z);actor.rig.rotation.y=data.yaw;actor.state={...data};actor.label=label;actor.character=id;actor.receivedAt=performance.now();actor.shadow=this.makeShadow();this.actors.set(data.id,actor);}catch(error){this.canvas.dataset.avatarError=error.message;}finally{this.pendingLoads.delete(data.id);const current=this.remotePlayers?.find(p=>p.id===data.id);if(current&&current.character!==this.actors.get(data.id)?.character&&this.live)this.addActor(current);}}
 receive(world){
  if(!this.live)return;if(world.instance&&world.instance!==this.serverInstance){this.serverInstance=world.instance;this.worldRevision=-1;this.motion.state=null;}if(world.revision<=this.worldRevision)return;this.worldRevision=world.revision;this.remotePlayers=world.players;this.dayTarget=world.lighting?.day?1:0;
  for(const p of world.players){const actor=this.actors.get(p.id);if(!actor||actor.character!==p.character)this.addActor(p);else{actor.state={...p};actor.receivedAt=performance.now();actor.label.textContent=p.name;}}
  for(const[id,a]of this.actors)if(!world.players.some(p=>p.id===id)){a.shadow?.geometry.dispose();a.shadow?.material.dispose();releaseCharacter(a);this.actors.delete(id);}
  const mine=world.players.find(p=>p.id===this.myId);if(mine){const result=this.motion.reconcile(mine);if(result.reset){this.localInput.jump=mine.jump;this.localInput.dx=this.localInput.dz=0;}}
  this.canvas.dataset.worldRevision=String(world.revision);
 }
 setInput(input){this.localInput={...input};}
 flushInput(){this.motion?.command({...this.localInput,dx:0,dz:0,run:false});}
 setLighting(data){this.dayTarget=data.day?1:0;}
 pickZone(x,y){if(!this.live)return null;const rect=this.canvas.getBoundingClientRect();this.raycaster.setFromCamera(new THREE.Vector2((x-rect.left)/rect.width*2-1,-(y-rect.top)/rect.height*2+1),this.camera);for(const hit of this.raycaster.intersectObjects(this.roomMeshes,false)){if(hit.point.y>2.93)continue;const p=hit.point;return zones.find(z=>p.x>=z.box[0]-.16&&p.x<=z.box[1]+.16&&p.z>=z.box[2]-.16&&p.z<=z.box[3]+.16)||null;}return null;}
 updateCamera(dt){
  if(!this.live)return super.updateCamera(dt);this.actorTime+=dt;this.motion.advance(dt,this.localInput);const me=this.motion.display(this.localInput)||freshPlayer();this.selfState=me;
  for(const[id,a]of this.actors){let s=id===this.myId?me:{...a.state};if(id!==this.myId&&s.moving){const age=Math.min(.12,(performance.now()-a.receivedAt)/1000);simulate(s,{dx:Math.sin(s.yaw),dz:Math.cos(s.yaw),run:s.running,jump:s.jump},age);}
   const blend=id===this.myId?1:1-Math.exp(-dt*20);this.temp.set(s.x,s.y,s.z);a.rig.position.lerp(this.temp,blend);const angle=Math.atan2(Math.sin(s.yaw-a.rig.rotation.y),Math.cos(s.yaw-a.rig.rotation.y));a.rig.rotation.y+=angle*blend;animateCharacter(a,dt,{...s,time:this.actorTime});a.shadow.position.set(a.rig.position.x+.035,.012,a.rig.position.z+.05);a.shadow.material.opacity=.75/(1+s.y*2);a.shadow.scale.setScalar(1+s.y*.28);
  }
  this.day+=(this.dayTarget-this.day)*(1-Math.exp(-dt/1.1));if(this.lastTint===null||Math.abs(this.day-this.lastTint)>.001){for(const material of this.roomMaterials)material.color.setRGB(.28+.72*this.day,.35+.65*this.day,.49+.51*this.day);this.skyLight.intensity=1.2+this.day;this.keyLight.intensity=.6+this.day*1.9;this.fillLight.intensity=.45+this.day*.2;this.lastTint=this.day;}
  this.temp.set(me.x*.62,4.8,me.z*.55+6.5);this.look.set(me.x*.73,.12,me.z*.72-1);this.camera.position.lerp(this.temp,1-Math.exp(-dt*7));this.followTarget.lerp(this.look,1-Math.exp(-dt*7));this.camera.lookAt(this.followTarget);this.camera.updateMatrixWorld();
  const project=(x,y,z,el)=>{this.projected.set(x,y,z).project(this.camera);const zone=el.classList.contains('zone-label'),px=(this.projected.x+1)*this.width/2,py=(1-this.projected.y)*this.height/2;el.style.transform='translate(-50%,-50%) translate('+(zone?Math.max(80,Math.min(this.width-80,px)):px).toFixed(1)+'px,'+(zone?Math.max(142,Math.min(this.height-80,py)):py).toFixed(1)+'px)';el.hidden=this.projected.z>1||this.projected.z<0;};
  for(const a of this.actors.values())project(a.rig.position.x,a.rig.position.y+.97,a.rig.position.z,a.label);
  const near=nearZone(me);for(const z of this.rings.values()){const active=z.zone.id===near?.id;z.ring.material.opacity=active?.8:.28;z.ring.scale.setScalar(active?1.2+Math.sin(this.actorTime*3)*.04:1);z.label.classList.toggle('near',active);project(z.zone.anchor[0],z.zone.anchor[1]+.18,z.zone.anchor[2],z.label);}
  if(this.near?.id!==near?.id){this.near=near;this.onNear?.(near);}
  if(performance.now()-this.lastDebug>250){this.lastDebug=performance.now();this.canvas.dataset.self=JSON.stringify({x:me.x,y:me.y,z:me.z,yaw:me.yaw,grounded:me.grounded,near:near?.id||null});this.canvas.dataset.sceneStats=JSON.stringify({dpr:this.dpr,targetFps:1000/this.frameBudget,frameMs:this.perf.length?this.perf.reduce((a,b)=>a+b,0)/this.perf.length:0,pending:this.motion.pending.length,drawCalls:this.renderer.info.render.calls});}
 }
 draw(){if(!this.live)return super.draw();if(!this.loaded||this.disposed)return;const start=performance.now();this.renderer.setRenderTarget(null);this.renderer.autoClear=true;this.renderer.render(this.rooms[1],this.camera);this.perf.push(performance.now()-start);if(this.perf.length>120)this.perf.shift();this.renders++;this.metrics.roomRenders++;this.canvas.dataset.passes='interactive-one-scene';if(this.perf.length===120&&this.renders%180===0&&this.perf.reduce((a,b)=>a+b,0)/120>17&&this.qualityScale>.7){this.qualityScale=Math.max(.7,this.qualityScale*.9);this.resize();}}
 leave(){this.live=false;this.names.hidden=true;this.myId=null;this.selfState=null;this.remotePlayers=[];for(const a of this.actors.values()){a.shadow?.geometry.dispose();a.shadow?.material.dispose();releaseCharacter(a);}this.actors.clear();for(const material of this.roomMaterials||[]){material.clippingPlanes=[];material.color.set(0xffffff);}this.extra.removeFromParent();document.body.classList.remove('interactive-118');this.names.replaceChildren();for(const z of this.rings.values())this.names.append(z.label);this.near=null;this.onNear?.(null);this.camera.fov=41.3;this.camera.updateProjectionMatrix();super.updateCamera(0);this.resize();}
 reset(){if(this.live)this.leave();super.reset();}
 dispose(){if(this.live)this.leave();super.dispose();}
}
