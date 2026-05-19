// =========================
// REVATHIPRIYA PORTFOLIO JS
// =========================

// Smooth Scroll
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (!href || href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar Effect
const navbar = document.querySelector('.navbar');

function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.8)';
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// Scroll Animation
const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .about-box, .timeline-item, .contact-card, .contact-form'
);

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => observer.observe(el));
} else {
    animatedElements.forEach(el => el.classList.add('show'));
}

// Typing Effect
const roles = [
    'AWS Cloud App Developer Intern',
    'Aspiring Entry-Level Cloud Engineer',
    'AWS Certified Cloud Practitioner',
    'Cloud Security & Monitoring Learner',
    'Cloud Infrastructure Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
const roleElement = document.querySelector('.hero-left h2');

function typeEffect() {
    if (!roleElement) return;

    if (charIndex < roles[roleIndex].length) {
        roleElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 90);
    } else {
        setTimeout(eraseEffect, 1800);
    }
}

function eraseEffect() {
    if (!roleElement) return;

    if (charIndex > 0) {
        roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 45);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 400);
    }
}

if (roleElement) {
    roleElement.textContent = '';
    typeEffect();
}

// Contact Form - opens user's email app with the message
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href = `mailto:revathichellapandiyan@gmail.com?subject=${subject}&body=${body}`;
        contactForm.reset();
    });
}

// Floating Profile Card Effect
const profileCard = document.querySelector('.profile-card');

window.addEventListener('mousemove', (e) => {
    if (!profileCard) return;

    const x = (window.innerWidth / 2 - e.pageX) / 35;
    const y = (window.innerHeight / 2 - e.pageY) / 35;

    profileCard.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

window.addEventListener('mouseleave', () => {
    if (!profileCard) return;
    profileCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

// Active Navbar Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 220) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Console Message
console.log(
    '%cWelcome to Revathipriya C AWS Cloud Portfolio 🚀',
    'color:#00c6ff;font-size:20px;font-weight:bold;'
);
