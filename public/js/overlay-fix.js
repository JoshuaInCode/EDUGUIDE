/**
 * Overlay Fix Script
 * Soluciona el problema de los overlays interfiriendo con la búsqueda
 */

(function() {
    'use strict';
    
    function fixOverlayInterference() {
        console.log('🔧 APLICANDO FIX DE OVERLAYS...');
        
        // 1. Asegurar que los overlays estén visibles por defecto
        const overlays = document.querySelectorAll('.university-overlay');
        overlays.forEach(overlay => {
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
        });
        
        // 2. Asegurar que la búsqueda esté siempre visible
        const searchContainer = document.querySelector('.search-filter-container');
        if (searchContainer) {
            searchContainer.style.zIndex = '99999';
            searchContainer.style.position = 'relative';
        }
        
        // 3. Agregar event listeners para manejar overlays correctamente
        const facultyDivs = document.querySelectorAll('.faculty-div');
        facultyDivs.forEach(div => {
            const overlay = div.querySelector('.university-overlay');
            if (overlay) {
                // Asegurar que el overlay esté visible por defecto
                overlay.style.display = 'flex';
                overlay.style.opacity = '1';
                
                // Ocultar overlay al hacer clic
                overlay.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 300);
                });
            }
        });
        
        console.log('✅ Fix de overlays aplicado correctamente');
    }
    
    // Aplicar fix cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixOverlayInterference);
    } else {
        fixOverlayInterference();
    }
    
})();
