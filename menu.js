const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('arai-expanded') === 'true';

    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');

    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

let navOverlay = null;

function createOverlay() {
    if (!navOveray) {
        navOveraly = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        navOverlay.style.sccText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        `;
        document.body.appendChild(navOverlay);
        
        navOverlay.addEventListener('click', toggleMenu);
    }
    return navOverlay;
}

menuToggle.addEventListener('click', () => {
    toggleMenu();

    const overlay = createOverlay();
    if (mainNav.classList.contains('active')) {
        overlay.style.display = 'block';
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
    } else {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
});

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
            toggleMenu();
            if (navOverlay) {
                navOverlay.style.opacity = '0';
                setTimeout(() => {
                    navOverlay.style.display = 'none';
                }, 300);
            }
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        toggleMenu();
        if (navOverlay) {
            navOverlay.style.display = 'none';
        }
    }
});

const scrollTopButton = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('DOMContentLoaded', () => {
    createOverlay();
});