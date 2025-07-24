// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const mainSite = document.getElementById('mainSite');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Animation elements
const floatingHearts = document.getElementById('floatingHearts');
const rosePetals = document.getElementById('rosePetals');
const sparkles = document.getElementById('sparkles');

// Login credentials (frontend simulation)
const validCredentials = {
    username: '20052007',
    password: 'november30'
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createRosePetals();
    createSparkles();
    setupScrollAnimations();
    setupSmoothScrolling();
    initializeLoveCarousel();
});

// Login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === validCredentials.username && password === validCredentials.password) {
        // Successful login
        loginContainer.classList.add('hidden');
        
        setTimeout(() => {
            mainSite.classList.add('visible');
        }, 800);
    } else {
        // Invalid credentials
        errorMessage.classList.add('show');
        
        // Shake the form
        loginForm.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            errorMessage.classList.remove('show');
            loginForm.style.animation = '';
        }, 3000);
    }
});

// Love Carousel Functionality
let currentLoveIndex = 0;
let loveItems = [];
let autoSlideInterval;

function initializeLoveCarousel() {
    loveItems = document.querySelectorAll('.love-item');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!loveItems.length || !dotsContainer || !prevBtn || !nextBtn) {
        return; // Elements not found, exit gracefully
    }
    
    // Create dots
    loveItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToLoveSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Button event listeners
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        previousLoveSlide();
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextLoveSlide();
        startAutoSlide();
    });
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause on hover
    const carousel = document.getElementById('loveCarousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
}

function updateLoveCarousel() {
    const dots = document.querySelectorAll('.dot');
    
    loveItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');
        if (dots[index]) {
            dots[index].classList.remove('active');
        }
        
        if (index === currentLoveIndex) {
            item.classList.add('active');
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        } else if (index === (currentLoveIndex - 1 + loveItems.length) % loveItems.length) {
            item.classList.add('prev');
        } else if (index === (currentLoveIndex + 1) % loveItems.length) {
            item.classList.add('next');
        }
    });
    
    // Add romantic particle effect on slide change
    createLoveParticles();
}

function nextLoveSlide() {
    currentLoveIndex = (currentLoveIndex + 1) % loveItems.length;
    updateLoveCarousel();
}

function previousLoveSlide() {
    currentLoveIndex = (currentLoveIndex - 1 + loveItems.length) % loveItems.length;
    updateLoveCarousel();
}

function goToLoveSlide(index) {
    clearInterval(autoSlideInterval);
    currentLoveIndex = index;
    updateLoveCarousel();
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextLoveSlide, 4000);
}

function createLoveParticles() {
    const carousel = document.getElementById('loveCarousel');
    if (!carousel) return;
    
    const particles = ['💖', '💕', '💗', '💝', '💞', '💓', '✨', '🌟'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 10 + 15}px;
            pointer-events: none;
            z-index: 10;
            animation: loveParticleFloat 2s ease-out forwards;
        `;
        
        carousel.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Create floating hearts
function createFloatingHearts() {
    const hearts = ['💖', '💕', '💗', '💝', '💞', '💓'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        floatingHearts.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 2000);
}

// Create rose petals
function createRosePetals() {
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 3 + 6) + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        
        rosePetals.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 12000);
    }, 1500);
}

// Create sparkles
function createSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        
        sparkles.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }, 500);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    document.querySelectorAll('.story-content, .gallery-item, .poem, .love-quote, .romantic-story').forEach(el => {
        observer.observe(el);
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when main site becomes visible
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    
    // Observer to trigger typing when hero comes into view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeWriter(heroTitle, originalText, 150);
                }, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(heroTitle);
}

// Add interactive hover effects for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Add click effect for login button
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add romantic cursor trail effect
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', function(e) {
    cursorTrail.push({x: e.clientX, y: e.clientY});
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
    
    cursorTrail.forEach((point, index) => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: fixed;
            left: ${point.x}px;
            top: ${point.y}px;
            pointer-events: none;
            z-index: 9999;
            font-size: ${12 - index}px;
            opacity: ${(maxTrailLength - index) / maxTrailLength};
            animation: cursorTrailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    });
});

// CSS for cursor trail
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursorTrailFade {
        0% {
            transform: scale(1);
            opacity: 0.8;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Add romantic loading screen transition
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console message for developers
console.log(`
💖 Welcome to Love's Dream! 💖
Made with love and lots of CSS magic ✨
Login with: username: 'love', password: 'forever'
Enjoy the romantic experience! 💕
`);