// Animated count-up for the Story section's stat tiles (#story [data-count-to]).
// Scoped to #story only — no effect anywhere else on the page.
export function initStoryStats() {
  const nodes = Array.from(document.querySelectorAll('#story [data-count-to]'));
  if (!nodes.length) return;

  const animate = (el) => {
    const to = parseFloat(el.getAttribute('data-count-to'));
    const from = parseFloat(el.getAttribute('data-count-from') || '0');
    const dur = 1500;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = String(to);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(animate);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });
  nodes.forEach((n) => io.observe(n));
}
