// "Farm to Cup" seven-step journey (#farm-to-cup): fills the vertical rail
// and lights up each step's dot as the user scrolls past it. Image parallax
// and scroll-reveal reuse the page's shared [data-parallax]/[data-reveal]
// systems (see scroll-effects.js) — this module only owns the rail fill +
// dot state, scoped to its own elements.
export function initFarmTimeline() {
  const stepsWrap = document.querySelector('#farm-to-cup .fc-farm-steps');
  if (!stepsWrap) return;
  const fill = stepsWrap.querySelector('[data-farm-fill]');
  const steps = Array.from(stepsWrap.querySelectorAll('[data-farm-step]'));
  if (!fill && !steps.length) return;

  const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (reduced) return;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let ticking = false;

  const render = () => {
    ticking = false;
    const rect = stepsWrap.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const progress = rect.height > 0 ? clamp((vh * 0.5 - rect.top) / rect.height, 0, 1) : 0;

    if (fill) fill.style.transform = 'scaleY(' + progress.toFixed(4) + ')';

    const n = steps.length;
    steps.forEach((step, i) => {
      const passed = progress >= (i + 0.5) / n;
      step.classList.toggle('is-passed', passed);
    });
  };

  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(render); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  render();
}
