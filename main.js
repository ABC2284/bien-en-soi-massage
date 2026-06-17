// Mobile nav toggle + reveal on scroll
document.addEventListener('DOMContentLoaded', () => {
  // ========== MENU HAMBURGER ==========
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // Ajoute/retire la classe sur le body pour décaler le contenu (correction mobile)
      document.body.classList.toggle('menu-open');
    });

    // Fermer le menu quand on clique sur un lien (mobile)
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ========== REVEAL ON SCROLL ==========
  const revealEls = document.querySelectorAll('.service-card, .benefit, .service-detail, .product-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
});
