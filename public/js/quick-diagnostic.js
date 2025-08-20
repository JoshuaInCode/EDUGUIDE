/**
 * Quick Diagnostic Script
 * Diagnóstico rápido para identificar el problema con la búsqueda
 */

(function() {
    'use strict';
    
    // Solo ejecutar una vez después de que todo esté cargado
    setTimeout(function() {
        console.log('🔍 DIAGNÓSTICO RÁPIDO - UNIVERSITIES.HTML');
        console.log('==========================================');
        
        // 1. Verificar elementos del DOM
        const searchInput = document.getElementById('universitySearch');
        const provinceFilter = document.getElementById('provinceFilter');
        const searchContainer = document.querySelector('.search-filter-container');
        
        console.log('1. ELEMENTOS DEL DOM:');
        console.log('- searchInput existe:', !!searchInput);
        console.log('- provinceFilter existe:', !!provinceFilter);
        console.log('- searchContainer existe:', !!searchContainer);
        
        if (searchInput) {
            console.log('- searchInput display:', window.getComputedStyle(searchInput).display);
            console.log('- searchInput visibility:', window.getComputedStyle(searchInput).visibility);
            console.log('- searchInput opacity:', window.getComputedStyle(searchInput).opacity);
            console.log('- searchInput z-index:', window.getComputedStyle(searchInput).zIndex);
        }
        
        if (searchContainer) {
            console.log('- searchContainer display:', window.getComputedStyle(searchContainer).display);
            console.log('- searchContainer visibility:', window.getComputedStyle(searchContainer).visibility);
            console.log('- searchContainer opacity:', window.getComputedStyle(searchContainer).opacity);
            console.log('- searchContainer z-index:', window.getComputedStyle(searchContainer).zIndex);
        }
        
        // 2. Verificar CSS cargado
        console.log('\n2. CSS CARGADO:');
        const searchFixCSS = document.querySelector('link[href*="search-fix.css"]');
        const universitiesCSS = document.querySelector('link[href*="universities.css"]');
        const styleCSS = document.querySelector('link[href*="style.css"]');
        
        console.log('- search-fix.css cargado:', !!searchFixCSS);
        console.log('- universities.css cargado:', !!universitiesCSS);
        console.log('- style.css cargado:', !!styleCSS);
        
        // 3. Verificar JavaScript cargado
        console.log('\n3. JAVASCRIPT CARGADO:');
        const universitySearchJS = document.querySelector('script[src*="university-search.js"]');
        const componentsJS = document.querySelector('script[src*="components.js"]');
        const simpleSearchFixJS = document.querySelector('script[src*="simple-search-fix.js"]');
        
        console.log('- university-search.js cargado:', !!universitySearchJS);
        console.log('- components.js cargado:', !!componentsJS);
        console.log('- simple-search-fix.js cargado:', !!simpleSearchFixJS);
        
        // 4. Verificar overlays que puedan estar interfiriendo
        console.log('\n4. OVERLAYS INTERFIRIENDO:');
        const overlays = document.querySelectorAll('.university-overlay');
        console.log('- Número de overlays:', overlays.length);
        
        overlays.forEach((overlay, index) => {
            const style = window.getComputedStyle(overlay);
            console.log(`- Overlay ${index + 1}: display=${style.display}, z-index=${style.zIndex}`);
        });
        
        // 5. Verificar si hay elementos ocultos
        console.log('\n5. ELEMENTOS OCULTOS:');
        const hiddenElements = document.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"], [style*="opacity: 0"]');
        console.log('- Elementos con display:none:', document.querySelectorAll('[style*="display: none"]').length);
        console.log('- Elementos con visibility:hidden:', document.querySelectorAll('[style*="visibility: hidden"]').length);
        console.log('- Elementos con opacity:0:', document.querySelectorAll('[style*="opacity: 0"]').length);
        
        // 6. Resumen del problema
        console.log('\n6. RESUMEN DEL PROBLEMA:');
        if (!searchInput || !searchContainer) {
            console.log('❌ PROBLEMA: Elementos de búsqueda no encontrados en el DOM');
        } else if (window.getComputedStyle(searchContainer).display === 'none') {
            console.log('❌ PROBLEMA: Contenedor de búsqueda está oculto (display: none)');
        } else if (window.getComputedStyle(searchContainer).visibility === 'hidden') {
            console.log('❌ PROBLEMA: Contenedor de búsqueda está oculto (visibility: hidden)');
        } else if (window.getComputedStyle(searchContainer).opacity === '0') {
            console.log('❌ PROBLEMA: Contenedor de búsqueda está transparente (opacity: 0)');
        } else {
            console.log('✅ Los elementos de búsqueda están visibles en el DOM');
            console.log('🔍 Verificar si el problema es de CSS o JavaScript');
        }
        
        console.log('\n==========================================');
        console.log('DIAGNÓSTICO COMPLETADO');
        
    }, 2000); // Esperar 2 segundos para que todo se cargue
    
})();
