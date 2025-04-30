/**
 * New Product Section - JavaScript Functionality
 * Enhanced for mobile touch devices
 */
window.onload = function() {
    console.log("Window fully loaded - product-redesign.js running");

    // Select all filter buttons and product cards
    var filterButtons = document.querySelectorAll('.filter-btn');
    var productCards = document.querySelectorAll('.product-card-new');
    
    console.log("Found " + filterButtons.length + " filter buttons");
    console.log("Found " + productCards.length + " product cards");
    
    // Detect if device is touch-capable
    var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    console.log("Is touch device: " + isTouchDevice);
    
    // If it's a touch device, add a class to the body for CSS targeting
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // Make sure we found elements before proceeding
    if (filterButtons.length > 0 && productCards.length > 0) {
        
        // Show all products initially by removing 'hidden' class
        for (var i = 0; i < productCards.length; i++) {
            productCards[i].classList.remove('hidden');
            productCards[i].style.display = 'flex';
        }
        
        // Set "All Products" button as active initially
        for (var i = 0; i < filterButtons.length; i++) {
            if (filterButtons[i].getAttribute('data-filter') === 'all') {
                filterButtons[i].classList.add('active');
            } else {
                filterButtons[i].classList.remove('active');
            }
        }
        
        // Add click event listeners to each filter button
        for (var i = 0; i < filterButtons.length; i++) {
            filterButtons[i].addEventListener('click', function() {
                
                var selectedFilter = this.getAttribute('data-filter');
                console.log("Filter clicked: " + selectedFilter);
                
                // Update active button
                for (var j = 0; j < filterButtons.length; j++) {
                    filterButtons[j].classList.remove('active');
                }
                this.classList.add('active');
                
                // Show/hide products based on selected filter
                for (var k = 0; k < productCards.length; k++) {
                    var productCategory = productCards[k].getAttribute('data-category');
                    console.log("Checking product #" + k + " with category: " + productCategory);
                    
                    if (selectedFilter === 'all' || productCategory === selectedFilter) {
                        // Show this product
                        productCards[k].style.display = 'flex';
                        productCards[k].style.opacity = '1';
                        productCards[k].style.transform = 'translateY(0)';
                    } else {
                        // Hide this product
                        productCards[k].style.opacity = '0';
                        productCards[k].style.transform = 'translateY(20px)';
                        
                        // Use closure to maintain reference to current card
                        (function(card) {
                            setTimeout(function() {
                                card.style.display = 'none';
                            }, 300);
                        })(productCards[k]);
                    }
                }
            });
        }
        
        // Trigger click on "All Products" button to initialize the view
        for (var i = 0; i < filterButtons.length; i++) {
            if (filterButtons[i].getAttribute('data-filter') === 'all') {
                // Simulate a click on the "All Products" button
                var clickEvent = new Event('click');
                filterButtons[i].dispatchEvent(clickEvent);
                break;
            }
        }
    }
    
    // Add hover/touch effects for product cards with enhanced mobile support
    for (var i = 0; i < productCards.length; i++) {
        // For non-touch devices only
        if (!isTouchDevice) {
            productCards[i].addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            
            productCards[i].addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        }
        
        // Touch specific handling
        if (isTouchDevice) {
            // Remove any hover class if added by accident
            productCards[i].classList.remove('hover');
            
            // Prevent default touch behavior on product cards
            productCards[i].addEventListener('touchstart', function(e) {
                // Don't prevent default to allow scrolling
                
                // Just add active class for visual feedback
                this.classList.add('active');
                
                // Store timestamp to detect taps vs scrolls
                this.touchStartTime = new Date().getTime();
                this.touchStartY = e.touches[0].clientY;
            });
            
            productCards[i].addEventListener('touchend', function(e) {
                var touchEndTime = new Date().getTime();
                var touchDuration = touchEndTime - (this.touchStartTime || 0);
                var touchDistance = Math.abs((e.changedTouches[0].clientY || 0) - (this.touchStartY || 0));
                
                // Only treat as tap if short duration and minimal movement
                if (touchDuration < 200 && touchDistance < 10) {
                    // Only keep active state briefly for visual feedback
                    var card = this;
                    setTimeout(function() {
                        // Remove active state after brief delay
                        card.classList.remove('active');
                    }, 200);
                } else {
                    // Remove immediately if it was a scroll
                    this.classList.remove('active');
                }
            });
            
            // Handle touch cancel or scroll
            productCards[i].addEventListener('touchcancel', function() {
                this.classList.remove('active');
            });
            
            // Handle touch move to detect scrolling
            productCards[i].addEventListener('touchmove', function() {
                // Remove active state during scroll
                this.classList.remove('active');
            });
        }
    }
    
    // Feature tags touch enhancement
    var featureTags = document.querySelectorAll('.feature-tag');
    for (var i = 0; i < featureTags.length; i++) {
        if (isTouchDevice) {
            featureTags[i].addEventListener('touchstart', function(e) {
                // Prevent parent card activation on tag touch
                e.stopPropagation();
                this.classList.add('active');
            });
            
            featureTags[i].addEventListener('touchend', function() {
                var tag = this;
                setTimeout(function() {
                    tag.classList.remove('active');
                }, 200);
            });
        }
    }
}; 