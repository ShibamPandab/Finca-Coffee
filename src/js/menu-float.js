import { MENU_INFO } from './menu-gallery.js';

// Small glass card that follows the cursor while a menu row is hovered.
// Mouse-only (guarded by both CSS and this matchMedia check) — never
// attaches on touch devices. Scoped to #menu's own rows.
export function initMenuFloat() {
  const section = document.getElementById('menu');
  if (!section) return;
  const float = section.querySelector('[data-menu-float]');
  const rows = Array.from(section.querySelectorAll('.fc-menu-row'));
  if (!float || !rows.length) return;
  const mq = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)');
  if (mq && !mq.matches) return;

  const thumb = float.querySelector('[data-menu-float-thumb]');
  const nameEl = float.querySelector('[data-menu-float-name]');
  const descEl = float.querySelector('[data-menu-float-desc]');

  let targetX = 0, targetY = 0, curX = 0, curY = 0, active = false, raf = null;

  const loop = () => {
    curX += (targetX - curX) * 0.18;
    curY += (targetY - curY) * 0.18;
    float.style.translate = curX.toFixed(1) + 'px ' + curY.toFixed(1) + 'px';
    if (active || Math.abs(targetX - curX) > 0.3 || Math.abs(targetY - curY) > 0.3) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
    }
  };

  const place = (e) => {
    const w = float.offsetWidth || 216;
    const h = float.offsetHeight || 72;
    targetX = Math.min(e.clientX + 22, window.innerWidth - w - 12);
    targetY = Math.min(e.clientY + 22, window.innerHeight - h - 12);
    if (!raf) raf = requestAnimationFrame(loop);
  };

  rows.forEach((row) => {
    const slug = row.getAttribute('data-drink');
    row.addEventListener('mouseenter', (e) => {
      active = true;
      const info = MENU_INFO[slug];
      const nameSrc = row.querySelector('.fc-menu-row-name');
      if (nameEl) nameEl.textContent = nameSrc ? nameSrc.textContent : '';
      if (descEl && info) descEl.textContent = info.notes || info.desc || '';
      const shot = document.getElementById('fc-menu-' + slug);
      const src = shot && shot.tagName === 'IMG' ? shot.getAttribute('src') : null;
      if (thumb) thumb.style.backgroundImage = src ? 'url(' + src + ')' : '';
      curX = e.clientX + 22;
      curY = e.clientY + 22;
      float.classList.add('is-visible');
      place(e);
    });
    row.addEventListener('mousemove', place);
    row.addEventListener('mouseleave', () => {
      active = false;
      float.classList.remove('is-visible');
    });
  });
}
