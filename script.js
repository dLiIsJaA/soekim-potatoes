/* ============================================
   SOEKIEM POTATOES — script.js (FIXED)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  /* ------------------------------------------
     1. NAVBAR SCROLL
  ------------------------------------------ */
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    }

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });


  /* ------------------------------------------
     2. HAMBURGER MENU
  ------------------------------------------ */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });


  /* ------------------------------------------
     3. SCROLL REVEAL (FIX)
  ------------------------------------------ */
  const reveals = document.querySelectorAll('.reveal');

  function showVisibleReveals() {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, parseInt(delay));
      }
    });
  }

  // FIX: jalanin saat load + setelah lompat ke anchor
  window.addEventListener('load', showVisibleReveals);
  window.addEventListener('scroll', showVisibleReveals, { passive: true });

  // juga jalanin sekali pas awal
  setTimeout(showVisibleReveals, 100);


  /* ------------------------------------------
     4. COUNTER
  ------------------------------------------ */
  const counters = document.querySelectorAll('.stat-num[data-target]');

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target);
    const suffix  = el.dataset.suffix || '';
    const duration = 1200;
    const step    = 16;
    const increment = target / (duration / step);
    let current   = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));


  /* ------------------------------------------
     5. BACK TO TOP
  ------------------------------------------ */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ------------------------------------------
     6. MENU CLICK (TOAST)
  ------------------------------------------ */
  const menuCards = document.querySelectorAll('.menu-card');
  const toast     = document.getElementById('toast');
  let toastTimer;

  const messages = {
    'Balado': '🌶️ Balado dipilih! Hubungi kami untuk order ya~',
    'Keju':   '🧀 Keju dipilih! Segera chat kami via WhatsApp!',
    'BBQ':    '🥩 BBQ dipilih! Yuk order sekarang lewat WA!',
  };

  menuCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.menu-card-name').textContent.trim();
      showToast(messages[name] || `🍟 ${name} dipilih!`);
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }


  /* ------------------------------------------
     7. SMOOTH SCROLL (FIX ANCHOR)
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });

      // FIX: trigger reveal setelah scroll
      setTimeout(showVisibleReveals, 300);
    });
  });

});