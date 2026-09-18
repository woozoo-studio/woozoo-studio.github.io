const links=[...document.querySelectorAll('nav a')];
const themeStyle=document.createElement('link');themeStyle.rel='stylesheet';themeStyle.href='themes.css';document.head.append(themeStyle);
const sections=[...document.querySelectorAll('main>section')];
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){links.forEach(a=>{const current=a.hash==='#'+entry.target.id;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-15% 0px -55% 0px'});
sections.forEach(s=>observer.observe(s));
// Keep the featured project concise on the web, but print its evidence as static content.
let printDetailState=[];
addEventListener('beforeprint',()=>{
 const printable=[...document.querySelectorAll('.featured>details')];
 printDetailState=printable.map(detail=>detail.open);
 printable.forEach(detail=>detail.open=true);
});
addEventListener('afterprint',()=>{
 document.querySelectorAll('.featured>details').forEach((detail,index)=>detail.open=Boolean(printDetailState[index]));
});
// Supplementary background, kept separate from the three-item timeline.
document.querySelector('#experience').insertAdjacentHTML('beforeend', `<div class="credentials"><article><p class="eyebrow">EDUCATION</p><h3>학력</h3><div class="education-list"><div><strong>한국해양대학교 · 해상보험전공</strong><span>2021.01 졸업 · 4.08 / 4.5</span></div><div><strong>광주중앙고등학교 · 문과</strong><span>2015.02 졸업</span></div></div></article><article><p class="eyebrow">CERTIFICATIONS & LANGUAGES</p><h3>자격·어학</h3><div class="credential-list"><div><strong>2급 항해사(상선)</strong><span>해양수산부 · 2025.07.22</span></div><div><strong>컴퓨터활용능력 2급</strong><span>대한상공회의소 · 2020.11.13</span></div><div><strong>OPIc IH</strong><span>2026.01.08</span></div><div><strong>TOEIC 875</strong><span>2026.04.12</span></div></div></article></div>`);
const company=document.querySelector('.timeline article:last-child h3');
company.insertAdjacentHTML('beforebegin', `<a class="company-ci" href="https://www.h-lineshipping.com/en/overview/vision/" target="_blank" rel="noreferrer" aria-label="에이치라인해운 공식 CI"><img src="https://www.h-lineshipping.com/wp-content/themes/hline/assets/images/ci_box41.svg" alt="H-LINE SHIPPING" width="150" height="48"><span>공식 회사 소개 ↗</span></a>`);
document.querySelector('.company-ci img').addEventListener('error',function(){this.hidden=true;});
document.querySelector('#skills .section-head').insertAdjacentHTML('afterend', `<p class="skills-intro">경로와 위치를 다루는 소프트웨어부터, 실제 장치를 움직이는 제어까지.</p>`);
// Temporary local-only palette review. Remove this block for the final version.
if(['localhost','127.0.0.1'].includes(location.hostname)){
 const palettes=[
  ['cobalt','코발트 · 틸','linear-gradient(90deg,#2457e6 0 58%,#0b8b80 58%)'],
  ['ocean2','딥네이비 · 시안','linear-gradient(90deg,#173b57 0 58%,#00a4b5 58%)'],
  ['forest','차콜 · 에메랄드','linear-gradient(90deg,#29383e 0 58%,#118864 58%)'],
  ['indigo2','인디고 · 코랄','linear-gradient(90deg,#5148c7 0 58%,#e16b55 58%)'],
  ['steel2','스틸블루 · 코퍼','linear-gradient(90deg,#315b76 0 58%,#bb6839 58%)'],
  ['nightlime','딥네이비 · 라임','linear-gradient(90deg,#111a2b 0 58%,#b7ed64 58%)'],
  ['nightaqua','그래파이트 · 아쿠아','linear-gradient(90deg,#152126 0 58%,#42d7ca 58%)']
 ];
 const panel=document.createElement('details');panel.className='theme-panel';panel.open=true;
 panel.innerHTML='<summary>컬러 비교 <small>임시 도구</small><span>⌄</span></summary><div class="theme-options">'+palettes.map(([key,label,color])=>`<button type="button" data-theme-choice="${key}" aria-pressed="false"><i style="background:${color}"></i>${label}</button>`).join('')+'</div>';
 document.body.append(panel);
 function setTheme(key){if(!palettes.some(p=>p[0]===key))key='cobalt';document.documentElement.dataset.theme=key;try{localStorage.setItem('portfolio-theme-v2',key);}catch{}panel.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===key)));}
 let chosen='cobalt';try{chosen=localStorage.getItem('portfolio-theme-v2')||chosen;}catch{}setTheme(chosen);
 panel.addEventListener('click',e=>{const button=e.target.closest('button[data-theme-choice]');if(button)setTheme(button.dataset.themeChoice);});
}
// Local preview only. Preserve scroll position and expanded panels on reload.
if(location.hostname==='127.0.0.1'||location.hostname==='localhost'){
const state=JSON.parse(sessionStorage.getItem('portfolio-preview')||'null');
if(state){document.querySelectorAll('details').forEach((d,i)=>d.open=state.open.includes(i));requestAnimationFrame(()=>window.scrollTo(0,state.y));sessionStorage.removeItem('portfolio-preview');}
let version=null;setInterval(async()=>{try{const r=await fetch('/__version',{cache:'no-store'});if(!r.ok)return;const next=await r.text();if(version&&version!==next){if([...document.querySelectorAll('video')].some(v=>!v.paused))return;sessionStorage.setItem('portfolio-preview',JSON.stringify({y:scrollY,open:[...document.querySelectorAll('details')].flatMap((d,i)=>d.open?[i]:[])}));location.reload();}version=next;}catch{}},1500);
}
