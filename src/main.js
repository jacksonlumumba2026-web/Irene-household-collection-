// gsap, ScrollTrigger, TextPlugin loaded globally from CDN
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* =============================================
   PRELOADER
   ============================================= */
function initPreloader() {
  const tl = gsap.timeline({
    onComplete: () => {
      document.getElementById('preloader').style.display = 'none';
      initHeroAnimation();
    }
  });

  tl.to('.preloader__logo', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .to('.preloader__bar span', {
    width: '100%',
    duration: 1.2,
    ease: 'power2.inOut'
  }, '-=0.2')
  .to('#preloader', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut'
  }, '+=0.2');
}

/* =============================================
   CUSTOM CURSOR
   ============================================= */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  gsap.set([cursor, follower], { opacity: 0 });

  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'none',
      opacity: 1
    });
    gsap.to(follower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.4,
      ease: 'power2.out',
      opacity: 1
    });
  });

  // Cursor hover states
  const hoverTargets = document.querySelectorAll('a, button, .collection-card, .product-card, .nav__link');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, { scale: 1.8, borderColor: 'var(--gold)', duration: 0.3 });
      gsap.to(cursor, { scale: 0.6, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(follower, { scale: 1, borderColor: 'var(--gold)', duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    });
  });
}

/* =============================================
   NAVIGATION
   ============================================= */
function initNav() {
  const nav = document.getElementById('nav');

  // Animate nav in
  gsap.from(nav, {
    y: -80,
    opacity: 0,
    duration: 1,
    delay: 2.8,
    ease: 'power3.out'
  });

  // Scroll behavior
  ScrollTrigger.create({
    start: 'top -80',
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled')
  });
}

/* =============================================
   HERO ANIMATION
   ============================================= */
function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Stagger the title lines
  tl.from('.hero__title-line', {
    y: '100%',
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power4.out'
  })
  .to('.hero__tag', {
    opacity: 1,
    y: 0,
    duration: 0.7,
  }, '-=0.5')
  .to('.hero__desc', {
    opacity: 1,
    y: 0,
    duration: 0.7,
  }, '-=0.4')
  .to('.hero__cta', {
    opacity: 1,
    y: 0,
    duration: 0.7,
  }, '-=0.3')
  .to('.hero__product-card', {
    opacity: 1,
    x: 0,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.6')
  .to('.hero__floating-badge--1', {
    opacity: 1,
    x: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.3')
  .to('.hero__floating-badge--2', {
    opacity: 1,
    x: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.4')
  .to('.hero__scroll-hint', {
    opacity: 1,
    duration: 0.5
  }, '-=0.2');

  // Hero background shapes floating animation
  gsap.to('.hero__bg-shape--1', {
    x: 20, y: -20,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  gsap.to('.hero__bg-shape--2', {
    x: -15, y: 25,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  gsap.to('.hero__bg-shape--3', {
    x: 10, y: -15,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Continuous product card subtle float
  gsap.to('.hero__product-card', {
    y: -10,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1
  });
}

/* =============================================
   SCROLL ANIMATIONS
   ============================================= */
function initScrollAnimations() {

  // --- Collections ---
  gsap.from('.section-header .section-tag', {
    scrollTrigger: { trigger: '.section-header', start: 'top 85%' },
    opacity: 0, y: 20, duration: 0.6, stagger: 0.1
  });

  gsap.from('.section-header .section-title', {
    scrollTrigger: { trigger: '.section-header', start: 'top 85%' },
    opacity: 0, y: 30, duration: 0.7, delay: 0.1
  });

  gsap.from('.section-header .section-desc', {
    scrollTrigger: { trigger: '.section-header', start: 'top 85%' },
    opacity: 0, y: 20, duration: 0.6, delay: 0.2
  });

  // Collection cards stagger
  gsap.from('.collection-card', {
    scrollTrigger: {
      trigger: '.collections__grid',
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    scale: 0.96,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out'
  });

  // --- Products ---
  document.querySelectorAll('.product-card').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  // --- About ---
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%',
    }
  });

  aboutTl
    .from('.about__img-block--1', {
      opacity: 0, x: -40, duration: 0.8, ease: 'power3.out'
    })
    .from('.about__img-block--2', {
      opacity: 0, x: 40, duration: 0.8, ease: 'power3.out'
    }, '-=0.5')
    .from('.about__stat-card', {
      opacity: 0, scale: 0.8, duration: 0.6, ease: 'back.out(1.7)'
    }, '-=0.3')
    .from('.about__content .section-tag', {
      opacity: 0, y: 20, duration: 0.5
    }, '-=0.5')
    .from('.about__content .section-title', {
      opacity: 0, y: 30, duration: 0.6
    }, '-=0.3')
    .from('.about__text', {
      opacity: 0, y: 20, duration: 0.5, stagger: 0.15
    }, '-=0.3')
    .from('.about__value', {
      opacity: 0, x: -20, duration: 0.5, stagger: 0.1, ease: 'power2.out'
    }, '-=0.2')
    .from('.about .btn', {
      opacity: 0, y: 20, duration: 0.5
    }, '-=0.2');

  // --- Stats counter ---
  document.querySelectorAll('.stat-item__num').forEach(el => {
    const target = parseInt(el.dataset.target);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(parseFloat(el.textContent)).toLocaleString();
          }
        });
      }
    });
  });

  gsap.from('.stat-item', {
    scrollTrigger: {
      trigger: '.stats',
      start: 'top 80%'
    },
    opacity: 0,
    y: 40,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // --- Newsletter ---
  const newsletterTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.newsletter',
      start: 'top 75%'
    }
  });

  newsletterTl
    .from('.newsletter .section-tag', { opacity: 0, y: 20, duration: 0.5 })
    .from('.newsletter .section-title', { opacity: 0, y: 30, duration: 0.6 }, '-=0.2')
    .from('.newsletter__desc', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
    .from('.newsletter__form', { opacity: 0, y: 20, duration: 0.5, scale: 0.98 }, '-=0.2')
    .from('.newsletter__note', { opacity: 0, duration: 0.4 }, '-=0.1');

  // Newsletter shape pulse
  gsap.to('.newsletter__shape', {
    scale: 1.2,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // --- Footer ---
  gsap.from('.footer__brand, .footer__links-group', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%'
    },
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out'
  });
}

/* =============================================
   COLLECTION CARDS — HOVER PARALLAX
   ============================================= */
function initCardParallax() {
  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
        transformOrigin: 'center center'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    });
  });
}

/* =============================================
   NEWSLETTER FORM
   ============================================= */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.textContent;

    gsap.to(btn, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        btn.textContent = 'Thank you! ✓';
        gsap.from(btn, { scale: 0.8, duration: 0.4, ease: 'back.out(2)' });
        setTimeout(() => {
          btn.textContent = originalText;
          form.reset();
        }, 3000);
      }
    });
  });
}

/* =============================================
   MAGNETIC BUTTONS
   ============================================= */
function initMagneticButtons() {
  document.querySelectorAll('.btn--primary, .nav__btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  gsap.set('.hero__title-line', { overflow: 'hidden' });
  gsap.set('.hero__floating-badge--1', { x: -40 });
  gsap.set('.hero__floating-badge--2', { x: 40 });
  gsap.set('.hero__product-card', { x: 60 });

  initPreloader();
  initCursor();
  initNav();
  initScrollAnimations();
  initCardParallax();
  initNewsletter();
  initMagneticButtons();
});
