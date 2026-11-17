// Highlight the section being read; anchors remain usable without JavaScript.
const tocLinks = [...document.querySelectorAll('.folio-toc a')];
const caseObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    tocLinks.forEach(link => {
      const current = link.hash === '#' + entry.target.id;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
}, { rootMargin: '-12% 0px -65% 0px' });
document.querySelectorAll('.folio-article > section').forEach(section => caseObserver.observe(section));
