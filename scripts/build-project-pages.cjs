// Render the same curated project content into static, linkable web pages.
const fs = require('node:fs');
const path = require('node:path');
const projects = require('../project-content.js');
const root = path.resolve(__dirname, '..');
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const tags = values => `<ul class="folio-tags">${values.map(v => `<li>${esc(v)}</li>`).join('')}</ul>`;
const flow = values => `<ol class="folio-flow" aria-label="동작 흐름">${values.map((v,i) => `<li><span class="folio-flow-step" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span class="folio-flow-text">${esc(v)}</span></li>`).join('')}</ol>`;
const image = (p, prefix = '') => `<img src="${prefix}${p.image}" alt="${esc(p.imageAlt)}" loading="lazy">`;
const external = links => links.map(([label,url]) => `<a href="${esc(url)}" target="_blank" rel="noreferrer">${esc(label)} ↗</a>`).join('');



function handlingDemos(p) {
  if (!p.handlingDemos) return '';
  return `<div id="handling-demos" class="folio-handling-demos"><h3>적재·하역 시연</h3><div class="folio-handling-grid">${p.handlingDemos.map(d=>`<figure><div class="folio-player"><video controls preload="metadata" playsinline aria-label="${esc(d.title)}"><source src="../${d.src}" type="video/mp4">동영상 재생을 지원하지 않는 경우 <a href="../${d.src}">영상 열기</a>를 이용해 주세요.</video></div><figcaption><strong>${esc(d.title)}</strong><span>${esc(d.caption)}</span></figcaption></figure>`).join('')}</div></div>`;
}

function hmiGallery(p) {
  if (!p.hmiScreens) return '';
  return `<div id="hmi" class="folio-hmi"><div class="folio-hmi-grid">${[...p.hmiScreens].sort((a,b)=>Number(Boolean(b.primary))-Number(Boolean(a.primary))).map(s=>`<figure><a href="../${s.src}" target="_blank" rel="noreferrer" aria-label="${esc(s.title)} HMI 작화 원본 보기"><img src="../${s.src}" alt="${esc(s.title+' · '+s.caption)}" loading="lazy"></a><figcaption><strong>${esc(s.title)}</strong><span>${esc(s.caption)}</span></figcaption></figure>`).join('')}</div></div>`;
}

function systemProcess(p) {
  if (!p.stationProcess) return flow(p.flow);
  return `<div class="folio-station-process" aria-label="스테이션별 물류 공정"><h3>스테이션별 공정 흐름</h3><ol class="folio-process-main">${p.stationProcess.map(step=>`<li><div class="folio-process-title"><span>${esc(step.number)}</span><h4>${esc(step.title)}</h4></div><p class="folio-process-action">${esc(step.action)}</p><p>${esc(step.description)}</p><small>${esc(step.equipment)}</small></li>`).join('')}</ol><aside class="folio-process-branch"><p class="folio-branch-condition">${esc(p.replenishment.condition)}</p><div class="folio-process-title"><span>${esc(p.replenishment.number)}</span><h4>${esc(p.replenishment.title)}</h4></div><p>${esc(p.replenishment.description)}</p><small>${esc(p.replenishment.equipment)}</small></aside></div>`;
}

function caseVideos(c) {
  if (!c.videos) return '';
  return `<div id="${c.id === 'control' ? 'app-demos' : `${c.id}-demos`}" class="folio-app-demos folio-handling-demos"><div class="folio-handling-grid" data-video-count="${c.videos.length}">${c.videos.map(v=>`<figure><div class="folio-player"><video controls preload="metadata" playsinline aria-label="${esc(v.title)}"><source src="../${v.src}" type="video/mp4">동영상 재생을 지원하지 않는 경우 <a href="../${v.src}">영상 열기</a>를 이용해 주세요.</video></div><figcaption><strong>${esc(v.title)}</strong>${v.caption ? `<span>${esc(v.caption)}</span>` : ''}</figcaption></figure>`).join('')}</div></div>`;
}

