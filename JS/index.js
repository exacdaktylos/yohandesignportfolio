/* =============================================
   YOHAN WICKRAMASINGHE — Portfolio v2 Scripts
   ============================================= */


/* Scroll reveal
   Watches .reveal elements and adds .in
   when they enter the viewport              */
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


/* Smooth scroll for all anchor links */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* Nav — subtle shadow on scroll */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 1px 40px rgba(0,0,0,0.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});


/* Work cards — open link placeholder
   Replace the console.log with your real
   project URLs when you're ready         */
document.querySelectorAll('.work-card').forEach((card) => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.work-title')?.textContent;
    console.log(`Clicked: ${title}`);
    // e.g. window.location.href = '/projects/nexus-corp';
  });
});