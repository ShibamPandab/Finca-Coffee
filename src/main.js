import { initThemeSwitcher } from './js/theme-switcher.js';
import { initStoryStats } from './js/story-stats.js';
import { initSignatureDrinks } from './js/signature-drinks.js';
import { initFarmTimeline } from './js/farm-timeline.js';
import { initMenuGallery } from './js/menu-gallery.js';
import { initMenuFloat } from './js/menu-float.js';
import { initWellness } from './js/wellness.js';
import { initTestimonials } from './js/testimonials.js';
import { initScrollEffects } from './js/scroll-effects.js';

function init() {
  initThemeSwitcher();
  initStoryStats();
  initSignatureDrinks();
  initFarmTimeline();
  initMenuGallery();
  initMenuFloat();
  initWellness();
  initTestimonials();
  initScrollEffects();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