function implementationMedia(c) {
  if (c.flashEvidence) {
    const proofs = [
      {src:'mobile-flash-device-highlight.png',title:'01 전체 용량 확인',text:'장치 정보에서 STM32F411의 내부 Flash 용량 512KB를 확인했습니다.',alt:'STM32F411 장치 정보: NVM 512 KBytes'},
      {src:'mobile-flash-sector-map-highlight.png',title:'02 데이터 저장 영역 선택',text:'마지막 128KiB인 Sector 7을 티칭·설정 저장용으로 확보했습니다.',alt:'STM32F411 Flash 구성표: Sector 7의 128KB 영역',className:'folio-flash-manual'},
      {src:'mobile-flash-build.png',title:'03 프로그램 영역 제한 확인',text:'링커의 프로그램 영역은 384KiB로 제한했습니다. 제시한 빌드에서 사용량은 72,272B로, 해당 프로그램 영역의 18.38%입니다.',alt:'링커 Flash 영역 384KB와 사용량 72272B 빌드 결과',className:'folio-flash-build'}
    ];
    return `<div class="folio-flash-evidence"><h4>Flash 저장 영역 확인</h4><div class="folio-flash-proof-grid">${proofs.map(proof=>`<figure class="${proof.className || ''}"><a href="../assets/${proof.src}" target="_blank" rel="noreferrer"><img src="../assets/${proof.src}" alt="${esc(proof.alt)}" loading="lazy"></a><figcaption><strong>${esc(proof.title)}</strong><span>${esc(proof.text)}</span>${proof.className === 'folio-flash-manual' ? '<a href="https://www.st.com/resource/en/reference_manual/dm00119316-stm32f411xce-advanced-armbased-32bit-mcus-stmicroelectronics.pdf" target="_blank" rel="noreferrer">STMicroelectronics RM0383 · Table 4 ↗</a>' : ''}</figcaption></figure>`).join('')}</div></div>`;
  }
  if (c.packet) return `<figure id="packet-structure" class="folio-packet"><figcaption><strong>Bluetooth 패킷 구조</strong><span>고정 길이 16 bytes · 모드별 Payload 해석</span></figcaption><ol class="folio-packet-fields" aria-label="16바이트 패킷 필드">${c.packet.fields.map(f=>`<li class="is-${f.kind}"><span class="folio-packet-offset">${esc(f.offset)}</span><strong>${esc(f.value)}</strong><span>${esc(f.name)} · ${esc(f.size)}</span></li>`).join('')}</ol><dl class="folio-packet-modes">${c.packet.modes.map(([mode,description])=>`<div><dt>${esc(mode)}</dt><dd>${esc(description)}</dd></div>`).join('')}</dl></figure>`;
  if (c.servoControl) return `<div id="servo-control" class="folio-servo"><h3>서보 제어 구조</h3><ol class="folio-hardware-chain" aria-label="STM32에서 서보까지의 제어 흐름">${c.servoControl.hardware.map(h=>`<li><figure><div class="folio-hardware-image"><img src="../${h.src}" alt="${esc(h.title)}" loading="lazy"></div><figcaption><strong>${esc(h.title)}</strong><span>${esc(h.description)}</span></figcaption></figure>${h.output ? `<span class="folio-hardware-link">${esc(h.output)} <span aria-hidden="true">→</span></span>` : ''}</li>`).join('')}</ol><div class="folio-servo-example"><h4>펄스폭을 PWM 카운트로 변환하는 예시</h4><ol>${c.servoControl.example.map(([name,value])=>`<li><span>${esc(name)}</span><strong>${esc(value)}</strong></li>`).join('')}</ol><p>20ms 주기에서 1,056µs를 12비트 카운트로 환산하면 약 216입니다. 채널 레지스터에 기록한 값으로 PCA9685가 PWM을 출력합니다.</p></div></div>`;
  return '';
}

function caseMedia(c) {
  if (c.media === 'traffic') return `<figure class="folio-case-media"><a href="../assets/traffic-coordination.gif" target="_blank" rel="noreferrer"><img src="../assets/traffic-coordination.gif" alt="다중 AMR 교통조정 시연" loading="lazy"></a><figcaption>공유 구간에서 대기·우선 통과</figcaption></figure>`;
  if (c.media === 'docking') return `<figure id="docking-demo" class="folio-case-media folio-docking-demo"><div class="folio-docking-stage"><a href="../assets/logiflow-docking-demo.gif" target="_blank" rel="noreferrer" aria-label="Station 1·2·3 도킹 시연 GIF 원본 보기"><img src="../assets/logiflow-docking-demo.gif" alt="왼쪽부터 Station 1, Station 2, Station 3의 후진 도킹 시연" width="426" height="240" loading="lazy"></a><div class="folio-station-labels" aria-hidden="true"><span>Station 1</span><span>Station 2</span><span>Station 3</span></div></div><figcaption>스테이션별 후진 도킹 · 접촉 상태 관제 연동</figcaption></figure>`;
  return '';
}

