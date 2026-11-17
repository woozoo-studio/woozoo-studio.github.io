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
const request = item => `<aside class="folio-request" aria-label="추가할 시각 자료"><span class="folio-request-id">자료 ${item.id}</span><h4>${esc(item.title)}</h4><p>${esc(item.description)}</p><small>${esc(item.format)}</small></aside>`;



function handlingDemos(p) {
  if (!p.handlingDemos) return '';
  return `<div id="handling-demos" class="folio-handling-demos"><h3>적재·하역 시연</h3><div class="folio-handling-grid">${p.handlingDemos.map(d=>`<figure><div class="folio-player"><video controls preload="metadata" playsinline aria-label="${esc(d.title)}"><source src="../${d.src}" type="video/mp4">동영상 재생을 지원하지 않는 경우 <a href="../${d.src}">영상 열기</a>를 이용해 주세요.</video></div><figcaption><strong>${esc(d.title)}</strong><span>${esc(d.caption)}</span></figcaption></figure>`).join('')}</div></div>`;
}

function hmiGallery(p) {
  if (!p.hmiScreens) return '';
  return `<div id="hmi" class="folio-hmi"><h3>HMI 작화</h3><div class="folio-hmi-grid">${p.hmiScreens.map(s=>`<figure class="${s.primary ? 'is-primary' : 'is-secondary'}"><a href="../${s.src}" target="_blank" rel="noreferrer" aria-label="${esc(s.title)} HMI 작화 원본 보기"><img src="../${s.src}" alt="${esc(s.title+' · '+s.caption)}" loading="lazy"></a><figcaption><strong>${esc(s.title)}</strong><span>${esc(s.caption)}</span></figcaption></figure>`).join('')}</div></div>`;
}

function systemProcess(p) {
  if (!p.stationProcess) return flow(p.flow);
  return `<div class="folio-station-process" aria-label="스테이션별 물류 공정"><h3>스테이션별 공정 흐름</h3><ol class="folio-process-main">${p.stationProcess.map(step=>`<li><div class="folio-process-title"><span>${esc(step.number)}</span><h4>${esc(step.title)}</h4></div><p class="folio-process-action">${esc(step.action)}</p><p>${esc(step.description)}</p><small>${esc(step.equipment)}</small></li>`).join('')}</ol><aside class="folio-process-branch"><p class="folio-branch-condition">${esc(p.replenishment.condition)}</p><div class="folio-process-title"><span>${esc(p.replenishment.number)}</span><h4>${esc(p.replenishment.title)}</h4></div><p>${esc(p.replenishment.description)}</p><small>${esc(p.replenishment.equipment)}</small></aside></div>`;
}

function caseVideos(c) {
  if (!c.videos) return '';
  return `<div id="app-demos" class="folio-app-demos folio-handling-demos"><h3>Flutter 제어 앱</h3><div class="folio-handling-grid">${c.videos.map(v=>`<figure><div class="folio-player"><video controls preload="metadata" playsinline aria-label="${esc(v.title)}"><source src="../${v.src}" type="video/mp4">동영상 재생을 지원하지 않는 경우 <a href="../${v.src}">영상 열기</a>를 이용해 주세요.</video></div><figcaption><strong>${esc(v.title)}</strong>${v.caption ? `<span>${esc(v.caption)}</span>` : ''}</figcaption></figure>`).join('')}</div></div>`;
}

