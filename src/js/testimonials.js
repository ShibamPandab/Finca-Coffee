// Testimonials mobile carousel: the cards scroll natively via CSS
// scroll-snap (no JS needed for the swipe itself) — this only keeps the
// small dot indicator in sync with whichever card is currently centered.
// Dots are hidden by CSS on desktop, so this has no visible effect there.
export function initTestimonials() {
  const list = document.querySelector('.fc-testi-list');
  const dotsWrap = document.querySelector('[data-testi-dots]');
  if (!list || !dotsWrap) return;
  const cards = Array.from(list.querySelectorAll('.fc-testi-card'));
  const dots = Array.from(dotsWrap.querySelectorAll('.fc-testi-dot'));
  if (!cards.length || cards.length !== dots.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const i = cards.indexOf(entry.target);
      if (i < 0) return;
      dots.forEach((d, di) => d.classList.toggle('is-current', di === i));
    });
  }, { root: list, threshold: 0.6 });

  cards.forEach((c) => io.observe(c));
}
