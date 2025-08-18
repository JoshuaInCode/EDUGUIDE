// University Overlay Functionality - Modified to not interfere with search
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando overlays de universidades...');
    
    var overlays = document.querySelectorAll('.university-overlay');
    overlays.forEach(function(overlay) {
        overlay.addEventListener('click', function(e) {
            // Prevent event from bubbling up to parent elements
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Overlay clicked, hiding...');
            
            // Hide the overlay
            overlay.style.opacity = '0';
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 500);
        });
    });
    
    console.log('Overlays inicializados:', overlays.length);
});
