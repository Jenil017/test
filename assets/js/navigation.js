/**
 * Supreme Thread - Navigation JavaScript
 * Handles mobile menu functionality for all pages
 */

// Initialize sticky header immediately
initStickyHeader();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize page-specific active menu item
    setActiveMenuItem();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (menuToggle && mobileMenu && mobileMenuClose && mobileMenuOverlay) {
        // Open mobile menu
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu on window resize if larger than mobile breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Function to close mobile menu
        function closeMobileMenu() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    } else {
        console.warn('Mobile menu elements not found');
    }
}

/**
 * Set active menu item based on current page
 */
function setActiveMenuItem() {
    // Get current page URL
    const currentUrl = window.location.pathname;
    const filename = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    
    // Set active class for desktop nav
    const desktopNavLinks = document.querySelectorAll('.nav-link');
    desktopNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === filename || (filename === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Set active class for mobile nav
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === filename || (filename === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize sticky header animation
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
    
    if (header) {
        // Add scrolled class to header when scrolling down
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
} 