function implementationMedia(c) {
  if (c.flashEvidence) return `<div class="folio-flash-evidence"><h3>Flash 저장 영역 분리</h3><div class="folio-flash-proof-grid"><figure><a href="../assets/mobile-flash-device-highlight.png" target="_blank" rel="noreferrer"><img src="../assets/mobile-flash-device-highlight.png" alt="STM32F411 장치 정보: NVM 512 KBytes" loading="lazy"></a><figcaption><strong>01 전체 용량 확인</strong><span>장치 정보에서 내부 비휘발성 메모리 512KB를 확인했습니다.</span></figcaption></figure><figure><a href="../assets/mobile-flash-build.png" target="_blank" rel="noreferrer"><img src="../assets/mobile-flash-build.png" alt="프로그램 Flash 영역 384KB, 사용량 72272B 빌드 결과" loading="lazy"></a><figcaption><strong>03 프로그램 영역 제한 확인</strong><span>링커에서 프로그램 영역을 384KiB로 제한했습니다. 이 빌드의 사용량은 72,272B로, 확보한 프로그램 영역의 18.38%입니다.</span></figcaption></figure><figure class="folio-flash-manual"><a href="../assets/mobile-flash-sector-map-highlight.png" target="_blank" rel="noreferrer"><img src="../assets/mobile-flash-sector-map-highlight.png" alt="STM32F411 Flash 메모리 구성표: Sector 7은 마지막 128KB 영역" loading="lazy"></a><figcaption><strong>02 데이터 저장 영역 선택</strong><span>Sector 7의 마지막 128KiB를 티칭·설정 저장용으로 확보하고, 프로그램이 이 영역에 배치되지 않도록 분리했습니다.</span><a href="https://www.st.com/resource/en/reference_manual/dm00119316-stm32f411xce-advanced-armbased-32bit-mcus-stmicroelectronics.pdf" target="_blank" rel="noreferrer">STMicroelectronics RM0383 · Table 4 ↗</a></figcaption></figure></div></div>`;
  if (c.packet) return `<figure id="packet-structure" class="folio-packet"><figcaption><strong>Bluetooth 패킷 구조</strong><span>고정 길이 16 bytes · 모드별 Payload 해석</span></figcaption><ol class="folio-packet-fields" aria-label="16바이트 패킷 필드">${c.packet.fields.map(f=>`<li class="is-${f.kind}"><span class="folio-packet-offset">${esc(f.offset)}</span><strong>${esc(f.value)}</strong><span>${esc(f.name)} · ${esc(f.size)}</span></li>`).join('')}</ol><dl class="folio-packet-modes">${c.packet.modes.map(([mode,description])=>`<div><dt>${esc(mode)}</dt><dd>${esc(description)}</dd></div>`).join('')}</dl></figure>`;
  if (c.servoControl) return `<div id="servo-control" class="folio-servo"><h3>서보 제어 구조</h3><ol class="folio-hardware-chain" aria-label="STM32에서 서보까지의 제어 흐름">${c.servoControl.hardware.map(h=>`<li><figure><div class="folio-hardware-image"><img src="../${h.src}" alt="${esc(h.title)}" loading="lazy"></div><figcaption><strong>${esc(h.title)}</strong><span>${esc(h.description)}</span></figcaption></figure>${h.output ? `<span class="folio-hardware-link">${esc(h.output)} <span aria-hidden="true">→</span></span>` : ''}</li>`).join('')}</ol><div class="folio-servo-example"><h4>어깨 관절 50° 명령의 변환 예시</h4><ol>${c.servoControl.example.map(([name,value])=>`<li><span>${esc(name)}</span><strong>${esc(value)}</strong></li>`).join('')}</ol><p>20ms 주기에서 1,056µs를 12비트 카운트로 환산하면 약 216입니다. 채널 레지스터에 기록한 값으로 PCA9685가 PWM을 출력합니다.</p></div></div>`;
  return '';
}

function caseMedia(c) {
  if (c.media === 'traffic') return `<figure class="folio-case-media"><a href="../assets/traffic-coordination.gif" target="_blank" rel="noreferrer"><img src="../assets/traffic-coordination.gif" alt="다중 AMR 교통조정 시연" loading="lazy"></a><figcaption>마주 오는 로봇 중 한 대가 대기하고 다른 한 대가 먼저 통과하는 동작을 실기체에서 확인했습니다.</figcaption></figure>`;
  if (c.media === 'docking') return `<figure id="docking-demo" class="folio-case-media folio-docking-demo"><div class="folio-docking-stage"><a href="../assets/logiflow-docking-demo.gif" target="_blank" rel="noreferrer" aria-label="Station 1·2·3 도킹 시연 GIF 원본 보기"><img src="../assets/logiflow-docking-demo.gif" alt="왼쪽부터 Station 1, Station 2, Station 3의 후진 도킹 시연" width="426" height="240" loading="lazy"></a><div class="folio-station-labels" aria-hidden="true"><span>Station 1</span><span>Station 2</span><span>Station 3</span></div></div><figcaption>스테이션별 후진 도킹 시연 · 본인 담당: 접촉 메시지 수신 처리·관제 상태 연동</figcaption></figure>`;
  return '';
}

