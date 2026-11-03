import * as THREE from './vendor/three-r180/three.module.min.js';
import {GLTFLoader} from './vendor/three-r180/GLTFLoader.js';

const vertexShader=`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const fragmentShader=`
 uniform sampler2D whiteRoom,colorRoom;uniform vec2 size;uniform float radius,phase,full;
 varying vec2 vUv;
 void main(){
  vec2 p=vec2(vUv.x,1.-vUv.y)*size-vec2(size.x*.5,size.y*.54);
  float a=atan(p.y,p.x),wave=1.+.025*sin(a*7.+phase)+.012*sin(a*17.-phase*.7)+.006*cos(a*29.+phase*.4);
  float edge=length(p)-radius*wave;
  float fill=max((1.-smoothstep(-1.,1.,edge))*step(.5,radius),full);
  vec3 white=texture2D(whiteRoom,vUv).rgb,color=texture2D(colorRoom,vUv).rgb;
  float foam=exp(-pow((edge-5.)/1.3,2.))*.5+exp(-pow((edge-16.)/1.2,2.))*.23;
  float fringe=(1.-smoothstep(0.,20.,edge))*.22;
  vec3 base=mix(white,color,max(fill,fringe*step(.5,radius)));
  base=mix(base,vec3(.96,.985,.95),foam*step(.5,radius)*(1.-full));
  gl_FragColor=vec4(base,1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
 }`;

export class Scene {
 constructor(world,canvas){
  this.world=world;this.canvas=canvas;this.mode=null;this.radius=0;this.target=0;this.pan=0;this.phase=0;this.raf=0;this.full=false;this.particles=[];this.loaded=false;this.renders=0;
  this.metrics={models:[],frames:[],roomRenders:0,parseCount:0};
  this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.NeutralToneMapping;this.renderer.toneMappingExposure=1.65;
  this.camera=new THREE.PerspectiveCamera(41.3,1.947,.1,65);
  // Blender (x,y,z) -> glTF (x,z,-y), matching the delivered reference camera.
  this.camera.position.set(.5,2.85,7.8);this.camera.lookAt(.1,.65,-1.25);
  this.screen=new THREE.Scene();this.screenCamera=new THREE.Camera();
  this.uniforms={whiteRoom:{value:null},colorRoom:{value:null},size:{value:new THREE.Vector2()},radius:{value:0},phase:{value:0},full:{value:0}};
  const simpleFragment=`uniform sampler2D room;uniform float opacity;varying vec2 vUv;void main(){gl_FragColor=vec4(texture2D(room,vUv).rgb,opacity);#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}`.replace(';#include',';\n#include');
  this.whiteMaterial=new THREE.ShaderMaterial({uniforms:{room:{value:null},opacity:{value:1}},vertexShader,fragmentShader:simpleFragment,depthTest:false,depthWrite:false});
  this.screen.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),this.whiteMaterial));
  this.fans=[.12,.25,1].map((opacity,index)=>{
   const geometry=new THREE.BufferGeometry(),positions=new Float32Array((97*3)*3),uvs=new Float32Array((97*3)*2);
   geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.BufferAttribute(uvs,2));
   const material=new THREE.ShaderMaterial({uniforms:{room:{value:null},opacity:{value:opacity}},vertexShader,fragmentShader:simpleFragment,depthTest:false,depthWrite:false,transparent:true,side:THREE.DoubleSide});
   const mesh=new THREE.Mesh(geometry,material);mesh.frustumCulled=false;mesh.renderOrder=index+1;this.screen.add(mesh);return mesh;
  });
  const ringPositions=new Float32Array(97*2*3);
  const ringGeometry=new THREE.BufferGeometry();ringGeometry.setAttribute('position',new THREE.BufferAttribute(ringPositions,3));
  this.ring=new THREE.LineSegments(ringGeometry,new THREE.LineBasicMaterial({color:0xf0fff2,transparent:true,opacity:.62,depthTest:false,depthWrite:false}));this.ring.renderOrder=5;this.ring.frustumCulled=false;this.screen.add(this.ring);
  this.particleScene=new THREE.Scene();this.particleCamera=new THREE.OrthographicCamera(0,1,0,1,-1,1);
  this.particleCap=innerWidth<700?88:144;
  const geometry=new THREE.BufferGeometry();
  this.positions=new Float32Array(this.particleCap*3);this.alphas=new Float32Array(this.particleCap);this.sizes=new Float32Array(this.particleCap);
  geometry.setAttribute('position',new THREE.BufferAttribute(this.positions,3));geometry.setAttribute('opacity',new THREE.BufferAttribute(this.alphas,1));geometry.setAttribute('diameter',new THREE.BufferAttribute(this.sizes,1));
  const particleMaterial=new THREE.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,uniforms:{pixelRatio:{value:1}},vertexShader:`attribute float opacity,diameter;uniform float pixelRatio;varying float a;void main(){a=opacity;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=diameter*pixelRatio;}`,fragmentShader:`varying float a;void main(){float r=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(.32,.65,.45,a*(1.-smoothstep(.25,1.,r)));}`,toneMapped:false});
  this.points=new THREE.Points(geometry,particleMaterial);this.points.frustumCulled=false;this.particleScene.add(this.points);
  this.resize();
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();this.pause();document.getElementById('boot').hidden=false;document.getElementById('retryBoot').hidden=false;document.getElementById('boot').style.opacity='1';});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(this.raf);this.raf=0;}else if(this.mode==='118'&&(Math.abs(this.radius-this.target)>.4||this.particles.length))this.animate();});
  window.addEventListener('pagehide',event=>{if(!event.persisted)this.dispose();});
 }
 async load(){
  const start=performance.now(),loader=new GLTFLoader();
  const models=await Promise.all(['white','color'].map(async variant=>{
   const fetchStart=performance.now(),response=await fetch('/assets/models/classroom-'+variant+'-v1.glb');if(!response.ok)throw Error('Model '+response.status);
   const bytes=await response.arrayBuffer(),download=performance.now()-fetchStart,parseStart=performance.now();
   const gltf=await loader.parseAsync(bytes,'/assets/models/');this.metrics.parseCount++;
   gltf.scene.traverse(o=>{if(o.isMesh&&!o.material.map)throw Error('Embedded model palette did not load');});
   this.metrics.models.push({variant,bytes:bytes.byteLength,downloadMs:download,parseMs:performance.now()-parseStart});
   const scene=new THREE.Scene();scene.background=new THREE.Color('#f0f0e9');
   scene.add(new THREE.HemisphereLight(0xfffaf0,0xb2aea3,2.4));
   const sun=new THREE.DirectionalLight(0xfff2d7,2.1);sun.position.set(7,6,3);scene.add(sun);
   const fill=new THREE.DirectionalLight(0xf1f5ff,.65);fill.position.set(-3,2,6);scene.add(fill);
   scene.add(gltf.scene);return scene;
  }));
  this.rooms=models;
  const compile=performance.now();await Promise.all(this.rooms.map(room=>this.renderer.compileAsync(room,this.camera)));this.metrics.compileMs=performance.now()-compile;
  this.loaded=true;const upload=performance.now();this.renderRooms();this.draw();this.metrics.firstSubmitMs=performance.now()-upload;
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));this.metrics.firstFrameMs=performance.now()-start;this.metrics.navigationToFrameMs=performance.now();
  const bench=new Image();bench.src='/assets/workbench-v2.webp';await bench.decode();
  this.canvas.dataset.models='white,color';this.publishMetrics();
 }
 resize(){
  const width=Math.max(innerWidth,innerHeight*1.947),height=innerHeight;
  const dpr=Math.min(devicePixelRatio||1,innerWidth<700?.85:1,Math.sqrt(1250000/(width*height)));
  if(this.targets&&this.width===width&&this.height===height&&this.dpr===dpr)return;
  this.width=width;this.height=height;
  this.world.style.width=this.width+'px';this.world.style.height=this.height+'px';
  this.limit=Math.max(0,(this.width-innerWidth)/2);this.pan=Math.max(-this.limit,Math.min(this.limit,this.pan||0));this.applyPan();
  this.dpr=dpr;
  this.renderer.setPixelRatio(this.dpr);this.renderer.setSize(this.width,this.height,false);
  this.canvas.style.width=this.width+'px';this.canvas.style.height=this.height+'px';
  this.camera.aspect=this.width/this.height;this.camera.updateProjectionMatrix();this.uniforms.size.value.set(this.width,this.height);
  this.particleCamera.right=this.width;this.particleCamera.bottom=this.height;this.particleCamera.updateProjectionMatrix();this.points.material.uniforms.pixelRatio.value=this.dpr;
  for(const target of this.targets||[])target.dispose();
  this.targets=[0,1].map(()=>new THREE.WebGLRenderTarget(Math.round(this.width*this.dpr),Math.round(this.height*this.dpr),{depthBuffer:true}));
  this.uniforms.whiteRoom.value=this.targets[0].texture;this.uniforms.colorRoom.value=this.targets[1].texture;this.particles=[];
  this.whiteMaterial.uniforms.room.value=this.targets[0].texture;for(const fan of this.fans)fan.material.uniforms.room.value=this.targets[1].texture;
  if(this.full)this.target=this.radius=Math.hypot(this.width,this.height);
  if(this.loaded){this.renderRooms();this.draw();}this.placeCards();
 }
 renderRooms(){
  // The GLB geometry is actually rendered at load/resize. A fixed room needs no idle loop.
  this.renderer.autoClear=true;
  for(let i=0;i<2;i++){this.renderer.setRenderTarget(this.targets[i]);this.renderer.render(this.rooms[i],this.camera);this.metrics.roomRenders++;}
  this.renderer.setRenderTarget(null);
 }
 placeCards(){
  this.camera.updateMatrixWorld();
  const project=(selector,p)=>{const card=this.world.querySelector(selector);if(!card)return;const point=new THREE.Vector3(...p).project(this.camera);card.style.left=Math.max(20,Math.min(this.width-238,(point.x+1)*this.width/2-109))+'px';card.style.top=((1-point.y)*this.height/2-40)+'px';};
  project('.board-hotspot',[-4.7,1.65,0]);project('.games-hotspot',[-.45,1.23,.3]);
 }
 applyPan(){this.world.style.setProperty('--pan',this.pan+'px');}
 move(delta){this.pan=Math.max(-this.limit,Math.min(this.limit,this.pan+delta));this.applyPan();}
 halfRadius(){
  let low=0,high=Math.hypot(innerWidth,innerHeight);const cx=innerWidth/2,cy=innerHeight*.54;
  for(let n=0;n<22;n++){const r=(low+high)/2;let area=0;for(let y=0;y<innerHeight;y+=4){const q=r*r-(y+2-cy)**2;if(q>0){const dx=Math.sqrt(q);area+=Math.max(0,Math.min(innerWidth,cx+dx)-Math.max(0,cx-dx))*4;}}if(area<innerWidth*innerHeight*.5)low=r;else high=r;}
  return(low+high)/2;
 }
 preview(mode,length){
  const layer=document.getElementById('benchLayer'),head=this.world.querySelector('.print-head');for(const el of[layer,head])for(const key of['transition','clip-path','top'])el.style.removeProperty(key);
  this.mode=mode;this.full=false;document.body.classList.toggle('print-active',mode==='3d'&&length>=2);document.body.classList.toggle('mode-3d',mode==='3d');document.body.classList.toggle('mode-118',mode==='118');
  if(mode==='118'){
   this.target=length<2?0:this.halfRadius()*(.2+.8*Math.min(length-2,6)/6);
   if(length<2){this.radius=0;this.particles=[];cancelAnimationFrame(this.raf);this.raf=0;this.draw();}else this.animate();
  }else{cancelAnimationFrame(this.raf);this.raf=0;this.target=this.radius=0;this.particles=[];this.draw();const progress=length<2?0:[0,0,.16,.32,.48,.7,.86][Math.min(length,6)];this.world.style.setProperty('--print-progress',String(progress));}
 }
 pause(){
  cancelAnimationFrame(this.raf);this.raf=0;this.target=this.radius;this.particles=[];this.draw();
  if(this.mode==='3d'){const layer=document.getElementById('benchLayer'),head=this.world.querySelector('.print-head'),clip=getComputedStyle(layer).clipPath,top=getComputedStyle(head).top;layer.style.transition='none';layer.style.clipPath=clip;head.style.transition='none';head.style.top=top;}
 }
 wave(a){return 1+.025*Math.sin(a*7+this.phase)+.012*Math.sin(a*17-this.phase*.7)+.006*Math.cos(a*29+this.phase*.4);}
 updateParticles(dt,moving){
  this.particles=this.particles.filter(p=>(p.life-=dt)>0);for(const p of this.particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy-=5*dt;}
  if(moving&&this.radius>2){for(let i=0;i<Math.min(5,Math.ceil(dt*95))&&this.particles.length<this.particleCap;i++){const angle=Math.random()*Math.PI*2,r=this.radius*this.wave(angle)+Math.random()*18,speed=12+Math.random()*26,life=.45+Math.random()*.7;this.particles.push({x:this.width/2+Math.cos(angle)*r,y:this.height*.54+Math.sin(angle)*r,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-8,life,max:life,size:4+Math.random()*5});}}
 }
 draw(){
  if(!this.loaded)return;
  this.uniforms.radius.value=this.mode==='118'?this.radius:0;this.uniforms.phase.value=this.phase;this.uniforms.full.value=this.mode==='118'&&this.full&&this.radius>Math.hypot(this.width,this.height)*.95?1:0;
  const radius=this.mode==='118'?this.radius:0,complete=this.full&&radius>Math.hypot(this.width,this.height)*.95;
  for(let f=0;f<this.fans.length;f++){
   const fan=this.fans[f];fan.visible=radius>.5;if(!fan.visible)continue;
   const r=complete?Math.hypot(this.width,this.height):radius+[19,10,0][f],positions=fan.geometry.attributes.position.array,uvs=fan.geometry.attributes.uv.array;
   const set=(index,x,y)=>{positions[index*3]=x/this.width*2-1;positions[index*3+1]=1-y/this.height*2;uvs[index*2]=x/this.width;uvs[index*2+1]=1-y/this.height;};
   for(let i=0;i<97;i++){set(i*3,this.width/2,this.height*.54);for(let j=0;j<2;j++){const a=(i+j)/97*Math.PI*2,w=r*this.wave(a);set(i*3+j+1,this.width/2+Math.cos(a)*w,this.height*.54+Math.sin(a)*w);}}
   fan.geometry.attributes.position.needsUpdate=true;fan.geometry.attributes.uv.needsUpdate=true;
  }
  this.ring.visible=radius>.5&&!complete;
  if(this.ring.visible){const p=this.ring.geometry.attributes.position.array;for(let i=0;i<97;i++)for(let j=0;j<2;j++){const a=(i+j)/97*Math.PI*2,r=(radius+5)*this.wave(a),k=(i*2+j)*3;p[k]=(this.width/2+Math.cos(a)*r)/this.width*2-1;p[k+1]=1-(this.height*.54+Math.sin(a)*r)/this.height*2;}this.ring.geometry.attributes.position.needsUpdate=true;}
  this.renderer.autoClear=true;this.renderer.render(this.screen,this.screenCamera);this.renders++;
  const active=this.mode==='118'?this.particles:[];
  for(let i=0;i<this.particleCap;i++){const p=active[i];this.positions[i*3]=p?.x||0;this.positions[i*3+1]=p?.y||0;this.alphas[i]=p?Math.sin(Math.PI*p.life/p.max)*.85:0;this.sizes[i]=p?.size||0;}
  for(const a of Object.values(this.points.geometry.attributes))a.needsUpdate=true;
  if(active.length){this.points.geometry.setDrawRange(0,active.length);this.renderer.autoClear=false;this.renderer.render(this.particleScene,this.particleCamera);}
  this.canvas.dataset.particles=String(active.length);this.canvas.dataset.reveal=String(this.radius);this.canvas.dataset.animating=String(!!this.raf);this.canvas.dataset.renders=String(this.renders);
 }
 publishMetrics(){
  const frames=this.metrics.frames,sort=[...frames].sort((a,b)=>a-b);
  this.canvas.dataset.performance=JSON.stringify({...this.metrics,frames:undefined,frameSamples:frames.length,frameMedianMs:sort[Math.floor(sort.length*.5)]||0,frameP95Ms:sort[Math.floor(sort.length*.95)]||0,compositeRenders:this.renders,pixelRatio:this.dpr,renderPixels:this.targets[0].width*this.targets[0].height,particleCap:this.particleCap,gpuResources:this.renderer.info.memory,programs:this.renderer.info.programs?.length,jsHeapBytes:performance.memory?.usedJSHeapSize,modelTransfers:performance.getEntriesByType('resource').filter(r=>r.name.includes('.glb')).map(r=>({url:r.name,encodedBytes:r.encodedBodySize,decodedBytes:r.decodedBodySize,transferBytes:r.transferSize,durationMs:r.duration}))});
 }
 animate(){
  if(this.raf||document.hidden||this.suspended)return;let previous=performance.now();
  const step=now=>{const raw=now-previous,dt=Math.min(raw,40);previous=now;const distance=this.target-this.radius,moving=Math.abs(distance)>.4;
   if(moving){this.radius+=distance*(1-Math.exp(-dt/(this.full?530:210)));this.phase+=dt*.0015;}else this.radius=this.target;
   this.metrics.frames.push(raw);if(this.metrics.frames.length>500)this.metrics.frames.shift();this.updateParticles(dt/1000,moving);this.draw();
   if(moving||this.particles.length)this.raf=requestAnimationFrame(step);else{this.raf=0;this.canvas.dataset.animating='false';this.publishMetrics();}
  };this.raf=requestAnimationFrame(step);
 }
 async complete(mode){
  this.mode=mode;this.full=true;
  if(mode==='118'){this.target=Math.hypot(this.width,this.height);this.animate();await new Promise(resolve=>setTimeout(resolve,1100));document.getElementById('entryFlash').classList.remove('glow');requestAnimationFrame(()=>document.getElementById('entryFlash').classList.add('glow'));}
  else{document.body.classList.add('print-finishing');this.world.style.setProperty('--print-progress','1');await new Promise(resolve=>setTimeout(resolve,900));document.body.classList.add('print-refining');await new Promise(resolve=>setTimeout(resolve,1500));document.body.classList.add('print-finished');}
 }
 reset(){
  cancelAnimationFrame(this.raf);this.raf=0;this.suspended=false;this.mode=null;this.full=false;this.radius=this.target=0;this.pan=0;this.particles=[];this.applyPan();for(const el of[document.getElementById('benchLayer'),this.world.querySelector('.print-head')])for(const key of['transition','clip-path','top'])el.style.removeProperty(key);
  this.world.style.setProperty('--print-progress','0');document.body.classList.remove('mode-118','mode-3d','print-active','print-finishing','print-refining','print-finished');document.getElementById('entryFlash').classList.remove('glow');this.draw();this.publishMetrics();
 }
 suspend(){this.suspended=true;cancelAnimationFrame(this.raf);this.raf=0;this.canvas.dataset.animating='false';}
 resume(){this.suspended=false;if(this.mode==='118'&&(Math.abs(this.radius-this.target)>.4||this.particles.length))this.animate();}
 dispose(){cancelAnimationFrame(this.raf);for(const t of this.targets)t.dispose();const geometries=new Set(),materials=new Set(),textures=new Set();for(const s of[...this.rooms||[],this.screen,this.particleScene])s.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of(Array.isArray(o.material)?o.material:[o.material]).filter(Boolean)){materials.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v);}});for(const g of geometries)g.dispose();for(const m of materials)m.dispose();for(const t of textures){t.dispose();t.source?.data?.close?.();}this.renderer.dispose();}
}
