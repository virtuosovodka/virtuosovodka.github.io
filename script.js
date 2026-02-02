// ====== Navigation Toggle ======
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ====== Navbar Scroll Effect ======
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ====== Smooth Scroll for Navigation Links ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====== Intersection Observer for Animations ======
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to sections and cards
document.querySelectorAll('.section, .timeline-item, .community-card, .education-card, .award-card').forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
});

// Add CSS for fade-in animation dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }

    .timeline-item.fade-in {
        transition-delay: calc(var(--item-index, 0) * 0.1s);
    }
`;
document.head.appendChild(style);

// Set staggered animation delay for timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.setProperty('--item-index', index);
});

// ====== Active Navigation Link Highlight ======
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ====== Parallax Effect for Floating Shapes ======
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            document.querySelectorAll('.shape').forEach((shape, index) => {
                const speed = (index + 1) * 0.02;
                shape.style.transform = `translateY(${scrollY * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// ====== Typing Effect for Hero (Optional Enhancement) ======
// This can be enabled if you want a typing animation for titles

// ====== Console Easter Egg ======
console.log('%cHey there! 👋', 'font-size: 24px; font-weight: bold; color: #ec407a;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #42a5f5;');
console.log('%cFeel free to reach out: vedikasheth.18@gmail.com', 'font-size: 12px; color: #757575;');
