import * as T from './vendor/three.module.js';

const TAU=Math.PI*2,UP=new T.Vector3(0,1,0);
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const lerp=T.MathUtils.lerp;
const palette={0:'#e6bd62',5:'#b99bea',8:'#8fdbcf',9:'#8fdbcf',10:'#8fdbcf',11:'#e6b0c3',12:'#e6b0c3',pair:'#b7e6b5',triple:'#f5b6dd',gamble:'#ffb263','1213':'#ebc5ff'};
const abilityName={0:'乾坤大挪移',5:'乱序',8:'偷看',9:'偷看',10:'偷看',11:'盲换',12:'盲换'};
function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function star(ctx,x,y,r){ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,s=i%2?r*.24:r;const px=x+Math.cos(a)*s,py=y+Math.sin(a)*s;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();ctx.fill();}
function cat(ctx,x,y,size,color='#d8c897',sleep=false){
  ctx.save();ctx.translate(x,y);ctx.scale(size/100,size/100);
  ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-34,-12);ctx.lineTo(-39,-48);ctx.quadraticCurveTo(-41,-56,-31,-49);ctx.lineTo(-12,-35);ctx.quadraticCurveTo(0,-39,12,-35);ctx.lineTo(31,-49);ctx.quadraticCurveTo(41,-56,39,-48);ctx.lineTo(34,-12);ctx.bezierCurveTo(62,32,33,51,0,51);ctx.bezierCurveTo(-33,51,-62,32,-34,-12);ctx.fill();
  ctx.fillStyle='#c89077';ctx.beginPath();ctx.moveTo(-32,-38);ctx.lineTo(-28,-15);ctx.lineTo(-16,-29);ctx.fill();ctx.beginPath();ctx.moveTo(32,-38);ctx.lineTo(28,-15);ctx.lineTo(16,-29);ctx.fill();
  ctx.strokeStyle='#31493a';ctx.fillStyle='#31493a';ctx.lineWidth=3.2;ctx.lineCap='round';
  if(sleep){ctx.beginPath();ctx.moveTo(-25,7);ctx.quadraticCurveTo(-18,15,-11,7);ctx.moveTo(11,7);ctx.quadraticCurveTo(18,15,25,7);ctx.stroke();}
  else{ctx.beginPath();ctx.ellipse(-18,9,2,5,0,0,TAU);ctx.ellipse(18,9,2,5,0,0,TAU);ctx.fill();}
  ctx.beginPath();ctx.moveTo(-3,19);ctx.lineTo(0,22);ctx.lineTo(3,19);ctx.stroke();ctx.beginPath();ctx.moveTo(0,22);ctx.quadraticCurveTo(-3,31,-10,25);ctx.moveTo(0,22);ctx.quadraticCurveTo(3,31,10,25);ctx.stroke();
  ctx.fillStyle='#d99987';ctx.globalAlpha=.65;ctx.beginPath();ctx.ellipse(-28,21,6,3,0,0,TAU);ctx.ellipse(28,21,6,3,0,0,TAU);ctx.fill();ctx.restore();
}
function glyph(ctx,v,x,y,s,color){
  ctx.save();ctx.translate(x,y);ctx.scale(s/100,s/100);ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2.7;ctx.lineCap='round';ctx.lineJoin='round';
  if([8,9,10].includes(v)){
    ctx.beginPath();ctx.moveTo(-47,0);ctx.bezierCurveTo(-20,-44,20,-44,47,0);ctx.bezierCurveTo(20,44,-20,44,-47,0);ctx.stroke();ctx.beginPath();ctx.arc(0,0,13,0,TAU);ctx.stroke();ctx.fillStyle=color;star(ctx,0,0,6);
  }else if([11,12].includes(v)){
    ctx.beginPath();ctx.moveTo(-42,-18);ctx.lineTo(41,-18);ctx.lineTo(23,-34);ctx.moveTo(41,-18);ctx.lineTo(24,-2);ctx.moveTo(42,20);ctx.lineTo(-41,20);ctx.lineTo(-23,3);ctx.moveTo(-41,20);ctx.lineTo(-24,36);ctx.stroke();
  }else if(v===5){
    ctx.beginPath();for(let i=0;i<160;i++){const a=i*.09,r=2+i*.23;const px=Math.cos(a)*r,py=Math.sin(a)*r;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();
  }else if(v===0){
    ctx.beginPath();ctx.ellipse(0,0,44,18,-.6,0,TAU);ctx.ellipse(0,0,44,18,.6,0,TAU);ctx.stroke();star(ctx,0,0,14);
  }ctx.restore();
}
function roundedShape(w,h,r){const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;}

export class TableStage {
  constructor(container){
    this.container=container;this.speed=1;this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;this.cards=new Map();this.textures=new Map();this.effects=[];this.tweens=new Set();this.lastTime=performance.now();this.elapsed=0;this.pointer=new T.Vector2();this.mouse={x:0,y:0};this.currentEffect=0;this.bannerTimer=0;this.disposed=false;this.dirty=true;this.anchors=[];
    this.scene=new T.Scene();this.scene.background=new T.Color('#102628');this.scene.fog=new T.FogExp2('#102628',.022);
    this.camera=new T.PerspectiveCamera(39,innerWidth/innerHeight,.1,100);this.camera.position.set(0,11.5,12);this.camera.lookAt(0,0,0);
    this.renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));this.renderer.setSize(innerWidth,innerHeight);this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.1;this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFShadowMap;container.append(this.renderer.domElement);
    this.renderer.domElement.setAttribute('aria-hidden','true');this.renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();document.getElementById('engineError').hidden=false;});
    this.artReady=new Promise(resolve=>{this.artManager=new T.LoadingManager(resolve);for(const v of [null,...Array(14).keys()])this.cardTexture(v);});
    this.cardGeometry=new T.ExtrudeGeometry(roundedShape(1.146,1.49,.095),{depth:.035,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.014,bevelThickness:.012,curveSegments:5});
    this.cardPlane=new T.ShapeGeometry(roundedShape(1.146,1.49,.095));
    // ShapeGeometry UVs are in world coordinates. Use normalized UVs for artwork.
    const uv=this.cardPlane.getAttribute('uv'),pos=this.cardPlane.getAttribute('position');for(let i=0;i<uv.count;i++)uv.setXY(i,(pos.getX(i)+.573)/1.146,(pos.getY(i)+.745)/1.49);
    this.buildEnvironment();this.buildTable();this.buildProps();this.addAmbientParticles();
    this.ray=new T.Raycaster();this.plane=new T.Plane(UP,-.17);this.selectionRings=[];
    this.onResize=()=>{this.resize();this.dirty=true;};window.addEventListener('resize',this.onResize);
    this.onPointer=e=>{this.mouse.x=(e.clientX/innerWidth-.5)*2;this.mouse.y=(e.clientY/innerHeight-.5)*2;};window.addEventListener('pointermove',this.onPointer,{passive:true});
    this.onMutate=new MutationObserver(()=>{this.dirty=true;});this.onMutate.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','disabled','hidden','aria-pressed']});
    this.resize();this.animate=this.animate.bind(this);requestAnimationFrame(this.animate);
  }
  buildEnvironment(){
    this.scene.add(new T.HemisphereLight('#c5e8db','#263c2a',1.7));
    const key=new T.DirectionalLight('#ffedcd',2.8);key.position.set(-4,11,5);key.castShadow=true;key.shadow.mapSize.set(1536,1536);Object.assign(key.shadow.camera,{left:-10,right:10,top:9,bottom:-9,near:1,far:26});key.shadow.bias=-.0007;key.shadow.normalBias=.03;this.scene.add(key);
    const cool=new T.PointLight('#8ac4b2',26,20,2);cool.position.set(6,5,-4);this.scene.add(cool);
    this.fxLight=new T.PointLight('#ffdb9d',0,15,1.6);this.fxLight.position.set(0,3,0);this.scene.add(this.fxLight);
    const floor=new T.Mesh(new T.PlaneGeometry(150,150),new T.MeshStandardMaterial({color:'#122e2c',roughness:.92}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.3;floor.receiveShadow=true;this.scene.add(floor);
    const wall=new T.Mesh(new T.PlaneGeometry(80,20),new T.MeshStandardMaterial({color:'#153a33',roughness:.95}));wall.position.set(0,4,-10);this.scene.add(wall);
    for(let i=-5;i<=5;i++){
      const panel=new T.Mesh(new T.BoxGeometry(.025,10,.06),new T.MeshStandardMaterial({color:'#345247',roughness:.75}));panel.position.set(i*2.7,3,-9.9);this.scene.add(panel);
    }
    // Warm wall orbs and their soft halos frame the table.
    for(const x of [-8,-5,5,8]){const z=x===-8||x===8?-6:-8;
      const bulb=new T.Mesh(new T.SphereGeometry(.11,16,12),new T.MeshBasicMaterial({color:'#ffe2ac'}));bulb.position.set(x,4.6,z);this.scene.add(bulb);
      const glow=new T.Sprite(new T.SpriteMaterial({map:this.glowTexture(),color:'#f4cc91',transparent:true,opacity:.65,depthWrite:false,blending:T.AdditiveBlending}));glow.position.copy(bulb.position);glow.scale.set(2.3,2.3,1);this.scene.add(glow);
    }
  }
  buildTable(){
    const start=this.scene.children.length;
    const wood=this.canvasTexture(512,512,(c,w,h)=>{c.fillStyle='#574333';c.fillRect(0,0,w,h);for(let i=0;i<280;i++){const y=i*2;c.strokeStyle=`rgba(${i%2?95:26},${i%2?72:29},${i%2?42:22},.11)`;c.lineWidth=Math.random()*2+.5;c.beginPath();c.moveTo(0,y);c.bezierCurveTo(170,y+Math.sin(i)*7,340,y-4,512,y+2);c.stroke();}});wood.wrapS=wood.wrapT=T.RepeatWrapping;wood.repeat.set(3,2);
    const table=new T.Mesh(new T.CylinderGeometry(1,1,.52,128),new T.MeshStandardMaterial({map:wood,color:'#9a7e5b',roughness:.48,metalness:.03}));table.scale.set(7.6,1,4.7);table.position.y=-.27;table.receiveShadow=true;table.castShadow=true;this.scene.add(table);
    const trim=this.ellipseTube(7.41,4.53,.038,.03,'#c5a566',.55);this.scene.add(trim);
    const felt=this.canvasTexture(512,512,(c,w,h)=>{c.fillStyle='#245448';c.fillRect(0,0,w,h);const image=c.getImageData(0,0,w,h);for(let i=0;i<image.data.length;i+=4){const n=(Math.random()-.5)*16;image.data[i]+=n;image.data[i+1]+=n;image.data[i+2]+=n;}c.putImageData(image,0,0);});felt.wrapS=felt.wrapT=T.RepeatWrapping;felt.repeat.set(7,4);
    const cushion=new T.Mesh(new T.CylinderGeometry(1,1,.085,128),new T.MeshStandardMaterial({map:felt,roughness:.98,color:'#c1d9b9'}));cushion.scale.set(7.05,1,4.23);cushion.position.y=.005;cushion.receiveShadow=true;this.scene.add(cushion);
    this.scene.add(this.ellipseTube(6.93,4.14,.018,.054,'#c1ba81',.23));
    const points=[];for(let i=0;i<250;i++){const a=i/250*TAU;points.push(new T.Vector3(Math.cos(a)*6.82,.061,Math.sin(a)*4.02));points.push(new T.Vector3(Math.cos(a+.009)*6.82,.061,Math.sin(a+.009)*4.02));}
    const stitch=new T.LineSegments(new T.BufferGeometry().setFromPoints(points),new T.LineBasicMaterial({color:'#b1bb87',transparent:true,opacity:.32}));this.scene.add(stitch);
    const emblem=this.canvasTexture(768,768,(c,w,h)=>{c.translate(w/2,h/2);c.strokeStyle='#b7c290';c.fillStyle='#b7c290';c.globalAlpha=.33;c.lineWidth=2;c.beginPath();c.arc(0,0,240,0,TAU);c.stroke();c.globalAlpha=.17;c.beginPath();c.arc(0,0,225,0,TAU);c.stroke();cat(c,0,-5,170,'#b7c290',true);c.globalAlpha=.38;c.font='18px Georgia';c.textAlign='center';c.fillText('猫 猫 牌',0,150);for(let i=0;i<8;i++){const a=i/8*TAU;star(c,Math.cos(a)*270,Math.sin(a)*270,9);}});
    const seal=new T.Mesh(new T.PlaneGeometry(4.4,4.4),new T.MeshBasicMaterial({map:emblem,transparent:true,depthWrite:false,opacity:.55}));seal.rotation.x=-Math.PI/2;seal.position.set(0,.057,0);this.scene.add(seal);
    const rim=new T.Mesh(new T.TorusGeometry(1,.1,8,100),new T.MeshStandardMaterial({color:'#483e2d',roughness:.7}));rim.rotation.x=Math.PI/2;rim.scale.set(7.65,4.72,1);rim.position.y=-.17;this.scene.add(rim);
    this.tableGroup=new T.Group();this.tableGroup.add(...this.scene.children.slice(start));this.scene.add(this.tableGroup);
  }
  ellipseTube(rx,rz,r,y,color,metalness=.2){const p=[];for(let i=0;i<=128;i++){const a=i/128*TAU;p.push(new T.Vector3(Math.cos(a)*rx,y,Math.sin(a)*rz));}return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(p,true),128,r,6,true),new T.MeshStandardMaterial({color,metalness,roughness:.4}));}
  buildProps(){
    const start=this.scene.children.length;
    // Little ceramic cats, a tea cup, and a brass lamp keep the scene tactile.
    for(const [x,z,color,rot]of[[-5.05,-2.2,'#e5d6ae',.5],[5,-2.25,'#d9b991',-.5]]){
      const g=new T.Group(),mat=new T.MeshStandardMaterial({color,roughness:.34,metalness:.02});
      const body=new T.Mesh(new T.SphereGeometry(.38,28,20),mat);body.scale.set(1,.96,.86);body.position.y=.43;body.castShadow=true;g.add(body);
      const head=new T.Mesh(new T.SphereGeometry(.34,28,20),mat);head.scale.set(1,.84,.87);head.position.set(0,.91,.02);head.castShadow=true;g.add(head);
      for(const sx of [-1,1]){const ear=new T.Mesh(new T.ConeGeometry(.12,.26,3),mat);ear.position.set(sx*.24,1.17,.025);ear.rotation.z=-sx*.2;g.add(ear);
        const inner=new T.Mesh(new T.ConeGeometry(.065,.15,3),new T.MeshStandardMaterial({color:'#bd8e79',roughness:.6}));inner.position.set(sx*.24,1.18,.075);g.add(inner);
        const eye=new T.Mesh(new T.SphereGeometry(.022,10,8),new T.MeshStandardMaterial({color:'#354c3c',roughness:.4}));eye.scale.set(.7,1.5,.5);eye.position.set(sx*.125,.94,.296);g.add(eye);
        const cheek=new T.Mesh(new T.SphereGeometry(.055,12,8),new T.MeshStandardMaterial({color:'#d2a18f',roughness:.6}));cheek.scale.set(1,.4,.13);cheek.position.set(sx*.23,.86,.25);g.add(cheek);
      }
      const nose=new T.Mesh(new T.SphereGeometry(.025,10,8),new T.MeshStandardMaterial({color:'#967e5e',roughness:.5}));nose.position.set(0,.86,.31);g.add(nose);
      const bell=new T.Mesh(new T.SphereGeometry(.065,16,10),new T.MeshStandardMaterial({color:'#d6af55',metalness:.75,roughness:.24}));bell.position.set(0,.58,.32);g.add(bell);
      g.position.set(x,.07,z);g.rotation.y=rot;g.scale.setScalar(.9);this.scene.add(g);
    }
    const brass=new T.MeshStandardMaterial({color:'#aa8b52',metalness:.72,roughness:.32}),ceramic=new T.MeshStandardMaterial({color:'#b7c7a4',roughness:.28});
    const lamp=new T.Group();lamp.position.set(-5.3,.07,1.95);
    const base=new T.Mesh(new T.CylinderGeometry(.38,.44,.1,32),brass);base.position.y=.06;lamp.add(base);
    const stem=new T.Mesh(new T.CylinderGeometry(.027,.035,1.6,16),brass);stem.position.y=.82;lamp.add(stem);
    const shade=new T.Mesh(new T.ConeGeometry(.62,.72,40,1,true),new T.MeshStandardMaterial({color:'#ded4ae',roughness:.62,side:T.DoubleSide}));shade.position.y=1.7;lamp.add(shade);
    const shadeCap=new T.Mesh(new T.SphereGeometry(.07,14,10),brass);shadeCap.position.y=2.1;lamp.add(shadeCap);
    const bulb=new T.PointLight('#ffe1a4',8,7,2);bulb.position.y=1.55;lamp.add(bulb);this.scene.add(lamp);
    const cup=new T.Group();cup.position.set(5.15,.08,1.8);const saucer=new T.Mesh(new T.CylinderGeometry(.46,.4,.055,36),ceramic);cup.add(saucer);const vessel=new T.Mesh(new T.CylinderGeometry(.28,.22,.42,36,1,true),ceramic);vessel.position.y=.24;cup.add(vessel);
    const tea=new T.Mesh(new T.CircleGeometry(.255,32),new T.MeshStandardMaterial({color:'#70593a',roughness:.24,metalness:.1}));tea.rotation.x=-Math.PI/2;tea.position.y=.42;cup.add(tea);
    const handle=new T.Mesh(new T.TorusGeometry(.15,.037,8,20,Math.PI*1.5),ceramic);handle.position.set(.28,.25,0);handle.rotation.z=-Math.PI*.75;cup.add(handle);this.scene.add(cup);
    // Small table-side plants are low-poly leaves with real shadows.
    for(const x of [-6,6]){const pot=new T.Mesh(new T.CylinderGeometry(.3,.23,.4,24),new T.MeshStandardMaterial({color:'#a9916d',roughness:.8}));pot.position.set(x,.28,-.65);this.scene.add(pot);for(let i=0;i<7;i++){const a=i/7*TAU,leaf=new T.Mesh(new T.SphereGeometry(.22,10,8),new T.MeshStandardMaterial({color:i%2?'#64875d':'#87a16e',roughness:.82}));leaf.scale.set(.45,1.7,.8);leaf.position.set(x+Math.cos(a)*.18,.65+Math.sin(i)*.08,-.65+Math.sin(a)*.18);leaf.rotation.z=Math.cos(a)*.5;leaf.rotation.x=Math.sin(a)*.5;this.scene.add(leaf);}}
    this.propsGroup=new T.Group();this.propsGroup.add(...this.scene.children.slice(start));this.scene.add(this.propsGroup);
  }
  canvasTexture(w,h,draw){const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;draw(canvas.getContext('2d'),w,h);const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());return texture;}
  glowTexture(){if(this._glow)return this._glow;return this._glow=this.canvasTexture(128,128,(c,w,h)=>{const g=c.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'#ffffff');g.addColorStop(.14,'#ffffffaa');g.addColorStop(.4,'#ffffff30');g.addColorStop(1,'#ffffff00');c.fillStyle=g;c.fillRect(0,0,w,h);});}
  cardTexture(value=null){
    const key=value===null?'back':value;if(this.textures.has(key))return this.textures.get(key);
    const texture=new T.TextureLoader(this.artManager).load(new URL('./cards/card-'+key+'.webp',import.meta.url).href,()=>{this.dirty=true;},undefined,()=>{const error=document.getElementById('engineError');error.querySelector('strong').textContent='卡面加载失败';error.querySelector('p').textContent='请刷新页面重试。';error.hidden=false;});
    texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());this.textures.set(key,texture);return texture;
  }
  makeCard(value=null){
    const root=new T.Group(),pivot=new T.Group();root.add(pivot);
    const edge=new T.Mesh(this.cardGeometry,new T.MeshStandardMaterial({color:'#e4dcc2',roughness:.4,metalness:.04}));edge.castShadow=true;edge.receiveShadow=true;pivot.add(edge);
    const front=new T.Mesh(this.cardPlane,new T.MeshBasicMaterial({map:this.cardTexture(value),toneMapped:false}));front.position.z=.06;front.castShadow=true;pivot.add(front);
    const back=new T.Mesh(this.cardPlane,new T.MeshBasicMaterial({map:this.cardTexture(null),toneMapped:false}));back.position.z=-.018;back.rotation.y=Math.PI;pivot.add(back);
    root.rotation.x=-Math.PI/2;root.userData={pivot,front,back,value,lift:0,active:false,outline:null};
    this.scene.add(root);return root;
  }
  disposeCard(root){this.scene.remove(root);root.traverse(o=>{if(o.isMesh&&o.material)o.material.dispose();});}
  valueOf(el){if(!el?.classList.contains('card-face'))return null;const text=el.querySelector('.card-corner')?.textContent||'0',v=parseInt(text,10);return Number.isFinite(v)?v:null;}
  parseHTML(html){const template=document.createElement('template');template.innerHTML=html;return this.valueOf(template.content.firstElementChild);}
  descriptors(){
    const rows=[],mobile=this.camera.aspect<.8,scale=mobile?Math.min(2.3,.9/this.camera.aspect):1;
    const count=Number(document.body.dataset.players)||2,multiMobile=mobile&&count>=2;
    this.tableGroup.scale.z=multiMobile?1.85:1;this.propsGroup.visible=!multiMobile;
    const places=multiMobile?(count===2?[[0,6.4,0],[0,-5.2,0]]:count===3?[[0,6.4,0],[3.5,-4.5,0],[-3.5,-4.5,0]]:count===4?[[0,6.4,0],[4.35,.6,0],[0,-5.2,0],[-4.35,.6,0]]:[[0,6.4,0],[4.35,.6,0],[3.45,-5.2,0],[-3.45,-5.2,0],[-4.35,.6,0]]):count===3?[[0,2.65,0],[3.55,-1.1,.95],[-3.55,-1.1,-.95]]:count===4?[[0,2.65,0],[4,0,Math.PI/2],[0,-2.6,0],[-4,0,-Math.PI/2]]:[[0,2.65,0],[4.15,.9,1.35],[2.05,-2.6,.22],[-2.05,-2.6,-.22],[-4.15,.9,-1.35]];
    for(let actor=0;actor<count;actor++){
      const id=actor===0?'playerHand':actor===1?'aiHand':'peerHand'+actor;
      const list=[...document.querySelectorAll('#'+id+' .card')],n=list.length,spacing=mobile?Math.min(1.3*scale,10.8/Math.max(n,1)):Math.min(1.3,7.3/Math.max(n,1));
      list.forEach((el,i)=>{
        if(count>2||mobile){
          const [cx,cz,angle]=places[actor],s=actor===0?(mobile?2:.92):(mobile?1.34:.72),step=multiMobile?Math.min(actor===0?2.1:1.48,(actor===0?9:6)/Math.max(n,1)):Math.min(actor===0?1.15:.86,3.6/Math.max(n,1)),offset=(i-(n-1)/2)*step;
          rows.push({el,kind:'hand',actor,index:i,scale:s,pos:new T.Vector3(cx+Math.cos(angle)*offset,.18,cz-Math.sin(angle)*offset),angle,tilt:actor===0?.12:0});
        }else{
          const x=(i-(n-1)/2)*spacing;rows.push({el,kind:'hand',actor,index:i,scale,pos:new T.Vector3(x,.17+(actor===0?.02:0),actor===0?(mobile?3.2:2.48):(mobile?-3.05:-2.3)),angle:actor===0?-(i-(n-1)/2)*.045:(i-(n-1)/2)*.018,tilt:actor===0?.12:0});
        }
      });
    }
    const deck=document.querySelector('#deckBtn .card'),discard=document.querySelector('#discardCard .card'),drawn=document.querySelector('#drawnCard .card');
    const pileScale=multiMobile?1.6:scale;
    if(deck)rows.push({el:deck,button:document.getElementById('deckBtn'),kind:'deck',scale:pileScale,pos:new T.Vector3(multiMobile?0:mobile?-2.25:-1.35,.23,multiMobile?-1.5:-.13),angle:.035,tilt:0});
    if(discard)rows.push({el:discard,button:document.getElementById('discardBtn'),kind:'discard',scale:pileScale,pos:new T.Vector3(multiMobile?0:.25,.19,multiMobile?1.5:-.13),angle:-.07,tilt:0});
    if(drawn){
      const actor=Number(document.getElementById('drawnTray')?.dataset.actor)||0,seat=rows.filter(d=>d.kind==='hand'&&d.actor===actor),center=seat.length?seat.reduce((p,d)=>p.add(d.pos),new T.Vector3()).multiplyScalar(1/seat.length):new T.Vector3(0,.2,actor===0?3:-3);
      const held=actor===0?new T.Vector3(mobile?(multiMobile?0:2.2):2.45,mobile?2.05:1.75,mobile?2:2):new T.Vector3(center.x*.72,1.55,center.z*.7);
      rows.push({el:drawn,kind:'drawn',scale:mobile?3.4:1.6,pos:held,angle:0,tilt:1.08});
    }
    return rows;
  }
  syncDOM(){
    const rows=this.descriptors(),found=new Set(rows.map(x=>x.el));
    for(const[el,card]of this.cards)if(!found.has(el)){if(!card.userData.active)this.disposeCard(card);else card.userData.detached=true;this.cards.delete(el);}
    for(const d of rows){let card=this.cards.get(d.el);if(!card){card=this.makeCard(this.valueOf(d.el));this.cards.set(d.el,card);}card.userData.descriptor=d;
      if(!card.userData.active){const value=this.valueOf(d.el);if(value!==card.userData.value){card.userData.value=value;card.userData.front.material.map=this.cardTexture(value);card.userData.front.material.needsUpdate=true;}}
      const visible=d.el.style.visibility!=='hidden'&&!d.el.closest('[hidden]');card.visible=visible;
      if(!card.userData.active){card.position.copy(d.pos);card.position.y+=card.userData.lift||0;card.scale.setScalar(d.scale||1);card.rotation.set(-Math.PI/2+d.tilt+(card.userData.lift||0)*.28,0,d.angle);}
    }
    this.anchors=rows;this.positionAnchors();
    const deckCount=Number(document.getElementById('deckCount')?.textContent||0);this.buildDeckStack(deckCount);
    this.updateSelectionRings();
    this.dirty=false;
  }
  updateSelectionRings(){
    const list=[...this.cards].filter(([el])=>el.classList.contains('selectable')||el.classList.contains('selected'));
    while(this.selectionRings.length<list.length){const ring=this.ring(.66,'#e5cc86',new T.Vector3());ring.scale.set(1,1.35,1);ring.material.opacity=.4;this.scene.add(ring);this.selectionRings.push(ring);}
    this.selectionRings.forEach((ring,i)=>{ring.visible=!!list[i];if(list[i]){const[el,card]=list[i],scale=card.userData.descriptor.scale||1;ring.position.set(card.position.x,.105,card.position.z);ring.scale.set(scale,scale*1.35,1);ring.material.opacity=el.classList.contains('selected')?.8:.26;}});
  }
  buildDeckStack(count){const mobile=this.camera.aspect<.8,multiMobile=mobile&&Number(document.body.dataset.players)>2,scale=multiMobile?1.6:mobile?Math.min(2.3,.9/this.camera.aspect):1,key=Math.min(5,Math.ceil(count/10))+':'+scale+':'+multiMobile;if(this.deckConfig===key)return;this.deckConfig=key;if(this.deckMeshes)this.deckMeshes.forEach(o=>this.disposeCard(o));this.deckMeshes=[];for(let i=0;i<Math.min(5,Math.ceil(count/10));i++){const c=this.makeCard(null);c.position.set(multiMobile?0:mobile?-2.25:-1.35,.08+i*.025,multiMobile?-1.5:-.13);c.scale.setScalar(scale);c.rotation.z=(i%2?1:-1)*.015;this.deckMeshes.push(c);}}
  projectBox(card){const points=[];for(const x of[-.61,.61])for(const y of[-.79,.79]){const p=new T.Vector3(x,y,0);card.localToWorld(p);p.project(this.camera);points.push({x:(p.x+1)*innerWidth/2,y:(1-p.y)*innerHeight/2});}const left=Math.min(...points.map(p=>p.x)),top=Math.min(...points.map(p=>p.y)),right=Math.max(...points.map(p=>p.x)),bottom=Math.max(...points.map(p=>p.y));return {left,top,width:right-left,height:bottom-top};}
  positionAnchors(){
    this.scene.updateMatrixWorld();this.camera.updateMatrixWorld();
    for(const d of this.anchors){const card=this.cards.get(d.el);if(!card)continue;const r=this.projectBox(card);for(const el of [d.el,...(d.button?[d.button]:[])]){
        const left=r.left.toFixed(2)+'px',top=r.top.toFixed(2)+'px',w=r.width.toFixed(2)+'px',h=r.height.toFixed(2)+'px';
        if(el.style.left!==left)el.style.left=left;if(el.style.top!==top)el.style.top=top;if(el.style.width!==w)el.style.width=w;if(el.style.height!==h)el.style.height=h;
      }
    }
    if(Number(document.body.dataset.players)>2||this.camera.aspect<.8){
      document.querySelectorAll('.opponent-zone').forEach(zone=>{
        const actor=Number(zone.dataset.seat),bounds=this.anchors.filter(d=>d.kind==='hand'&&d.actor===actor).map(d=>this.projectBox(this.cards.get(d.el)));
        if(!bounds.length)return;
        const label=zone.querySelector('.player-identity'),left=Math.min(...bounds.map(b=>b.left)),right=Math.max(...bounds.map(b=>b.left+b.width)),top=Math.min(...bounds.map(b=>b.top));
        label.style.left=((left+right)/2)+'px';label.style.top=Math.max(this.camera.aspect<.8?184:110,top-(this.camera.aspect<.8?50:44))+'px';
      });
    }else document.querySelectorAll('.opponent-zone>.player-identity').forEach(el=>{el.style.left='';el.style.top='';});
    const own=this.anchors.filter(d=>d.kind==='hand'&&d.actor===0).map(d=>this.projectBox(this.cards.get(d.el))),identity=document.querySelector('.player-bottom');
    if(own.length&&identity){identity.style.left=((Math.min(...own.map(r=>r.left))+Math.max(...own.map(r=>r.left+r.width)))/2)+'px';identity.style.top=(Math.max(...own.map(r=>r.top+r.height))+12)+'px';}
  }
  resize(){
    const aspect=innerWidth/innerHeight;this.camera.aspect=aspect;
    if(aspect<.8){this.camera.fov=45;const d=1.18/Math.max(aspect,.32);this.baseCamera=new T.Vector3(0,12.9*d,9.2*d);this.target=new T.Vector3(0,0,.1);}
    else if(aspect<1.2){this.camera.fov=41;this.baseCamera=new T.Vector3(0,13.3,13.6);this.target=new T.Vector3(0,0,0);}
    else{this.camera.fov=39;this.baseCamera=new T.Vector3(0,10.7,11.5);this.target=new T.Vector3(0,0,0);}
    this.camera.position.copy(this.baseCamera);this.camera.lookAt(this.target);this.camera.updateProjectionMatrix();this.renderer.setSize(innerWidth,innerHeight);this.dirty=true;
  }
  fromRect(rect){this.ray.setFromCamera(new T.Vector2((rect.left+rect.width/2)/innerWidth*2-1,-(rect.top+rect.height/2)/innerHeight*2+1),this.camera);const hit=new T.Vector3();this.ray.ray.intersectPlane(this.plane,hit);return hit;}
  async tween(duration,update){if(this.reduced){update(1);return;}return new Promise(resolve=>{this.tweens.add({time:0,duration:Math.max(duration,16),update,resolve});});}
  async fly(from,to,html,duration=440,rotation=8){
    this.syncDOM();const a=from.getBoundingClientRect?from.getBoundingClientRect():from,b=to.getBoundingClientRect?to.getBoundingClientRect():to;if(!a?.width||!b?.width)return;
    const anchor=(ref,r)=>this.cards.get(ref)||[...this.cards.values()].find(c=>{const q=this.projectBox(c);return Math.abs(q.left-r.left)<3&&Math.abs(q.top-r.top)<3&&Math.abs(q.width-r.width)<3;});
    const source=anchor(from,a),target=anchor(to,b),start=source?source.position.clone():this.fromRect(a),end=target?target.position.clone():this.fromRect(b),card=this.makeCard(this.parseHTML(html));
    const ra=source?.rotation.clone()||new T.Euler(-Math.PI/2,0,0),rb=target?.rotation.clone()||new T.Euler(-Math.PI/2,0,0);
    card.rotation.copy(ra);card.position.copy(start);card.updateMatrixWorld(true);const sa=source?source.scale.x:a.width/Math.max(this.projectBox(card).width,1);
    card.rotation.copy(rb);card.position.copy(end);card.updateMatrixWorld(true);const sb=target?target.scale.x:b.width/Math.max(this.projectBox(card).width,1);card.userData.active=true;
    const trail=this.makeTrail(palette[this.parseHTML(html)]||'#c8d4a1');
    await this.tween(duration,t=>{const e=ease(t);card.position.lerpVectors(start,end,e);card.scale.setScalar(lerp(sa,sb,e));card.position.y+=Math.sin(t*Math.PI)*.7;card.rotation.set(lerp(ra.x,rb.x,e),lerp(ra.y,rb.y,e),lerp(ra.z,rb.z,e)+Math.sin(t*Math.PI)*rotation*.014);this.addTrailPoint(trail,card.position);});
    this.expireTrail(trail);this.disposeCard(card);
  }
  async flip(el,html,duration=330){
    this.syncDOM();const card=this.cards.get(el);if(!card)return;const next=this.parseHTML(html),d=card.userData;d.active=true;d.back.material.map=this.cardTexture(next);d.back.material.needsUpdate=true;const y=card.position.y;
    await this.tween(duration,t=>{d.pivot.rotation.y=ease(t)*Math.PI;card.position.y=y+Math.sin(t*Math.PI)*.3;});
    const template=document.createElement('template');template.innerHTML=html;
    if(el.isConnected){el.className=template.content.firstElementChild.className;el.innerHTML=template.content.firstElementChild.innerHTML;}
    d.front.material.map=this.cardTexture(next);d.front.material.needsUpdate=true;d.back.material.map=this.cardTexture(null);d.back.material.needsUpdate=true;d.value=next;d.pivot.rotation.y=0;d.active=false;card.position.y=y;if(d.detached||!el.isConnected)this.disposeCard(card);this.dirty=true;
  }
  async shuffle(actor,publicMoves=[]){
    this.syncDOM();const list=this.anchors.filter(d=>d.kind==='hand'&&d.actor===actor).map(d=>this.cards.get(d.el));
    if(!list.length)return;this.effect(5,list[0].userData.descriptor.el);const starts=list.map(c=>c.position.clone()),center=starts.reduce((s,p)=>s.add(p),new T.Vector3()).multiplyScalar(1/list.length);
    const mapping=new Map(publicMoves.map(m=>[m.from,m.to])),used=new Set(mapping.values()),remaining=starts.map((_,i)=>i).filter(i=>!used.has(i)).sort(()=>Math.random()-.5),targets=starts.map((_,i)=>starts[mapping.has(i)?mapping.get(i):remaining.shift()]);
    list.forEach(c=>c.userData.active=true);
    await this.tween(1050,t=>list.forEach((c,i)=>{const squeeze=Math.sin(t*Math.PI),a=i/list.length*TAU+t*TAU*1.2,orbit=new T.Vector3(Math.cos(a)*1.1,.8+Math.sin(i+t*7)*.12,Math.sin(a)*.65);c.position.lerpVectors(starts[i],targets[i],ease(t)).addScaledVector(orbit,squeeze);c.rotation.set(-Math.PI/2+squeeze*.12,0,squeeze*Math.sin(a)*.16);}));
    list.forEach((c,i)=>{c.position.copy(targets[i]);c.userData.active=false;if(c.userData.detached)this.disposeCard(c);});this.dirty=true;
  }
  makeTrail(color){const max=26,positions=new Float32Array(max*3),geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(positions,3));geo.setDrawRange(0,0);const mesh=new T.Line(geo,new T.LineBasicMaterial({color,transparent:true,opacity:.5,blending:T.AdditiveBlending,depthWrite:false}));this.scene.add(mesh);return{mesh,points:[],max};}
  addTrailPoint(trail,point){trail.points.push(point.clone());if(trail.points.length>trail.max)trail.points.shift();const p=trail.mesh.geometry.getAttribute('position');trail.points.forEach((v,i)=>p.setXYZ(i,v.x,v.y+.04,v.z));p.needsUpdate=true;trail.mesh.geometry.setDrawRange(0,trail.points.length);trail.mesh.geometry.computeBoundingSphere();}
  expireTrail(trail){this.effects.push({time:0,duration:350,update:t=>trail.mesh.material.opacity=.5*(1-t),dispose:()=>{this.scene.remove(trail.mesh);trail.mesh.geometry.dispose();trail.mesh.material.dispose();}});}
  addAmbientParticles(){const n=75,positions=new Float32Array(n*3);for(let i=0;i<n;i++){positions[i*3]=(Math.random()-.5)*19;positions[i*3+1]=Math.random()*6+.3;positions[i*3+2]=(Math.random()-.5)*13;}
    this.dust=new T.Points(new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(positions,3)),new T.PointsMaterial({color:'#d2d8a0',map:this.glowTexture(),size:.105,transparent:true,opacity:.32,blending:T.AdditiveBlending,depthWrite:false}));this.scene.add(this.dust);
  }
  ring(radius,color,pos,tilt=0){const mesh=new T.Mesh(new T.TorusGeometry(radius,.014,6,96),new T.MeshBasicMaterial({color,transparent:true,opacity:.9,blending:T.AdditiveBlending,depthWrite:false}));mesh.rotation.set(Math.PI/2+tilt,0,0);mesh.position.copy(pos);return mesh;}
  runeTexture(type,color){return this.canvasTexture(512,512,(c,w,h)=>{c.translate(w/2,h/2);c.strokeStyle=color;c.fillStyle=color;c.lineWidth=2.2;for(const r of [170,196,225]){c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();}for(let i=0;i<24;i++){c.save();c.rotate(i/24*TAU);c.beginPath();c.moveTo(0,-205);c.lineTo(0,-216);c.stroke();if(i%3===0)star(c,0,-184,7);c.restore();}if(['gamble','1213','pair','triple'].includes(type)){c.font=(type==='gamble'?'bold 144px \"Microsoft YaHei\"':'bold 90px Georgia');c.textAlign='center';c.textBaseline='middle';c.fillText(({gamble:'赌','1213':'1213',pair:'对子',triple:'三张'})[type],0,0);}else glyph(c,type,0,0,200,color);});}
  magic(type,positions=[]){
    if(this.reduced)return;
    const color=palette[type]||'#e6c978',origin=positions[0]||new T.Vector3(0,.15,0),group=new T.Group();group.position.copy(origin);this.scene.add(group);
    const glyphPlane=new T.Mesh(new T.PlaneGeometry(4.3,4.3),new T.MeshBasicMaterial({map:this.runeTexture(type,color),transparent:true,opacity:.85,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));glyphPlane.rotation.x=-Math.PI/2;glyphPlane.position.y=.06;group.add(glyphPlane);
    const aura=new T.Sprite(new T.SpriteMaterial({map:this.glowTexture(),color,transparent:true,opacity:.36,depthWrite:false,blending:T.AdditiveBlending}));aura.scale.set(5,5,1);aura.position.y=.8;group.add(aura);
    const count=type===0?220:type===5?150:110,arr=new Float32Array(count*3),data=[];
    for(let i=0;i<count;i++)data.push({a:Math.random()*TAU,r:Math.random()*(type===0?4:2)+.3,y:Math.random()*2,s:Math.random()+.3});
    const geo=new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(arr,3)),mat=new T.PointsMaterial({color,map:this.glowTexture(),transparent:true,blending:T.AdditiveBlending,depthWrite:false,size:type===0?.23:.18,opacity:.9});const particles=new T.Points(geo,mat);group.add(particles);
    const rings=[];for(let i=0;i<(type===0?5:3);i++){const ring=this.ring(.9+i*.4,color,new T.Vector3(0,.1+i*.1,0),type===0?i*.17:0);group.add(ring);rings.push(ring);}
    let beam;
    if([8,9,10].includes(type)){
      const cone=new T.ConeGeometry(.65,4,40,1,true),m=new T.MeshBasicMaterial({color,transparent:true,opacity:.1,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide});beam=new T.Mesh(cone,m);beam.position.y=2.1;beam.rotation.z=Math.PI;group.add(beam);
    }
    if([11,12].includes(type)&&positions[1]){
      const start=positions[0],end=positions[1],mid=start.clone().lerp(end,.5);mid.y+=1.8;
      for(let i=0;i<2;i++){const arc=new T.QuadraticBezierCurve3(start.clone().sub(origin),mid.clone().sub(origin).add(new T.Vector3(i?.5:-.5,0,0)),end.clone().sub(origin));const tube=new T.Mesh(new T.TubeGeometry(arc,50,.022,6,false),new T.MeshBasicMaterial({color:i?'#b5e0cf':color,transparent:true,opacity:.8,blending:T.AdditiveBlending,depthWrite:false}));group.add(tube);}
    }
    const duration=type===0?1900:type===5?1400:1200;
    this.fxLight.color.set(color);this.fxLight.position.copy(origin).add(new T.Vector3(0,2.5,0));this.fxLight.intensity=13;
    this.effects.push({time:0,duration,update:(t,dt)=>{
      const envelope=Math.sin(Math.PI*Math.min(1,t*1.2));group.scale.setScalar(.5+.5*ease(Math.min(1,t*3)));glyphPlane.rotation.z=t*(type===5?6:-1.1);glyphPlane.material.opacity=Math.max(0,envelope)*.8;
      rings.forEach((r,i)=>{r.rotation.z=t*(i%2?-2:2);r.scale.setScalar(1+t*.45);r.material.opacity=Math.max(0,envelope)*.7;});
      const p=geo.getAttribute('position');data.forEach((d,i)=>{let a=d.a+t*(type===5?12:type===0?5:2),r=d.r*(.45+t*.7),y;
        if(type===5)y=(t*3+d.y)%2.4;else if(type===0)y=Math.sin(t*Math.PI)*d.y*1.8;else y=t*d.y*1.8;
        p.setXYZ(i,Math.cos(a)*r,y,Math.sin(a)*r);});p.needsUpdate=true;mat.opacity=Math.max(0,Math.sin(Math.PI*t))*.9;
      aura.material.opacity=.32*Math.max(0,envelope);if(beam)beam.material.opacity=.12*Math.max(0,envelope);this.fxLight.intensity=13*Math.max(0,envelope);
    },dispose:()=>{this.scene.remove(group);group.traverse(o=>{o.geometry?.dispose();if(o.material){if(o.material.map&&o.material.map!==this._glow)o.material.map.dispose();o.material.dispose();}});this.fxLight.intensity=0;}});
  }
  effect(type,targetEl=null,otherEl=null){
    this.syncDOM();const position=el=>{const card=this.cards.get(el);return card?card.position.clone():new T.Vector3(0,.15,0);};
    this.magic(type,targetEl?[position(targetEl),...(otherEl?[position(otherEl)]:[])]:[]);
    this.banner(type);this.currentEffect=type;this.focusPulse=.08;
  }
  banner(type,detail=''){
    const root=document.getElementById('abilityBanner');if(!root)return;clearTimeout(this.bannerTimer);const info=type==='pair'?['对子','一换二 · +10%',detail]:type==='triple'?['三张','一换三 · +30%',detail]:type==='gamble'?['赌','大胆一换',detail]:type==='1213'?['1213','神叠特工队','结算 ×2']:type==='catwin'?['✦','CATWIN','']:type==='multi'?['✧','一换多','']:[type===0?'◎':type===5?'↻':[11,12].includes(type)?'⇄':'◈',abilityName[type]||'猫猫牌',''];
    document.getElementById('abilityMark').textContent=info[0];document.getElementById('abilityTitle').textContent=info[1];document.getElementById('abilitySub').textContent=info[2];root.style.color=palette[type]||'#ead59b';root.classList.add('active');this.bannerTimer=setTimeout(()=>root.classList.remove('active'),1100/this.speed);
  }
  animate(now){
    if(this.disposed)return;requestAnimationFrame(this.animate);const delta=Math.min((now-this.lastTime)/1000,.05),ms=delta*1000*this.speed;this.lastTime=now;this.elapsed+=delta;
    if(this.dirty)this.syncDOM();
    const targetX=this.reduced?0:this.mouse.x*.12,targetZ=this.reduced?0:this.mouse.y*.06;
    this.camera.position.x=lerp(this.camera.position.x,this.baseCamera.x+targetX,.035);this.camera.position.z=lerp(this.camera.position.z,this.baseCamera.z+targetZ-(this.focusPulse||0),.04);this.camera.lookAt(this.target);if(this.focusPulse)this.focusPulse*=.96;
    for(const tween of [...this.tweens]){tween.time+=ms;const t=Math.min(1,tween.time/tween.duration);tween.update(t);if(t===1){this.tweens.delete(tween);tween.resolve();}}
    for(const[el,card]of this.cards){const d=card.userData,desc=d.descriptor;if(!desc||d.active)continue;const hover=el.matches(':hover')&&!el.disabled,selected=el.classList.contains('selected');let lift=selected?.36:hover?.22:0;d.lift=lerp(d.lift,lift,.16);card.position.y=desc.pos.y+d.lift;card.rotation.x=-Math.PI/2+desc.tilt+d.lift*.28;
      const emph=selected||hover||el.classList.contains('move-target');d.front.material.color.set(emph?'#fff2ca':'#ffffff');
      card.visible=el.style.visibility!=='hidden'&&!el.closest('[hidden]');
    }
    for(const fx of [...this.effects]){fx.time+=ms;const t=Math.min(1,fx.time/fx.duration);fx.update(t,delta);if(t===1){fx.dispose();this.effects.splice(this.effects.indexOf(fx),1);}}
    if(this.dust&&!this.reduced){this.dust.rotation.y=this.elapsed*.012;this.dust.position.y=Math.sin(this.elapsed*.25)*.06;}
    this.positionAnchors();this.renderer.render(this.scene,this.camera);
  }
}
