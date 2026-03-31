/* ========================================
   Valcrest — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollAnimations();
  initNavScroll();
  initHamburger();
  initPageTransitions();
  initContactForm();
});

/* --- Custom Cursor (Desktop Only) --- */
function initCustomCursor() {
  if (window.innerWidth <= 1024) return;

  document.body.style.cursor = 'none';

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  dot.style.display = 'block';
  ring.style.display = 'block';

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = document.querySelectorAll('a, button, .btn, [role="button"]');
  hoverTargets.forEach((el) => {
    el.style.cursor = 'none';
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* --- Scroll Animations (IntersectionObserver) --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* --- Nav Scroll Change --- */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* --- Hamburger Menu --- */
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.nav-overlay');
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Contact Form Validation --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.form-group').forEach((group) => {
      group.classList.remove('error');
      group.querySelector('.form-error') && (group.querySelector('.form-error').textContent = '');
    });

    // Validate name
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
      showError(name, 'お名前を入力してください');
      isValid = false;
    }

    // Validate email
    const email = form.querySelector('#email');
    if (!email.value.trim()) {
      showError(email, 'メールアドレスを入力してください');
      isValid = false;
    } else if (!email.value.includes('@')) {
      showError(email, '正しいメールアドレスを入力してください');
      isValid = false;
    }

    // Validate message
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
      showError(message, 'メッセージを入力してください');
      isValid = false;
    }

    if (isValid) {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }
  });

  function showError(input, msg) {
    const group = input.closest('.form-group');
    group.classList.add('error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = msg;
  }
}

/* --- Page Transitions --- */
function initPageTransitions() {
  const transition = document.getElementById('page-transition');
  if (!transition) return;

  const internalLinks = document.querySelectorAll('a[href]');
  internalLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !href.startsWith('mailto:') &&
      !link.hasAttribute('target')
    ) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        transition.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    }
  });
}
