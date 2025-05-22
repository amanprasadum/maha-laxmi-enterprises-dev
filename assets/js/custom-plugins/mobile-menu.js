// Add this JavaScript for mobile sub-menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile submenu toggle
    if (window.innerWidth <= 991) {
        const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
        
        dropdownSubmenus.forEach(function(submenu) {
            const mainItem = submenu.querySelector('.dropdown-item');
            
            mainItem.addEventListener('click', function(e) {
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
});

// Update on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 991) {
        // Remove mobile classes on desktop
        document.querySelectorAll('.dropdown-submenu').forEach(function(submenu) {
            submenu.classList.remove('show');
        });
    }
});