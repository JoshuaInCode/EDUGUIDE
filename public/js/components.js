document.addEventListener('DOMContentLoaded', function() {
    var overlays = document.querySelectorAll('.university-overlay');
    overlays.forEach(function(overlay) {
        overlay.addEventListener('click', function() {
            overlay.style.opacity = '0';
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 500);
        });
    });
});
