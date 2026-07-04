// Featured Signature Drinks: each chapter plays its entrance exactly once,
// triggered by IntersectionObserver as it crosses ~70% into the viewport
// (rootMargin shrinks the root by 30% off the bottom edge). No scroll
// progress is read at all — the reveal is a fixed-duration CSS transition
// (see .fc-sig-card.is-revealed rules in signature-drinks.css), so it can't
// be scrubbed, replayed, or reversed by scrolling back up. Cards are
// observed once each and then unobserved, so nothing here runs again after
// the reveal fires. prefers-reduced-motion is also handled in CSS.
export function initSignatureDrinks() {
  const section = document.getElementById('signature-drinks');
  if (!section) return;
  const cards = Array.from(section.querySelectorAll('[data-sig-card]'));
  if (!cards.length) return;
  const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (reduced) return;

  if (!('IntersectionObserver' in window)) {
    cards.forEach((c) => c.classList.add('is-revealed'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      io.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -30% 0px' });

  cards.forEach((card) => io.observe(card));
}
