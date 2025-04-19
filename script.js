// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            purpose: formData.get('purpose'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        try {
            // You can replace this with your actual backend endpoint
            const response = await fetch('YOUR_BACKEND_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                this.reset();
            } else {
                showNotification('Failed to send message. Please try again or contact directly via email.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again or contact directly via email.', 'error');
        }
    });
}

// Skills Slider
const skillsSlider = document.querySelector('.skills-slider');
if (skillsSlider) {
    let currentIndex = 0;
    const skills = Array.from(skillsSlider.children);
    const totalSkills = skills.length;
    const skillsPerView = 3;

    function updateSlider() {
        skills.forEach((skill, index) => {
            skill.style.display = 'none';
        });

        for (let i = 0; i < skillsPerView; i++) {
            const index = (currentIndex + i) % totalSkills;
            skills[index].style.display = 'block';
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSkills;
        updateSlider();
    }

    // Initial display
    updateSlider();

    // Auto-rotate every 3 seconds
    setInterval(nextSlide, 3000);
}

// Recommendations Slider
const recommendationsSlider = document.querySelector('.recommendations-slider');
if (recommendationsSlider) {
    let currentIndex = 0;
    const recommendations = Array.from(recommendationsSlider.children);
    const totalRecommendations = recommendations.length;

    function updateRecommendations() {
        recommendations.forEach((rec, index) => {
            rec.style.display = 'none';
        });
        recommendations[currentIndex].style.display = 'block';
    }

    function nextRecommendation() {
        currentIndex = (currentIndex + 1) % totalRecommendations;
        updateRecommendations();
    }

    // Initial display
    updateRecommendations();

    // Auto-rotate every 5 seconds
    setInterval(nextRecommendation, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'var(--bg-color)';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
    }
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Typing effect for hero section
function setupTypingEffect() {
    const text = "Turning Ideas into Digital Reality";
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.textContent = '';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        
        type();
    }
}

// Page load animations
document.addEventListener('DOMContentLoaded', function() {
    setupTypingEffect();
    
    // Animate sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
}); 