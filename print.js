(() => {
  const frame = document.querySelector('#portfolio-source');
  const pages = document.querySelector('#print-pages');
  const status = document.querySelector('#print-status');
  const button = document.querySelector('#save-pdf');
  button.addEventListener('click', () => window.print());
  const updatePreviewScale = () => {
    const scale = Math.min(1, (window.innerWidth - 32) / 794);
    pages.style.setProperty('--sheet-zoom', String(scale));
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
    pages.append(page);
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
    const profile = sheet('profile', 'PROFILE / SKILLS');
    const hero = make('div', 'profile-hero');
    const intro = make('div', 'profile-intro');
    add(intro,
      make('p', 'kicker', 'ROBOTICS SOFTWARE PORTFOLIO'),
      make('h1', '', value(source, '#about h1 span')),
      make('p', 'profile-subtitle', value(source, '#about h1 small')),
      copy(source, '#about .intro'),
      copy(source, '#about .target-roles'));
    const contact = make('div', 'profile-contact');
    const email = copy(source, '#about .contact-email');
    const github = copy(source, '#about .contact-github');
    email.querySelector('strong').textContent = 'EMAIL';
    github.querySelector('strong').textContent = 'GITHUB';
    const githubText = make('span', 'profile-github-text');
    githubText.append(github.querySelector('strong'), github.querySelector('small'));
    github.prepend(githubText);
    const githubQr = make('img', 'profile-github-qr');
    githubQr.src = 'assets/qr-github-profile.svg';
    githubQr.alt = '안재권 GitHub 프로필 QR 코드';
    githubQr.width = 72;
    githubQr.height = 72;
    const profileQrLink = make('a', 'profile-header-qr');
    profileQrLink.href = github.href;
    profileQrLink.target = '_blank';
    profileQrLink.rel = 'noreferrer';
    add(profileQrLink, githubQr, make('strong', '', 'GitHub'));
    add(contact, email, github);
    const portrait = copy(source, '#about .portrait-center img');
    portrait.className = 'profile-photo';
    const photoColumn = make('div', 'profile-photo-column');
    add(photoColumn, portrait);
    add(hero, photoColumn, intro, profileQrLink);
    add(profile, hero, contact, copy(source, '#about .hero-background'));
    const skillsSection = make('section', 'print-skills-section');
    add(skillsSection, heading('01 / SKILLS', value(source, '#skills h2')));
    const skills = make('div', 'print-skills');
    source.querySelectorAll('#skills .skill-row').forEach(row => add(skills, row.cloneNode(true)));
    add(skillsSection, skills, copy(source, '#skills .collaboration-strip'));
    add(profile, skillsSection);

    // 2. Featured project overview and evidence.
    const featured = sheet('featured', 'PROJECTS / FEATURED');
    const projectHeading = make('div', 'project-heading-row');
    const repositoryQr = copy(source, '.featured .print-media-link');
    repositoryQr.classList.add('project-heading-qr');
    const projectTitle = heading('02 / PROJECTS', value(source, '.featured h3'));
    const projectDetails = make('div', 'project-heading-details');
    const projectMeta = copy(source, '.featured .feature-copy .meta');
    add(projectDetails, make('p', 'heading-note', value(source, '.featured .project-sub')), projectMeta);
    add(projectTitle, projectDetails);
    add(projectHeading, projectTitle, repositoryQr);
    add(featured, projectHeading);
    const overview = make('section', 'featured-overview');
    overview.setAttribute('aria-label', '프로젝트 개요와 시스템 흐름');
    const facts = make('div', 'featured-facts');
    add(facts, copy(source, '.featured .feature-lead'));
    const projectSnapshot = make('div', 'project-snapshot');
    const projectPhoto = copy(source, '.featured .feature-photo');
    projectPhoto.querySelector('figcaption').remove();
    add(projectSnapshot, projectPhoto);
    add(facts, projectSnapshot);
    const system = copy(source, '.featured .system');
    add(overview, facts, system);
    const evidence = copy(source, '.project-evidence');
    evidence.querySelectorAll('.scenario-video, .scenario-watch-link').forEach(node => node.remove());
    add(featured, overview, evidence);
    const work = make('div', 'print-contribution');
    add(work, make('p', 'kicker', 'AMR 담당 구현'));
    add(work, make('p', 'print-complete-label', '✓ 구현 완료 · FMS 관제 연동'));
    const workGrid = make('div', 'print-contribution-grid print-complete-grid');
    source.querySelectorAll('.work-details .work-status-group:first-child .work-item').forEach(item => {
      const entry = make('div', 'print-work-item');
      add(entry, copy(item, 'h5'), copy(item, 'p'));
      add(workGrid, entry);
    });
    add(work, workGrid);
    add(work, make('p', 'print-progress-label', '○ 진행 중 · 실기체 주행 조정'));
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
    add(experience, heading('03 / EXPERIENCE', value(source, '#experience h2')));
    add(experience, copy(source, '#experience .timeline'), copy(source, '#experience .credentials'));

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
