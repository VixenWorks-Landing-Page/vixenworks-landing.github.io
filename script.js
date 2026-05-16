/* VixenWorks — Landing Page Interactions */

(function () {
  'use strict';

  /* ——— Nav: add scrolled class ——— */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 24) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ——— Scroll-reveal animations ——— */
  const revealEls = document.querySelectorAll('.fade-up, .fade-in');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -36px 0px',
      }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show everything immediately for older browsers */
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ——— Progress bar animation (hero dashboard mockup) ——— */
  const progressFill = document.getElementById('progress-fill');

  if (progressFill && 'IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              progressFill.classList.add('animated');
            }, 700);
            progressObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    progressObserver.observe(progressFill);
  }

  /* ——— Smooth-scroll for anchor links ——— */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ——— Hero elements: trigger immediately on load ——— */
  window.addEventListener('load', function () {
    const heroAnimatables = document.querySelectorAll(
      '#hero .fade-up, #hero .fade-in'
    );
    heroAnimatables.forEach(function (el) {
      el.classList.add('visible');
    });
  });

  /* ——— Stagger card grids on reveal ——— */
  function staggerChildren(container, selector, baseDelayMs) {
    if (!container) return;
    const children = container.querySelectorAll(selector);
    children.forEach(function (child, i) {
      child.style.transitionDelay = (baseDelayMs + i * 80) + 'ms';
    });
  }

  /* Apply stagger to grids once they are observed */
  const grids = [
    { sel: '.problem-grid',       child: '.problem-card',      base: 0 },
    { sel: '.benefits-grid',      child: '.benefit-card',      base: 0 },
    { sel: '.testimonials-grid',  child: '.testimonial-card',  base: 0 },
  ];

  grids.forEach(function (g) {
    const grid = document.querySelector(g.sel);
    if (grid && 'IntersectionObserver' in window) {
      const gridObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              staggerChildren(entry.target, g.child, g.base);
              gridObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );
      gridObserver.observe(grid);
    }
  });

})();
