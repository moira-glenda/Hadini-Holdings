// Initialize particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i += 1) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        particlesContainer.appendChild(particle);
    }
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.to('.hero-title', { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
    gsap.to('.hero-description', { opacity: 1, y: 0, duration: 0.8, delay: 0.6 });
    gsap.to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });

    gsap.to('.particle', {
        y: -100,
        duration: 10,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        yoyoEase: true
    });

    ['.service-card', '.step-card', '.why-card', '.faq-item'].forEach((selector) => {
        gsap.utils.toArray(selector).forEach((item, index) => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.7,
                delay: index * 0.08
            });
        });
    });

    gsap.to('.section-intro', {
        scrollTrigger: {
            trigger: '.section-intro',
            start: 'top 80%'
        },
        opacity: 1,
        y: 0,
        duration: 0.8
    });

    gsap.set('.faq-item', { opacity: 0, x: -24 });
    gsap.set('.service-card, .step-card, .why-card', { opacity: 0, y: 30 });
}

function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach((faq) => {
                faq.classList.remove('active');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3 });
        gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });

    document.addEventListener('mouseenter', () => {
        gsap.to(cursor, { opacity: 1 });
        gsap.to(cursorDot, { opacity: 1 });
    });

    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0 });
        gsap.to(cursorDot, { opacity: 0 });
    });

    const clickables = document.querySelectorAll('a, button, input, textarea');
    clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { width: 40, height: 40, backgroundColor: 'rgba(100, 255, 218, 0.1)' });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { width: 20, height: 20, backgroundColor: 'transparent' });
        });
    });
}

function initNavbar() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    mobileMenuToggle.addEventListener('click', function toggleMenu() {
        this.classList.toggle('active');
        navContainer.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    document.head.insertAdjacentHTML('beforeend', `
        <style>
            body.menu-open {
                overflow: hidden;
            }
        </style>
    `);
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initAnimations();
    initFaq();
    initCursor();
    initNavbar();
    initMobileMenu();
});
