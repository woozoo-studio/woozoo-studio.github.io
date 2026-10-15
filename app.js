const links = [...document.querySelectorAll('nav a')];
const themeStyle = document.createElement('link'); themeStyle.rel = 'stylesheet'; themeStyle.href = 'themes.css?v=29'; document.head.append(themeStyle);
const sections = [...document.querySelectorAll('main>section')];
const observer = new IntersectionObserver(entries => { for (const entry of entries) { if (entry.isIntersecting) { links.forEach(a => { const current = a.hash === '#' + entry.target.id; a.classList.toggle('active', current); if (current) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); } } }, { rootMargin: '-15% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));
document.querySelectorAll('video[data-default-playback-rate]').forEach(video => {
    video.addEventListener('loadedmetadata', () => {
        const rate = Number(video.dataset.defaultPlaybackRate);
        if (Number.isFinite(rate) && rate > 0) { video.defaultPlaybackRate = rate; video.playbackRate = rate; }
    }, { once: true });
});
// Supplementary background, kept separate from the three-item timeline.
document.querySelector('#experience').insertAdjacentHTML('beforeend', `<div class="credentials"><article><p class="eyebrow">EDUCATION</p><h3>학력</h3><div class="education-list"><div><a class="school-identity" href="https://www.kmou.ac.kr/kmou/main.do" target="_blank" rel="noreferrer" aria-label="국립한국해양대학교 공식 홈페이지"><img src="assets/kmou-symbol.png" alt="" width="1195" height="1195"><strong>한국해양대학교 · 해상보험전공</strong></a><span>2021.01 졸업 · 4.08 / 4.5</span></div><div><strong>광주중앙고등학교 · 문과</strong><span>2015.02 졸업</span></div></div></article><article><p class="eyebrow">CERTIFICATIONS & LANGUAGES</p><h3>자격·어학</h3><div class="credential-list"><div><strong>2급 항해사(상선)</strong><span>해양수산부 · 2025.07.22</span></div><div><strong>컴퓨터활용능력 2급</strong><span>대한상공회의소 · 2020.11.13</span></div><div><strong>OPIc IH</strong><span>2026.01.08</span></div><div><strong>TOEIC 875</strong><span>2026.04.12</span></div></div></article></div>`);
// Local preview only. Preserve scroll position and expanded panels on reload.
if (location.hostname === '127.0.0.1' || location.hostname === 'localhost') {
    const state = JSON.parse(sessionStorage.getItem('portfolio-preview') || 'null');
    if (state) { document.querySelectorAll('details:not(.theme-panel)').forEach((d, i) => d.open = state.open.includes(i)); requestAnimationFrame(() => window.scrollTo(0, state.y)); sessionStorage.removeItem('portfolio-preview'); }
    let version = null; setInterval(async () => { try { const r = await fetch('/__version', { cache: 'no-store' }); if (!r.ok) return; const next = await r.text(); if (version && version !== next) { if ([...document.querySelectorAll('video')].some(v => !v.paused)) return; sessionStorage.setItem('portfolio-preview', JSON.stringify({ y: scrollY, open: [...document.querySelectorAll('details:not(.theme-panel)')].flatMap((d, i) => d.open ? [i] : []) })); location.reload(); } version = next; } catch { } }, 1500);
}

// Video QR links open the matching project panel before scrolling to its player.
const revealLinkedDemo = () => {
    const player = document.getElementById(location.hash.slice(1));
    if (!player?.matches('.project-demo-player video')) return;
    const panel = player.closest('details');
    if (!panel) return;
    panel.open = true;
    requestAnimationFrame(() => player.scrollIntoView({ block: 'center' }));
};
window.addEventListener('hashchange', revealLinkedDemo);
revealLinkedDemo();

// Palette comparisons stay in the top-level local preview, outside the print source.
if (['127.0.0.1', 'localhost', '[::1]'].includes(location.hostname) && window.self === window.top) {
    const palettes = [
        { id: 'navy-burgundy', label: '네이비 · 버건디', colors: ['#1c2b3f', '#365d77', '#7d4450'] },
        { id: 'navy-teal', label: '네이비 · 틸', colors: ['#183346', '#345c72', '#126d69'] },
        { id: 'charcoal-olive', label: '차콜 · 올리브', colors: ['#28322f', '#485d61', '#746337'] },
        { id: 'burgundy-ivory', label: '버건디 · 아이보리', colors: ['#482a37', '#6a596a', '#8e4b60'] }
    ];
    const root = document.documentElement;
    const controls = document.createElement('div');
    controls.className = 'local-palette-controls';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.textContent = '색상 비교';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'local-palette-panel');
    const panel = document.createElement('div');
    panel.id = 'local-palette-panel';
    panel.className = 'local-palette-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'group');
    panel.setAttribute('aria-label', '로컬 색상 조합');
    const note = document.createElement('p');
    note.textContent = '로컬 미리보기 · 공개 사이트에는 표시되지 않습니다.';
    panel.append(note);
    const options = palettes.map(palette => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'local-palette-option';
        option.dataset.palette = palette.id;
        const swatches = document.createElement('span');
        swatches.className = 'local-palette-swatches';
        swatches.setAttribute('aria-hidden', 'true');
        palette.colors.forEach(color => {
            const swatch = document.createElement('i');
            swatch.style.backgroundColor = color;
            swatches.append(swatch);
        });
        option.append(swatches, document.createTextNode(palette.label));
        panel.append(option);
        return option;
    });
    const select = id => {
        root.dataset.localPalette = palettes.some(palette => palette.id === id) ? id : palettes[0].id;
        options.forEach(option => option.setAttribute('aria-pressed', String(option.dataset.palette === root.dataset.localPalette)));
        try { localStorage.setItem('portfolio-local-palette', root.dataset.localPalette); } catch { /* Storage can be disabled. */ }
    };
    let initial = palettes[0].id;
    try { initial = localStorage.getItem('portfolio-local-palette') || initial; } catch { /* Use the default palette. */ }
    select(initial);
    options.forEach(option => option.addEventListener('click', () => select(option.dataset.palette)));
    toggle.addEventListener('click', () => {
        panel.hidden = !panel.hidden;
        toggle.setAttribute('aria-expanded', String(!panel.hidden));
    });
    controls.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            panel.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });
    controls.append(toggle, panel);
    document.body.append(controls);
}
