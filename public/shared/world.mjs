export const characters=[
 ['rabbit','粉兔','01_rabbit',2.166],['dog','垂耳狗','02_dog',1.55],['duck','白鸭','03_duck',1.635],['siamese_cat','暹罗猫','04_siamese_cat',1.6918],['carrot','胡萝卜','05_carrot',1.642],['squid','小鱿鱼','06_squid',1.4626],['knight','小骑士','07_knight',2.0906],['hornet','大黄蜂','08_hornet',2.1917],['cookie','Cookie','09_cookie',1.3019]
].map(([id,name,file,height])=>({id,name,file,height,model:'/assets/characters/v2/'+file+'.glb',avatar:'/assets/characters/v1/'+file+'.webp'}));
export const zones=[
 {id:'board',name:'希沃聊天板',box:[-4.76,-4.60,-1.3,1.3],anchor:[-4.60,1.7,0],range:.9},
 {id:'games',name:'棋牌室',box:[-3.95,-.035,-.77,1.43],anchor:[-1.6,.81,.33],range:1.1},
 {id:'craft',name:'手工区',box:[2.09,3.65,-2.04,-.25],anchor:[2.87,.82,-1.25],range:1.15},
 {id:'workspace',name:'工作区',box:[2.09,3.65,-.15,3.02],anchor:[2.87,.82,1.75],range:1.15},
 {id:'light',name:'昼夜开关',box:[-4.78,-4.64,2.45,2.9],anchor:[-4.65,1.05,2.65],range:1.0}
];
export const bounds={minX:-4.64,maxX:4.64,minZ:-3.99,maxZ:4.70};
export const obstacles=[[-3.95,-.035,-.77,1.43],[2.09,3.65,-2.04,3.02],[-4.72,1.82,-3.96,-3.22],[1.87,2.66,-3.85,-2.58],[3.89,4.62,-3.9,-2.42],[-4.62,-3.85,-2.46,-1.89]];
// Chairs remain visible but do not block walking. Tables and fixed equipment do.
export const movementStep=.05;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function collides(x,z,r=.15){return obstacles.some(([a,b,c,d])=>Math.hypot(x-clamp(x,a,b),z-clamp(z,c,d))<r);}
export function freshPlayer(x=.86,z=3.82){return{x,z,y:0,vy:0,yaw:Math.PI,moving:false,running:false,grounded:true,jump:0,seq:0};}
export function simulate(p,input,dt){
 dt=clamp(dt,0,.08);let dx=Number(input.dx)||0,dz=Number(input.dz)||0;const length=Math.hypot(dx,dz);if(length>1){dx/=length;dz/=length;}const speed=input.run?2.45:1.45;
 const steps=Math.max(1,Math.ceil(speed*dt/.07));for(let i=0;i<steps;i++){let x=clamp(p.x+dx*speed*dt/steps,bounds.minX,bounds.maxX),z=clamp(p.z+dz*speed*dt/steps,bounds.minZ,bounds.maxZ);if(!collides(x,p.z))p.x=x;if(!collides(p.x,z))p.z=z;}
 p.moving=length>.02;p.running=p.moving&&!!input.run;if(p.moving)p.yaw=Math.atan2(dx,dz);
 if(Number.isInteger(input.jump)&&input.jump>p.jump){p.jump=input.jump;if(p.grounded){p.vy=3.7;p.grounded=false;}}
 p.vy-=9.8*dt;p.y+=p.vy*dt;if(p.y<=0){p.y=0;p.vy=0;p.grounded=true;}return p;
}
export function nearZone(p){let winner=null,best=Infinity;for(const z of zones){const[a,b,c,d]=z.box,dist=Math.hypot(p.x-clamp(p.x,a,b),p.z-clamp(p.z,c,d));if(dist<=z.range&&dist<best){best=dist;winner=z;}}return winner;}
