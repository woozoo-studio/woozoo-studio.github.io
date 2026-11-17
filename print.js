(() => {
  const frame = document.querySelector('#portfolio-source');
  const pages = document.querySelector('#print-pages');
  const status = document.querySelector('#print-status');
  const button = document.querySelector('#save-pdf');
  button.addEventListener('click', () => {
    window.print();
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
    // The full team award is shown with Logiflow and in the credentials page.
    profileBackground.querySelectorAll('.hero-background-group')[2]?.remove();
    profileBackground.querySelectorAll('h2').forEach((title, index) => {
      title.textContent = ['학력', '교육·경력', '수상'][index];
    });
    const schoolName = pick(profileBackground, '.school-identity strong');
    schoolName.textContent = '한국해양대학교';
    const graduation = pick(profileBackground, '.degree-entry > span:not(.gpa-mark):not(.gpa-meter)');
    graduation.textContent = graduation.textContent.split('/').pop().trim();
    const degreeMeta = make('span', 'print-degree-meta');
    graduation.replaceWith(degreeMeta);
    add(degreeMeta, make('span', '', '해상보험전공'), make('span', '', '/'), graduation);
    const gpa = pick(profileBackground, '.gpa-mark');
    const gpaScore = make('span', 'print-gpa-score');
    add(gpaScore, copy(gpa, 'b'), copy(gpa, 'small'));
    gpa.replaceChildren(make('span', 'print-gpa-label', '학점'), gpaScore);
    add(profileSidebar, profileBackground);
    const skillsSection = make('section', 'print-skills-section');
    add(skillsSection, heading('01 / SKILLS & EXPERIENCE', '기술역량'));
    const skills = make('div', 'print-experience-summary');
    [...source.querySelectorAll('#skills .capability')].forEach(sourceEntry => {
      const entry = make('article', 'print-experience-record print-technology-row');
      const tech = make('div', 'print-technology-tags');
      sourceEntry.querySelectorAll('.capability-tech span').forEach(tag => add(tech, make('span', '', tag.textContent.trim())));
      add(entry, make('h3', '', value(sourceEntry, 'h3')), tech);
      add(skills, entry);
    });
    add(skillsSection, skills);
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

    // Projects have independent pages; Logiflow has one additional case-study page.
    window.renderPortfolioProjects({sheet, heading, make, add});

    // 5. Work history and credentials already present in the current site.
    const experience = sheet('experience', 'EXPERIENCE / EDUCATION');
    add(experience, heading('03 / EXPERIENCE & EDUCATION', value(source, '#experience h2')));
    const timeline = copy(source, '#experience .timeline');
    pick(timeline, '.training-projects').classList.add('print-training-summary');
    const printedCredentials = copy(source, '#experience .credentials');
    printedCredentials.querySelectorAll('.award-mobile-entry').forEach(entry => entry.remove());
    add(experience, timeline, printedCredentials);
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
    status.textContent = `A4 세로 · 총 ${count}페이지 · 프로젝트별 인쇄 구성`;
    button.disabled = false;
  }

  let renderStarted = false;
  const renderSource = async () => {
    if (renderStarted) return;
    try {
      const source = frame.contentDocument;
      if (!source?.querySelector('#about')) throw new Error('원본 페이지를 읽을 수 없습니다.');
      renderStarted = true;
      await render(source);
    } catch (error) {
      status.textContent = '미리보기를 만들지 못했습니다. 새로고침 후 다시 시도해 주세요.';
      console.error(error);
    }
  };
  frame.addEventListener('load', renderSource);
  // A cached source can finish before this deferred script registers its listener.
  if (frame.contentDocument?.readyState === 'complete' && frame.contentDocument.querySelector('#about')) {
    renderSource();
  }
})();
