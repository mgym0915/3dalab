export function mount(root,{api,toast,escape,cid,messages,people,onLeave}){
 root.innerHTML='<div class="chat-toolbar"><span class="chat-count"></span><button class="secondary-button leave-chat">退出聊天室</button></div><div class="chat-messages" role="log" aria-live="polite"></div><form class="chat-form"><input name="body" placeholder="消息" aria-label="聊天消息" maxlength="500" required autocomplete="off"><button type="submit" class="primary-button">发送</button></form>';
 const list=root.querySelector('.chat-messages'),form=root.querySelector('form'),ids=new Set();
 function message(m){if(ids.has(m.id))return;ids.add(m.id);const row=document.createElement('article');row.className='chat-message';row.innerHTML=`<header><span>${escape(m.author)}</span><time>${new Date(m.created).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})}</time></header><p>${escape(m.body)}</p>`;list.append(row);while(list.children.length>100)list.firstChild.remove();list.scrollTop=list.scrollHeight;}
 function presence(p){root.querySelector('.chat-count').textContent=p.roomCount+' 人在聊天室';}
 function connection(ready){form.querySelector('button').disabled=!ready;}
 messages.forEach(message);presence(people);
 root.querySelector('.leave-chat').addEventListener('click',()=>onLeave().catch(error=>toast(error.message)));
 form.addEventListener('submit',async event=>{event.preventDefault();const button=form.querySelector('button');button.disabled=true;try{await api('/api/chat/send',{method:'POST',body:JSON.stringify({cid,body:form.elements.body.value})});form.elements.body.value='';}catch(error){toast(error.message);}finally{button.disabled=false;}});
 return{message,presence,connection,history(items){items.forEach(message);}};
}
