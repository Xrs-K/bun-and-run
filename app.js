// Sticky nav background
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile menu
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  })
);

// Hero parallax
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroBg.style.transform = `scale(1.05) translateY(${y * 0.3}px)`;
  }
}, { passive: true });

// Menu tabs
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
const tabsWrap = document.getElementById('tabsWrap');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.panel[data-panel="${tab.dataset.tab}"]`).classList.add('active');
    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    // If the user is deep in a long list, jump back to the top of the panel
    const panelsTop = document.getElementById('menuPanels').getBoundingClientRect().top;
    const tabsBottom = tabsWrap.getBoundingClientRect().bottom;
    if (panelsTop < tabsBottom) {
      window.scrollTo({ top: window.scrollY + panelsTop - tabsBottom - 12, behavior: 'instant' });
    }
  });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// SMIL doesn't respect prefers-reduced-motion on its own
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.mascot animateTransform').forEach(el => el.remove());
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
