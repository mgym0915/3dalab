(() => {
 let active=null,callback=()=>{};
 async function api(url,options={}){const res=await fetch(url,{...options,headers:{'Content-Type':'application/json',...options.headers}});const data=await res.json();if(!res.ok)throw Error(data.error||'生成失败');return data;}
 window.reliefDesktop={
  isDesktop:false,
  onImportImage(){return()=>{};},
  onCommand(){return()=>{};},
  onDepthProgress(fn){callback=fn;return()=>{callback=()=>{};};},
  async estimateDepth({id,pixels,w,h,target}){
   let binary='';for(let i=0;i<pixels.length;i+=32768)binary+=String.fromCharCode(...pixels.subarray(i,i+32768));
   let job=await api('/api/tools/depth/jobs',{method:'POST',body:JSON.stringify({pixels:btoa(binary),w,h,target})});active=job.id;
   while(job.state==='running'){await new Promise(resolve=>setTimeout(resolve,650));job=await api('/api/tools/depth/jobs/'+job.id);callback({id,phase:job.phase});}
   active=null;if(job.state==='cancelled')return{cancelled:true};if(job.state!=='complete')throw Error(job.error||'深度生成失败');
   const bytes=Uint8Array.from(atob(job.result.field),s=>s.charCodeAt(0));return{...job.result,field:new Float32Array(bytes.buffer)};
  },
  async cancelDepth(){if(active)await api('/api/tools/depth/jobs/'+active,{method:'DELETE'}).catch(()=>{});}
 };
})();
