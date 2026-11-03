(function(){
 'use strict';
 const $=id=>document.getElementById(id),fmt=(n,d=2)=>Number.isFinite(n)?n.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d}):'—',edit=n=>Number(n.toPrecision(7)).toString();
 const waiting=WaitStatus.create(),preview=TextPreview.create();let currentQuote=null;
 const state={source:{kind:'text',text:'国'},sourceId:null,width:100,height:undefined,lastEdited:'width',aspect:1,adjustment:0,join:'round',result:null,pending:false,outline:false};
 let revision=0,sourceRevision=0,timer,jobId=null,reading=false;
 const frameSVG='<svg xmlns="http://www.w3.org/2000/svg" width="100mm" height="100mm" viewBox="0 0 100 100"><path fill-rule="evenodd" d="M0 0H100V100H0Z M20 20H80V80H20Z"/></svg>';
 const ringSVG='<svg xmlns="http://www.w3.org/2000/svg" width="100mm" height="100mm" viewBox="0 0 100 100"><path fill-rule="evenodd" d="M0 50A50 50 0 1 0 100 50A50 50 0 1 0 0 50Z M25 50A25 25 0 1 0 75 50A25 25 0 1 0 25 50Z"/></svg>';
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 function error(message){$('calculationError').textContent=message||'';$('calculationError').hidden=!message;}
 function pending(value){state.pending=value;$('weightPending').hidden=!value;$('weightNumber').hidden=value;$('weightCard').setAttribute('aria-busy',String(value));if(value)waiting.begin('input');else waiting.stop();}
 async function request(route,options={},onHeaders){const response=await fetch('./api/'+route,{credentials:'same-origin',...options});onHeaders?.(response);let body;try{body=await response.json();}catch{throw Error('主机暂时无法连接，请稍后重试。');}if(!response.ok)throw Error(body.error||'核算请求失败。');return body;}
 const cancel=id=>{if(id)request('jobs/'+id,{method:'DELETE'}).catch(()=>{});};
 function start(){const ticket=++revision;clearTimeout(timer);timer=null;cancel(jobId);jobId=null;state.result=null;currentQuote=null;$('resultPrice').textContent='—';$('exportButton').disabled=true;error('');pending(true);$('geometryStatus').textContent='正在核算…';return ticket;}
 function select(kind){for(const key of ['text','svg']){$(key+'Tab').classList.toggle('active',key===kind);$(key+'Tab').setAttribute('aria-selected',String(key===kind));$(key+'Panel').hidden=key!==kind;}}
 function setSource(source,width){state.source=source;state.sourceId=null;state.width=width;if(width===undefined)state.height=undefined;sourceRevision++;}
 const priceUI=PriceUI.create({getQuote:()=>currentQuote,onOptions:refreshPrice});
 function refreshPrice(){if(!state.result||state.pending)return;const o=priceUI.options();currentQuote=state.result.quotes[[o.product,o.color,o.lighting].join('|')];$('resultPrice').textContent=fmt(currentQuote.total);priceUI.fit();}
 function fitWeight(){priceUI.fit();}
 function render(result){
  waiting.update('preview');state.result=result;state.sourceId=result.sourceId;state.width=result.originalSize.width;state.height=result.originalSize.height;state.aspect=result.sourceAspect??result.originalSize.height/result.originalSize.width;
  const g=result.preview;preview.setGeometry(g,state.width,state.height);
  if(document.activeElement!==$('widthInput'))$('widthInput').value=edit(state.width);if(document.activeElement!==$('heightInput'))$('heightInput').value=edit(state.height);
  $('contourCount').textContent=`${g.outer} 个外轮廓 · ${g.holes} 个孔洞`;$('geometryStatus').textContent='核算完成';pending(false);refreshPrice();$('exportButton').disabled=false;
 }
 async function calculate(ticket=revision,retried=false){
  if(reading||ticket!==revision)return;
  if(!state.source){fail(Error('请重新选择文件或输入文字。'),ticket);return;}
  const sr=sourceRevision,data={lockAspect:$('aspectLock').checked,lastEdited:state.lastEdited};
  for(const axis of ['width','height']){if(state[axis]!==undefined){if(!DimensionSizing.valid(state[axis])){fail(Error('宽度和高度须大于0且不超过100000mm。'),ticket);return;}data[axis+'Mm']=state[axis];}}
  if(state.sourceId)data.sourceId=state.sourceId;else data.source=state.source;
  let id;
  try{
   waiting.update('request');const job=await request('jobs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'calculate',data})});id=job.id;
   if(ticket!==revision){cancel(id);return;}jobId=id;waiting.update('connected');
   const deadline=Date.now()+125000;
   while(ticket===revision&&Date.now()<deadline){
    const value=await request('jobs/'+id,{},response=>{if(ticket===revision&&response.headers.get('X-Job-State')==='complete')waiting.update('receiving');});if(ticket!==revision)return;
    if(value.state==='complete'){if(sr===sourceRevision)render(value.result);jobId=null;return;}
    if(value.state==='failed')throw Error(value.error||'核算未完成。');if(value.state==='cancelled')return;if(value.state==='queued')waiting.update('queued');else if(value.progress)waiting.update(value.progress);await sleep(120);
   }
   if(ticket===revision)throw Error('核算超时，请稍后重试。');
  }catch(e){
   if(ticket!==revision)return;
   if(e.message==='SOURCE_EXPIRED'&&!retried){state.sourceId=null;jobId=null;return calculate(ticket,true);}
   fail(e,ticket);
  }finally{if(ticket===revision&&jobId===id)jobId=null;}
 }
 function fail(e,ticket){if(ticket!==revision)return;state.result=null;currentQuote=null;$('resultPrice').textContent='—';pending(false);$('exportButton').disabled=true;error(e.message);$('geometryStatus').textContent='核算未完成';}
 function schedule(ms=240){const ticket=start();timer=setTimeout(()=>{timer=null;calculate(ticket);},ms);}
 function textChanged(){setSource({kind:'text',text:$('textInput').value},state.width??100);immediateText();$('charCount').textContent=Array.from($('textInput').value).length+' / 100';schedule();}
 async function fileChanged(file){
  if(!file)return;const ticket=start();waiting.update('file');reading=true;state.source=null;state.sourceId=null;sourceRevision++;
  try{
   const three=/\.3mf$/i.test(file.name);if(!/\.(svg|3mf)$/i.test(file.name))throw Error('请选择SVG或3MF文件。');if(file.size>(three?32:8)*1024*1024)throw Error('文件过大。');
   let source;if(three){const bytes=new Uint8Array(await file.arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=16384)binary+=String.fromCharCode(...bytes.subarray(i,i+16384));source={kind:'3mf',bytes:btoa(binary),name:file.name};}else source={kind:'svg',svg:await file.text(),mode:$('svgImportMode').value};
   if(ticket!==revision)return;setSource(source,undefined);$('fileName').textContent=file.name;select('svg');reading=false;await calculate(ticket);
  }catch(e){fail(e,ticket);}finally{reading=false;$('svgFile').value='';}
 }
 function syncSizeInputs(){
  for(const axis of ['width','height'])if(document.activeElement!==$(axis+'Input'))$(axis+'Input').value=Number.isFinite(state[axis])?edit(state[axis]):'';
  preview.draw(state.width,state.height);
 }
 for(const which of ['width','height']){
  $(which+'Input').oninput=()=>{Object.assign(state,DimensionSizing.edit(state,which,$(which+'Input').valueAsNumber,$('aspectLock').checked,state.aspect));syncSizeInputs();schedule();};
  $(which+'Input').addEventListener('change',()=>{if(timer&&!reading){clearTimeout(timer);timer=null;calculate(revision);}});
 }
 $('aspectLock').onchange=()=>{
  if(!$('aspectLock').checked)return;
  Object.assign(state,DimensionSizing.fromAnchor(state,state.aspect));syncSizeInputs();schedule();
 };
 $('textInput').oninput=textChanged;$('textTab').onclick=()=>{select('text');if(state.source?.kind!=='text')textChanged();};$('svgTab').onclick=()=>select('svg');
 $('uploadButton').onclick=()=>$('svgFile').click();$('svgFile').onchange=()=>fileChanged($('svgFile').files[0]);
 $('svgImportMode').onchange=()=>{if(state.source?.kind==='svg'){setSource({...state.source,mode:$('svgImportMode').value},state.width);schedule(0);}};
 for(const [id,outline]of [['fillButton',false],['outlineButton',true]])$(id).onclick=()=>{state.outline=outline;$('previewArea').classList.toggle('outline-mode',outline);for(const [button,on]of [['fillButton',!outline],['outlineButton',outline]]){$(button).classList.toggle('active',on);$(button).setAttribute('aria-pressed',String(on));}};
 for(const [id,svg,name]of [['sampleFrame',frameSVG,'镂空方框.svg'],['sampleRing',ringSVG,'同心圆环.svg']])$(id).onclick=()=>{select('svg');setSource({kind:'svg',svg,mode:'auto'},undefined);$('fileName').textContent=name;schedule(0);};
 $('sampleGuo').onclick=()=>{select('text');$('textInput').value='国';textChanged();};
 $('exportButton').onclick=()=>{const r=state.result;if(!r)return;const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${r.finalSize.width}mm" height="${r.finalSize.height}mm" viewBox="0 0 ${r.preview.width} ${r.preview.height}"><path fill-rule="nonzero" d="${r.preview.path}"/></svg>`,url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'})),a=document.createElement('a');a.href=url;a.download='标识字核算王-图形.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);};
 window.addEventListener('dragover',e=>e.preventDefault());window.addEventListener('drop',e=>e.preventDefault());window.addEventListener('resize',fitWeight);window.addEventListener('pagehide',()=>{waiting.stop();cancel(jobId);});
 function immediateText(){try{const shape=preview.setText($('textInput').value);if(shape){state.aspect=shape.sourceAspect;if($('aspectLock').checked)Object.assign(state,DimensionSizing.fromAnchor(state,state.aspect));else if(!DimensionSizing.valid(state.height))state.height=state.width*state.aspect;syncSizeInputs();preview.draw(state.width,state.height);}}catch(e){error(e.message);}}
 window.OnlineApp={state,getQuote:()=>currentQuote};
 $('exportButton').disabled=true;immediateText();calculate(start());
})();
