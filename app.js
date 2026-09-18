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
  ['trio','블루 · 틸 · 앰버','linear-gradient(90deg,#2855eb 0 33%,#0b8177 33% 66%,#d98b20 66%)'],
  ['ocean','네이비 · 시안 · 코랄','linear-gradient(90deg,#184e77 0 33%,#0096a6 33% 66%,#ef6a5b 66%)'],
  ['graphite','차콜 · 에메랄드 · 옐로','linear-gradient(90deg,#32454f 0 33%,#138a72 33% 66%,#e5a50a 66%)'],
  ['indigo','인디고 · 민트 · 코랄','linear-gradient(90deg,#5146b8 0 33%,#178a7a 33% 66%,#e66d4c 66%)'],
  ['steel','스틸 · 아쿠아 · 코퍼','linear-gradient(90deg,#31566f 0 33%,#168f9a 33% 66%,#c56a36 66%)'],
  ['blue','화이트 · 블루','#2855eb'],['teal','화이트 · 틸','#087d78'],['orange','아이보리 · 오렌지','#b94719'],['violet','화이트 · 바이올렛','#7040c1'],['navy','네이비 · 라임','#b9ef62']
 ];
 const panel=document.createElement('details');panel.className='theme-panel';panel.open=true;
 panel.innerHTML='<summary>컬러 비교 <small>임시 도구</small><span>⌄</span></summary><div class="theme-options">'+palettes.map(([key,label,color])=>`<button type="button" data-theme-choice="${key}" aria-pressed="false"><i style="background:${color}"></i>${label}</button>`).join('')+'</div>';
 document.body.append(panel);
 function setTheme(key){if(!palettes.some(p=>p[0]===key))key='teal';document.documentElement.dataset.theme=key;try{localStorage.setItem('portfolio-theme',key);}catch{}panel.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===key)));}
 let chosen='teal';try{chosen=localStorage.getItem('portfolio-theme')||chosen;}catch{}setTheme(chosen);
 panel.addEventListener('click',e=>{const button=e.target.closest('button[data-theme-choice]');if(button)setTheme(button.dataset.themeChoice);});
}
// Local preview only. Preserve scroll position and expanded panels on reload.
if(location.hostname==='127.0.0.1'||location.hostname==='localhost'){
const state=JSON.parse(sessionStorage.getItem('portfolio-preview')||'null');
if(state){document.querySelectorAll('details').forEach((d,i)=>d.open=state.open.includes(i));requestAnimationFrame(()=>window.scrollTo(0,state.y));sessionStorage.removeItem('portfolio-preview');}
let version=null;setInterval(async()=>{try{const r=await fetch('/__version',{cache:'no-store'});if(!r.ok)return;const next=await r.text();if(version&&version!==next){if([...document.querySelectorAll('video')].some(v=>!v.paused))return;sessionStorage.setItem('portfolio-preview',JSON.stringify({y:scrollY,open:[...document.querySelectorAll('details')].flatMap((d,i)=>d.open?[i]:[])}));location.reload();}version=next;}catch{}},1500);
}
