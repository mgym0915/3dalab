export function createNavigation({apply,canLeave}){
 let current={labNav:true,index:0,kind:'home'},restoring=null,approved=false,asking=null,busy=false;
 history.replaceState(current,'');
 function push(value){current={...value,labNav:true,index:current.index+1};history.pushState(current,'');}
 async function permission(){if(current.kind!=='game')return true;if(!asking)asking=Promise.resolve(canLeave()).finally(()=>asking=null);return asking;}
 async function go(delta){if(!delta||busy||restoring)return;busy=true;if(!await permission()){busy=false;return;}approved=true;history.go(delta);}
 window.addEventListener('popstate',async event=>{
  const target=event.state;if(!target?.labNav)return;
  if(restoring&&target.index===current.index){const resolve=restoring;restoring=null;resolve();return;}
  if(current.kind==='game'&&!approved){if(busy)return;busy=true;const delta=target.index-current.index;await new Promise(resolve=>{restoring=resolve;history.go(-delta);});if(await permission()){approved=true;history.go(delta);}else busy=false;return;}
  approved=false;current=target;try{await apply(target);}finally{busy=false;}
 });
 window.addEventListener('beforeunload',event=>{if(current.kind==='game'){event.preventDefault();event.returnValue='';}});
 return{push,get current(){return current;},back:()=>go(-1),home:()=>go(-current.index),reset(){current={labNav:true,index:0,kind:'home'};history.replaceState(current,'');}};
}

export function createExitPrompt(){
 const dialog=document.createElement('dialog');dialog.id='exitConfirmation';dialog.setAttribute('aria-labelledby','exitConfirmationTitle');dialog.innerHTML='<h2 id="exitConfirmationTitle">退出游戏？</h2><div><button data-stay>继续游戏</button><button data-exit>退出游戏</button></div>';document.body.append(dialog);let pending=null;
 return()=>{if(pending)return pending;pending=new Promise(resolve=>{const finish=value=>{dialog.close();pending=null;resolve(value);};dialog.querySelector('[data-stay]').onclick=()=>finish(false);dialog.querySelector('[data-exit]').onclick=()=>finish(true);dialog.oncancel=e=>{e.preventDefault();finish(false);};dialog.showModal();dialog.querySelector('[data-stay]').focus();});return pending;};
}
