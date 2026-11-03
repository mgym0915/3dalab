import * as THREE from './vendor/three-r180/three.module.min.js';
import {GLTFLoader} from './vendor/three-r180/GLTFLoader.js';
import {Scene as CoreScene} from './scene-glb.mjs';

export class Scene extends CoreScene {
 constructor(world,canvas){
  super(world,canvas);this.motionSeconds=0;this.rippleLive=false;this.finish=null;this.frameBudget=innerWidth<700?1000/24:1000/30;
  this.basePosition=new THREE.Vector3(.5,2.85,7.8);this.baseTarget=new THREE.Vector3(.1,.65,-1.25);
  this.renderer.toneMappingExposure=1.2;
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)this.animate();});
 }
 async load(){
  const start=performance.now(),loader=new GLTFLoader();
  this.rooms=await Promise.all(['white','color'].map(async variant=>{
   const a=performance.now(),r=await fetch('/assets/models/classroom-'+variant+'-sun-v7.glb');if(!r.ok)throw Error('Model '+r.status);
   const bytes=await r.arrayBuffer(),downloadMs=performance.now()-a,b=performance.now(),gltf=await loader.parseAsync(bytes,'/assets/models/');
   this.metrics.parseCount++;this.metrics.models.push({variant,bytes:bytes.byteLength,downloadMs,parseMs:performance.now()-b});
   gltf.scene.traverse(o=>{if(!o.isMesh)return;const previous=o.material,lightMap=previous.emissiveMap;
    if(!previous.map||!lightMap||!o.geometry.attributes.uv1)throw Error('Sunlight lightmap or UV is missing');
    lightMap.colorSpace=THREE.NoColorSpace;previous.map.anisotropy=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());lightMap.anisotropy=previous.map.anisotropy;
    const material=new THREE.MeshBasicMaterial({map:previous.map,lightMap,lightMapIntensity:Math.PI,vertexColors:false,side:THREE.DoubleSide});
    material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );','vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\nlightMapTexel.rgb = vec3(.30) + lightMapTexel.rgb * 3.667;');};
    material.customProgramCacheKey=()=> 'baked-window-rgb3-v3';o.material=material;previous.dispose();
   });
   const scene=new THREE.Scene();scene.background=new THREE.Color('#e5edf0');scene.add(gltf.scene);return scene;
  }));
  const compile=performance.now();await Promise.all(this.rooms.map(room=>this.renderer.compileAsync(room,this.camera)));this.metrics.compileMs=performance.now()-compile;
  this.loaded=true;const submit=performance.now();this.draw();this.metrics.firstSubmitMs=performance.now()-submit;
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));this.metrics.firstFrameMs=performance.now()-start;this.metrics.navigationToFrameMs=performance.now();
  const bench=new Image();bench.src='/assets/workbench-v2.webp';await bench.decode();this.canvas.dataset.models='white,color';this.canvas.dataset.lighting='right-window-baked-rgb3';this.publishMetrics();this.animate();
 }
 renderRooms(){/* Camera updates render the required model(s) in draw(), once per frame. */}
 resize(){this.frameBudget=innerWidth<700?1000/24:1000/30;super.resize();}
 updateCamera(dt){
  this.motionSeconds+=dt;const t=this.motionSeconds;
  this.camera.position.set(this.basePosition.x+.115*Math.sin(t*Math.PI*2/70),this.basePosition.y+.028*Math.sin(t*Math.PI*2/87),this.basePosition.z+.065*(Math.cos(t*Math.PI*2/93)-1));
  this.camera.lookAt(this.baseTarget.x+.024*Math.sin(t*Math.PI*2/79),this.baseTarget.y+.014*Math.sin(t*Math.PI*2/83),this.baseTarget.z);
  this.placeCards();this.canvas.dataset.camera=JSON.stringify({time:t,position:this.camera.position.toArray(),quaternion:this.camera.quaternion.toArray()});
 }
 draw(){
  if(!this.loaded||this.disposed)return;
  const cover=(Math.hypot(this.width*.5,this.height*.54)+26)/.945;
  const mixed=this.mode==='118'&&this.radius>.5&&!(this.full&&this.radius>cover);
  this.renderer.autoClear=true;
  if(mixed){
   for(let i=0;i<2;i++){this.renderer.setRenderTarget(this.targets[i]);this.renderer.render(this.rooms[i],this.camera);this.metrics.roomRenders++;}
   this.renderer.setRenderTarget(null);super.draw();this.canvas.dataset.passes='two-aligned-models';
  }else{
   const color=this.mode==='118'&&this.full&&this.radius>cover;
   this.renderer.setRenderTarget(null);this.renderer.render(this.rooms[color?1:0],this.camera);this.metrics.roomRenders++;this.renders++;
   this.canvas.dataset.particles='0';this.canvas.dataset.reveal=String(this.radius);this.canvas.dataset.renders=String(this.renders);this.canvas.dataset.passes=color?'color-only':'white-only';
  }
  this.canvas.dataset.cameraRevision=String(this.renders);this.canvas.dataset.ripplePhase=String(this.phase);this.canvas.dataset.rippleLive=String(this.rippleLive);
 }
 preview(mode,length){
  super.preview(mode,length);this.rippleLive=mode==='118'&&length>=2;this.finish=null;this.animate();
 }
 pause(){super.pause();this.rippleLive=false;this.finish=null;this.animate();}
 animate(){
  if(this.raf||!this.loaded||this.disposed||document.hidden||this.suspended||this.mode==='3d')return;
  let previous=performance.now(),lastMetrics=previous,nextFrame=previous+this.frameBudget;
  const step=now=>{
   if(this.disposed||this.suspended||document.hidden||this.mode==='3d'){this.raf=0;this.canvas.dataset.animating='false';return;}
   const raw=now-previous;
   if(now<nextFrame-.5){this.raf=requestAnimationFrame(step);return;}
   previous=now;nextFrame+=this.frameBudget;if(nextFrame<now-.5)nextFrame=now+this.frameBudget;const dt=Math.min(raw,80);this.updateCamera(dt/1000);
   if(this.finish){
    this.finish.time+=dt/1000;const u=this.finish.time,s=this.finish.start,all=Math.hypot(this.width,this.height);
    if(u<.16)this.radius=s*(1-.045*Math.sin(u/.16*Math.PI*.5));
    else{const p=Math.min(1,(u-.16)/1.14);this.radius=s*.955+(all-s*.955)*(1-Math.pow(1-p,3));}
    this.phase+=dt*.004;
    if(u>.38&&!this.finish.glow){this.finish.glow=true;const flash=document.getElementById('entryFlash');flash.classList.remove('glow');requestAnimationFrame(()=>flash.classList.add('glow'));}
    if(u>=1.45){const resolve=this.finish.resolve;this.radius=this.target=all;this.finish=null;this.rippleLive=false;resolve?.();}
   }else if(this.rippleLive){this.radius+=(this.target-this.radius)*(1-Math.exp(-dt/210));this.phase+=dt*.0018;}
   this.updateParticles(dt/1000,this.rippleLive||!!this.finish);
   this.metrics.frames.push(raw);if(this.metrics.frames.length>500)this.metrics.frames.shift();this.draw();
   if(now-lastMetrics>1000){lastMetrics=now;this.publishMetrics();}
   this.raf=requestAnimationFrame(step);this.canvas.dataset.animating='true';
  };this.raf=requestAnimationFrame(step);this.canvas.dataset.animating='true';
 }
 async complete(mode){
  if(mode!=='118')return super.complete(mode);
  this.mode=mode;this.full=true;this.rippleLive=true;this.target=Math.hypot(this.width,this.height);
  for(let i=0;i<(innerWidth<700?32:56)&&this.particles.length<this.particleCap;i++){const a=Math.random()*Math.PI*2,r=this.radius*this.wave(a),speed=90+Math.random()*150,life=.7+Math.random()*.6;this.particles.push({x:this.width*.5+Math.cos(a)*r,y:this.height*.54+Math.sin(a)*r,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed-12,life,max:life,size:4+Math.random()*6});}
  await new Promise(resolve=>{this.finish={time:0,start:Math.max(5,this.radius),resolve,glow:false};this.animate();});
 }
 reset(){this.finish?.resolve?.();this.finish=null;this.rippleLive=false;super.reset();this.animate();}
 suspend(){super.suspend();}
 resume(){this.suspended=false;this.animate();}
 dispose(){this.disposed=true;this.finish?.resolve?.();super.dispose();}
}
