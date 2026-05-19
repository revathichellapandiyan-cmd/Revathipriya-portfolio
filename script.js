/* ===========================
   HAMBURGER MENU TOGGLE
   =========================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.innerHTML = navLinks.classList.contains('open') ? '✕' : '&#9776;';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.innerHTML = '&#9776;';
  });
});

/* ===========================
   ACTIVE NAV LINK ON SCROLL
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
      });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));

/* ===========================
   SCROLL REVEAL ANIMATION
   =========================== */
const revealTargets = [
  '.skill-card',
  '.tl-item',
  '.project-card',
  '.cert-card',
  '.edu-item',
  '.contact-card',
  '.section-title',
  '.hero-content > *',
];

revealTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.classList.add('reveal');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===========================
   CLOUD DIAGRAM HOVER FX
   =========================== */
document.querySelectorAll('.cd-node:not(.cd-center)').forEach(node => {
  node.addEventListener('mouseenter', () => {
    document.querySelectorAll('.cd-lines line').forEach(l => {
      l.style.stroke = 'rgba(0,229,160,0.6)';
    });
  });
  node.addEventListener('mouseleave', () => {
    document.querySelectorAll('.cd-lines line').forEach(l => {
      l.style.stroke = '';
    });
  });
});

/* ===========================
   TYPING EFFECT FOR HERO TAGLINE
   =========================== */
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const text = tagline.textContent;
  tagline.textContent = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      tagline.textContent += text[i++];
      setTimeout(type, 38);
    }
  };
  setTimeout(type, 600);
}

/* ===========================
   SMOOTH SCROLL OFFSET FOR FIXED NAV
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
