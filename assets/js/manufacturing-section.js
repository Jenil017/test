/**
 * Premium Manufacturing Section
 * Interactive elements and animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all manufacturing cards
  const manufacturingCards = document.querySelectorAll('.manufacturing-card');
  
  // Add animation classes on page load
  manufacturingCards.forEach((card, index) => {
    // Stagger the animations
    setTimeout(() => {
      card.classList.add('fade-in-up');
    }, index * 200);
  });
  
  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  // Observe each card
  manufacturingCards.forEach(card => {
    observer.observe(card);
  });
  
  // Add hover effects for desktop and tap effects for mobile
  manufacturingCards.forEach(card => {
    // Check if device supports hover
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      // For desktop devices with hover
      card.addEventListener('mouseenter', function() {
        this.classList.add('hover');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
      });
    } else {
      // For touch devices
      card.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      });
      
      card.addEventListener('touchend', function() {
        // Slight delay before removing class for better visual feedback
        setTimeout(() => {
          this.classList.remove('touch-active');
        }, 300);
      });
    }
  });
  
  // Add parallax effect to card images on mouse move (desktop only)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
    manufacturingCards.forEach(card => {
      const imgContainer = card.querySelector('.manufacturing-img-container');
      const img = card.querySelector('.manufacturing-img');
      
      card.addEventListener('mousemove', function(e) {
        // Get position of mouse relative to card
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate percentage
        const xPercent = (x / rect.width - 0.5) * 10;
        const yPercent = (y / rect.height - 0.5) * 10;
        
        // Apply subtle transform to image
        img.style.transform = `scale(1.05) translate(${xPercent}px, ${yPercent}px)`;
      });
      
      card.addEventListener('mouseleave', function() {
        // Reset transform when mouse leaves
        img.style.transform = 'scale(1)';
      });
    });
  }
  
  // Add click event for learn more buttons
  const learnMoreButtons = document.querySelectorAll('.manufacturing-button');
  
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      
      // Get the parent card
      const card = this.closest('.manufacturing-card');
      const process = card.querySelector('.manufacturing-process').textContent;
      
      // Show a message (could be replaced with modal or navigation)
      console.log(`Learn more about ${process} process clicked`);
      
      // Example: Could trigger a modal with more information
      // showProcessDetails(process);
    });
  });
});

// Add CSS animations 
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .manufacturing-card {
    opacity: 0;
  }
  
  .manufacturing-card.fade-in-up {
    animation: fadeInUp 0.8s forwards ease-out;
  }
  
  .manufacturing-card.in-view .manufacturing-img {
    transform: scale(1.02);
  }
  
  .manufacturing-card.touch-active {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
  
  .manufacturing-card.touch-active .manufacturing-process {
    color: #a44871;
  }
  
  .manufacturing-card.touch-active::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

document.head.appendChild(style); 