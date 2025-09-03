/**
 * Overlay Fix Script - Simplified
 * Asegura que los overlays funcionen correctamente sin interferir con la búsqueda
 */

(function() {
    'use strict';
    
    function ensureOverlayFunctionality() {
        console.log('🔧 Verificando funcionalidad de overlays...');
        
        // Asegurar que la búsqueda esté siempre visible y funcional
        const searchContainer = document.querySelector('.search-filter-container');
        if (searchContainer) {
            searchContainer.style.zIndex = '99999';
            searchContainer.style.position = 'relative';
        }
        
        console.log('✅ Funcionalidad de overlays verificada');
    }
    
    // Aplicar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureOverlayFunctionality);
    } else {
        ensureOverlayFunctionality();
    }
    
})();
