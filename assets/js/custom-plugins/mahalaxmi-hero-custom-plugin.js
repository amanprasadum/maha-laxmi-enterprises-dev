//  document.addEventListener('DOMContentLoaded', function () {
//       const backgroundImages = [
//         './assets/images/basmati.jpg',  // Rice
//         './assets/images/yarn-hero.jpg',  // Yarn
//         './assets/images/pad.jpg'  // Women's Pad
//       ];

//       const heroBackground = document.querySelector('.mahalaxmi-hero-background');
//       const slides = document.querySelectorAll('.mahalaxmi-hero-slide');
//       const dots = document.querySelectorAll('.mahalaxmi-dot');
//       let currentSlide = 0;
//       let slideInterval;
//       let isTransitioning = false;

//       heroBackground.style.backgroundImage = `url('${backgroundImages[0]}')`;

//       function initSlider() {
//         showSlide(0);

//         startSlideshow();

//         dots.forEach(dot => {
//           dot.addEventListener('click', function () {
//             if (isTransitioning) return;

//             const slideIndex = parseInt(this.getAttribute('data-slide'));
//             showSlide(slideIndex);
//             resetSlideshow();
//           });
//         });
//       }

//       function showSlide(index) {
//         if (isTransitioning) return;
//         isTransitioning = true;

//         heroBackground.style.opacity = '0.3';

//         setTimeout(() => {
//           heroBackground.style.backgroundImage = `url('${backgroundImages[index]}')`;
//           heroBackground.style.opacity = '1';

//           slides.forEach(slide => {
//             slide.classList.remove('active');
//           });

//           dots.forEach(dot => {
//             dot.classList.remove('active');
//           });

//           slides[index].classList.add('active');
//           dots[index].classList.add('active');

//           currentSlide = index;

//           setTimeout(() => {
//             isTransitioning = false;
//           }, 500); 
//         }, 500);
//       }

//       function nextSlide() {
//         if (isTransitioning) return;
//         const nextIndex = (currentSlide + 1) % slides.length;
//         showSlide(nextIndex);
//       }

//       function startSlideshow() {
//         slideInterval = setInterval(nextSlide, 8000);
//       }

//       function resetSlideshow() {
//         clearInterval(slideInterval);
//         startSlideshow();
//       }

//       function preloadImages() {
//         backgroundImages.forEach(imgUrl => {
//           const img = new Image();
//           img.src = imgUrl;
//         });
//       }

//       preloadImages();

//       initSlider();
//     });


