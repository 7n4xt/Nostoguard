// Vérification de la connexion
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script connecté et fonctionnel !');
    initializeWebsite();

    const marquee = document.querySelector('.animate-marquee');

    if (marquee) {
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });

        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });
    }
});

// Fonction principale d'initialisation
function initializeWebsite() {
    initScrollProgress();
    initSmoothScroll();
    initFormHandling();
    initAnimations();
    initScrollArrow();
}

// Barre de progression du scroll
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Défilement fluide
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Gestion du formulaire
function initFormHandling() {
    const form = document.getElementById('contactForm');

    // Animation des labels
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement?.querySelector('label')?.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement?.querySelector('label')?.classList.remove('active');
            }
        });
    });

    // Soumission du formulaire
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            company: document.getElementById('company')?.value,
            email: document.getElementById('email')?.value,
            message: document.getElementById('message')?.value
        };
        console.log('Données du formulaire :', formData);
        // Ici vous pouvez ajouter votre logique d'envoi de formulaire
        alert('Message envoyé avec succès !');
        form.reset();
    });
}

// Animations
function initAnimations() {
    // Observer pour les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, { threshold: 0.1 });

    // Éléments à observer
    document.querySelectorAll('.service-card, .team-card, .section-title').forEach(el => {
        observer.observe(el);
    });

    // Animation de la sphère cyber
    window.addEventListener('scroll', () => {
        const sphere = document.querySelector('.cyber-sphere');
        if (sphere) {
            const scrolled = window.pageYOffset;
            sphere.style.transform = `translateY(${scrolled * 0.5}px) rotate(${scrolled * 0.2}deg)`;
        }
    });
}

// Flèche de défilement
function initScrollArrow() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            // Scroll to the section right after the hero
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // If services section doesn't exist, just scroll down by the viewport height
                window.scrollBy({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
}