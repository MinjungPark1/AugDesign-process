const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const escapeHTML = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const approaches = {W:'Workflow',T:'Audience',C:'Market',D:'Friction'};
let concepts=[], filter='all',presenting=false,slide=0;
const sections=$$('.chapter');
const gaps=[
 {label:'Recognize everyday experience',priority:'01 / STRONGEST DIFFERENTIATION',quote:'“I have never had a job. What experience can I show?”',unresolved:'Asking about skills does not necessarily help a beginner identify and explain them.',design:'Guide reflection on school activities, volunteering, helping at events or personal projects. Turn answers into concise, candidate-approved examples. Include a valid “I haven’t done this yet” option.',value:'Gives managers evidence beyond “zero years of experience,” potentially expanding the applicant pool.'},
 {label:'Make schedule fit visible',priority:'02 / STRONG PRACTICAL VALUE',quote:'“Can this job actually fit my week?”',unresolved:'Availability questions already exist. The opportunity is making specific fit understandable before applying.',design:'Compare a candidate’s availability with posted shifts, weekly hours, start date and closing times. Show conflicts, semester changes and commute limits clearly.',value:'Could reduce applications, interviews and early departures caused by schedule mismatch.'},
 {label:'Make “beginner-friendly” explicit',priority:'03 / CLEAR FIRST-JOB POSITIONING',quote:'“Does entry level really mean they will hire someone like me?”',unresolved:'Software can collect requirements, but the employer decides whether beginners are welcome.',design:'Ask participating employers to distinguish required from preferred experience, describe training provided, and name the tasks applicants will learn after hiring.',value:'Helps attract applicants who understand the role and its requirements.'},
 {label:'Explain application language',priority:'04 / USEFUL SUPPORTING FEATURE',quote:'“I don’t understand what this question means.”',unresolved:'A short application can still contain confusing terminology.',design:'Offer plain-language explanations, examples and an explicit “This is my first paid job” path. Show exactly what the employer receives before submission.',value:'Could reduce abandonment and incomplete or misunderstood answers.'},
 {label:'Make next steps dependable',priority:'05 / VALUABLE, OPERATIONALLY DIFFICULT',quote:'“What happens after I submit?”',unresolved:'Communication tools and reminders do not ensure that a manager makes a decision.',design:'Offer an employer-backed response deadline, a clear next action and a contact route when an application stalls. Display only confirmed status.',value:'Could reduce follow-up work and keep suitable candidates engaged, if employers uphold the commitment.'},
 {label:'Coordinate shifts across jobs',priority:'06 / NEW — CROSS-EMPLOYER SCHEDULING',quote:'“I work at two places. How do I keep my week from clashing?”',unresolved:'Employer scheduling tools and multiple-workplace accounts exist. Research whether workers can combine unrelated systems, track changes and account for travel without repeatedly copying schedules.',design:'A worker-owned calendar for all jobs and personal commitments. Highlight overlaps, travel buffers and unconfirmed changes. Let workers share available times without exposing other employers or private details.',value:'Workers may spend less time juggling schedules; employers may see fewer preventable clashes. Test adoption, timely updates and willingness to fund the service.'},
 {label:'Track hours and received pay',priority:'07 / NEW — PAY VISIBILITY',quote:'“Did I get paid for the hours I worked at each job?”',unresolved:'Payroll and earnings views already exist. Research how workers reconcile hours, pay periods, payslips and payments when their jobs use different tools.',design:'Separate scheduled from worked hours. Track each job’s rate and pay period, estimate gross earnings, record payslip gross and deductions, and compare payslip net with a recorded payment. Keep tips and adjustments explicit; show source and confirmation status.',value:'Workers gain a clearer record and can raise specific questions. Clear records may reduce employer follow-up work, but employers may not pay for a cross-job tool. Validate the payer.'}
];
function renderGaps(index=0){
 $('#gap-options').innerHTML=gaps.map((g,i)=>`<button class="gap-option" data-gap="${i}" aria-pressed="${i===index}" aria-controls="gap-detail"><b>0${i+1}</b><span>${g.label}</span></button>`).join('');
 const g=gaps[index];$('#gap-detail').innerHTML=`<div class="priority">${g.priority}</div><h3>${g.quote}</h3><h4>What remains unresolved</h4><p>${g.unresolved}</p><h4>What we could design</h4><p>${g.design}</p><h4>Potential value & payer question</h4><p>${g.value}</p>`;
 $$('#gap-options button').forEach(b=>b.addEventListener('click',()=>{renderGaps(+b.dataset.gap);$(`[data-gap="${b.dataset.gap}"]`).focus({preventScroll:true});}));
}
renderGaps();
function renderConcepts(){
 const q=$('#search').value.trim().toLowerCase();
 const items=concepts.filter(c=>(filter==='all'||c.id.startsWith(filter))&&`${c.name} ${c.target} ${c.competitors}`.toLowerCase().includes(q));
 $('#concept-rows').innerHTML=items.map(c=>`<tr class="${c.id==='T1'?'selected-row':''}"><td>${String(c.rank).padStart(2,'0')}</td><td><button data-idea="${c.id}">${escapeHTML(c.name)}</button>${c.id==='T1'?'<span class="chosen">SELECTED</span>':''}</td><td>${approaches[c.id[0]]}</td><td><span class="score">${c.score}<i aria-hidden="true"><span style="width:${c.score}%"></span></i></span></td><td>$${c.price.toLocaleString()}<br><span class="small">${escapeHTML(c.unit)}</span></td></tr>`).join('')||'<tr><td colspan="5">No matching ideas. Try another search or approach.</td></tr>';
 $('#result-count').textContent=`${items.length} of 30 concepts`;
 $$('[data-idea]').forEach(b=>b.addEventListener('click',()=>showIdea(b.dataset.idea)));
}
function showIdea(id){
 const c=concepts.find(c=>c.id===id);$('#idea-label').textContent=`RANK ${c.rank} / ${c.score} POINTS / ${c.id}`;
 const fields=[['Approach',c.shift],['Target users',c.target],['Problem to explore',c.pain],['Existing services',c.competitors],['Market context',c.market],['Payer & model',`${c.model} · ${c.payer}`],['Test price',`$${c.price.toLocaleString()} / ${c.unit}`],['Employer / buyer value',c.benefit],['Evidence status',c.evidence],['Main risk',c.risk],['Research question',c.question]];
 $('#idea-content').innerHTML=`<h3>${escapeHTML(c.name)}</h3><dl>${fields.map(([k,v])=>`<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`).join('')}</dl><p class="footnote">Source IDs in the project discovery workbook: ${escapeHTML(c.sources)}. Market figures are inherited research context; prices and scores are exploratory assumptions.</p>`;
 $('#idea-dialog').showModal();
}
fetch('concepts.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{concepts=data;renderConcepts()}).catch(()=>{$('#concept-rows').innerHTML='<tr><td colspan="5">The idea list could not load. Please refresh the page.</td></tr>'});
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;$$('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderConcepts()}));
$('#search').addEventListener('input',renderConcepts);
const tabs=$$('[role=tab]');
function selectTab(b){tabs.forEach(t=>{const selected=t===b;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;$('#'+t.getAttribute('aria-controls')).hidden=!selected})}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectTab(b));b.addEventListener('keydown',e=>{let index;if(e.key==='ArrowRight')index=(i+1)%tabs.length;else if(e.key==='ArrowLeft')index=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')index=0;else if(e.key==='End')index=tabs.length-1;else return;e.preventDefault();e.stopPropagation();selectTab(tabs[index]);tabs[index].focus()})});
$('#agenda-button').addEventListener('click',()=>$('#agenda-dialog').showModal());
$('#sources-button').addEventListener('click',()=>$('#sources-dialog').showModal());
$$('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
function markActive(index){$$('[data-section]').forEach(a=>{const active=a.dataset.section===sections[index].id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')})}
function setSlide(index){slide=Math.max(0,Math.min(index,sections.length-1));sections.forEach((s,i)=>s.classList.toggle('current',i===slide));$('#slide-count').textContent=`${slide+1} / ${sections.length}`;$('#previous').disabled=slide===0;$('#next-slide').disabled=slide===sections.length-1;markActive(slide);if(presenting){history.replaceState(null,'','#'+sections[slide].id);window.scrollTo({top:0,behavior:'instant'})}}
function togglePresent(){presenting=!presenting;document.body.classList.toggle('presenting',presenting);$('#present').textContent=presenting?'Exit presentation':'Present';$('#present').setAttribute('aria-pressed',String(presenting));$('.present-controls').hidden=!presenting;if(presenting)setSlide(slide);else sections[slide].scrollIntoView({behavior:'instant'});}
$('#present').addEventListener('click',togglePresent);$('#previous').addEventListener('click',()=>setSlide(slide-1));$('#next-slide').addEventListener('click',()=>setSlide(slide+1));
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=$(a.getAttribute('href'));if(!target)return;const idx=sections.findIndex(s=>s===target||s.contains(target));if(a.closest('dialog'))a.closest('dialog').close();if(presenting){e.preventDefault();setSlide(idx)}}));
document.addEventListener('keydown',e=>{if($('dialog[open]')||e.target.closest('input,textarea,select,[role=tablist]')||e.altKey||e.metaKey||e.ctrlKey)return;if(presenting){if(e.key==='Escape'){togglePresent();return}if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();setSlide(slide+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();setSlide(slide-1)}}});
const observer=new IntersectionObserver(entries=>{if(presenting)return;const visible=entries.filter(e=>e.isIntersecting);if(visible.length){slide=sections.indexOf(visible[0].target);markActive(slide)}},{rootMargin:'-150px 0px -55% 0px',threshold:0});sections.forEach(s=>observer.observe(s));markActive(0);

$('#shift-scenario').addEventListener('change',e=>{
 const mode=e.target.value, proposed=$('#proposed-shift'),feedback=$('#schedule-feedback');
 proposed.hidden=mode==='normal';feedback.classList.toggle('conflict',mode!=='normal');
 if(mode==='normal'){proposed.textContent='';feedback.textContent='24 scheduled paid hours · no overlapping shifts in this example.';}
 else if(mode==='overlap'){proposed.innerHTML='<b>Dunkin · proposed</b><span>10 a.m.–2 p.m.</span><small>Not confirmed</small>';feedback.textContent='2-hour overlap: Starbucks ends at noon, but the proposed Dunkin shift starts at 10 a.m. Ask for a different time; keep the request unconfirmed.';}
 else{proposed.innerHTML='<b>Dunkin · proposed</b><span>Noon–4 p.m.</span><small>Not confirmed</small>';feedback.textContent='Travel conflict: there is no overlap, but the 45-minute journey makes a noon start impossible. Earliest arrival in this example: 12:45 p.m. Request a later start.';}
});
