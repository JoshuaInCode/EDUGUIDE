/**
 * FORCE HEADER SPACING - Script definitivo para corregir el espaciado del header
 * Este script se ejecuta después de todos los demás para sobrescribir cualquier cambio
 */

(function() {
    'use strict';
    
    function forceCorrectSpacing() {
        console.log('🔧 FORZANDO ESPACIADO CORRECTO DEL HEADER...');
        
        // 1. Forzar el espaciado correcto en el body
        document.body.style.setProperty('margin-top', '0', 'important');
        document.body.style.setProperty('padding-top', '0', 'important');
        
        // 2. Forzar el espaciado correcto en la sección principal
        const universitiesSection = document.querySelector('section.py-5');
        if (universitiesSection) {
            universitiesSection.style.setProperty('margin-top', '0', 'important');
            universitiesSection.style.setProperty('padding-top', '0', 'important');
            universitiesSection.style.setProperty('padding-bottom', '0', 'important');
            // Remover la clase py-5 de Bootstrap que está causando el problema
            universitiesSection.classList.remove('py-5');
        }
        
        // 3. Forzar el espaciado correcto en el header section
        const headerSection = document.querySelector('.header-section');
        if (headerSection) {
            headerSection.style.setProperty('margin-top', '0', 'important');
            headerSection.style.setProperty('margin-bottom', '2rem', 'important');
            headerSection.style.setProperty('margin-left', '-50vw', 'important');
            headerSection.style.setProperty('margin-right', '-50vw', 'important');
            headerSection.style.setProperty('padding', '6rem 2rem', 'important');
            headerSection.style.setProperty('position', 'relative', 'important');
            headerSection.style.setProperty('width', '100vw', 'important');
            headerSection.style.setProperty('left', '50%', 'important');
            headerSection.style.setProperty('right', '50%', 'important');
            headerSection.style.setProperty('height', '300px', 'important');
            headerSection.style.setProperty('display', 'flex', 'important');
            headerSection.style.setProperty('align-items', 'center', 'important');
            headerSection.style.setProperty('justify-content', 'center', 'important');
            headerSection.style.setProperty('overflow', 'hidden', 'important');
        }
        
        // 4. Forzar el espaciado correcto en el contenedor de búsqueda
        const searchContainer = document.querySelector('.search-filter-container');
        if (searchContainer) {
            searchContainer.style.setProperty('margin-top', '0', 'important');
            searchContainer.style.setProperty('position', 'relative', 'important');
            searchContainer.style.setProperty('z-index', '1000', 'important');
            searchContainer.style.setProperty('pointer-events', 'auto', 'important');
        }
        
        // 5. Asegurar que el input de búsqueda sea interactivo
        const searchInput = document.querySelector('#universitySearch');
        if (searchInput) {
            searchInput.style.setProperty('pointer-events', 'auto', 'important');
            searchInput.style.setProperty('z-index', '1001', 'important');
            searchInput.style.setProperty('position', 'relative', 'important');
        }
        
        // 6. Asegurar que el contenedor de búsqueda sea interactivo
        const searchWrapper = document.querySelector('.search-input-wrapper');
        if (searchWrapper) {
            searchWrapper.style.setProperty('pointer-events', 'auto', 'important');
            searchWrapper.style.setProperty('z-index', '1000', 'important');
            searchWrapper.style.setProperty('position', 'relative', 'important');
        }
        
        console.log('✅ Espaciado del header forzado correctamente');
    }
    
    // Ejecutar inmediatamente
    forceCorrectSpacing();
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceCorrectSpacing);
    } else {
        forceCorrectSpacing();
    }
    
    // Ejecutar múltiples veces para asegurar que se aplique
    setTimeout(forceCorrectSpacing, 50);
    setTimeout(forceCorrectSpacing, 100);
    setTimeout(forceCorrectSpacing, 200);
    setTimeout(forceCorrectSpacing, 500);
    setTimeout(forceCorrectSpacing, 1000);
    setTimeout(forceCorrectSpacing, 2000);
    
    // Ejecutar cuando la ventana cambie de tamaño
    window.addEventListener('resize', forceCorrectSpacing);
    
    // Ejecutar periódicamente para mantener el espaciado correcto
    setInterval(forceCorrectSpacing, 3000);
    
})();
