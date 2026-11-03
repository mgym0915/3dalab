import {Worker} from 'node:worker_threads';import crypto from 'node:crypto';
export async function createLettersHandler(options={}){
 let worker=null,active=null,closed=false;const jobs=new Map(),queue=[],base=options.base;
 const reply=(res,status,value,headers={})=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});res.end(JSON.stringify(value));};
 function finish(error,result,computeMs){if(!active)return;clearTimeout(active.timer);if(active.state!=='cancelled'){active.state=error?'failed':'complete';active.result=result;active.error=error;}active.input=null;active.ms=Math.round(performance.now()-active.start);active.computeMs=computeMs;active=null;pump();}
 function createWorker(){if(worker)return;const instance=new Worker(new URL('./worker.mjs',import.meta.url));worker=instance;
  instance.on('message',m=>{if(worker!==instance||active?.id!==m.id)return;if(m.progress){if(active.state==='running'){const now=performance.now(),elapsed=now-active.start,f=m.progress.fraction;active.progress={...m.progress,updatedAt:now,...(elapsed>=250&&f>.15&&f<.98?{remainingMs:elapsed*(1-f)/f}:{})};}return;}finish(m.error,m.result,m.computeMs);});
  instance.on('error',e=>{if(worker!==instance)return;worker=null;finish('计算进程中断，请重试。');});
  instance.on('exit',()=>{if(worker!==instance)return;worker=null;if(active)finish('计算进程已退出，请重试。');else pump();});
 }
 function pump(){if(closed||active||!queue.length)return;createWorker();active=queue.shift();active.state='running';active.start=performance.now();
  active.timer=setTimeout(()=>{if(active){active.state='failed';active.error='计算超时，请简化输入。';active.input=null;}active=null;const old=worker;worker=null;old?.terminate().then(pump);},120000);
  worker.postMessage({id:active.id,owner:active.owner,input:active.input});
 }
 const handler=async(req,res)=>{const url=new URL(req.url,'http://localhost');if(!url.pathname.startsWith(base+'/api/'))return false;
  try{
   if(!await options.authorize?.(req)){reply(res,401,{error:'请先进入3D实验室。'});return true;}
   const user=options.getIdentity?.(req);if(!user?.id)throw Object.assign(Error('身份已失效。'),{status:401});const route=url.pathname.slice(base.length+5);
   if(route==='health'&&req.method==='GET'){reply(res,200,{ok:true,worker:'node',algorithm:'2026-11-02-pricing',version:'1.4.0'});return true;}
   if(route==='jobs'&&req.method==='POST'){
    if(queue.length>=16||[...jobs.values()].filter(j=>j.owner===user.id&&['queued','running'].includes(j.state)).length>=3)throw Object.assign(Error('已有计算任务，请稍后重试。'),{status:429});
    let size=0;const parts=[];for await(const b of req){size+=b.length;if(size>46*1024*1024)throw Object.assign(Error('文件过大。'),{status:413});parts.push(b);}
    let input;try{input=JSON.parse(Buffer.concat(parts));}catch{throw Object.assign(Error('请求格式无效。'),{status:400});}
    if(!input||typeof input!=='object'||Array.isArray(input)||input.action!=='calculate'||!input.data||typeof input.data!=='object')throw Object.assign(Error('计算类型无效。'),{status:400});
    for(const [id,j]of jobs)if(!['queued','running'].includes(j.state)&&j!==active&&([...jobs.values()].filter(x=>x.owner===j.owner).length>=12||jobs.size>=64))jobs.delete(id);
    const id=crypto.randomUUID(),job={id,owner:user.id,input,state:'queued',created:Date.now()};jobs.set(id,job);queue.push(job);pump();reply(res,202,{id,state:job.state});return true;
   }
   const m=/^jobs\/([0-9a-f-]{36})$/.exec(route),job=m&&jobs.get(m[1]);
   if(m&&['GET','DELETE'].includes(req.method)){
    if(!job||job.owner!==user.id){reply(res,404,{error:'计算任务不存在。'});return true;}
    if(req.method==='DELETE'){
     if(['queued','running'].includes(job.state)){job.state='cancelled';job.input=null;const i=queue.indexOf(job);if(i>=0)queue.splice(i,1);}
     reply(res,200,{id:job.id,state:job.state});return true;
    }
    let progress=job.progress;
    if(job.state==='running'&&progress){const {updatedAt,...visible}=progress;progress={...visible,...(Number.isFinite(visible.remainingMs)?{remainingMs:Math.max(0,visible.remainingMs-(performance.now()-updatedAt))}:{})};}
    reply(res,200,{id:job.id,state:job.state,progress,result:job.result,error:job.error,ms:job.ms,computeMs:job.computeMs},{'X-Job-State':job.state});return true;
   }
   reply(res,404,{error:'没有这个计算入口。'});
  }catch(e){reply(res,e.status||400,{error:e.message});}return true;
 };
 const timer=setInterval(()=>{for(const[id,j]of jobs)if(j!==active&&Date.now()-j.created>30*60000&&!['running','queued'].includes(j.state))jobs.delete(id);},60000);timer.unref();
 handler.close=()=>{closed=true;clearInterval(timer);if(active)clearTimeout(active.timer);queue.length=0;jobs.clear();worker?.terminate();};return handler;
}
