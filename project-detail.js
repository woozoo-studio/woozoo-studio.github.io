// Keep a single active chapter or subsection while native anchors handle navigation.
const tocLinks = [...document.querySelectorAll('.folio-toc a')];
const tocSections = [...document.querySelectorAll('[data-toc-section]')];
let tocUpdatePending = false;
function updateProjectToc() {
  tocUpdatePending = false;
  const header = document.querySelector('.folio-header');
  const threshold = (header ? header.getBoundingClientRect().height : 0) + 36;
  let current = tocSections[0];
  for (const section of tocSections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = tocSections[tocSections.length - 1];
  }
  for (const link of tocLinks) {
    const active = current && link.hash === '#' + current.id;
    link.classList.toggle('is-current', Boolean(active));
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
function requestProjectTocUpdate() {
  if (tocUpdatePending) return;
  tocUpdatePending = true;
  requestAnimationFrame(updateProjectToc);
}
window.addEventListener('scroll', requestProjectTocUpdate, {passive:true});
window.addEventListener('resize', requestProjectTocUpdate);
window.addEventListener('load', requestProjectTocUpdate);
window.addEventListener('hashchange', requestProjectTocUpdate);
requestProjectTocUpdate();

const projectArticle = document.querySelector('.folio-article');
if (projectArticle) new ResizeObserver(requestProjectTocUpdate).observe(projectArticle);
