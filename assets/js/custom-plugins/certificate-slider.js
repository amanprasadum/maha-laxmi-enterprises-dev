 document.addEventListener('DOMContentLoaded', function () {
      const slider = document.querySelector('.certification-slider');
      const slides = document.querySelectorAll('.certification-slide');
      const prevBtn = document.querySelector('.slider-prev');
      const nextBtn = document.querySelector('.slider-next');

      if (!slider || !slides.length || !prevBtn || !nextBtn) return;

      const slideWidth = slides[0].offsetWidth + 20; // Width + gap
      const visibleSlides = Math.floor(slider.offsetWidth / slideWidth);

      let currentIndex = 0;

      function updateSlider() {
        slider.scrollTo({
          left: currentIndex * slideWidth,
          behavior: 'smooth'
        });
      }

      prevBtn.addEventListener('click', function () {
        currentIndex = Math.max(0, currentIndex - 1);
        updateSlider();
      });

      nextBtn.addEventListener('click', function () {
        currentIndex = Math.min(slides.length - visibleSlides, currentIndex + 1);
        updateSlider();
      });

      // Handle resize events
      window.addEventListener('resize', function () {
        // Recalculate visible slides
        const newVisibleSlides = Math.floor(slider.offsetWidth / slideWidth);
        if (currentIndex > slides.length - newVisibleSlides) {
          currentIndex = Math.max(0, slides.length - newVisibleSlides);
          updateSlider();
        }
      });

      // Auto-play functionality
      let autoPlayInterval = setInterval(() => {
        if (currentIndex >= slides.length - visibleSlides) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        updateSlider();
      }, 5000);

      // Pause auto-play on hover
      slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
      });

      slider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
          if (currentIndex >= slides.length - visibleSlides) {
            currentIndex = 0;
          } else {
            currentIndex++;
          }
          updateSlider();
        }, 5000);
      });

      // Handle touch events for mobile
      let touchStartX = 0;
      let touchEndX = 0;

      slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
          // Swipe left
          currentIndex = Math.min(slides.length - visibleSlides, currentIndex + 1);
          updateSlider();
        }
        if (touchEndX - touchStartX > swipeThreshold) {
          // Swipe right
          currentIndex = Math.max(0, currentIndex - 1);
          updateSlider();
        }
      }
    });