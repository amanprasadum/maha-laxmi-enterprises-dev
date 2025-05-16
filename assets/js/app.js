 window.addEventListener('load', function () {
      const preloader = document.getElementById('preloader');
      preloader.classList.add('hide');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', function () {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Back to Top Button
    window.addEventListener('scroll', function () {
      const backToTop = document.querySelector('.back-to-top');
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });

    // Custom Cursor
    document.addEventListener('mousemove', function (e) {
      const cursor = document.querySelector('.cursor');
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', function () {
      const cursor = document.querySelector('.cursor');
      cursor.classList.add('grow');
    });

    document.addEventListener('mouseup', function () {
      const cursor = document.querySelector('.cursor');
      cursor.classList.remove('grow');
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-header').forEach(item => {
      item.addEventListener('click', function () {
        const faqBody = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');

        if (faqBody.style.maxHeight) {
          faqBody.style.maxHeight = null;
          icon.classList.remove('active');
        } else {
          faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
          icon.classList.add('active');
        }
      });
    });
