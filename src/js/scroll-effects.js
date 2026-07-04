// Site-wide scroll effects shared by every section: fade/slide reveal on
// scroll ([data-reveal]), the nav's scrolled state, the top progress bar,
// gentle parallax ([data-parallax]), and magnetic CTA buttons
// ([data-magnetic]). Reused as-is by Story, Farm to Cup, Signature Drinks,
// Menu and Order sections.
export function initScrollEffects() {
  const root = document;
  const motion = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const reveals = Array.from(root.querySelectorAll('[data-reveal]'));
  reveals.forEach((el) => {
    const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
    if (!motion) { el.style.opacity = '1'; el.style.transform = 'none'; return; }
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .9s cubic-bezier(.16,.84,.44,1) ' + delay + 'ms, transform .9s cubic-bezier(.16,.84,.44,1) ' + delay + 'ms';
  });

  if (motion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  const nav = root.querySelector('[data-nav]');
  const bar = root.querySelector('[data-progress]');
  const parallax = Array.from(root.querySelectorAll('[data-parallax]'));

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (nav) {
      if (y > 50) {
        nav.style.background = 'var(--nav-bg)';
        nav.style.backdropFilter = 'blur(14px)';
        nav.style.borderBottomColor = 'var(--line-09)';
        nav.style.paddingTop = '14px';
        nav.style.paddingBottom = '14px';
      } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.borderBottomColor = 'transparent';
        nav.style.paddingTop = '20px';
        nav.style.paddingBottom = '20px';
      }
    }
    if (bar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    if (motion) {
      parallax.forEach((el) => {
        const rate = parseFloat(el.getAttribute('data-parallax')) || 0;
        const rect = el.getBoundingClientRect();
        const off = (rect.top + rect.height / 2 - window.innerHeight / 2) * rate;
        el.style.transform = (el.dataset.baseTransform || '') + ' translateY(' + off.toFixed(1) + 'px)';
      });
    }
  };

  // preserve centering base transform for the order-section glow
  parallax.forEach((el) => {
    const cs = window.getComputedStyle(el);
    if (cs.transform && cs.transform.includes('matrix') && el.style.transform.includes('translate(-50%')) {
      el.dataset.baseTransform = 'translate(-50%,-50%)';
    }
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // magnetic buttons
  if (motion) {
    const magnets = Array.from(root.querySelectorAll('[data-magnetic]'));
    magnets.forEach((btn) => {
      const move = (ev) => {
        const r = btn.getBoundingClientRect();
        const mx = ev.clientX - (r.left + r.width / 2);
        const my = ev.clientY - (r.top + r.height / 2);
        btn.style.transform = 'translate(' + (mx * 0.18).toFixed(1) + 'px,' + (my * 0.28).toFixed(1) + 'px)';
      };
      const leave = () => { btn.style.transform = 'translate(0,0)'; };
      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
    });
  }
}
