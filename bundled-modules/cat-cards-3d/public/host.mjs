export function connectHost(leave){
 if(parent===window)return;
 window.addEventListener('message',async event=>{if(event.origin!==location.origin||event.source!==parent||event.data?.type!=='3dalab-exit'||typeof event.data.id!=='string')return;let error;try{await leave();}catch(e){error=e.message;}parent.postMessage({type:'3dalab-exit-result',id:event.data.id,ok:!error,error},location.origin);});
 window.addEventListener('keydown',event=>{if(event.code!=='Escape'||document.querySelector('dialog[open]'))return;event.preventDefault();parent.postMessage({type:'3dalab-request-exit'},location.origin);});
}
export function requestHostExit(){parent.postMessage({type:'3dalab-request-exit'},location.origin);}
