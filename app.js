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
