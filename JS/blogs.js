/* =============================================
   YOHAN WICKRAMASINGHE — Blogs Page Scripts
   ============================================= */

/* Hamburger menu */
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
hamburger.addEventListener('click', () => hamburger.classList.contains('open') ? closeMenu() : openMenu());
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });


/* Scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObs.observe(el));


/* Nav shadow on scroll */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20 ? '0 1px 40px rgba(0,0,0,0.5)' : 'none';
});


/* Filter bar */
const filterBtns  = document.querySelectorAll('.filter-btn');
const blogItems   = document.querySelectorAll('.blog-item');
const emptyState  = document.getElementById('empty-state');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    let visibleCount = 0;
    blogItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      const link  = item.closest('.blog-link') || item;
      if (match) {
        link.style.display = '';
        item.classList.remove('hidden');
        visibleCount++;
      } else {
        link.style.display = 'none';
        item.classList.add('hidden');
      }
    });

    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  });
});