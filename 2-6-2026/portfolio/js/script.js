/* ===============================================
   PORTFOLIO JAVASCRIPT - GOPIKA K
   Interactivity and Dynamic Functionality
   =============================================== */

/**
 * SMOOTH SCROLLING & NAVIGATION HANDLING
 * Manages navigation links, smooth scrolling, and active states
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    /**
     * Update active navigation link based on scroll position
     */
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    /**
     * Smooth scroll to section when navigation link is clicked
     */
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                closeMenuIfOpen();
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                updateActiveNavLink();
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial update
    updateActiveNavLink();
});

/**
 * MOBILE MENU FUNCTIONALITY
 * Handles hamburger menu toggle for mobile devices
 */
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    /**
     * Toggle mobile menu visibility
     */
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    /**
     * Close menu when a nav link is clicked
     */
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    /**
     * Close menu when clicking outside
     */
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

/**
 * Helper function to close menu if it's open
 */
function closeMenuIfOpen() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    
    if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
    }
}

/**
 * CONTACT FORM HANDLING
 * Manages form submission and validation
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !phone || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show success message (in production, this would send to a server)
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send the form data to a server here
        // Example: sendEmailToServer(name, email, subject, message);
    });
});

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification message to user
 * @param {string} message - Message to display
 * @param {string} type - 'success' or 'error'
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles to notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 90%;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification-animation]')) {
        style.setAttribute('data-notification-animation', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * SCROLL ANIMATIONS
 * Add animation effects when elements come into view
 */
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    /**
     * Callback for intersection observer
     */
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.interest-card, .project-card, .skill-category'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

/**
 * NAVBAR SHADOW ON SCROLL
 * Add shadow to navbar when page is scrolled
 */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

/**
 * DOWNLOAD RESUME
 * Handles resume download (placeholder functionality)
 */
document.addEventListener('DOMContentLoaded', function() {
    const resumeBtn = document.querySelector('[download]');
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            // In production, this would download an actual PDF
            // For now, show a notification
            if (!this.href.includes('http')) {
                e.preventDefault();
                showNotification('Resume file not found. Please update the resume path.', 'error');
            }
        });
    }
});

/**
 * KEYBOARD NAVIGATION
 * Support for keyboard navigation within the page
 */
document.addEventListener('keydown', function(e) {
    // Skip to main content on Alt+1
    if (e.altKey && e.key === '1') {
        document.getElementById('home').focus();
    }
    
    // Skip to navigation on Alt+0
    if (e.altKey && e.key === '0') {
        document.querySelector('.navbar').focus();
    }
});

/**
 * PERFORMANCE OPTIMIZATION
 * Lazy load images if supported
 */
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Image loading logic can be added here
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

/**
 * UTILITY: Log page load time
 */
window.addEventListener('load', function() {
    if (performance && performance.timing) {
        const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});

// ===============================================
// DEBUGGING & UTILITY
// ===============================================

/**
 * Console helper for testing
 */
const Portfolio = {
    version: '1.0.0',
    author: 'GOPIKA K',
    
    /**
     * Get information about all sections
     */
    getSections: function() {
        return document.querySelectorAll('section[id]');
    },
    
    /**
     * Scroll to a specific section
     */
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    /**
     * Get portfolio information
     */
    getInfo: function() {
        return {
            name: 'GOPIKA K',
            designation: 'AI & Data Analytics Enthusiast | Web Developer',
            sections: Array.from(this.getSections()).map(s => s.id)
        };
    }
};

// Make Portfolio object available in console for debugging
if (typeof window !== 'undefined') {
    window.Portfolio = Portfolio;
}

console.log(`Portfolio website loaded successfully! 
Use Portfolio.getInfo() for information, Portfolio.scrollToSection('section-id') to navigate.`);
