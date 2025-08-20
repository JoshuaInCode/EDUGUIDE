/**
 * Spacing Fix Script
 * Fuerza el espaciado correcto para evitar que la búsqueda traspase el header
 */

(function() {
    'use strict';
    
    function fixSpacing() {
        console.log('🔧 APLICANDO FIX DE ESPACIADO...');
        
        // 1. Forzar margen superior correcto en el body para compensar el header fijo
        document.body.style.marginTop = '80px';
        document.body.style.paddingTop = '0';
        
        // 2. Asegurar que el contenedor de búsqueda no tenga margen extra
        const searchContainer = document.querySelector('.search-filter-container');
        if (searchContainer) {
            searchContainer.style.marginTop = '0';
            searchContainer.style.paddingTop = '25px';
        }
        
        // 2. Asegurar que la sección tenga el espaciado correcto
        const universitiesSection = document.querySelector('section.py-5');
        if (universitiesSection) {
            universitiesSection.style.marginTop = '50px';
            universitiesSection.style.paddingTop = '0';
        }
        
        // 3. Verificar la altura del header y ajustar si es necesario
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const headerHeight = navbar.offsetHeight;
            console.log('Altura del header:', headerHeight);
            
            // Ajustar el margen basado en la altura real del header
            if (searchContainer) {
                const requiredMargin = headerHeight + 50; // 50px extra de espacio
                searchContainer.style.marginTop = requiredMargin + 'px';
            }
        }
        
        console.log('✅ Fix de espaciado aplicado correctamente');
    }
    
    // Aplicar fix cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixSpacing);
    } else {
        fixSpacing();
    }
    
    // Aplicar fix también cuando la ventana cambie de tamaño
    window.addEventListener('resize', fixSpacing);
    
})();
