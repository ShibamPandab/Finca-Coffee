// Wellness Drinks showcase: clicking a selector item swaps the hero image
// (cross-dissolve + slight zoom), title/description/ingredients/notes/price,
// and the ambient background glow color — 500ms ease-out, no page jump.
// Nothing here is tied to scroll; the only motion is what a click triggers.
// This module only toggles classes/text/custom-properties — every actual
// transition is a plain CSS transition. Scoped to #menu's wellness block.
export function initWellness() {
  const section = document.getElementById('menu');
  if (!section) return;
  const hero = section.querySelector('[data-wellness-hero]');
  const items = Array.from(section.querySelectorAll('[data-wellness]'));
  if (!hero || !items.length) return;

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
    const item = items.find((it) => it.getAttribute('data-wellness') === slug);
    const price = item ? item.getAttribute('data-price') : '';

    shots.forEach((s) => s.classList.toggle('is-active', s.getAttribute('data-wellness-shot') === slug));
    items.forEach((it) => {
      const isActive = it.getAttribute('data-wellness') === slug;
      it.classList.toggle('is-active', isActive);
      it.setAttribute('aria-selected', String(isActive));
    });
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
      if (priceEl) priceEl.textContent = price;
      fadeEls.forEach((el) => { el.style.opacity = '1'; });
    }, 200);
  };

  items.forEach((it) => {
    const slug = it.getAttribute('data-wellness');
    it.addEventListener('click', () => apply(slug));
  });
}
