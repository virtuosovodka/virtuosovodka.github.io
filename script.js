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

// ====== Flowing Scroll Animations ======
const flowElements = document.querySelectorAll('.section, .timeline-item, .community-card, .education-card, .award-card, .hero-card, .skill-tag, .contact-card');

// Create intersection observer for reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
});

flowElements.forEach(el => {
    el.classList.add('flow-element');
    revealObserver.observe(el);
});

// ====== Parallax Scrolling Effects ======
let ticking = false;

// Check if device is mobile/small screen
function isMobile() {
    return window.innerWidth <= 968;
}

function updateParallax() {
    // Disable parallax on mobile to prevent overlap issues
    if (isMobile()) {
        return;
    }

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Parallax for floating shapes - they move at different speeds
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speeds = [0.03, -0.02, 0.04, -0.03, 0.025];
        const speed = speeds[index] || 0.02;
        const yOffset = scrollY * speed;
        const rotation = scrollY * 0.01 * (index % 2 === 0 ? 1 : -1);
        shape.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
    });

    // Parallax for hero section elements
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroText = document.querySelector('.hero-text');
        const heroCard = document.querySelector('.hero-card');

        if (heroText && scrollY < windowHeight) {
            const opacity = 1 - (scrollY / windowHeight) * 0.8;
            const translateY = scrollY * 0.3;
            heroText.style.transform = `translateY(${translateY}px)`;
            heroText.style.opacity = Math.max(0, opacity);
        }

        if (heroCard && scrollY < windowHeight) {
            const translateY = scrollY * 0.15;
            const scale = 1 - (scrollY / windowHeight) * 0.1;
            heroCard.style.transform = `translateY(${translateY}px) scale(${Math.max(0.9, scale)})`;
        }
    }

    // Flowing parallax for sections - subtle vertical shift based on scroll position
    document.querySelectorAll('.section').forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        const viewportMiddle = windowHeight / 2;
        const distance = (sectionMiddle - viewportMiddle) / windowHeight;

        // Subtle transform based on how far from center the section is
        const translateY = distance * 20;
        section.style.setProperty('--parallax-y', `${translateY}px`);
    });

    // Timeline items get a subtle stagger effect
    document.querySelectorAll('.timeline-content').forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = 1 - (rect.top / windowHeight);
            const translateX = Math.max(0, (1 - progress) * 30);
            item.style.transform = `translateX(${translateX}px)`;
        }
    });
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial call
updateParallax();

// ====== Smooth Color Gradient on Scroll ======
function updateGradientOnScroll() {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const hueShift = scrollPercent * 20; // Subtle hue shift as you scroll

    document.documentElement.style.setProperty('--scroll-hue', hueShift);
}

window.addEventListener('scroll', updateGradientOnScroll);

