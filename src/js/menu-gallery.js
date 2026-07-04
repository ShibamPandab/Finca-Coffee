// Menu gallery: hovering/focusing a row crossfades the showcase image and
// metadata. MENU_INFO is exported so menu-float.js can reuse the same
// descriptions for the cursor-follow preview. Scoped to #menu only.
export const MENU_INFO = {
  'chemex': { desc: 'Full immersion, paper-filtered clarity — a bright, clean cup brewed by hand for every pour.', origin: 'Honduras · Light Roast', roast: 'Light', notes: 'Bright, tea-like clarity', temp: 'hot' },
  'clever': { desc: 'Immersion brewed, then filtered clean — full-bodied with a rounded, balanced sweetness.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Full-bodied, balanced sweetness', temp: 'hot' },
  'french-press': { desc: 'Coarse ground, steeped slow — a heavier body with a rustic, textured finish.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Heavy body, rustic finish', temp: 'hot' },
  'earl-grey': { desc: 'Black tea scented with bergamot — steeped hot or poured over ice.', origin: 'Sri Lanka', notes: 'Bergamot, black tea, citrus lift', temp: 'both' },
  'green': { desc: 'Delicate, grassy green tea, steeped just short of bitter.', origin: 'China', notes: 'Grassy, delicate, clean', temp: 'both' },
  'chai': { desc: 'Black tea steeped with warm spice, served hot or cold.', origin: 'India', notes: 'Warm spice, black tea base', temp: 'both' },
  'espresso': { desc: 'A single pull, pulled to order — dense crema, no dilution.', origin: 'Honduras · Dark Roast', roast: 'Dark', notes: 'Cocoa, toasted almond, long finish', temp: 'hot' },
  'espresso-flight': { desc: 'Three pulls from one origin, roasted three ways, side by side.', origin: 'Honduras', roast: 'Light / Medium / Dark', notes: 'Three pulls, one origin, three roasts', temp: 'hot' },
  'macchiato': { desc: 'Espresso "marked" with a spoon of silky steamed milk foam.', origin: 'Honduras · Dark Roast', roast: 'Dark', notes: 'Espresso marked with silk foam', temp: 'hot' },
  'cortado': { desc: 'Equal parts espresso and steamed milk — cut, not covered.', origin: 'Honduras · Dark Roast', roast: 'Dark', notes: 'Equal parts espresso, steamed milk', temp: 'hot' },
  'cafe-bombon': { desc: 'Espresso poured over sweetened condensed milk, layered in the glass.', origin: 'Honduras · Dark Roast', roast: 'Dark', notes: 'Espresso over condensed milk', temp: 'hot' },
  'affogato': { desc: 'A hot shot of espresso poured over a scoop of vanilla gelato.', origin: 'Honduras · Dark Roast', roast: 'Dark', notes: 'Espresso poured over vanilla gelato', temp: 'hot' },
  'cappuccino': { desc: 'Equal parts espresso, steamed milk, and microfoam.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Equal parts espresso, milk, foam', temp: 'hot' },
  'latte': { desc: 'Espresso and silky steamed milk, finished with a whisper of crema.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Silky steamed milk, light crema', temp: 'both' },
  'americano': { desc: 'Espresso lengthened with hot water for a clean, lighter body.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Espresso, hot water, clean body', temp: 'hot' },
  'mocha': { desc: 'Espresso, steamed milk, and dark house-made cocoa.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Espresso, steamed milk, dark cocoa', temp: 'both' },
  'hot-chocolate': { desc: 'House cocoa whisked into steamed whole milk.', origin: 'Single-origin cocoa', notes: 'House cocoa, steamed whole milk', temp: 'hot' },
  'cold-brew': { desc: 'Steeped eighteen hours in cold water — naturally sweet, low acid.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: '18-hour steep, naturally sweet', temp: 'iced' },
  'cardamom-brew': { desc: 'Our cold brew infused with warm cardamom.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Cold brew, warm cardamom spice', temp: 'iced' },
  'raspberry-fresh': { desc: 'Cold brew brightened with muddled fresh raspberry.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Cold brew, muddled raspberry', temp: 'iced' },
  'caramel-latte': { desc: 'Iced latte swirled with house caramel.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Iced latte, house caramel', temp: 'iced' },
  'chai-latte': { desc: 'Iced chai concentrate, steamed cold milk, poured over ice.', origin: 'India', notes: 'Iced chai, steamed cold milk', temp: 'iced' },
  'vanilla-latte': { desc: 'Iced latte with Madagascar vanilla syrup.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Iced latte, Madagascar vanilla', temp: 'iced' },
  'lavender-latte': { desc: 'Iced latte with house lavender syrup, lightly floral.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Iced latte, house lavender syrup', temp: 'iced' },
  'iced-latte': { desc: 'A double shot poured over cold milk and ice.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Double shot, cold milk, ice', temp: 'iced' },
  'nitro-cold-brew': { desc: 'Cold brew charged with nitrogen for a cascading, creamy pour.', origin: 'Honduras · Medium Roast', roast: 'Medium', notes: 'Nitrogen-charged, cascading foam', temp: 'iced' },
};

const HOT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 3c0 1.4-1.4 1.4-1.4 2.8S8 8 8 9.4M12 3c0 1.4-1.4 1.4-1.4 2.8S12 8 12 9.4M16 3c0 1.4-1.4 1.4-1.4 2.8S16 8 16 9.4"/><path d="M5 11h14v3a7 7 0 0 1-7 7 7 7 0 0 1-7-7v-3Z"/></svg>';
const ICE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M12 6l-2.2-1.4M12 6l2.2-1.4M12 18l-2.2 1.4M12 18l2.2 1.4"/></svg>';

export function initMenuGallery() {
  const section = document.getElementById('menu');
  if (!section) return;
  const showcase = section.querySelector('[data-menu-showcase]');
  const rows = Array.from(section.querySelectorAll('.fc-menu-row'));
  if (!showcase || !rows.length) return;

  const shots = Array.from(showcase.querySelectorAll('[data-menu-shot]'));
  const nameEl = showcase.querySelector('[data-menu-name]');
  const descEl = showcase.querySelector('[data-menu-desc]');
  const originEl = showcase.querySelector('[data-menu-origin]');
  const roastRow = showcase.querySelector('[data-menu-roast-row]');
  const roastEl = showcase.querySelector('[data-menu-roast]');
  const notesEl = showcase.querySelector('[data-menu-notes]');
  const priceEl = showcase.querySelector('[data-menu-price]');
  const tempEl = showcase.querySelector('[data-menu-temp]');

  let active = 'chemex';

  const setActive = (slug) => {
    if (!slug || slug === active || !MENU_INFO[slug]) return;
    active = slug;
    const row = rows.find((r) => r.getAttribute('data-drink') === slug);
    if (!row) return;
    const info = MENU_INFO[slug];
    const name = row.querySelector('.fc-menu-row-name').textContent;
    const price = row.querySelector('.fc-menu-row-price').textContent;

    rows.forEach((r) => r.classList.toggle('is-active', r === row));
    shots.forEach((s) => s.classList.toggle('is-active', s.getAttribute('data-menu-shot') === slug));

    const fadeEls = [nameEl, descEl, originEl, roastEl, notesEl, priceEl, tempEl].filter(Boolean);
    fadeEls.forEach((el) => { el.style.opacity = '0'; });
    setTimeout(() => {
      if (nameEl) nameEl.textContent = name;
      if (descEl) descEl.textContent = info.desc;
      if (originEl) originEl.textContent = info.origin || '—';
      if (roastRow) roastRow.style.display = info.roast ? '' : 'none';
      if (roastEl) roastEl.textContent = info.roast || '';
      if (notesEl) notesEl.textContent = info.notes;
      if (priceEl) priceEl.textContent = price;
      if (tempEl) tempEl.innerHTML = info.temp === 'hot' ? HOT_ICON : info.temp === 'iced' ? ICE_ICON : HOT_ICON + ICE_ICON;
      fadeEls.forEach((el) => { el.style.opacity = '1'; });
    }, 160);
  };

  rows.forEach((row) => {
    const slug = row.getAttribute('data-drink');
    row.addEventListener('mouseenter', () => setActive(slug));
    row.addEventListener('focus', () => setActive(slug));
  });
}
