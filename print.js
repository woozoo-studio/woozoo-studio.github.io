(() => {
  const frame = document.querySelector('#portfolio-source');
  const pages = document.querySelector('#print-pages');
  const status = document.querySelector('#print-status');
  const button = document.querySelector('#save-pdf');
  button.addEventListener('click', () => {
    const download = document.createElement('a');
    const pdf = new URL('assets/portfolio-ahnjaegwon.pdf', document.baseURI);
    pdf.searchParams.set('v', button.dataset.pdfVersion);
    download.href = pdf.href;
    download.download = '[포트폴리오] 로봇SW개발자_안재권.pdf';
    document.body.append(download);
    download.click();
    download.remove();
  });
  if (window.location.protocol === 'file:') {
    const previewLink = document.createElement('a');
    previewLink.href = 'http://127.0.0.1:4177/print.html';
    previewLink.textContent = '로컬 인쇄 미리보기 열기 →';
    status.replaceChildren('파일로 직접 열면 내용을 불러올 수 없습니다. ', previewLink);
    frame.remove();
    return;
  }
  const updatePreviewScale = () => {
    const scale = Math.min(1, (window.innerWidth - 32) / 794);
    pages.style.setProperty('--sheet-scale', String(scale));
  };
  window.addEventListener('resize', updatePreviewScale);
  updatePreviewScale();

  const make = (tag, className = '', content = '') => {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = content;
    return node;
  };
  const add = (parent, ...children) => children.forEach(child => child && parent.append(child));
  const pick = (source, selector) => {
    const node = source.querySelector(selector);
    if (!node) throw new Error(`인쇄용 내용을 찾지 못했습니다: ${selector}`);
    return node;
  };
  const copy = (source, selector) => pick(source, selector).cloneNode(true);
  const value = (source, selector) => pick(source, selector).textContent.trim();
  const sheet = (section, label) => {
    const page = make('article', `sheet sheet-${section}`);
    const running = make('header', 'running-head');
    add(running, make('strong', '', '안재권 / ROBOTICS PORTFOLIO'), make('span', '', label));
    const body = make('div', 'sheet-body');
    const footer = make('footer', 'running-foot');
    add(footer, make('span', '', '© 2026 안재권'), make('span', 'page-number'));
    add(page, running, body, footer);
    const preview = make('div', 'sheet-preview');
    add(preview, page);
    pages.append(preview);
    return body;
  };
  const heading = (eyebrow, title, note = '') => {
    const wrap = make('div', 'print-heading');
    add(wrap, make('p', 'kicker', eyebrow), make('h2', '', title));
    if (note) add(wrap, make('p', 'heading-note', note));
    return wrap;
  };
  const imageFromVideo = (video) => {
    const image = make('img', 'demo-poster');
    image.src = video.getAttribute('poster');
    image.alt = video.getAttribute('aria-label') || '시연 영상 대표 이미지';
    video.replaceWith(image);
  };
  async function render(source) {
    pages.replaceChildren();

    // 1. Profile and skills share the opening sheet.
    const profile = sheet('profile', 'PROFILE / SKILLS & EXPERIENCE');
    const hero = make('div', 'profile-hero');
    const intro = make('div', 'profile-intro');
    add(intro,
      make('p', 'kicker', 'ROBOTICS SOFTWARE PORTFOLIO'),
      make('h1', '', value(source, '#about h1 span')),
      make('p', 'profile-subtitle', value(source, '#about h1 small')),
      copy(source, '#about .intro'),
      copy(source, '#about .target-roles'));
    const githubQr = make('img', 'profile-github-qr');
    githubQr.src = 'assets/qr-github-profile.svg';
    githubQr.alt = '안재권 GitHub 프로필 QR 코드';
    githubQr.width = 72;
    githubQr.height = 72;
    const profileQrLink = make('a', 'profile-header-qr');
    profileQrLink.href = pick(source, '#about .contact-github').href;
    profileQrLink.target = '_blank';
    profileQrLink.rel = 'noreferrer';
    add(profileQrLink, githubQr, make('strong', '', 'GitHub'));
    const portrait = copy(source, '#about .portrait-center img');
    portrait.className = 'profile-photo';
    const photoColumn = make('div', 'profile-photo-column');
    add(photoColumn, portrait);
    add(hero, photoColumn, intro, profileQrLink);
    const profileCard = make('section', 'print-profile-card');
    profileCard.setAttribute('aria-label', '프로필과 기술 경험');
    const profileOverview = make('header', 'print-profile-overview');
    add(profileOverview, hero);
    const profileColumns = make('div', 'print-profile-columns');
    const profileSidebar = make('aside', 'print-profile-sidebar');
    const profileContact = make('section', 'print-sidebar-contact');
    const profileEmail = make('a', '', value(source, '#about .contact-email small'));
    profileEmail.href = pick(source, '#about .contact-email').href;
    const profilePhone = make('a', '', '010-9914-7794');
    profilePhone.href = 'tel:+821099147794';
    const contactList = make('dl', 'print-contact-list');
    [['이메일', profileEmail], ['전화번호', profilePhone]].forEach(([label, link]) => {
      const row = make('div');
      const value = make('dd');
      add(value, link);
      add(row, make('dt', '', label), value);
      add(contactList, row);
    });
    add(profileContact, make('h3', '', '연락처'), contactList);
    add(profileSidebar, profileContact);
    const profileBackground = copy(source, '#about .hero-background');
    profileBackground.querySelectorAll('h2').forEach((title, index) => {
      title.textContent = ['학력', '주요 경력'][index];
    });
    const schoolName = pick(profileBackground, '.school-identity strong');
    schoolName.textContent = '한국해양대학교';
    const graduation = pick(profileBackground, '.degree-entry > span:not(.gpa-mark):not(.gpa-meter)');
    const degreeMeta = make('span', 'print-degree-meta');
    graduation.replaceWith(degreeMeta);
    add(degreeMeta, make('span', '', '해상보험전공'), make('span', '', '·'), graduation);
    const gpa = pick(profileBackground, '.gpa-mark');
    const gpaScore = make('span', 'print-gpa-score');
    add(gpaScore, copy(gpa, 'b'), copy(gpa, 'small'));
    gpa.replaceChildren(make('span', 'print-gpa-label', '학점'), gpaScore);
    add(profileSidebar, profileBackground);
    const skillsSection = make('section', 'print-skills-section');
    add(skillsSection, heading('01 / SKILLS & EXPERIENCE', value(source, '#skills h2')),
      make('p', 'print-experience-overview', value(source, '#skills .skills-intro')));
    const skills = make('div', 'print-experience-summary');
    const experienceRecords = [...source.querySelectorAll('#skills .capability')].map(entry => ({
      title: value(entry, 'h3'),
      tech: [...entry.querySelectorAll('.capability-tech span')].map(node => node.textContent.trim()).join(' · '),
      points: [...entry.querySelectorAll('.capability-points li')].map(node => node.textContent.trim())
    }));
    experienceRecords.forEach((record, index) => {
      const entry = make('article', 'print-experience-record');
      const recordHeading = make('div', 'print-experience-record-heading');
      const identity = make('div');
      add(identity, make('h3', '', record.title), make('p', 'print-experience-tech', record.tech));
      add(recordHeading, make('span', 'print-experience-number', String(index+1).padStart(2,'0')), identity);
      const points = make('ul', 'print-experience-points');
      record.points.forEach(point => add(points, make('li', point.endsWith('조정 중') ? 'is-progress' : '', point)));
      add(entry, recordHeading, points);
      add(skills, entry);
    });
    add(skillsSection, skills, copy(source, '#skills .collaboration-strip'));
    add(profileColumns, profileSidebar, skillsSection);
    add(profileCard, profileOverview, profileColumns);
    add(profile, profileCard);
    const sidebarCredentials = make('section', 'print-strengths print-sidebar-credentials');
    add(sidebarCredentials, make('h3', '', '자격·어학'));
    const credentialSummary = make('ul', 'print-credential-summary');
    const credentialNames = [...source.querySelectorAll('.credential-list strong')];
    ['OPIc', 'TOEIC', '2급 항해사'].forEach(prefix => {
      const credential = credentialNames.find(node => node.textContent.trim().startsWith(prefix));
      if (!credential) throw new Error(`자격·어학 요약을 찾지 못했습니다: ${prefix}`);
      const item = make('li');
      const credentialHeading = make('div', 'print-credential-heading');
      const score = credential.textContent.trim().match(/^(OPIc|TOEIC)\s+(.+)$/);
      if (score) {
        add(credentialHeading, make('span', '', score[1]), make('strong', 'print-credential-score', score[2]));
      } else {
        add(credentialHeading, credential.cloneNode(true));
      }
      const credentialDate = copy(credential.parentElement, 'span');
      credentialDate.className = 'print-credential-date';
      add(item, credentialHeading, credentialDate);
      add(credentialSummary, item);
    });
    add(sidebarCredentials, credentialSummary);
    add(profileSidebar, sidebarCredentials);

    // 2. Featured project overview and evidence.
    const featured = sheet('featured', 'PROJECTS / FEATURED');
    const projectHeading = make('div', 'project-heading-row');
    const repositoryQr = copy(source, '.featured .print-media-link');
    repositoryQr.classList.add('project-heading-qr');
    const projectTitle = heading('02 / PROJECTS', 'AI 융합 다중 로봇 물류');
    const projectDetails = make('div', 'project-heading-details');
    const projectMeta = copy(source, '.featured .feature-copy .meta');
    add(projectDetails, make('p', 'heading-note', value(source, '.featured .project-sub')), projectMeta);
    add(projectTitle, projectDetails);
    add(projectHeading, projectTitle, repositoryQr);
    add(featured, projectHeading);
    const overview = make('section', 'featured-overview');
    overview.setAttribute('aria-label', '프로젝트 개요와 시스템 흐름');
    const facts = make('div', 'featured-facts');
    add(facts,
      make('p', 'print-overview-label', '프로젝트 목표'),
      make('p', 'feature-lead', value(source, '.featured .feature-lead')));
    const system = copy(source, '.featured .system');
    const roles = make('div', 'print-project-roles');
    add(roles, make('h4', '', '담당 역할'));
    const baseRole = make('div', 'print-role-phase print-role-base');
    add(baseRole, make('p', 'print-role-label', '1차 · 기반 개발'),
      make('h5', '', value(source, '.feature-role-stages > div:first-child .role-phase-title')));
    const aiRole = make('div', 'print-role-phase print-role-ai');
    const aiLabel = make('div', 'print-role-phase-label');
    add(aiLabel, make('p', 'print-role-label', '2차 · 확장 검증'), make('span', '', 'Kev 적용 예정'));
    add(aiRole, aiLabel, make('h5', '', 'AI 기반 MAPF 구현·비교 검토'),
      make('p', 'print-role-description', 'Kev-0.8B를 활용해 MAPF를 구현하고, 기존 방식의 대체·적용 가능성을 비교 검토할 계획입니다.'));
    add(roles, baseRole, aiRole);
    add(overview, facts, system, roles);
    const evidence = copy(source, '.project-evidence');
    evidence.querySelectorAll('.scenario-video, .scenario-watch-link').forEach(node => node.remove());
    const scenarioLink = pick(evidence, '.scenario-print-link');
    const scenarioCard = scenarioLink.closest('.project-evidence-card');
    const scenarioUrl = value(scenarioLink, 'small');
    scenarioLink.querySelector('strong').textContent = '시연 영상';
    scenarioLink.querySelector('small').remove();
    const scenarioMedia = make('div', 'scenario-print-media');
    const scenarioPhoto = copy(source, '.featured .feature-photo img');
    scenarioPhoto.className = 'scenario-print-photo';
    scenarioLink.replaceWith(scenarioMedia);
    add(scenarioMedia, scenarioPhoto, scenarioLink);
    scenarioCard.querySelector('figcaption p').textContent = `전체 공정 시연 · ${scenarioUrl}`;
    add(featured, overview, evidence);
    const work = make('div', 'print-contribution');
    add(work, make('h3', 'kicker', '담당 업무'));
    add(work, make('p', 'print-complete-label', `✓ 구현 완료 · ${value(source, '.work-status-done .work-status-title span')}`));
    const workGrid = make('div', 'print-contribution-grid print-complete-grid');
    source.querySelectorAll('.work-details .work-status-group:first-child .work-item').forEach(item => {
      const entry = make('div', 'print-work-item');
      if (item.classList.contains('work-item-empty')) {
        entry.classList.add('print-work-item-empty');
        entry.setAttribute('aria-hidden', 'true');
      } else {
        add(entry, copy(item, 'h5'), copy(item, 'p'));
      }
      add(workGrid, entry);
    });
    add(work, workGrid);
    add(work, make('p', 'print-progress-label', '○ 진행 중 · 주행·위치추정 / AI 경로 계획 검증'));
    const progressGrid = make('div', 'print-contribution-grid print-progress-grid');
    source.querySelectorAll('.work-details .work-status-group:nth-child(2) .work-item').forEach(item => {
      const entry = make('div', 'print-work-item');
      add(entry, copy(item, 'h5'), copy(item, 'p'));
      add(progressGrid, entry);
    });
    add(work, progressGrid);
    add(featured, work);
    // 3. The three earlier projects sit on one sheet as individual records.
    const projects = sheet('previous', 'PROJECTS / PREVIOUS');
    add(projects, heading('02 / PROJECTS', value(source, '.previous-projects-heading h3'), value(source, '.previous-projects-heading > p:last-child')));
    const archive = make('div', 'project-archive');
    source.querySelectorAll('.project-grid > .card').forEach(card => {
      const item = card.cloneNode(true);
      item.querySelectorAll('video').forEach(imageFromVideo);
      item.querySelectorAll('details').forEach(detail => detail.remove());
      add(archive, item);
    });
    add(projects, archive);

    // 4. Evidence-backed implementation challenges from multiple projects.
    const cases = sheet('cases', 'PROJECTS / PROBLEM SOLVING');
    add(cases, heading('02 / PROJECTS', value(source, '#problem-solving-title'), value(source, '.problem-solving-heading > span')));
    const caseList = make('div', 'problem-solving-list');
    source.querySelectorAll('.problem-solving-case').forEach(item => {
      const entry = item.cloneNode(true);
      add(caseList, entry);
    });
    add(cases, caseList);

    // 5. Work history and credentials already present in the current site.
    const experience = sheet('experience', 'EXPERIENCE / EDUCATION');
    add(experience, heading('03 / EXPERIENCE & EDUCATION', value(source, '#experience h2')));
    const timeline = copy(source, '#experience .timeline');
    pick(timeline, '.training-projects').classList.add('print-training-summary');
    add(experience, timeline, copy(source, '#experience .credentials'));
    add(experience, make('p', 'print-closing', '끝까지 읽어주셔서 감사합니다.'));

    pages.querySelectorAll('code').forEach(code => {
      if (code.textContent.trim() !== 'map → base_footprint') return;
      code.classList.add('print-tf-transform');
      const preceding = code.previousSibling;
      if (preceding?.nodeType !== Node.TEXT_NODE) return;
      const offset = preceding.textContent.lastIndexOf('TF의');
      if (offset > 0 && preceding.textContent.slice(0, offset).trim()) {
        const sentence = preceding.splitText(offset);
        sentence.before(make('br'));
      }
    });
    const count = pages.children.length;
    pages.querySelectorAll('.page-number').forEach((node, index) => node.textContent = `${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`);
    pages.querySelectorAll('img').forEach(image => { image.loading = 'eager'; image.decoding = 'sync'; });
    await Promise.allSettled([...pages.querySelectorAll('img')].map(image => image.decode()));
    status.textContent = `A4 세로 · 총 ${count}페이지 · 웹 포트폴리오 내용 반영`;
    button.disabled = false;
  }

  frame.addEventListener('load', async () => {
    try {
      const source = frame.contentDocument;
      if (!source?.querySelector('#about')) throw new Error('원본 페이지를 읽을 수 없습니다.');
      await render(source);
    } catch (error) {
      status.textContent = '미리보기를 만들지 못했습니다. 새로고침 후 다시 시도해 주세요.';
      console.error(error);
    }
  });
})();
