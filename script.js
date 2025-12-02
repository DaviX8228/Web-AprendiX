// ============================================
// APRENDIX JAVASCRIPT
// Interacciones y animaciones
// ============================================

// ============ SMOOTH SCROLL PARA ENLACES ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ HEADER SCROLL EFFECT ============
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============ INTERSECTION OBSERVER PARA ANIMACIONES ============
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación de entrada a elementos
document.querySelectorAll('.stat-card, .why-card, .feature-row, .plan-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ============ ACTIVE NAV LINK AL HACER SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============ ANIMACIÓN DE NÚMEROS EN STATS ============
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (!isNaN(number)) {
                entry.target.textContent = '0';
                animateValue(entry.target, 0, number, 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number, .stat-big-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ============ EFECTO PARALLAX SUAVE EN HERO ============
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============ ANIMACIÓN DE HOVER EN BOTONES ============
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============ PHONE FRAMES INTERACCIÓN ============
const phoneFrames = document.querySelectorAll('.phone-frame');

phoneFrames.forEach((phone, index) => {
    phone.addEventListener('mouseenter', () => {
        phoneFrames.forEach((p, i) => {
            if (i !== index) {
                p.style.opacity = '0.85';
                p.style.filter = 'blur(1px)';
            }
        });
    });
    
    phone.addEventListener('mouseleave', () => {
        phoneFrames.forEach(p => {
            p.style.opacity = '1';
            p.style.filter = 'blur(0)';
        });
    });
});


// ============ LAZY LOADING PARA IMÁGENES ============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============ PREVENIR SCROLL HORIZONTAL ============
window.addEventListener('load', () => {
    document.body.style.overflowX = 'hidden';
});

// ============ DETECTAR MODO OSCURO DEL SISTEMA ============
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Modo oscuro detectado');
    // Aquí puedes agregar lógica para modo oscuro en el futuro
}

// ============ SMOOTH SCROLL POLYFILL PARA SAFARI ============
if (!('scrollBehavior' in document.documentElement.style)) {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============ PERFORMANCE: REDUCIR ANIMACIONES SI ES NECESARIO ============
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ============ ANALYTICS Y TRACKING (OPCIONAL) ============
function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // Aquí puedes integrar Google Analytics, Mixpanel, etc.
}

// Trackear clics en botones principales
document.querySelectorAll('.btn-primary, .btn-hero-primary, .btn-plan').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: btn.textContent,
            button_location: btn.closest('section')?.id || 'unknown'
        });
    });
});

// ============ INICIALIZACIÓN AL CARGAR ============
document.addEventListener('DOMContentLoaded', () => {
    console.log('AprendiX Website Loaded Successfully! 🚀');
    
    // Agregar clase loaded al body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Inicializar animaciones de entrada
    updateActiveNav();
});

// ============ MANEJO DE ERRORES DE IMÁGENES ============
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.error('Error loading image:', this.src);
        this.style.display = 'none';
    });
});

// ============ EASTER EGG (OPCIONAL - DIVERTIDO) ============
let clickCount = 0;
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            console.log('🎉 ¡Has descubierto un easter egg de AprendiX! ¡Sigue aprendiendo! 🚀');
            clickCount = 0;
        }
    });
}

// ============ SCROLL TO TOP (OPCIONAL) ============
let scrollToTopBtn;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.innerHTML = '↑';
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--amarillo), var(--naranja));
                color: white;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 4px 16px rgba(253, 185, 18, 0.3);
                transition: all 0.3s ease;
                z-index: 999;
            `;
            
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            scrollToTopBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 24px rgba(253, 185, 18, 0.4)';
            });
            
            scrollToTopBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 16px rgba(253, 185, 18, 0.3)';
            });
            
            document.body.appendChild(scrollToTopBtn);
        }
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'all';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
});

console.log('🎮 AprendiX - Aprende jugando con IA');
console.log('💻 Desarrollado por Valdav Software');
console.log('🚀 ¡Que comience el aprendizaje!');


// Header scroll y toggle

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    } else {
        header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Toggle menu hamburguesa
if (navToggle) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}