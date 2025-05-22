// Mobile submenu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile submenu toggle
    function handleMobileSubmenus() {
        if (window.innerWidth <= 991) {
            const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
            
            dropdownSubmenus.forEach(function(submenu) {
                const mainItem = submenu.querySelector('.dropdown-toggle-submenu');
                
                // Remove existing event listeners
                mainItem.replaceWith(mainItem.cloneNode(true));
                const newMainItem = submenu.querySelector('.dropdown-toggle-submenu');
                
                newMainItem.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle this submenu
                    submenu.classList.toggle('show');
                    
                    // Close other submenus
                    dropdownSubmenus.forEach(function(otherSubmenu) {
                        if (otherSubmenu !== submenu) {
                            otherSubmenu.classList.remove('show');
                        }
                    });
                });
            });
        }
    }

    // Initialize mobile submenus
    handleMobileSubmenus();

    // Update on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            // Remove mobile classes on desktop
            document.querySelectorAll('.dropdown-submenu').forEach(function(submenu) {
                submenu.classList.remove('show');
            });
        } else {
            // Reinitialize mobile functionality
            handleMobileSubmenus();
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-submenu').forEach(function(submenu) {
                submenu.classList.remove('show');
            });
        }
    });
});0