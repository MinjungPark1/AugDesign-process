(() => {
  const projectGate = document.querySelector('.project-gate');
  const openProject = document.querySelector('[data-open-project]');

  openProject?.addEventListener('click', () => {
    document.body.classList.remove('gate-active');
    if (projectGate) projectGate.hidden = true;
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.querySelector('#main')?.focus({ preventScroll: true });
  });

  const journeySection = document.querySelector('.journey-section');
  const viewButtons = document.querySelectorAll('[data-journey-view]');

  viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const view = button.dataset.journeyView;
      journeySection.classList.toggle('view-as-is', view === 'as-is');
      journeySection.classList.toggle('view-to-be', view === 'to-be');
      viewButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    });
  });

  const links = [...document.querySelectorAll('.nav-links a')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }
})();
