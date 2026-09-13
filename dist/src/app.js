import {seed,EVENT_TYPES} from './data.js';
import {loginView,studentShell,discoverPage,harmonyPage,explorePage,icon,eventCard} from './views.js';
import {user,pair,blocked,canChat,discover,swipe,send,moderate,eventSave,markRead,notifications,visibleEvents,resetDemo,migrate} from './domain.js';
const KEY='harmonia-demo-v2';
let state;
try { state=migrate(JSON.parse(localStorage.getItem(KEY)||localStorage.getItem('harmonia-demo-v1')||'null')); }
catch { state=seed(); }
let account=sessionStorage.getItem('harmonia-account')||'',page='discover',chat='',filter='',modal='',editing='';
let eventFilter='',savedOnly=false,accountRole='student',accountSearch='',swiping=false,shareEventId='',toastTimer;
page=user(state,account)?.role==='admin'?'admin':user(state,account)?.role==='business'?'business':'discover';
const viewContext=u=>({state,u,page,chat,filter,modal,eventFilter,savedOnly,accountRole,accountSearch});
const root=document.querySelector('#app');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials=u=>u.name.split(' ').slice(0,2).map(x=>x[0]).join('');
const avatar=(u,large=false)=>`<div class="avatar ${large?'large':''}" style="--avatar:${u.color||'#665d42'}">${esc(initials(u))}</div>`;
const btn=(label,action,id='',cls='')=>`<button type="button" ${action==='like'?'aria-label="Swipe naar rechts"':action==='pass'?'aria-label="Swipe naar links"':''} class="${cls}" data-action="${action}" data-id="${esc(id)}">${label}</button>`;
const chips=items=>items.map(i=>`<span class="chip">${esc(i)}</span>`).join('');
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{notify('Opslaan is mislukt. Mogelijk is de browseropslag vol.');}}
function notify(t){const e=document.querySelector('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),4500);}
function login(){return loginView(viewContext());}
function nav(u){const entries=u.role==='student'?[['discover','◈','Discover'],['harmonies','☷','Harmonies'],['explore','◎','Explore'],['profile','◉','Profiel']]:u.role==='admin'?[['admin','▦','Overzicht'],['reports','⚑','Meldingen'],['businesses','◎','Bedrijven']]:[['business','▦','Mijn bedrijf'],['events','◎','Evenementen']];return entries.map(([id,icon,label])=>`<button class="nav-item ${page===id?'selected':''}" data-action="nav" data-id="${id}"><span>${icon}</span>${label}</button>`).join('');}
function shell(u,body){if(u.role==='student')return studentShell(viewContext(u),body);return `<div class="layout"><aside class="sidebar"><a class="brand" href="#"><span class="brandmark">H</span> harmonia<span class="gold">.</span></a><p class="side-tag">FIND YOUR HARMONY</p><nav>${nav(u)}</nav><div class="side-bottom"><div class="city-label">◎ &nbsp; Gent, België</div><div class="mini-profile">${avatar(u)}<span><strong>${esc(u.name)}</strong><small>${u.role==='student'?'Student · demo':u.role==='admin'?'Administrator':'Bedrijfsaccount'}</small></span></div>${btn('⇄ Wissel testaccount','logout','','quiet')}</div></aside><main class="main"><header class="topbar"><span>Jouw studentenleven, verbonden.</span><span class="demo-badge">LOKALE DEMO</span></header>${body}<footer>Harmonia · Alle profielen, bedrijven en activiteiten zijn fictieve testgegevens.</footer></main></div>${modal}`;}
function heading(k,title,description=''){return `<div class="heading"><span class="eyebrow">${k}</span><h1>${title}</h1>${description?`<p class="muted">${description}</p>`:''}</div>`;}
function discoverView(u){return discoverPage(viewContext(u));}
function harmonyView(u){return harmonyPage(viewContext(u));}
function exploreView(u){return explorePage(viewContext(u));}
function profileView(u){return `${heading('DIT BEN JIJ','Jouw profiel.')}<form id="profile-form" class="panel form-panel">${avatar(u)}<label>Naam<input name="name" value="${esc(u.name)}" required maxlength="70"></label><div class="form-row"><label>Leeftijd<input type="number" min="18" max="99" name="age" value="${u.age}" required></label><label>Instelling<select name="school">${['UGent','HOGENT','Arteveldehogeschool'].map(s=>`<option ${u.school===s?'selected':''}>${s}</option>`).join('')}</select></label></div><label>Studierichting<input name="study" value="${esc(u.study)}" required maxlength="100"></label><label>Wat zoek je?<input name="intent" value="${esc(u.intent)}" required maxlength="100"></label><label>Over jou<textarea name="bio" maxlength="500" required>${esc(u.bio)}</textarea></label><label>Interesses, gescheiden door komma's<input name="interests" value="${esc(u.interests.join(', '))}" required maxlength="200"></label><label>Talen<input name="languages" value="${esc(u.languages)}" maxlength="100"></label><button class="primary">Wijzigingen opslaan</button></form>`;}
function adminView(u){if(page==='reports')return `${heading('BEHEER & MODERATIE','Meldingen.')}<div class="stack">${state.reports.map(r=>`<article class="panel"><span class="eyebrow">${r.resolved?'AFGEHANDELD':'OPEN'}</span><h2>${esc(user(state,r.target)?.name)}</h2><p>${esc(r.reason)}</p><p class="small muted">Gemeld door ${esc(user(state,r.from)?.name)}</p>${!r.resolved?btn('Markeer afgehandeld','resolve',r.id,'primary'):''} ${btn(user(state,r.target)?.active?'Account schorsen':'Account herstellen','toggle-user',r.target,'quiet')}</article>`).join('')||'<div class="empty"><h2>Geen open zorgen.</h2><p>Meld een profiel vanuit een studentenaccount om deze flow te testen.</p></div>'}</div>`;const businesses=page==='businesses';return `${heading('BEHEER & MODERATIE',businesses?'Bedrijven.':'Goedemiddag, admin.')}${resetPanel()}<div class="stats">${[['Studenten',state.users.filter(x=>x.role==='student'&&x.active).length],['Harmonies',state.matches.length],['Open meldingen',state.reports.filter(x=>!x.resolved).length],['Bedrijven',state.users.filter(x=>x.role==='business').length]].map(([k,v])=>`<div class="panel"><span class="muted">${k}</span><strong>${v}</strong></div>`).join('')}</div><div class="panel table-wrap"><table><thead><tr><th>${businesses?'Bedrijf':'Student'}</th><th>Status</th><th>Acties</th></tr></thead><tbody>${state.users.filter(x=>x.role===(businesses?'business':'student')).map(p=>`<tr><td><strong>${esc(p.name)}</strong><small>${esc(p.study||p.category)}</small></td><td><span class="chip">${p.active?'Actief':'Geschorst'}${businesses?' · '+(p.verified?'Geverifieerd':'In afwachting'):''}</span></td><td>${businesses&&!p.verified?btn('Verifieer','verify',p.id,'quiet'):''} ${btn(p.active?'Schorsen':'Herstellen','toggle-user',p.id,'text-button')}</td></tr>`).join('')}</tbody></table></div>`;}
function businessView(u){if(page==='events')return `${heading('JOUW BEDRIJVENOMGEVING','Evenementen.')}<p>${btn('＋ Nieuw evenement','new-event','','primary')}</p>${!u.verified?'<p class="notice">Je bedrijf wacht op verificatie door de admin. Evenementen worden als concept opgeslagen.</p>':''}<div class="stack">${state.events.filter(e=>e.owner===u.id).map(e=>`<article class="panel"><span class="eyebrow">${e.published&&u.verified?'GEPUBLICEERD':'CONCEPT'}</span><h2>${esc(e.title)}</h2><p>${esc(e.date)} · ${esc(e.time)} · ${esc(e.price)}</p>${btn('Bewerken','edit-event',e.id,'quiet')} ${btn('Verwijderen','delete-event',e.id,'text-button')}</article>`).join('')}</div>`;return `${heading('JOUW BEDRIJVENOMGEVING',esc(u.name))}<form id="business-form" class="panel form-panel"><p class="notice">${u.verified?'✓ Geverifieerd testbedrijf':'Verificatie in afwachting · de admin kan dit bedrijf goedkeuren'}</p><label>Bedrijfsnaam<input name="name" value="${esc(u.name)}" required maxlength="100"></label><label>Categorie<input name="category" value="${esc(u.category)}" required maxlength="100"></label><label>Beschrijving<textarea name="description" required maxlength="500">${esc(u.description)}</textarea></label><label>Locatie<input name="address" value="${esc(u.address)}" required maxlength="150"></label><button class="primary">Bedrijfsprofiel opslaan</button></form>`;}
function render(){const u=user(state,account);document.body.classList.toggle('student-mode',u?.role==='student');if(u&&chat&&!canChat(state,account,chat))chat='';if(!u?.active){account='';root.innerHTML=login();return;}root.innerHTML=shell(u,u.role==='admin'?adminView(u):u.role==='business'?businessView(u):page==='harmonies'?harmonyView(u):page==='explore'?exploreView(u):page==='profile'?profileView(u):discoverView(u));const card=root.querySelector('.swipe-card');if(card){let x=0,y=0,drag=false;card.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;x=e.clientX;y=e.clientY;drag=true;card.setPointerCapture(e.pointerId);card.classList.add('dragging');});card.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-x,dy=e.clientY-y;if(Math.abs(dx)>Math.abs(dy)){card.style.transform=`translateX(${dx*.5}px) rotate(${dx*.035}deg)`;card.style.opacity=String(Math.max(.65,1-Math.abs(dx)/900));card.classList.toggle('lean-right',dx>35);card.classList.toggle('lean-left',dx< -35);}});const stopDrag=()=>{drag=false;card.classList.remove('dragging','lean-left','lean-right');card.style.transform='';card.style.opacity='';};card.addEventListener('pointercancel',stopDrag);card.addEventListener('pointerup',e=>{if(!drag)return;const dx=e.clientX-x,dy=e.clientY-y;stopDrag();if(Math.abs(dx)>75&&Math.abs(dx)>Math.abs(dy))doSwipe(card.dataset.profile,dx>0);});card.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)&&!e.target.closest('button')){e.preventDefault();doSwipe(card.dataset.profile,e.key==='ArrowRight');}});}root.querySelector('.messages')?.scrollTo(0,999999);}
function dialog(content){modal=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-label="Harmonia dialoog">${content}</section></div>`;render();root.querySelector('.modal input, .modal textarea, .modal select, .modal button')?.focus();}
function doSwipe(id,liked){
 if(swiping)return;
 swiping=true;
 const card=root.querySelector('.swipe-card');
 card?.classList.add(liked?'exit-right':'exit-left');
 const actor=account;
 setTimeout(()=>{
  try{
   if(account!==actor)return;
   const matched=swipe(state,account,id,liked);save();
   if(matched){const p=user(state,id);dialog(`<div class="match-celebration"><span class="match-orbit"></span><span class="match-star">✦</span><span class="eyebrow">JULLIE VOELEN DE KLIK</span><h1>It's a<br><em>Harmony!</em></h1><p>Jij en ${esc(p.name.split(' ')[0])}.<br>Het begin van een nieuw verhaal.</p><div class="match-avatars">${avatar(user(state,account))}${avatar(p)}</div>${btn('Zeg eens hallo ↗','open-chat',id,'primary')}${btn('Verder swipen','close','','quiet')}</div>`);}
   else render();
  }catch(e){notify(e.message);render();}finally{swiping=false;}
 },window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:210);
}
function resetPanel(){return `<section class="reset-options"><div class="panel"><span class="eyebrow">EEN NIEUWE RONDE</span><h2>Reset interacties</h2><p>Wis swipes, Harmonies, chats, meldingen, blokkeringen en bewaarde activiteiten. Je profielen en evenementen blijven staan.</p>${btn('Reset interacties','reset-interactions','','primary')}</div><div class="panel"><span class="eyebrow">HELEMAAL OPNIEUW</span><h2>Reset volledige demo</h2><p>Herstel 60 studenten, 20 bedrijven en 40 activiteiten. Ook je profiel- en evenementwijzigingen worden teruggezet.</p>${btn('Reset volledige demo','reset','','quiet')}</div></section>`;}
function showEvent(id){const ev=visibleEvents(state).find(x=>x.id===id);if(!ev)throw Error('Deze activiteit is niet meer beschikbaar.');dialog(`<span class="eyebrow">${esc(ev.category)} · GENT</span><h2>${esc(ev.title)}</h2><p>${esc(ev.description)}</p><p>${esc(ev.date)} · ${esc(ev.time)}<br>${esc(user(state,ev.owner).name)} · ${esc(ev.price)}</p>${btn('Samen gaan ↗','share-event',ev.id,'primary')}${btn('Sluiten','close','','quiet')}`);}
function sharePicker(id){
 if(!visibleEvents(state).some(e=>e.id===id))throw Error('Deze activiteit is niet meer beschikbaar.');
 shareEventId=id;
 const people=state.matches.filter(m=>m.members.includes(account)).map(m=>user(state,m.members.find(x=>x!==account))).filter(p=>canChat(state,account,p.id));
 dialog(`<h2>Met wie ga je?</h2><p>Deel deze activiteit met een Harmony.</p><div class="share-list">${people.map(p=>btn(avatar(p)+esc(p.name),'send-event',p.id,'share-person')).join('')||'<p>Nog geen Harmonies. Maak eerst een wederzijdse klik in Discover.</p>'}</div>${btn('Sluiten','close','','quiet')}`);
}
root.addEventListener('change',e=>{if(e.target.id==='interest'){filter=e.target.value;render();}});
root.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const {action:a,id}=b.dataset,u=user(state,account);try{if(a==='login'){account=id;sessionStorage.setItem('harmonia-account',id);page=user(state,id).role==='admin'?'admin':user(state,id).role==='business'?'business':'discover';filter='';chat='';eventFilter='';savedOnly=false;const n=notifications(state,id);if(n.total)notify(`${n.matches} nieuwe Harmonies · ${n.messages} ongelezen berichten`);}
else if(a==='logout'){accountRole=u?.role||'student';accountSearch='';account='';chat='';modal='';sessionStorage.removeItem('harmonia-account');}
else if(a==='nav'){page=id;chat='';}
else if(a==='like'||a==='pass'){doSwipe(id,a==='like');return;}
else if(a==='close')modal='';
else if(a==='open-chat'){modal='';page='harmonies';chat=id;markRead(state,account,id);}
else if(a==='chat'){chat=id;markRead(state,account,id);}
else if(a==='save-event'){const i=state.saved.findIndex(x=>x.user===account&&x.event===id);if(i<0)state.saved.push({user:account,event:id});else state.saved.splice(i,1);}
else if(a==='account-role'){accountRole=id;accountSearch='';}
else if(a==='back-chats'){chat='';}
else if(a==='event-filter'){eventFilter=id;}
else if(a==='saved-toggle'){savedOnly=!savedOnly;}
else if(a==='clear-event-filter'){eventFilter='';savedOnly=false;}
else if(a==='event-detail'){showEvent(id);return;}
else if(a==='share-event'){sharePicker(id);return;}
else if(a==='send-event'){const ev=visibleEvents(state).find(x=>x.id===shareEventId);if(!ev)throw Error('Activiteit niet beschikbaar.');send(state,account,id,'Samen naar '+ev.title+'?',ev.id);chat=id;page='harmonies';markRead(state,account,id);modal='';notify('Activiteit gedeeld.');}
else if(a==='choose-event'){dialog(`<h2>Wat gaan jullie doen?</h2><div class="share-list">${visibleEvents(state).map(ev=>btn(esc(ev.title)+'<small>'+esc(ev.category)+' · '+esc(ev.date)+'</small>','share-event',ev.id,'share-activity')).join('')}</div>${btn('Sluiten','close','','quiet')}`);return;}
else if(a==='report'){editing=id;dialog(`<h2>Profiel melden</h2><p>Waarom wil je dit profiel melden?</p><form id="report-form"><label>Reden<textarea name="reason" required maxlength="1000"></textarea></label><button class="primary">Melding versturen</button>${btn('Annuleren','close','','quiet')}</form>`);return;}
else if(a==='block'){dialog(`<h2>${esc(user(state,id).name)} blokkeren?</h2><p>Jullie zien elkaar niet meer in Discover en kunnen niet meer chatten.</p>${btn('Blokkeren','confirm-block',id,'primary')}${btn('Annuleren','close','','quiet')}`);return;}
else if(a==='confirm-block'){state.blocks.push({from:account,to:id});modal='';notify('Profiel geblokkeerd.');}
else if(a==='toggle-user'){moderate(state,account,id);}
else if(a==='verify'){if(u.role!=='admin')throw Error('Geen toegang.');user(state,id).verified=true;}
else if(a==='resolve'){if(u.role!=='admin')throw Error('Geen toegang.');state.reports.find(r=>r.id===id).resolved=true;}
else if(a==='reset-interactions'){dialog(`<h2>Nieuwe ronde beginnen?</h2><p>Alle interacties verdwijnen. Profielen en evenementen blijven behouden.</p>${btn('Ja, reset interacties','confirm-interactions','','primary')}${btn('Annuleren','close','','quiet')}`);return;}
else if(a==='confirm-interactions'){state=resetDemo(state,account,'interactions');modal='';chat='';notify('Alle interacties zijn gewist. Je profielen en evenementen zijn behouden.');}
else if(a==='reset'){dialog(`<h2>Demo opnieuw beginnen?</h2><p>Dit verwijdert alle lokale testgesprekken, wijzigingen en swipes.</p>${btn('Ja, herstel testgegevens','confirm-reset','','primary')}${btn('Annuleren','close','','quiet')}`);return;}
else if(a==='confirm-reset'){if(u.role!=='admin')throw Error('Geen toegang.');state=resetDemo(state,account,'all');modal='';chat='';notify('De volledige demo is hersteld.');}
else if(a==='new-event'||a==='edit-event'){editing=a==='edit-event'?id:'';const ev=state.events.find(x=>x.id===editing)||{title:'',date:new Date(Date.now()+86400000).toISOString().slice(0,10),time:'18:00',category:'Koffie',price:'Gratis toegang',description:''};dialog(`<h2>${editing?'Evenement bewerken':'Nieuw evenement'}</h2><form id="event-form"><label>Titel<input name="title" value="${esc(ev.title)}" required maxlength="120"></label><div class="form-row"><label>Datum<input type="date" name="date" value="${ev.date}" required></label><label>Tijd<input type="time" name="time" value="${ev.time}" required></label></div><label>Categorie<select name="category">${EVENT_TYPES.map(c=>`<option ${ev.category===c?'selected':''}>${c}</option>`).join('')}</select></label><label>Prijs<input name="price" value="${esc(ev.price)}" required maxlength="80"></label><label>Beschrijving<textarea name="description" maxlength="500" required>${esc(ev.description)}</textarea></label><button class="primary">${u.verified?'Opslaan en publiceren':'Concept opslaan'}</button>${btn('Annuleren','close','','quiet')}</form>`);return;}
else if(a==='delete-event'){dialog(`<h2>Evenement verwijderen?</h2>${btn('Verwijderen','confirm-delete',id,'primary')}${btn('Annuleren','close','','quiet')}`);return;}
else if(a==='confirm-delete'){const ev=state.events.find(x=>x.id===id);if(ev.owner!==account)throw Error('Geen toegang.');state.events=state.events.filter(x=>x.id!==id);modal='';}
save();render();if(['login','logout','nav','open-chat'].includes(a))window.scrollTo(0,0);}catch(err){notify(err.message);}});
root.addEventListener('submit',e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),u=user(state,account);try{if(f.id==='message-form')send(state,account,chat,d.text);
else if(f.id==='profile-form'){if(!d.name.trim()||!d.bio.trim()||!d.interests.trim())throw Error('Vul je profiel aan.');Object.assign(u,d,{age:Number(d.age),interests:[...new Set(d.interests.split(',').map(x=>x.trim()).filter(Boolean))].slice(0,12)});notify('Je profiel is opgeslagen.');}
else if(f.id==='business-form'){Object.assign(u,d);notify('Je bedrijfsprofiel is opgeslagen.');}
else if(f.id==='report-form'){if(!d.reason.trim())throw Error('Vul een reden in.');state.reports.push({id:crypto.randomUUID(),from:account,target:editing,reason:d.reason.trim(),resolved:false});modal='';notify('Je melding is verstuurd naar de admin.');}
else if(f.id==='event-form'){eventSave(state,account,{...d,id:editing});modal='';notify('Evenement opgeslagen.');}
save();render();if(f.id==='message-form')root.querySelector('[name="text"]')?.focus();}catch(err){notify(err.message);}});
window.addEventListener('storage',e=>{if(e.key===KEY){try{const value=JSON.parse(e.newValue);if(value?.version===2){state=value;if(page==='harmonies'&&chat&&document.visibilityState==='visible'){if(markRead(state,account,chat))save();}render();}}catch{}}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal){modal='';render();}if(e.key==='Tab'&&modal){const list=[...root.querySelectorAll('.modal button,.modal input,.modal select,.modal textarea')];if(e.shiftKey&&document.activeElement===list[0]){e.preventDefault();list.at(-1)?.focus();}else if(!e.shiftKey&&document.activeElement===list.at(-1)){e.preventDefault();list[0]?.focus();}}});
save();render();

if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'harmonia_discover_profiles',description:'Lees beschikbare fictieve studenten voor het actieve studentaccount. Verandert geen gegevens.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute(){if(user(state,account)?.role!=='student')throw Error('Kies eerst een studentaccount.');return discover(state,account,filter).map(p=>({id:p.id,name:p.name,interests:p.interests}));}})).catch(()=>{});}catch{}}

root.addEventListener('input',e=>{
 if(e.target.id==='account-search'){
  const pos=e.target.selectionStart;accountSearch=e.target.value;render();
  const input=root.querySelector('#account-search');input.focus();input.setSelectionRange(pos,pos);
 }
});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&page==='harmonies'&&chat){if(markRead(state,account,chat))save();render();}});
if('serviceWorker' in navigator) navigator.serviceWorker.register(new URL('../sw.js', import.meta.url)).catch(()=>{});
