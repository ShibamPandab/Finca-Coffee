// Floating theme switcher: dark/light mode + accent color, persisted in
// localStorage. Defaults match the original design-time props (mode: dark,
// accent: olive).
const DEFAULT_MODE = 'dark';
const DEFAULT_ACCENT = 'olive';

export function initThemeSwitcher() {
  const MODES = ['dark', 'light'];
  const ACCENTS = ['olive', 'copper', 'espresso', 'terracotta'];
  const DRINKS = {
    olive: { title: 'Matcha Oat Latte', sub: 'ceremonial grade · house oatmilk' },
    copper: { title: 'Caramel Latte', sub: 'single origin espresso · steamed oatmilk' },
    espresso: { title: 'Whole Bean Espresso', sub: 'single-origin · dark roast' },
    terracotta: { title: 'Signature Drink', sub: 'terracotta spice · seasonal pour' },
  };
  const de = document.documentElement;
  const panel = document.querySelector('[data-theme-switch]');
  const modeBtns = Array.from(document.querySelectorAll('[data-mode-btn]'));
  const accentBtns = Array.from(document.querySelectorAll('[data-accent-btn]'));
  const drinkTitle = document.querySelector('[data-drink-title]');
  const drinkSub = document.querySelector('[data-drink-sub]');

  const applyMode = (mode) => {
    if (MODES.indexOf(mode) < 0) mode = DEFAULT_MODE;
    de.setAttribute('data-fc-mode', mode);
    if (panel) panel.setAttribute('data-fc-mode-ui', mode);
    modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-mode-btn') === mode)));
  };

  const applyAccent = (accent, skipFade) => {
    if (ACCENTS.indexOf(accent) < 0) accent = DEFAULT_ACCENT;
    de.setAttribute('data-fc-accent', accent);
    accentBtns.forEach((b) => b.setAttribute('data-active', String(b.getAttribute('data-accent-btn') === accent)));
    const drink = DRINKS[accent];
    if (!drink || !drinkTitle || !drinkSub) return;
    if (skipFade) {
      drinkTitle.textContent = drink.title;
      drinkSub.textContent = drink.sub;
      return;
    }
    drinkTitle.style.opacity = '0';
    drinkSub.style.opacity = '0';
    setTimeout(() => {
      drinkTitle.textContent = drink.title;
      drinkSub.textContent = drink.sub;
      drinkTitle.style.opacity = '1';
      drinkSub.style.opacity = '1';
    }, 220);
  };

  let initialMode = null;
  let initialAccent = null;
  try {
    initialMode = localStorage.getItem('fc-mode');
    initialAccent = localStorage.getItem('fc-accent');
  } catch (e) {}
  if (!initialMode) initialMode = DEFAULT_MODE;
  if (!initialAccent) initialAccent = DEFAULT_ACCENT;
  applyMode(initialMode);
  applyAccent(initialAccent, true);

  modeBtns.forEach((b) => b.addEventListener('click', () => {
    const m = b.getAttribute('data-mode-btn');
    applyMode(m);
    try { localStorage.setItem('fc-mode', m); } catch (e) {}
  }));
  accentBtns.forEach((b) => b.addEventListener('click', () => {
    const a = b.getAttribute('data-accent-btn');
    applyAccent(a, false);
    try { localStorage.setItem('fc-accent', a); } catch (e) {}
  }));
}
