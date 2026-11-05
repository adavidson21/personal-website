// Loaded in <head> so the reveal styles only apply when JS is running.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  setUpSuite(reduceMotion);

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

// Workshop suite: the rail switches apps like Workshop's own. It plays through the apps on its own
// (a bar under the current app fills up) until someone clicks or uses the keyboard, pauses while
// hovered or off screen, and never plays with reduced motion. Arrow keys, Home and End move along the rail.
function setUpSuite(reduceMotion) {
  const suite = document.querySelector('[data-suite]');
  if (!suite) return;
  const tabs = [...suite.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
  const rail = suite.querySelector('.suite-rail');
  const path = suite.querySelector('[data-suite-path]');
  let current = 0;

  const show = (i, { focus = false } = {}) => {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach((t, n) => {
      const on = n === current;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[n].hidden = !on;
      panels[n].classList.toggle('is-active', on);
    });
    if (path) path.textContent = panels[current].dataset.path || '';
    // Keep the chosen app in view on the phone layout, where the rail scrolls sideways
    const t = tabs[current];
    if (rail.scrollWidth > rail.clientWidth) {
      const left = t.offsetLeft - rail.offsetLeft;
      if (left < rail.scrollLeft || left + t.offsetWidth > rail.scrollLeft + rail.clientWidth) {
        rail.scrollTo({ left: left - 8, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
    if (focus) t.focus();
  };

  const stop = () => { suite.classList.remove('is-playing'); suite.classList.add('is-touched'); };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => { stop(); show(i); });
    t.addEventListener('keydown', (e) => {
      const keys = { ArrowDown: current + 1, ArrowRight: current + 1, ArrowUp: current - 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      stop();
      show(keys[e.key], { focus: true });
    });
    // The filled bar under the current app means "next"
    t.querySelector('.tick i')?.addEventListener('animationend', () => {
      if (suite.classList.contains('is-playing') && i === current) show(current + 1);
    });
  });

  show(0);

  // Count the stats up once they come into view
  const counters = [...suite.querySelectorAll('[data-count]')];
  if (!reduceMotion && counters.length) {
    counters.forEach((c) => { c.textContent = '0'; });
    const countObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      countObserver.disconnect();
      counters.forEach((c) => {
        const end = Number(c.dataset.count);
        let n = 0;
        const step = () => { c.textContent = String(++n); if (n < end) setTimeout(step, 520 / end); };
        setTimeout(step, 150);
      });
    }, { threshold: 0.6 });
    countObserver.observe(suite.querySelector('.suite-stats'));
  }

  if (reduceMotion) return;
  suite.classList.add('is-playing');
  // Only play while the window is on screen
  const windowEl = suite.querySelector('.suite-window');
  new IntersectionObserver((entries) => {
    suite.classList.toggle('is-paused', !entries[0].isIntersecting);
  }, { threshold: 0.35 }).observe(windowEl);
}
