import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {LocalSlicerService} from './integrations/knit/local-engine.mjs';
const require=createRequire(import.meta.url);
export function createToolServices({root,dataDir,body,json}){
 const slicer=new LocalSlicerService(path.join(dataDir,'knit'));
 const owners=new Map(),depthJobs=new Map();let activeDepth=null,depthService=null;
 function getDepth(){if(!depthService){const {createDepthService}=require('./integrations/depth/depth-service.cjs');depthService=createDepthService({modelPath:path.join(root,'integrations/depth/models/depth-anything-v2-small.onnx'),onProgress:({id,phase})=>{const job=depthJobs.get(id);if(job)job.phase=phase;}});}return depthService;}
 return{
 async handle(req,res,url,session){
  const route=url.pathname;
  if(route==='/api/tools/knit'&&req.method==='GET')return json(res,200,await slicer.capabilities());
  if(route==='/api/tools/knit/jobs'&&req.method==='POST'){
   const input=await body(req,120*1024*1024),job=await slicer.start(input);owners.set(job.id,session.token);for(const id of owners.keys())if(!slicer.status(id))owners.delete(id);return json(res,202,job);
  }
  const knit=/^\/api\/tools\/knit\/jobs\/([0-9a-f-]{36})(?:\/(source\.gcode\.3mf|print\.gcode\.3mf|print\.gcode|report\.json))?$/.exec(route);
  if(knit&&req.method==='GET'){
   if(owners.get(knit[1])!==session.token)return json(res,404,{error:'任务不存在'});
   if(knit[2]){const bytes=await slicer.file(knit[1],knit[2]);if(!bytes)return json(res,404,{error:'文件尚未生成'});res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Length':bytes.length,'Cache-Control':'no-store'});return res.end(bytes);}
   const job=slicer.status(knit[1]);return json(res,job?200:404,job||{error:'任务不存在'});
  }
  if(route==='/api/tools/depth/jobs'&&req.method==='POST'){
   if(activeDepth)return json(res,409,{error:'正在处理另一张图片，请稍后重试'});
   const input=await body(req,20*1024*1024),{w,h}=input;
   if(!Number.isInteger(w)||!Number.isInteger(h)||w<1||h<1||w>1600||h>1600||typeof input.pixels!=='string')return json(res,400,{error:'图片尺寸无效'});
   const pixels=new Uint8Array(Buffer.from(input.pixels,'base64'));if(pixels.length!==w*h*4)return json(res,400,{error:'图片数据无效'});
   const id=crypto.randomUUID(),job={id,owner:session.token,state:'running',phase:'loading',created:Date.now()};depthJobs.set(id,job);activeDepth=id;
   getDepth().estimate({id,pixels,w,h,target:input.target}).then(result=>{if(result.cancelled){job.state='cancelled';return;}job.result={w:result.w,h:result.h,elapsedMs:result.elapsedMs,field:Buffer.from(result.field.buffer,result.field.byteOffset,result.field.byteLength).toString('base64')};job.state='complete';},error=>{job.state='failed';job.error=error.message;}).finally(()=>{if(activeDepth===id)activeDepth=null;for(const [key,value]of depthJobs)if(Date.now()-value.created>30*60000&&key!==activeDepth)depthJobs.delete(key);});
   return json(res,202,{id,state:job.state});
  }
  const depth=/^\/api\/tools\/depth\/jobs\/([0-9a-f-]{36})$/.exec(route);
  if(depth){const job=depthJobs.get(depth[1]);if(!job||job.owner!==session.token)return json(res,404,{error:'任务不存在'});
   if(req.method==='GET'){const {owner,...publicJob}=job;return json(res,200,publicJob);}
   if(req.method==='DELETE'){if(activeDepth===job.id)getDepth().cancel();job.state='cancelled';return json(res,200,{ok:true});}
  }
  return json(res,404,{error:'没有这个入口'});
 },
 close(){slicer.close();depthService?.close();}
 };
}
