document.addEventListener('DOMContentLoaded', () => {

    /* ========== NAVBAR SCROLL ========== */
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    /* ========== PORTAL CAROUSEL ========== */
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const portalBtns = document.querySelectorAll('.portal-btn');

    if (track && prevBtn && nextBtn) {
        const scrollAmount = 210;

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        portalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                const section = document.getElementById(target);
                if (section) {
                    const offset = 80;
                    const top = section.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }

    /* ========== INTERSECTION OBSERVER ========== */
    const mythSections = document.querySelectorAll('.myth-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const bg = entry.target.querySelector('.myth-bg img');
                if (bg) {
                    bg.style.transform = 'scale(1)';
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    mythSections.forEach(section => observer.observe(section));

    /* ========== NAV SCROLL SPY ========== */
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${id}`
                        ? '#d4af37'
                        : 'rgba(255, 255, 255, 0.7)';
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

    /* ========== PARALLAX HERO ========== */
    const hero = document.getElementById('hero');
    const heroContent = hero?.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
        });
    }
});
