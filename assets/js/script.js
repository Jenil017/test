/**
 * Supreme Thread - Main JavaScript
 * Author: Cascade AI
 * Created: April 17, 2025
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsapInit();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize gallery lightbox
    initGalleryLightbox();
    
    // Initialize form validation
    initFormValidation();
    
    // Remove preloader when everything is loaded
    initPreloader();
    
    // --- Product Carousel Swiper Initialization ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.product-swiper', {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            navigation: {
                nextEl: '.product-swiper .swiper-button-next',
                prevEl: '.product-swiper .swiper-button-prev',
            },
            pagination: {
                el: '.product-swiper .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                480: { slidesPerView: 1 },
                700: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
    // --- End Product Carousel Swiper Initialization ---

    // --- Product Carousel Active Slide Effects ---
    if (typeof Swiper !== 'undefined') {
        const productSwiper = document.querySelector('.product-carousel.swiper')?.swiper;
        if (productSwiper) {
            function updateActiveProductEffect() {
                document.querySelectorAll('.swiper-slide .product-card').forEach(card => {
                    card.classList.remove('active-center', 'side-fade');
                });
                const slides = document.querySelectorAll('.product-carousel .swiper-slide');
                slides.forEach((slide, idx) => {
                    const card = slide.querySelector('.product-card');
                    if (!card) return;
                    if (slide.classList.contains('swiper-slide-active')) {
                        card.classList.add('active-center');
                    } else if (slide.classList.contains('swiper-slide-next') || slide.classList.contains('swiper-slide-prev')) {
                        card.classList.add('side-fade');
                    }
                });
            }
            updateActiveProductEffect();
            productSwiper.on('slideChangeTransitionEnd', updateActiveProductEffect);
        }
    }
    // --- End Product Carousel Active Slide Effects ---
    
    // --- Why Choose Our Thread Marquee Scroll ---
    const marquee = document.getElementById('whyThreadMarquee');
    const leftBtn = document.querySelector('.feature-marquee-arrow-left');
    const rightBtn = document.querySelector('.feature-marquee-arrow-right');
    if (marquee && leftBtn && rightBtn) {
        leftBtn.addEventListener('click', function() {
            const block = marquee.querySelector('.feature-block');
            if (block) {
                marquee.scrollBy({ left: -(block.offsetWidth + 24), behavior: 'smooth' });
            }
        });
        rightBtn.addEventListener('click', function() {
            const block = marquee.querySelector('.feature-block');
            if (block) {
                marquee.scrollBy({ left: block.offsetWidth + 24, behavior: 'smooth' });
            }
        });
    }
    // --- End Why Choose Our Thread Marquee Scroll ---
    
    // Animated Counter for Fact Cards
    function animateCounter(element, target, duration = 1400) {
        let start = 0;
        let end = parseFloat(target);
        let isFloat = target.toString().includes('.') || target > 1000;
        let decimals = isFloat ? 1 : 0;
        let range = end - start;
        let minTimer = 30;
        let stepTime = Math.max(Math.floor(duration / range), minTimer);
        let startTime = null;
        function updateCounter(ts) {
            if (!startTime) startTime = ts;
            let progress = Math.min((ts - startTime) / duration, 1);
            let value = start + range * progress;
            element.textContent = value.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
            }
        }
        requestAnimationFrame(updateCounter);
    }

    function runCountersOnView() {
        const counters = document.querySelectorAll('.counter-outline');
        let triggered = false;
        function onScroll() {
            if (triggered) return;
            counters.forEach(counter => {
                const rect = counter.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    animateCounter(counter, counter.getAttribute('data-target'));
                    triggered = true;
                }
            });
        }
        window.addEventListener('scroll', onScroll);
        onScroll();
    }

    runCountersOnView();
    
    // GSAP animation for headline and underline (adjusted for new structure)
    if (window.gsap) {
        ['productsHeading', 'whyThreadsHeading'].forEach(function(id, i) {
            var heading = document.getElementById(id);
            if (heading) {
                var textSpan = heading.querySelector('.headline-text');
                var underline = heading.querySelector('.headline-underline');
                gsap.from(textSpan, {
                    opacity: 0,
                    y: 40,
                    scale: 0.92,
                    duration: 1.1,
                    ease: 'power3.out',
                    delay: 0.1 + i * 0.3
                });
                gsap.to(underline, {
                    scaleX: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: 0.5 + i * 0.3
                });
            }
        });
    }
});

// Wait for all content to be loaded
window.addEventListener('load', function() {
    // Hide preloader
    document.querySelector('.preloader').classList.add('hide');
});

/**
 * Initialize GSAP animations
 */
