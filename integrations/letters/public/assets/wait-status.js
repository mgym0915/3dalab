(function(g){
 'use strict';
 const labels={input:'等待输入完成…',file:'正在读取文件…',request:'请求服务器…',connected:'服务器连接成功',queued:'任务已接收，正在排队…',text:'正在生成文字轮廓…',svg:'正在解析SVG轮廓…',model:'正在读取3MF模型…',geometry:'正在核对图形尺寸…',prepare:'正在准备运算…',walls:'正在运算中 · 围边路径',bottom:'正在核算底面材料…',adhesion:'正在核算Brim和Skirt…',summary:'正在汇总打印材料…',pricing:'正在汇总辅料和价格…',cached:'正在读取核算缓存…',receiving:'核算结果返回中…',preview:'正在更新核算价格…'};
 function create(){
  const label=document.getElementById('weightStatus'),eta=document.getElementById('weightEta');let timer=null,current=null;
  function tick(){
   if(!current||!eta)return;
   if(current.deadline===null){eta.hidden=true;eta.textContent='';return;}
   const remaining=current.deadline-performance.now();eta.hidden=false;
   eta.textContent=remaining>0?'预计约 '+Math.max(1,Math.ceil(remaining/1000))+'s 后核算完成':'仍在运算，预计时间更新中…';
  }
  function stop(){clearInterval(timer);timer=null;current=null;if(eta){eta.hidden=true;eta.textContent='';}}
  function begin(stage='input'){stop();current={stage,deadline:null,started:performance.now()};label.textContent=labels[stage]||labels.prepare;timer=setInterval(tick,250);tick();}
  function update(progress){
   if(!current)return;const p=typeof progress==='string'?{stage:progress}:progress;if(!p)return;
   current.stage=p.stage;label.textContent=labels[p.stage]||labels.prepare;
   if(['input','file','request','connected','queued','receiving','preview','cached'].includes(p.stage))current.deadline=null;
   else if(Number.isFinite(p.remainingMs)&&p.remainingMs>=0)current.deadline=performance.now()+p.remainingMs;
   else if(Number.isFinite(p.fraction)&&p.fraction>.15&&p.fraction<.98){
    const elapsed=performance.now()-current.started;if(elapsed>=250)current.deadline=performance.now()+elapsed*(1-p.fraction)/p.fraction;
   }
   tick();
  }
  return{begin,update,stop};
 }
 g.WaitStatus={create};
})(globalThis);
