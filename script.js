// Menu mobile
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Mise en avant du lien de navigation actif selon la section visible
const navLinks = document.querySelectorAll('.main-nav a');
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = document.querySelector('.main-nav a[href="#' + entry.target.id + '"]');
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach((section) => navObserver.observe(section));

// Révélation subtile au scroll
const revealTargets = document.querySelectorAll(
  '.process-step, .apport-item, .ikigai-card, .skill-card, .project-card, .cert-card, .contact-link, .about-photo, .about-text, .vision-block, .why-list'
);

revealTargets.forEach((el, index) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (index % 4) * 60 + 'ms';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((el) => revealObserver.observe(el));
