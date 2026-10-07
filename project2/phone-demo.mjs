const frame=document.querySelector('#preview');
let ready=false;
const send=command=>{if(!ready){document.querySelector('#load-message').textContent='Preview is still loading. Please try again in a moment.';return;}frame.contentWindow.postMessage({type:'shiftwise-demo-command',...command},location.origin)};
document.querySelector('#start').addEventListener('click',()=>send({action:'tour'}));
document.querySelector('#scenarios').addEventListener('click',()=>send({action:'scenarios'}));
document.querySelector('#reset').addEventListener('click',()=>send({action:'reset'}));
document.querySelectorAll('[data-role]').forEach(button=>button.addEventListener('click',()=>send({action:'role',role:button.dataset.role})));
window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==frame.contentWindow||event.data?.type!=='shiftwise-demo-state')return;ready=true;document.querySelector('#load-message').textContent='Interactive preview · changes saved on this device';const {role,status}=event.data;document.querySelectorAll('[data-role]').forEach(button=>{const selected=button.dataset.role===role;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected))});const names={maya:'Maya’s private workspace',jordan:'Jordan’s coworker view',sam:'Sam’s coworker view',alex:'Alex’s workplace-only view'};document.querySelector('#role-label').textContent=names[role]||'Demo workspace';const step=status==='Covered'?2:status==='Awaiting approval'||status==='Open'?1:0;document.querySelectorAll('[data-step]').forEach(el=>el.classList.toggle('active',Number(el.dataset.step)<=step));});

frame.addEventListener('load',()=>frame.contentWindow.postMessage({type:'shiftwise-demo-command',action:'ping'},location.origin));
frame.contentWindow?.postMessage({type:'shiftwise-demo-command',action:'ping'},location.origin);