function demo(p, prefix, id = 'demo', sectionNumber = '') {
  const d = p.demo;
  return `<section id="${id}" class="folio-demo"><div class="folio-section-label"><span>${sectionNumber ? `${sectionNumber} / ` : ''}DEMONSTRATION</span><h2>프로젝트 시연</h2></div><div class="folio-player">${d.type === 'youtube'
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
function detail(p, index) {
  const next = projects[(index+1)%projects.length];
  const cases = p.cases.filter(c => !c.hidden);
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(p.role)}"><title>${esc(p.title)} | 안재권</title><link rel="icon" type="image/svg+xml" href="../assets/favicon-w.svg?v=2"><link rel="stylesheet" href="../project-layout.css?v=11"></head><body class="folio-detail-page">
  <a class="folio-skip" href="#overview">본문으로 이동</a><header class="folio-header"><a class="folio-back-button" href="../index.html#${p.anchor}"><span aria-hidden="true">←</span> 프로젝트 목록</a><a href="../index.html">안재권 <span>/ ROBOTICS SW</span></a><a class="folio-print-button" href="../print.html?v=20261114">PDF 저장</a></header>
  <main class="folio-detail-main"><div class="folio-detail-hero"><p class="folio-index">PROJECT ${p.number} / ${esc(p.fields.join(' · '))}</p><h1>${esc(p.title)}</h1><p class="folio-subtitle">${esc(p.subtitle)}</p><p class="folio-meta">${esc(p.meta)}</p>${p.award ? `<div class="folio-award-text"><p><strong>프로젝트 경진대회 대상</strong><span>Logiflow 팀 · 2026.11.05</span></p><p class="folio-award-organizer">대한상공회의소 서울기술교육센터</p></div>` : ''}${tags(p.tags)}<div class="folio-hero-actions"><a class="folio-button folio-button-primary" href="#demo">시연 영상 보기 ▷</a>${external(p.links)}</div></div>
  <div class="folio-detail-grid"><aside class="folio-toc"><p>목차</p><nav aria-label="프로젝트 상세 목차"><a href="#overview"><span>01</span>프로젝트 요약</a><a href="#demo"><span>02</span>프로젝트 시연</a><a href="#system"><span>03</span>시스템 구성·동작 흐름</a>${cases.map((c,i)=>`<a href="#${c.id}"><span>${String(i+4).padStart(2,'0')}</span>${esc(c.title)}</a>`).join('')}</nav></aside>
  <div class="folio-article"><section id="overview"><p class="folio-index">01 / OVERVIEW</p><h2>프로젝트 요약</h2><p class="folio-lead">${esc(p.summary)}</p><h3 class="folio-work-heading">담당 역할</h3><dl class="folio-contributions folio-work-rows">${(p.summaryWork || p.contributions).map(([title,text])=>`<div><dt>${esc(title)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl></section>
  ${demo(p,'../','demo','02')}
  <section id="system"><p class="folio-index">03 / SYSTEM</p><h2>시스템 구성 및 동작 흐름</h2>${p.situationScreens ? `<div class="folio-situation-section"><h3>정상·위험·낙상 인식</h3>${situationGallery(p,'../')}</div>` : `<figure class="folio-detail-cover"><a href="../${p.image}" target="_blank" rel="noreferrer">${image(p,'../')}</a><figcaption>${esc(p.imageAlt)}</figcaption></figure>`}${handlingDemos(p)}${systemProcess(p)}${hmiGallery(p)}${p.scope && !['mobile-manipulator','logiflow'].includes(p.id) ? `<p class="folio-scope">${esc(p.scope)}</p>` : ''}</section>
  ${cases.map((c,i)=>`<section id="${c.id}" class="folio-case"><p class="folio-index">${String(i+4).padStart(2,'0')} / ${esc(c.label)}</p><h2>${esc(c.title)}</h2><dl class="folio-case-story"><div><dt>${esc(c.backgroundLabel)}</dt><dd>${esc(c.problem)}</dd></div><div><dt>판단·구현</dt><dd>${esc(c.decision)}</dd></div><div><dt>${c.backgroundLabel === '요구사항' ? '구현 결과' : '확인한 결과'}</dt><dd>${esc(c.result)}</dd></div></dl>${c.flow ? flow(c.flow) : ''}${caseMedia(c)}${implementationMedia(c)}${caseVideos(c)}${c.note ? `<p class="folio-note">${esc(c.note)}</p>` : ''}${c.request ? request(c.request) : ''}</section>`).join('')}

  <footer class="folio-next"><a class="folio-back-button" href="../index.html#${p.anchor}"><span aria-hidden="true">←</span> 프로젝트 목록</a><a class="folio-back-button folio-next-simple" href="${next.id}.html?v=20261114-projects">다음 프로젝트 <span aria-hidden="true">→</span></a></footer></div></div></main><script src="../project-detail.js" defer></script></body></html>`;
}
let index = fs.readFileSync(path.join(root,'index.html'),'utf8');
const section = `<section id="projects" class="folio-projects"><div class="section-head"><div><p class="eyebrow">02 / PROJECTS</p><h2>프로젝트</h2></div><details class="folio-project-jump"><summary>프로젝트 바로가기 <span aria-hidden="true">⌄</span></summary><nav aria-label="프로젝트 바로가기">${projects.map(p=>`<a href="#${p.anchor}"><span>${p.number}</span>${esc(p.title)}</a>`).join('')}</nav></details></div>${projects.map((p,i)=>summary(p,i===0)).join('')}</section>`;
index = index.replace(/<section id="projects"[\s\S]*?(?=<section id="experience")/, section+'\n\n    ');
fs.writeFileSync(path.join(root,'index.html'),index.replace(/[ \t]+$/gm, ''));
projects.forEach((p,i)=>fs.writeFileSync(path.join(root,'projects',p.id+'.html'),detail(p,i)));
console.log('Rendered 4 static project pages and the project overview.');
