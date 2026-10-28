// Loaded in <head> so the reveal styles only apply when JS is running.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  // Paw prints walk across "Outside work" once
  const outside = document.getElementById('outside');
  if (outside) {
    const pawObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { outside.classList.add('walking'); pawObserver.disconnect(); }
    }, { threshold: 0.4 });
    pawObserver.observe(outside);
  }

  // Fade timeline entries in as they scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Draw the timeline line as you scroll
  const container = document.getElementById('timeline');
  const progress = document.getElementById('timeline-progress');
  if (!container || !progress) return;

  let ticking = false;
  const update = () => {
    const r = container.getBoundingClientRect();
    const drawn = Math.min(Math.max(window.innerHeight * 0.6 - r.top, 0), r.height);
    progress.style.transform = `scaleY(${r.height ? drawn / r.height : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
});
