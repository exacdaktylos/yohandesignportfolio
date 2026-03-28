/* =============================================
   YOHAN WICKRAMASINGHE — About Me Scripts
   ============================================= */

/* =================================================
   HAMBURGER MENU — paste this into index.js
   AND into aboutme.js (both files need it)

   WHERE TO PASTE: add at the top of your JS file,
   before any existing code.
   ================================================= */

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; /* stops background scrolling */
}

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* Toggle on hamburger click */
hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

/* Close when a menu link is tapped */
document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

/* Close on Escape key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});



/* Scroll reveal
   Watches .reveal elements and adds .in
   when they scroll into view               */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

revealElements.forEach((el) => revealObserver.observe(el));


/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* Nav shadow on scroll */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 1px 40px rgba(0,0,0,0.5)'
    : 'none';
});


/* Profile photo loader
   Shows the <img> once it loads successfully.
   If the image is missing or broken, the
   initials placeholder stays visible instead. */
const photo       = document.getElementById('profile-photo');
const placeholder = document.getElementById('photo-placeholder');

if (photo) {
  photo.addEventListener('load', () => {
    photo.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  });

  photo.addEventListener('error', () => {
    // Image not found — keep showing the initials placeholder
    photo.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  });
}