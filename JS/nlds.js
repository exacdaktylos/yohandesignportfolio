/* =============================================
   YOHAN WICKRAMASINGHE — Project Detail Scripts
   igv-project.js
   ============================================= */

/* ── Hamburger menu ─────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () =>
  hamburger.classList.contains('open') ? closeMenu() : openMenu()
);

document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', closeMenu)
);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});


/* ── Scroll reveal ──────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObs.observe(el));


/* ── Nav shadow on scroll ───────────────────── */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 1px 40px rgba(0,0,0,0.5)'
    : 'none';
});


/* ── Gallery lightbox (simple expand on click) ─
   Clicking a gallery image opens it in a full-
   screen overlay. Press Escape or click outside
   to close.                                      */
const galleryItems = document.querySelectorAll('.gallery-item');

// Build overlay element
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display: none;
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(9,9,11,0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  padding: 2rem;
`;

const lbImg = document.createElement('img');
lbImg.style.cssText = `
  max-width: 90vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  animation: lbIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
`;

const lbClose = document.createElement('button');
lbClose.innerHTML = '✕';
lbClose.style.cssText = `
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  color: #FAFAF9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
`;
lbClose.addEventListener('mouseenter', () => lbClose.style.background = 'rgba(255,255,255,0.18)');
lbClose.addEventListener('mouseleave', () => lbClose.style.background = 'rgba(255,255,255,0.1)');

// Inject keyframe for lightbox entrance
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes lbIn {
    from { transform: scale(0.92); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);

lightbox.appendChild(lbImg);
lightbox.appendChild(lbClose);
document.body.appendChild(lightbox);

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || '';
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

galleryItems.forEach(item => {
  const img = item.querySelector('img');
  if (!img) return;
  item.style.cursor = 'zoom-in';
  item.addEventListener('click', () => openLightbox(img.src, img.alt));
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

lbClose.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});