/**
 * Emergency Spacing Fix
 * Fuerza el espaciado correcto de manera agresiva
 */

(function() {
    'use strict';
    
    function forceEmergencySpacing() {
        console.log('🚨 APLICANDO FIX DE ESPACIADO DE EMERGENCIA...');
        
        // 1. Forzar margen superior correcto en el body para compensar el header fijo
        document.body.style.marginTop = '80px';
        document.body.style.paddingTop = '0';
        
        // 2. Asegurar que el contenedor de búsqueda no tenga margen extra
        const searchContainer = document.querySelector('.search-filter-container');
        if (searchContainer) {
            searchContainer.style.marginTop = '0';
            searchContainer.style.paddingTop = '25px';
            searchContainer.style.position = 'relative';
            searchContainer.style.zIndex = '1';
        }
        
        // 2. Forzar margen superior en la sección completa
        const universitiesSection = document.querySelector('section.py-5');
        if (universitiesSection) {
            universitiesSection.style.marginTop = '150px';
            universitiesSection.style.paddingTop = '0';
        }
        
        // 3. Forzar margen superior en el header section
        const headerSection = document.querySelector('.header-section');
        if (headerSection) {
            headerSection.style.marginTop = '100px';
            headerSection.style.paddingTop = '2rem';
        }
        
        // 4. Verificar la altura del navbar y ajustar dinámicamente
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const headerHeight = navbar.offsetHeight;
            console.log('Altura del header:', headerHeight);
            
            // Calcular margen necesario (altura del header + 100px extra)
            const requiredMargin = headerHeight + 100;
            
            if (searchContainer) {
                searchContainer.style.marginTop = requiredMargin + 'px';
            }
        }
        
        console.log('✅ Fix de espaciado de emergencia aplicado');
    }
    
    // Aplicar inmediatamente
    forceEmergencySpacing();
    
    // Aplicar después de que todo esté cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceEmergencySpacing);
    } else {
        setTimeout(forceEmergencySpacing, 100);
    }
    
    // Aplicar cada 2 segundos para asegurar que se mantenga
    setInterval(forceEmergencySpacing, 2000);
    
    // Aplicar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', forceEmergencySpacing);
    
})();