function gsapInit() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded');
        return;
    }
    
    // Register ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Hero animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle && heroSubtitle && heroButtons) {
        const heroTl = gsap.timeline();
        
        heroTl.fromTo(heroTitle, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(heroSubtitle, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
            "-=0.5"
        )
        .fromTo(heroButtons, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
            "-=0.5"
        );
    }
    
    // Section animations with ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        // Animate section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title, 
                { y: 30, opacity: 0 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        
        // Animate product cards
        gsap.utils.toArray('.product-card').forEach((card, i) => {
            gsap.fromTo(card, 
                { y: 30, opacity: 0 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6, 
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        
        // Animate process steps
        gsap.utils.toArray('.process-step').forEach((step, i) => {
            gsap.fromTo(step, 
                { y: 30, opacity: 0 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6, 
                    delay: i * 0.2,
                    scrollTrigger: {
                        trigger: step,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        
        // Animate industry cards
        gsap.utils.toArray('.industry-card').forEach((card, i) => {
            gsap.fromTo(card, 
                { y: 30, opacity: 0 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6, 
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        
        // Animate gallery items
        gsap.utils.toArray('.gallery-item').forEach((item, i) => {
            gsap.fromTo(item, 
                { scale: 0.8, opacity: 0 }, 
                { 
                    scale: 1, 
                    opacity: 1, 
                    duration: 0.6, 
                    delay: i * 0.05,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        
        // Animate testimonial slides
        gsap.utils.toArray('.testimonial-slide').forEach((slide) => {
            gsap.fromTo(slide, 
                { y: 30, opacity: 0 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: slide,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize gallery lightbox
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Support both .gallery-image and direct <img> tags for new gallery
                let imgEl = this.querySelector('.gallery-image') || this.querySelector('img');
                if (!imgEl) return;
                const imgSrc = imgEl.getAttribute('src');
                if (!imgSrc) return;
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                
                // Create lightbox content
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${imgSrc}" class="lightbox-image">
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Animate lightbox with GSAP if available
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(lightbox, 
                        { opacity: 0 }, 
                        { opacity: 1, duration: 0.3 }
                    );
                    gsap.fromTo(lightbox.querySelector('.lightbox-content'), 
                        { scale: 0.8, opacity: 0 }, 
                        { scale: 1, opacity: 1, duration: 0.5, delay: 0.1 }
                    );
                }
                
                // Close lightbox on click
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                        if (typeof gsap !== 'undefined') {
                            gsap.to(lightbox, { 
                                opacity: 0, 
                                duration: 0.3,
                                onComplete: function() {
                                    lightbox.remove();
                                    document.body.style.overflow = '';
                                }
                            });
                        } else {
                            lightbox.remove();
                            document.body.style.overflow = '';
                        }
                    }
                });
            });
        });
    }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            
            // Clear previous error messages
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.remove());
            
            // Validate name
            const nameInput = contactForm.querySelector('input[name="name"]');
            if (nameInput && nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                valid = false;
            }
            
            // Validate email
            const emailInput = contactForm.querySelector('input[name="email"]');
            if (emailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    showError(emailInput, 'Please enter a valid email address');
                    valid = false;
                }
            }
            
            // Validate message
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            if (messageInput && messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message');
                valid = false;
            }
            
            // If form is not valid, prevent submission
            if (!valid) {
                e.preventDefault();
            }
        });
        
        // Function to show error message
        function showError(input, message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = 'var(--font-size-sm)';
            errorDiv.style.marginTop = 'var(--spacing-xs)';
            errorDiv.textContent = message;
            
            input.parentNode.appendChild(errorDiv);
            
            // Highlight input
            input.style.borderColor = 'red';
            
            // Remove error state on input change
            input.addEventListener('input', function() {
                input.style.borderColor = '';
                const error = input.parentNode.querySelector('.error-message');
                if (error) {
                    error.remove();
                }
            });
        }
    }
}

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Debug: Log when preloader script runs
        console.log('[Preloader] initPreloader called');
        if (document.readyState === 'complete') {
            preloader.classList.add('hide');
        } else {
            window.addEventListener('load', function() {
                preloader.classList.add('hide');
                console.log('[Preloader] window loaded, preloader hidden');
            });
            // Fallback: Always hide preloader after 3 seconds (in case of JS errors or mobile issues)
            setTimeout(function() {
                preloader.classList.add('hide');
                console.log('[Preloader] Fallback timeout, preloader hidden');
            }, 3000);
        }
    } else {
        console.warn('[Preloader] .preloader element not found');
    }
}

// Initialize Swiper if it exists (for testimonials and other sliders)
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        // Testimonials slider
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }
}

// Initialize on page load
if (document.readyState !== 'loading') {
    initSwiper();
} else {
    document.addEventListener('DOMContentLoaded', initSwiper);
}
// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

