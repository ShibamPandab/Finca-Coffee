// Wellness Drinks showcase: click swaps the hero image (cross-dissolve +
// slight zoom), title/description/ingredients/notes/price, and the ambient
// background glow color — 500ms ease-out, no page jump. This module only
// toggles classes/text/custom-properties; every actual transition is a
// plain CSS transition. Scoped to #menu's wellness block.
export function initWellness() {
  const section = document.getElementById('menu');
  if (!section) return;
  const hero = section.querySelector('[data-wellness-hero]');
  const circles = Array.from(section.querySelectorAll('[data-wellness]'));
  if (!hero || !circles.length) return;

  const shots = Array.from(hero.querySelectorAll('[data-wellness-shot]'));
  const nameEl = hero.querySelector('[data-wellness-name]');
  const descEl = hero.querySelector('[data-wellness-desc]');
  const notesEl = hero.querySelector('[data-wellness-notes]');
  const ingEl = hero.querySelector('[data-wellness-ing]');
  const servedEl = hero.querySelector('[data-wellness-served]');
  const priceEl = hero.querySelector('[data-wellness-price]');

  const INFO = {
    'cinnamon': { name: 'Cinnamon Spice Latte', desc: 'Steamed milk, warm cinnamon, a whisper of nutmeg.', notes: 'Warm, spiced, comforting', ing: 'Espresso, milk, cinnamon, nutmeg', served: 'Hot or iced · 12oz / 16oz', wg: 'rgba(201,161,95,.35)', wc: '#C9A15F' },
    'golden': { name: 'Golden Latte', desc: 'Turmeric, ginger, and black pepper whisked into steamed milk.', notes: 'Earthy, golden, gently spiced', ing: 'Turmeric, ginger, black pepper, honey, milk', served: 'Hot or iced · 12oz / 16oz', wg: 'rgba(229,193,90,.35)', wc: '#E5C15A' },
    'matcha': { name: 'Matcha Latte', desc: 'Ceremonial-grade matcha whisked into steamed oat milk.', notes: 'Vegetal, creamy, quietly sweet', ing: 'Ceremonial matcha, oat milk, vanilla', served: 'Hot or iced · 12oz / 16oz', wg: 'rgba(140,181,94,.35)', wc: '#B7C95E' },
    'butterfly-pea': { name: 'Butterfly Pea Latte', desc: 'Butterfly pea tea, coconut milk, a touch of lime.', notes: 'Floral, violet-blue, citrus-bright', ing: 'Butterfly pea flower, coconut milk, lime', served: 'Hot or iced · 12oz / 16oz', wg: 'rgba(156,134,196,.35)', wc: '#9C86C4' },
    'ginger-beet': { name: 'Ginger Beet Latte', desc: 'Beet, ginger, and turmeric with steamed milk.', notes: 'Earthy-sweet, warming, vivid red', ing: 'Beet, ginger, turmeric, milk, honey', served: 'Hot or iced · 12oz / 16oz', wg: 'rgba(178,74,58,.38)', wc: '#C65C4A' },
  };

  let active = 'cinnamon';

  const apply = (slug) => {
    if (!slug || slug === active || !INFO[slug]) return;
    active = slug;
    const info = INFO[slug];
    const circle = circles.find((c) => c.getAttribute('data-wellness') === slug);
    const priceSrc = circle && circle.querySelector('.fc-wellness-circle-price');

    shots.forEach((s) => s.classList.toggle('is-active', s.getAttribute('data-wellness-shot') === slug));
    circles.forEach((c) => c.classList.toggle('is-active', c.getAttribute('data-wellness') === slug));
    hero.style.setProperty('--wg', info.wg);
    hero.style.setProperty('--wc', info.wc);

    const fadeEls = [nameEl, descEl, notesEl, ingEl, servedEl, priceEl].filter(Boolean);
    fadeEls.forEach((el) => { el.style.opacity = '0'; });
    setTimeout(() => {
      if (nameEl) nameEl.textContent = info.name;
      if (descEl) descEl.textContent = info.desc;
      if (notesEl) notesEl.textContent = info.notes;
      if (ingEl) ingEl.textContent = info.ing;
      if (servedEl) servedEl.textContent = info.served;
      if (priceEl) priceEl.textContent = priceSrc ? priceSrc.textContent : '';
      fadeEls.forEach((el) => { el.style.opacity = '1'; });
    }, 200);
  };

  circles.forEach((c) => {
    const slug = c.getAttribute('data-wellness');
    c.addEventListener('click', () => apply(slug));
  });
}

// Very gentle parallax on mouse movement over the wellness hero image —
// mouse-only (skipped on touch), and skipped entirely under
// prefers-reduced-motion. Sets `transform` on the float layer; the
// continuous idle-float keyframe (in wellness.css) animates the separate
// `translate` property on the same element, so the two never fight over
// one property.
export function initWellnessParallax() {
  const media = document.querySelector('#menu [data-wellness-media]');
  const float = document.querySelector('#menu [data-wellness-float]');
  if (!media || !float) return;
  const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (reduced) return;
  const mq = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)');
  if (mq && !mq.matches) return;

  const onMove = (e) => {
    const r = media.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    float.style.transform = 'translate(' + (px * 14).toFixed(1) + 'px,' + (py * 14).toFixed(1) + 'px)';
  };
  const onLeave = () => { float.style.transform = 'translate(0,0)'; };
  media.addEventListener('mousemove', onMove);
  media.addEventListener('mouseleave', onLeave);
}