document.addEventListener('DOMContentLoaded', function () {
  // Configuration
  const config = {
    slideInterval: 8000,
    transitionDuration: 800,
    loadingDuration: 1500,
    enableSwipe: true,
    enableKeyboard: true,
    pauseOnHover: true
  };

  // Image paths
  const backgroundImages = [
    './assets/images/basmati.jpg',  // Rice
    './assets/images/yarn-hero.jpg',  // Yarn
    './assets/images/pad.jpg'  // Women's Pad
  ];

  // DOM elements
  const heroBackground = document.querySelector('.mahalaxmi-hero-background');
  const slides = document.querySelectorAll('.mahalaxmi-hero-slide');
  const dots = document.querySelectorAll('.mahalaxmi-dot');
  const sliderContainer = document.querySelector('.mahalaxmi-hero-container');
  
  // State variables
  let currentSlide = 0;
  let slideInterval;
  let isTransitioning = false;
  let imagesLoaded = 0;
  let totalImages = backgroundImages.length;
  let touchStartX = 0;
  let touchEndX = 0;

  // Create and append loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'mahalaxmi-loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="mahalaxmi-spinner"></div>
    <div class="mahalaxmi-loading-progress">
      <div class="mahalaxmi-progress-bar"></div>
    </div>
    <div class="mahalaxmi-loading-text">Loading...</div>
  `;
  document.querySelector('.mahalaxmi-hero-section').appendChild(loadingOverlay);

  // Create and append the CSS
  const style = document.createElement('style');
  style.textContent = `
    .mahalaxmi-hero-section {
      position: relative;
      overflow: hidden;
    }
    
    .mahalaxmi-hero-background {
      transition: opacity ${config.transitionDuration/1000}s ease, transform ${config.transitionDuration/1000}s ease;
      background-size: cover;
      background-position: center;
      will-change: transform, opacity;
    }
    
    .mahalaxmi-hero-slide {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .mahalaxmi-hero-slide.active {
      opacity: 1;
      transform: translateY(0);
    }
    
    .mahalaxmi-dot {
      transition: all 0.3s ease;
      transform: scale(1);
    }
    
    .mahalaxmi-dot.active {
      transform: scale(1.2);
    }
    
    .mahalaxmi-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.8);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 100;
      transition: opacity 0.5s ease;
    }
    
    .mahalaxmi-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: #ffffff;
      animation: spin 1s ease-in-out infinite;
    }
    
    .mahalaxmi-loading-progress {
      width: 200px;
      height: 4px;
      background-color: rgba(255,255,255,0.2);
      margin: 20px 0;
      border-radius: 2px;
      overflow: hidden;
    }
    
    .mahalaxmi-progress-bar {
      height: 100%;
      width: 0%;
      background-color: #ffffff;
      transition: width 0.3s ease;
    }
    
    .mahalaxmi-loading-text {
      color: #ffffff;
      font-size: 14px;
      letter-spacing: 1px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .mahalaxmi-slide-enter {
      animation: slideEnter 0.8s ease forwards;
    }
    
    @keyframes slideEnter {
      from {
        opacity: 0;
        transform: scale(1.05);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .mahalaxmi-progress-indicator {
      position: absolute;
      bottom: 35px;
      left: 0;
      height: 2px;
      background-color: rgba(255,255,255,0.7);
      width: 0;
      transition: width linear;
    }
  `;
  document.head.appendChild(style);

  // Add progress indicator for current slide
  const progressIndicator = document.createElement('div');
  progressIndicator.className = 'mahalaxmi-progress-indicator';
  sliderContainer.appendChild(progressIndicator);

  // Initialize slider
  function initSlider() {
    preloadImages();
    setupEventListeners();
  }

  // Preload all images and track progress
  function preloadImages() {
    const progressBar = document.querySelector('.mahalaxmi-progress-bar');
    
    // Start with initial background image loaded right away
    heroBackground.style.backgroundImage = `url('${backgroundImages[0]}')`;
    
    // If no images load within 2 seconds, force complete anyway
    const forceLoadTimeout = setTimeout(() => {
      if (imagesLoaded < totalImages) {
        console.log('Forcing slider to start after timeout');
        completeLoading();
      }
    }, 2000);
    
    backgroundImages.forEach((imgUrl, index) => {
      const img = new Image();
      img.onload = function() {
        imagesLoaded++;
        const progress = (imagesLoaded / totalImages) * 100;
        progressBar.style.width = `${progress}%`;
        
        if (imagesLoaded === totalImages) {
          clearTimeout(forceLoadTimeout);
          setTimeout(completeLoading, 200); // Reduced delay
        }
      };
      
      img.onerror = function() {
        console.error(`Failed to load image: ${imgUrl}`);
        imagesLoaded++;
        
        if (imagesLoaded === totalImages) {
          clearTimeout(forceLoadTimeout);
          setTimeout(completeLoading, 200); // Reduced delay
        }
      };
      
      img.src = imgUrl;
    });
  }

  // Complete loading sequence and start slider
  function completeLoading() {
    // Force loading to complete immediately
    document.querySelector('.mahalaxmi-progress-bar').style.width = '100%';
    
    // Set background image immediately
    heroBackground.style.backgroundImage = `url('${backgroundImages[0]}')`;
    heroBackground.style.opacity = '1';
    
    // Remove loading overlay completely
    const loadingOverlay = document.querySelector('.mahalaxmi-loading-overlay');
    loadingOverlay.style.opacity = '0';
    
    // Initialize slider immediately instead of waiting
    setTimeout(() => {
      loadingOverlay.remove(); // Completely remove from DOM
      showSlide(0);
      startSlideshow();
    }, 500); // Reduced timeout to make transition faster
  }

  // Setup all event listeners
  function setupEventListeners() {
    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        if (isTransitioning) return;
        
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
        resetSlideshow();
      });
    });
    
    // Pause on hover
    if (config.pauseOnHover) {
      sliderContainer.addEventListener('mouseenter', pauseSlideshow);
      sliderContainer.addEventListener('mouseleave', resumeSlideshow);
    }
    
    // Touch/swipe support
    if (config.enableSwipe) {
      sliderContainer.addEventListener('touchstart', handleTouchStart, false);
      sliderContainer.addEventListener('touchend', handleTouchEnd, false);
    }
    
    // Keyboard navigation
    if (config.enableKeyboard) {
      document.addEventListener('keydown', handleKeyboardNav);
    }
  }

  // Show a specific slide
  function showSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Reset progress indicator
    resetProgressIndicator();
    
    // Prepare transition
    heroBackground.style.opacity = '0.5';
    heroBackground.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
      // Update background image
      heroBackground.style.backgroundImage = `url('${backgroundImages[index]}')`;
      
      // Restore background and apply enter animation
      heroBackground.style.opacity = '1';
      heroBackground.style.transform = 'scale(1)';
      
      // Deactivate all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Activate current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Update state
      currentSlide = index;
      
      // Allow next transition after completion
      setTimeout(() => {
        isTransitioning = false;
        startProgressIndicator();
      }, config.transitionDuration);
    }, config.transitionDuration / 2);
  }

  // Progress to next slide
  function nextSlide() {
    if (isTransitioning) return;
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Go to previous slide
  function prevSlide() {
    if (isTransitioning) return;
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // Start automatic slideshow
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, config.slideInterval);
    startProgressIndicator();
  }

  // Reset slideshow timer
  function resetSlideshow() {
    clearInterval(slideInterval);
    startSlideshow();
  }

  // Pause slideshow
  function pauseSlideshow() {
    clearInterval(slideInterval);
    pauseProgressIndicator();
  }

  // Resume slideshow
  function resumeSlideshow() {
    startSlideshow();
    resumeProgressIndicator();
  }

  // Start progress indicator animation
  function startProgressIndicator() {
    const indicator = document.querySelector('.mahalaxmi-progress-indicator');
    indicator.style.width = '0';
    
    // Using CSS transition for smooth animation
    setTimeout(() => {
      indicator.style.width = '100%';
      indicator.style.transitionDuration = `${config.slideInterval / 1000}s`;
    }, 50);
  }

  // Reset progress indicator
  function resetProgressIndicator() {
    const indicator = document.querySelector('.mahalaxmi-progress-indicator');
    indicator.style.transitionDuration = '0s';
    indicator.style.width = '0';
  }

  // Pause progress indicator
  function pauseProgressIndicator() {
    const indicator = document.querySelector('.mahalaxmi-progress-indicator');
    // Save current width
    const computedStyle = window.getComputedStyle(indicator);
    const currentWidth = computedStyle.getPropertyValue('width');
    
    // Pause by removing transition and keeping current width
    indicator.style.transitionDuration = '0s';
    indicator.style.width = currentWidth;
  }

  // Resume progress indicator
  function resumeProgressIndicator() {
    const indicator = document.querySelector('.mahalaxmi-progress-indicator');
    const computedStyle = window.getComputedStyle(indicator);
    const currentWidth = parseFloat(computedStyle.getPropertyValue('width'));
    const containerWidth = indicator.parentElement.offsetWidth;
    const progressPercentage = (currentWidth / containerWidth) * 100;
    
    // Calculate remaining time based on current progress
    const remainingTime = config.slideInterval * (1 - (progressPercentage / 100));
    
    // Resume animation for remaining time
    indicator.style.transitionDuration = `${remainingTime / 1000}s`;
    indicator.style.width = '100%';
  }

  // Touch event handlers for swipe functionality
  function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
  }
  
  function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  }
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to register as swipe
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      nextSlide();
      resetSlideshow();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right -v pcrevious slide
      prevSlide();
      resetSlideshow();
    }
  }

  // Keyboard navigation handler
  function handleKeyboardNav(event) {
    if (event.key === 'ArrowRight') {
      nextSlide();
      resetSlideshow();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
      resetSlideshow();
    }
  }

  // Initialize the slider
  initSlider();
});