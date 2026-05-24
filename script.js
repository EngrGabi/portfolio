const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .achievement-item, .training-item, .education-card').forEach(el => {
    observer.observe(el);
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const mailtoLink = `mailto:christiankerbyg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        window.location.href = mailtoLink;

        alert('Opening your email client to send the message...');
        
        contactForm.reset();
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const revealElements = document.querySelectorAll('.education-card, .achievement-item, .skill-card, .experience-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight * 0.85) {
            element.style.animation = 'fadeIn 0.6s ease forwards';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const animateCounter = (element, target, duration = 1000) => {
    const start = 0;
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    };
    
    requestAnimationFrame(updateCount);
};

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

function printCV() {
    window.print();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard: ' + text);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

const activeSection = () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', activeSection);

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateForm = () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name) {
        alert('Please enter your name');
        return false;
    }
    
    if (!email || !validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!subject) {
        alert('Please enter a subject');
        return false;
    }
    
    if (!message) {
        alert('Please enter a message');
        return false;
    }
    
    return true;
};

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            activeSection();
            ticking = false;
        });
        ticking = true;
    }
});

console.log('%c👋 Welcome to Christian Kerby A. Gabi\'s Portfolio!', 'font-size: 20px; color: #2563eb; font-weight: bold;');
console.log('%cFeel free to contact me at: christiankerbyg@gmail.com', 'font-size: 14px; color: #ec4899;');
console.log('%cPhone: 0976-006-2031', 'font-size: 14px; color: #2563eb;');
console.log('%cGitHub: https://github.com/EngrGabi', 'font-size: 14px; color: #10b981;');