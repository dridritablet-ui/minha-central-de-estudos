const SUBJECTS=["Educação Física","Arte","Inglês","Espanhol","Sociologia","Filosofia","Geografia","História","Química","Física","Biologia","Matemática","Redação","Literatura","Português"];
const ICONS=["♧","✿","Aa","文","◎","◇","⌖","▤","⚗","∿","❀","＋","✎","▧","¶"];
const $=id=>document.getElementById(id);
const load=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
let records=load("mce_records",[]), cards=load("mce_cards",[]), reviews=load("mce_reviews",[]), goal=load("mce_goal",10), schedule=load("mce_schedule",{}), lastActivity=load("mce_last",null);
const today=()=>new Date().toISOString().slice(0,10);
function page(name){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));$("page-"+name)?.classList.add("active");document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===name));window.scrollTo(0,0);if(name==="desempenho")renderPerformance();if(name==="continuar")renderContinue();if(name==="revisoes")renderReviews();if(name==="ferramentas")renderTools();}
document.addEventListener("click",e=>{const p=e.target.closest("[data-page]");if(p){e.preventDefault();page(p.dataset.page)}});
document.querySelectorAll("[data-tool]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===b));document.querySelectorAll(".tool-panel").forEach(t=>t.classList.remove("active"));$("tool-"+b.dataset.tool).classList.add("active")}));
function populateSubjects(){ $("subject-grid").innerHTML=SUBJECTS.map((s,i)=>`<button class="subject-card ${s==="Português"?"primary":""}" data-subject="${s}"><span class="subject-icon">${ICONS[i]}</span><b>${s}</b><span class="status">${s==="Português"?"Abrir plataforma":"Em andamento"}</span></button>`).join("");["record-subject","review-subject"].forEach(id=>$(id).innerHTML=SUBJECTS.map(s=>`<option>${s}</option>`).join(""));}
$("subject-grid").addEventListener("click",e=>{
  const b=e.target.closest("[data-subject]");
  if(!b)return;
  if(b.dataset.subject==="Português"){
    window.location.href="https://dridritablet-ui.github.io/portugues-em-construcao/";
  }else if(b.dataset.subject==="Matemática"){
    page("matematica");
    if(window.iniciarMatematica) window.iniciarMatematica();
  }else{
    alert("Esta disciplina está em andamento. A área será desenvolvida em uma próxima etapa.");
  }
});
$("record-date").value=today();
function mins(r){return Number(r.hours||0)*60+Number(r.minutes||0)}
function fmt(n){return `${Math.floor(n/60)}h ${String(n%60).padStart(2,"0")}min`}
function monday(d){let x=new Date(d+"T12:00:00");x.setDate(x.getDate()-((x.getDay()+6)%7));return x.toISOString().slice(0,10)}
function weeklyTotal(){let start=monday(today());return records.filter(r=>r.date>=start&&r.date<=today()).reduce((a,r)=>a+mins(r),0)}
$("record-form").addEventListener("submit",e=>{e.preventDefault();const r={id:crypto.randomUUID(),subject:$("record-subject").value,date:$("record-date").value,hours:+$("record-hours").value,minutes:+$("record-minutes").value,content:$("record-content").value.trim()};if(mins(r)<=0){alert("Informe um tempo maior que zero.");return}records.push(r);save("mce_records",records);lastActivity=r;save("mce_last",r);e.target.reset();$("record-date").value=today();$("record-hours").value=0;$("record-minutes").value=30;renderPerformance();});
function renderPerformance(){let total=records.reduce((a,r)=>a+mins(r),0);$("total-time").textContent=fmt(total);$("week-time").textContent=fmt(weeklyTotal());$("record-count").textContent=records.length;
let days=[];for(let i=6;i>=0;i--){let d=new Date();d.setDate(d.getDate()-i);let iso=d.toISOString().slice(0,10);days.push({iso,label:["dom","seg","ter","qua","qui","sex","sáb"][d.getDay()],value:records.filter(r=>r.date===iso).reduce((a,r)=>a+mins(r),0)})}let max=Math.max(60,...days.map(d=>d.value));$("week-chart").innerHTML=days.map(d=>`<div class="bar-col" title="${fmt(d.value)}"><div class="bar" style="height:${Math.max(2,d.value/max*100)}%"></div><small>${d.label}</small></div>`).join("");
$("subject-breakdown").innerHTML=SUBJECTS.map(s=>({s,v:records.filter(r=>r.subject===s).reduce((a,r)=>a+mins(r),0)})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v).map(x=>`<div class="breakdown-row"><div class="breakdown-label"><span>${x.s}</span><b>${Math.round(x.v/(total||1)*100)}%</b></div><div class="breakdown-track"><span style="width:${x.v/(total||1)*100}%"></span></div></div>`).join("")||'<p class="empty">Seus percentuais aparecerão depois dos primeiros registros.</p>';
$("record-list").innerHTML=[...records].reverse().map(r=>`<div class="record-item"><div><b>${escapeHTML(r.subject)} — ${escapeHTML(r.content)}</b><small>${r.date} · ${fmt(mins(r))}</small></div><button class="delete-btn" data-delete-record="${r.id}" aria-label="Excluir registro">×</button></div>`).join("")||'<p class="empty">Nenhum estudo registrado ainda.</p>';
renderGoal();}
$("record-list").addEventListener("click",e=>{let b=e.target.closest("[data-delete-record]");if(!b)return;records=records.filter(r=>r.id!==b.dataset.deleteRecord);save("mce_records",records);renderPerformance()});
function renderGoal(){let done=weeklyTotal(),target=goal*60,pct=Math.min(100,Math.round(done/(target||1)*100));$("goal-progress-text").textContent=`${fmt(done)} de ${goal}h`;$("goal-percent").textContent=pct+"%";$("goal-bar").style.width=pct+"%";}
$("flashcard-form").addEventListener("submit",e=>{e.preventDefault();cards.push({id:crypto.randomUUID(),front:$("flash-front").value.trim(),back:$("flash-back").value.trim()});save("mce_cards",cards);e.target.reset();renderCards()});
function renderCards(){$("flashcard-list").innerHTML=cards.map(c=>`<article class="flashcard" data-card="${c.id}"><div class="flash-front">${escapeHTML(c.front)}</div><div class="flash-back">${escapeHTML(c.back)}</div><div class="flash-hint">Toque para revelar a resposta · toque novamente para ocultar</div></article>`).join("")||'<p class="empty">Você ainda não criou flashcards.</p>'}
$("flashcard-list").addEventListener("click",e=>{let c=e.target.closest("[data-card]");if(c)c.classList.toggle("revealed")});
$("notebook").value=load("mce_notebook","");$("notebook").addEventListener("input",()=>{save("mce_notebook",$("notebook").value);$("notebook-status").textContent="Salvo neste navegador."});
$("goal-hours").value=goal;$("goal-form").addEventListener("submit",e=>{e.preventDefault();goal=+$("goal-hours").value;save("mce_goal",goal);renderGoal();alert("Meta semanal salva.")});
function renderTools(){renderCards();renderGoal()}
const DAYS=["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"];
function renderSchedule(){$("schedule-list").innerHTML=DAYS.map((d,i)=>`<div class="schedule-row"><b>${d}</b><input data-day="${i}" value="${escapeAttr(schedule[i]||"")}" placeholder="Ex.: Matemática — 16h"></div>`).join("")}
$("save-schedule").addEventListener("click",()=>{document.querySelectorAll("[data-day]").forEach(i=>schedule[i.dataset.day]=i.value);save("mce_schedule",schedule);alert("Cronograma salvo.")});
$("review-form").addEventListener("submit",e=>{e.preventDefault();reviews.push({id:crypto.randomUUID(),subject:$("review-subject").value,content:$("review-content").value.trim()});save("mce_reviews",reviews);e.target.reset();renderReviews()});
function renderReviews(){$("review-list").innerHTML=SUBJECTS.map(s=>{let list=reviews.filter(r=>r.subject===s);return list.length?`<article class="panel"><h2>${s}</h2>${list.map(r=>`<div class="review-item"><div><b>${escapeHTML(r.content)}</b><small>Conteúdo para revisar</small></div><button class="delete-btn" data-delete-review="${r.id}">×</button></div>`).join("")}</article>`:""}).join("")||'<p class="empty">Sua lista de revisões está vazia.</p>'}
$("review-list").addEventListener("click",e=>{let b=e.target.closest("[data-delete-review]");if(!b)return;reviews=reviews.filter(r=>r.id!==b.dataset.deleteReview);save("mce_reviews",reviews);renderReviews()});
function renderContinue(){if(!lastActivity){$("continue-card").innerHTML='<p>Ainda não há uma sessão registrada. Faça um registro em Meu desempenho para começar seu histórico.</p><button class="primary-btn" data-page="desempenho">Registrar meu estudo</button>'}else{$("continue-card").innerHTML=`<p class="eyebrow">ÚLTIMA ATIVIDADE</p><h2>${escapeHTML(lastActivity.subject)}</h2><p>${escapeHTML(lastActivity.content)}</p><p class="save-status">${lastActivity.date} · ${fmt(mins(lastActivity))}</p><button class="primary-btn" data-page="desempenho">Ver meu histórico</button>`;$("last-activity").textContent=lastActivity.subject+" · "+lastActivity.content}}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function escapeAttr(s){return escapeHTML(s)}
populateSubjects();renderPerformance();renderSchedule();renderReviews();renderCards();renderContinue();
