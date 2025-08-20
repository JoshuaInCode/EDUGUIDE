/**
 * Simple Search Fix
 * Solución simple para forzar la visibilidad de la búsqueda
 */

(function() {
    'use strict';
    
    function fixSearchVisibility() {
        // Forzar visibilidad del contenedor de búsqueda
        const searchContainer = document.querySelector('.search-filter-container');
        if (searchContainer) {
            searchContainer.style.display = 'block';
            searchContainer.style.visibility = 'visible';
            searchContainer.style.opacity = '1';
            searchContainer.style.zIndex = '99999';
            searchContainer.style.position = 'relative';
        }
        
        // Forzar visibilidad del input de búsqueda
        const searchInput = document.getElementById('universitySearch');
        if (searchInput) {
            searchInput.style.display = 'block';
            searchInput.style.visibility = 'visible';
            searchInput.style.opacity = '1';
            searchInput.style.zIndex = '99999';
        }
        
        // Forzar visibilidad del filtro de provincia
        const provinceFilter = document.getElementById('provinceFilter');
        if (provinceFilter) {
            provinceFilter.style.display = 'block';
            provinceFilter.style.visibility = 'visible';
            provinceFilter.style.opacity = '1';
            provinceFilter.style.zIndex = '99999';
        }
        
        // Forzar visibilidad del icono de búsqueda
        const searchIcon = document.querySelector('.search-container i.fas.fa-search');
        if (searchIcon) {
            searchIcon.style.display = 'block';
            searchIcon.style.visibility = 'visible';
            searchIcon.style.opacity = '1';
            searchIcon.style.zIndex = '99999';
        }
    }
    
    // Aplicar fix cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixSearchVisibility);
    } else {
        fixSearchVisibility();
    }
    
    // Aplicar fix cada 3 segundos para asegurar que permanezca visible
    setInterval(fixSearchVisibility, 3000);
    
})();