// ====== Staggered Animation for Skill Tags ======
document.querySelectorAll('.skill-tags').forEach(container => {
    const tags = container.querySelectorAll('.skill-tag');
    tags.forEach((tag, index) => {
        tag.style.setProperty('--tag-index', index);
    });
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

// ====== Mouse Move Parallax for Hero ======
const heroSection = document.querySelector('.hero');
if (heroSection && !isMobile()) {
    heroSection.addEventListener('mousemove', (e) => {
        if (isMobile()) return; // Double check on each event

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        const heroCard = document.querySelector('.hero-card');
        if (heroCard) {
            heroCard.style.transform = `
                perspective(1000px)
                rotateY(${xPercent * 5}deg)
                rotateX(${-yPercent * 5}deg)
                translateZ(10px)
            `;
        }

        // Move shapes slightly with mouse
        document.querySelectorAll('.shape').forEach((shape, index) => {
            const factor = (index + 1) * 5;
            shape.style.marginLeft = `${xPercent * factor}px`;
            shape.style.marginTop = `${yPercent * factor}px`;
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        const heroCard = document.querySelector('.hero-card');
        if (heroCard) {
            heroCard.style.transform = '';
        }
    });
}

// ====== Popup Modal System ======
const popupOverlay = document.getElementById('popupOverlay');
const popupModal = document.getElementById('popupModal');
const popupContent = document.getElementById('popupContent');
const popupClose = document.getElementById('popupClose');

// Popup content data
const popupData = {
    reviewer: {
        title: 'My Reviews',
        subtitle: 'Check out my book and product reviews on these platforms:',
        links: [
            {
                icon: 'amazon',
                iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.566-.549.58l-3.061-.331c-.259-.056-.548-.266-.472-.66C6.009 1.626 8.821.5 11.391.5c1.318 0 3.037.35 4.075 1.345C16.61 2.89 16.5 4.501 16.5 5.935v5.378c0 1.615.67 2.323 1.3 3.194.222.309.271.678-.009.906-.699.583-1.946 1.667-2.634 2.274l-.013.108z"/>
                    <path d="M20.176 19.396c-2.803 2.07-6.867 3.168-10.367 3.168-4.905 0-9.32-1.812-12.663-4.83-.262-.237-.028-.561.287-.377 3.607 2.097 8.068 3.359 12.671 3.359 3.107 0 6.523-.645 9.667-1.978.474-.204.871.311.405.658z"/>
                </svg>`,
                title: 'Amazon Reviews',
                desc: 'Vine Voice member with 750+ reviews',
                url: 'https://www.amazon.com/gp/profile/amzn1.account.AHIFHL3HXCHDTHWNTVL4RWRCRIXQ'
            },
            {
                icon: 'goodreads',
                iconSvg: `<img src="goodreads_com_logo.jpeg" alt="Goodreads" class="popup-logo-img">`,
                title: 'Goodreads',
                desc: 'Book reviews and reading lists',
                url: 'https://www.goodreads.com/user/show/118896723-chicken'
            }
        ]
    },
    vrgames: {
        title: 'VR Game Development',
        subtitle: 'Check out my VR games on GitHub:',
        links: [
            {
                icon: 'github',
                iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>`,
                title: 'Pizza Escape',
                desc: 'VR escape room pizza-themed adventure',
                url: 'https://github.com/virtuosovodka/PizzaEscape'
            },
            {
                icon: 'github',
                iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>`,
                title: 'Cake Game',
                desc: 'VR interactive cake-making experience',
                url: 'https://github.com/virtuosovodka/Cake-Game'
            }
        ]
    },
    supercomputer: {
        title: 'Spectater Project',
        subtitle: 'View the live application:',
        links: [
            {
                icon: 'spectater',
                iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                    <path d="M6 8h.01M9 8h.01M6 11h.01M9 11h.01M12 8h8M12 11h8"></path>
                </svg>`,
                title: 'Spectater Live',
                desc: 'COI compliance analysis tool at OSU',
                url: 'https://spectater.arcs.oregonstate.edu/'
            }
        ]
    }
};

// Open popup
function openPopup(popupId) {
    const data = popupData[popupId];
    if (!data) return;

    let linksHtml = data.links.map(link => `
        <a href="${link.url}" target="_blank" class="popup-link">
            <div class="popup-link-icon ${link.icon}">
                ${link.iconSvg}
            </div>
            <div class="popup-link-text">
                <div class="popup-link-title">${link.title}</div>
                <div class="popup-link-desc">${link.desc}</div>
            </div>
        </a>
    `).join('');

    popupContent.innerHTML = `
        <h3 class="popup-title">${data.title}</h3>
        <p class="popup-subtitle">${data.subtitle}</p>
        <div class="popup-links">
            ${linksHtml}
        </div>
    `;

    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close popup
function closePopup() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for popup
if (popupClose) {
    popupClose.addEventListener('click', closePopup);
}

if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
}

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Clickable cards
document.querySelectorAll('.clickable-card').forEach(card => {
    card.addEventListener('click', () => {
        const popupId = card.dataset.popup;
        if (popupId) {
            openPopup(popupId);
        }
    });
});

// ====== Back to Top Button ======
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====== Scroll Indicator Click ======
const scrollIndicator = document.getElementById('scrollIndicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    // Also handle keyboard accessibility
    scrollIndicator.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
}

// ====== Console Easter Egg ======
console.log('%cHey there!', 'font-size: 24px; font-weight: bold; color: #993955;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #0B5563;');
console.log('%cFeel free to reach out: vedikasheth.18@gmail.com', 'font-size: 12px; color: #757575;');