function demo(p, prefix, id = 'demo', sectionNumber = '') {
  const d = p.demo;
  return `<section id="${id}" class="folio-demo" data-toc-section><div class="folio-section-label"><span>${sectionNumber ? `${sectionNumber} / ` : ''}DEMONSTRATION</span><h2>프로젝트 시연</h2></div><div class="folio-player">${d.type === 'youtube'
    ? `<iframe src="${d.src}" title="${esc(d.title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    : `<video ${d.legacyId ? `id="${d.legacyId}"` : ''} controls preload="none" playsinline poster="${prefix}${d.poster}" aria-label="${esc(d.title)}"><source src="${prefix}${d.src}" type="video/mp4"></video>`}</div><p class="folio-caption">${esc(d.title)}</p></section>`;
}
function situationGallery(p, prefix = '') {
  return `<div class="folio-situations">${p.situationScreens.map(s=>`<figure><a href="${prefix}${s.src}" target="_blank" rel="noreferrer"><img src="${prefix}${s.src}" alt="${esc(s.title)} 상황의 YOLO Pose 인식 결과" loading="lazy"></a><figcaption><strong>${esc(s.title)}</strong><span>${esc(s.state)}</span></figcaption></figure>`).join('')}</div>`;
}
function summary(p, featured) {
  const work = `${p.stackedScreens ? '<h4 class="folio-main-work-title">담당 역할</h4>' : ''}<dl class="folio-contributions${p.stackedScreens ? ' folio-work-rows' : ''}">${(p.summaryWork || p.contributions).map(([title,text])=>`<div><dt>${esc(title)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl>`;
  return `<article id="${p.anchor}" class="folio-project${featured ? ' folio-featured' : ''}">
    <div class="folio-project-top"><span class="folio-index">${p.number} / ${featured ? '대표 프로젝트' : esc(p.fields.join(' · '))}</span><a class="folio-detail" href="projects/${p.id}.html?v=20261114-projects">프로젝트 상세 <span aria-hidden="true">↗</span></a></div>
    <div class="folio-project-layout${p.stackedScreens ? ' folio-with-work' : ''}"><div class="folio-project-copy"><h3>${esc(p.title)}</h3><p class="folio-subtitle">${esc(p.subtitle)}</p>${tags(p.tags)}<p class="folio-meta">${esc(p.meta)}</p><p class="folio-summary">${esc(p.summary)}</p>${p.stackedScreens ? '' : `<div class="folio-role"><span>담당 역할</span><p>${esc(p.role)}</p></div>`}</div>${p.stackedScreens ? `<div class="folio-stacked-screens">${p.stackedScreens.map(screen=>`<figure>${screen.type === 'situations' ? situationGallery(p) : screen.type === 'video' ? `<div class="folio-player folio-app-preview"><video controls preload="metadata" playsinline poster="${screen.poster}" aria-label="${esc(screen.caption)}"><source src="${screen.src}" type="video/mp4"></video></div>` : screen.type === 'youtube' ? `<div class="folio-player"><iframe src="${screen.src}" title="${esc(screen.caption)}" loading="lazy" allowfullscreen></iframe></div>` : `<img src="${screen.src}" alt="${esc(screen.caption)}" loading="lazy">`}<figcaption>${esc(screen.caption)}</figcaption></figure>`).join('')}</div>` : `<figure class="folio-cover"><a href="projects/${p.id}.html?v=20261114-projects" aria-label="${esc(p.title)} 상세 보기">${image({...p,image:p.coverImage || p.image,imageAlt:p.coverAlt || p.imageAlt})}</a><figcaption>${esc(p.coverAlt || p.imageAlt)}</figcaption></figure>`}${p.stackedScreens ? `<div class="folio-main-work">${work}</div>` : ''}</div>
    ${p.stackedScreens ? '' : work}

    ${featured ? `<div class="folio-evidence-strip"><figure><div class="folio-player"><iframe src="${p.demo.src}" title="${esc(p.demo.title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><figcaption>주문 → 이송 → 적재·하역 → 복귀</figcaption></figure><figure><a href="assets/traffic-coordination.gif" target="_blank" rel="noreferrer"><img src="assets/traffic-coordination.gif" alt="마주 오는 로봇의 대기·우선 통과 교통조정 시연" loading="lazy"></a><figcaption>교통조정 · 실기체에서 대기·우선 통과 확인</figcaption></figure></div>` : ''}
    <div class="folio-project-bottom"><div class="folio-project-actions"><a class="folio-button" href="projects/${p.id}.html?v=20261114-projects#demo">시연 영상 보기 <span aria-hidden="true">▷</span></a><a class="folio-button folio-button-primary" href="projects/${p.id}.html?v=20261114-projects">프로젝트 상세 <span aria-hidden="true">→</span></a></div></div>
  </article>`;
}
function featureImages(item) {
  if (!item.images) return '';
  return `<div class="folio-feature-images">${item.images.map(screen=>`<figure><a href="../${screen.src}" target="_blank" rel="noreferrer"><img src="../${screen.src}" alt="${esc(screen.alt)}" loading="lazy"></a><figcaption>${esc(screen.caption)}</figcaption></figure>`).join('')}</div>`;
}
function quantizationComparison() {
  const value=(number,unit)=>`<span class="folio-quant-value">${number}<small>${unit}</small></span>`;
  return `<div class="folio-quantization"><table aria-label="원본 모델과 INT8 모델의 용량·추론 성능"><colgroup><col class="folio-quant-metric"><col class="folio-quant-original"><col class="folio-quant-int8"></colgroup><thead><tr><th scope="col">항목</th><th scope="col">원본 모델</th><th scope="col">INT8 모델</th></tr></thead><tbody><tr><th scope="row">모델 용량</th><td>${value('6.5','MB')}</td><td class="folio-quant-optimized">${value('1.7','MB')}<span class="folio-quant-change"><span aria-hidden="true">↓</span> 약 74% 감소</span></td></tr><tr><th scope="row">추론 성능</th><td>${value('8.5','FPS')}</td><td class="folio-quant-optimized">${value('12.4','FPS')}<span class="folio-quant-change"><span aria-hidden="true">↑</span> 약 46% 증가</span></td></tr></tbody></table></div>`;
}
function feature(p,item,i) {
  return `<article id="${item.id}" class="folio-implementation" data-toc-section><div class="folio-entry-heading"><span class="folio-entry-number">04.${String(i+1).padStart(2,'0')}</span><h3>${esc(item.title)}</h3></div><p class="folio-implementation-summary">${esc(item.description)}</p>${item.situations ? `<div class="folio-situation-section">${situationGallery(p,'../')}</div>` : ''}${item.flow ? flow(item.flow) : ''}${featureImages(item)}${caseMedia(item)}${implementationMedia(item)}${caseVideos(item)}${item.hmi ? hmiGallery(p) : ''}${item.quantization ? quantizationComparison() : ''}</article>`;
}
function problemCase(c,i) {
  return `<article id="${c.id}" class="folio-problem-case" data-toc-section><div class="folio-entry-heading"><span class="folio-entry-number">05.${String(i+1).padStart(2,'0')}</span></div><h3>${esc(c.title)}</h3><dl class="folio-case-story">${c.rows.map(([label,text])=>`<div><dt>${esc(label)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl>${implementationMedia(c)}</article>`;
}
function detail(p, index) {
  const next = projects[(index+1)%projects.length];
  const systemView = p.systemImage ? {...p,image:p.systemImage.src,imageAlt:p.systemImage.alt} : p;
  const tocEntry=(id,number,title,child=false)=>`<a href="#${id}"${child ? ' class="is-subsection"' : ''}><span>${number}</span>${esc(title)}</a>`;
  const toc=[
    tocEntry('overview','01','프로젝트 요약'),
    tocEntry('demo','02','프로젝트 시연'),
    tocEntry('system','03','시스템 구성·동작 흐름'),
    tocEntry('implementation','04','주요 구현'),
    ...p.implementations.map((item,i)=>tocEntry(item.id,`04.${String(i+1).padStart(2,'0')}`,item.navTitle || item.title,true)),
    p.cases.length ? tocEntry('problem-solving','05','문제 해결') : '',
    ...p.cases.map((item,i)=>tocEntry(item.id,`05.${String(i+1).padStart(2,'0')}`,item.navTitle || item.title,true))
  ].join('');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(p.role)}"><title>${esc(p.title)} | 안재권</title><link rel="icon" type="image/svg+xml" href="../assets/favicon-w.svg?v=2"><link rel="stylesheet" href="../project-layout.css?v=13"></head><body class="folio-detail-page">
  <a class="folio-skip" href="#overview">본문으로 이동</a><header class="folio-header"><a class="folio-back-button" href="../index.html#${p.anchor}"><span aria-hidden="true">←</span> 프로젝트 목록</a><a href="../index.html">안재권 <span>/ ROBOTICS SW</span></a><a class="folio-print-button" href="../print.html?v=20261114">PDF 저장</a></header>
  <main class="folio-detail-main"><div class="folio-detail-hero"><p class="folio-index">PROJECT ${p.number} / ${esc(p.fields.join(' · '))}</p><h1>${esc(p.title)}</h1><p class="folio-subtitle">${esc(p.subtitle)}</p><p class="folio-meta">${esc(p.meta)}</p>${p.award ? `<div class="folio-award-text"><p><strong>프로젝트 경진대회 대상</strong><span>Logiflow 팀 · 2026.11.05</span></p><p class="folio-award-organizer">대한상공회의소 서울기술교육센터</p></div>` : ''}${tags(p.tags)}<div class="folio-hero-actions"><a class="folio-button folio-button-primary" href="#demo">시연 영상 보기 ▷</a>${external(p.links)}</div></div>
  <div class="folio-detail-grid"><aside class="folio-toc"><p>목차</p><nav aria-label="프로젝트 상세 목차">${toc}</nav></aside>
  <div class="folio-article"><section id="overview" data-toc-section><p class="folio-index">01 / OVERVIEW</p><h2>프로젝트 요약</h2><p class="folio-lead">${esc(p.summary)}</p><h3 class="folio-work-heading">담당 역할</h3><dl class="folio-contributions folio-work-rows">${(p.summaryWork || p.contributions).map(([title,text])=>`<div><dt>${esc(title)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl></section>
  ${demo(p,'../','demo','02')}
  <section id="system" data-toc-section><p class="folio-index">03 / SYSTEM</p><h2>시스템 구성 및 동작 흐름</h2>${p.situationScreens ? '' : `<figure class="folio-detail-cover"><a href="../${systemView.image}" target="_blank" rel="noreferrer">${image(systemView,'../')}</a><figcaption>${esc(systemView.imageAlt)}</figcaption></figure>`}${systemProcess(p)}${handlingDemos(p)}</section>
  <section id="implementation" data-toc-section><p class="folio-index">04 / IMPLEMENTATION</p><h2>주요 구현</h2>${p.implementations.map((item,i)=>feature(p,item,i)).join('')}</section>
  ${p.cases.length ? `<section id="problem-solving" data-toc-section><p class="folio-index">05 / PROBLEM SOLVING</p><h2>문제 해결</h2>${p.cases.map((c,i)=>problemCase(c,i)).join('')}</section>` : ''}
  <footer class="folio-next"><a class="folio-back-button" href="../index.html#${p.anchor}"><span aria-hidden="true">←</span> 프로젝트 목록</a><a class="folio-back-button folio-next-simple" href="${next.id}.html?v=20261114-projects">다음 프로젝트 <span aria-hidden="true">→</span></a></footer></div></div></main><script src="../project-detail.js?v=2" defer></script></body></html>`;
}
let index = fs.readFileSync(path.join(root,'index.html'),'utf8');
const section = `<section id="projects" class="folio-projects"><div class="section-head"><div><p class="eyebrow">02 / PROJECTS</p><h2>프로젝트</h2></div><details class="folio-project-jump"><summary>프로젝트 바로가기 <span aria-hidden="true">⌄</span></summary><nav aria-label="프로젝트 바로가기">${projects.map(p=>`<a href="#${p.anchor}"><span>${p.number}</span>${esc(p.title)}</a>`).join('')}</nav></details></div>${projects.map((p,i)=>summary(p,i===0)).join('')}</section>`;
index = index.replace(/<section id="projects"[\s\S]*?(?=<section id="experience")/, section+'\n\n    ');
fs.writeFileSync(path.join(root,'index.html'),index.replace(/[ \t]+$/gm, ''));
projects.forEach((p,i)=>fs.writeFileSync(path.join(root,'projects',p.id+'.html'),detail(p,i).replace(/[ \t]+$/gm, '')));
console.log('Rendered 4 static project pages and the project overview.');
