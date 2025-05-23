 // Multi-level dropdown functionality
    document.addEventListener('DOMContentLoaded', function () {
      const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');

      dropdownSubmenus.forEach(function (submenu) {
        const dropdownToggle = submenu.querySelector('.dropdown-toggle');
        const dropdownMenu = submenu.querySelector('.dropdown-menu');

        if (window.innerWidth > 991) {
          // Desktop hover behavior
          submenu.addEventListener('mouseenter', function () {
            dropdownMenu.style.display = 'block';
          });

          submenu.addEventListener('mouseleave', function () {
            dropdownMenu.style.display = 'none';
          });
        } else {
          // Mobile click behavior
          dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Toggle the submenu
            if (dropdownMenu.style.display === 'block') {
              dropdownMenu.style.display = 'none';
            } else {
              dropdownMenu.style.display = 'block';
            }
          });
        }
      });

      // Prevent dropdown from closing when clicking inside
      document.querySelectorAll('.dropdown-menu').forEach(function (dropdown) {
        dropdown.addEventListener('click', function (e) {
          e.stopPropagation();
        });
      });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
      const dropdownMenus = document.querySelectorAll('.dropdown-submenu .dropdown-menu');
      dropdownMenus.forEach(menu => {
        menu.style.display = '';
      });

      // Reinitialize dropdown behavior after resize
      setTimeout(() => {
        location.reload();
      }, 500);
    });

    // Close mobile menu when clicking on regular links (not dropdown toggles)
    document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', function () {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      });
    });