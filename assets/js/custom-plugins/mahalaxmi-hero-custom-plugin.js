 document.addEventListener('DOMContentLoaded', function () {
      const backgroundImages = [
        './assets/images/basmati.jpg',  // Rice
        './assets/images/yarn-hero.jpg',  // Yarn
        // './assets/images/pad.jpg'  // Women's Pad
      ];

      const heroBackground = document.querySelector('.mahalaxmi-hero-background');
      const slides = document.querySelectorAll('.mahalaxmi-hero-slide');
      const dots = document.querySelectorAll('.mahalaxmi-dot');
      let currentSlide = 0;
      let slideInterval;
      let isTransitioning = false;

      heroBackground.style.backgroundImage = `url('${backgroundImages[0]}')`;

      function initSlider() {
        showSlide(0);

        startSlideshow();

        dots.forEach(dot => {
          dot.addEventListener('click', function () {
            if (isTransitioning) return;

            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            resetSlideshow();
          });
        });
      }

      function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        heroBackground.style.opacity = '0.3';

        setTimeout(() => {
          heroBackground.style.backgroundImage = `url('${backgroundImages[index]}')`;
          heroBackground.style.opacity = '1';

          slides.forEach(slide => {
            slide.classList.remove('active');
          });

          dots.forEach(dot => {
            dot.classList.remove('active');
          });

          slides[index].classList.add('active');
          dots[index].classList.add('active');

          currentSlide = index;

          setTimeout(() => {
            isTransitioning = false;
          }, 500); 
        }, 500);
      }

      function nextSlide() {
        if (isTransitioning) return;
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
      }

      function startSlideshow() {
        slideInterval = setInterval(nextSlide, 8000);
      }

      function resetSlideshow() {
        clearInterval(slideInterval);
        startSlideshow();
      }

      function preloadImages() {
        backgroundImages.forEach(imgUrl => {
          const img = new Image();
          img.src = imgUrl;
        });
      }

      preloadImages();

      initSlider();
    });