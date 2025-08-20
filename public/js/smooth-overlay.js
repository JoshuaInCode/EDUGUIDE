/**
 * Smooth Overlay Animation Script
 * Maneja las animaciones suaves de los overlays de universidades con hover
 */

(function() {
    'use strict';
    
    function initSmoothOverlays() {
        console.log('🎬 Inicializando overlays con animación hover...');
        
        const overlays = document.querySelectorAll('.university-overlay');
        
        overlays.forEach(function(overlay) {
            // Configuración inicial
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            overlay.style.cursor = 'pointer';
            overlay.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Obtener el contenedor padre (faculty-div)
            const parentContainer = overlay.closest('.faculty-div');
            
            if (parentContainer) {
                // Event listener para hover en el contenedor padre
                parentContainer.addEventListener('mouseenter', function() {
                    console.log('🖱️ Hover iniciado, ocultando overlay...');
                    
                    // Animar la salida del overlay
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'scale(0.95)';
                    overlay.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                });
                
                parentContainer.addEventListener('mouseleave', function() {
                    console.log('🖱️ Hover terminado, mostrando overlay...');
                    
                    // Animar la entrada del overlay
                    overlay.style.opacity = '1';
                    overlay.style.transform = 'scale(1)';
                    overlay.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            }
        });
        
        console.log(`✅ ${overlays.length} overlays inicializados con animación hover`);
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmoothOverlays);
    } else {
        initSmoothOverlays();
    }
    
})();
