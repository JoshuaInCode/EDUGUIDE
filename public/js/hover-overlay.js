/**
 * Hover Overlay Script - Simple and Direct
 * Maneja el hover de los overlays de universidades sin conflictos
 */

console.log('🚀 Iniciando Hover Overlay Script...');

// Función para inicializar los overlays
function initHoverOverlays() {
    console.log('🎯 Buscando overlays...');
    
    // Buscar todos los contenedores de universidades
    const facultyDivs = document.querySelectorAll('.faculty-div');
    console.log(`📦 Encontrados ${facultyDivs.length} contenedores de universidades`);
    
    facultyDivs.forEach(function(facultyDiv, index) {
        // Buscar el overlay dentro de este contenedor
        const overlay = facultyDiv.querySelector('.university-overlay');
        
        if (overlay) {
            console.log(`✅ Configurando overlay ${index + 1}`);
            
            // Configurar el overlay inicialmente
            overlay.style.opacity = '1';
            overlay.style.transform = 'scale(1)';
            overlay.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Agregar event listeners al contenedor padre
            facultyDiv.addEventListener('mouseenter', function() {
                console.log(`🖱️ Hover ENTER en overlay ${index + 1}`);
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(0.95)';
            });
            
            facultyDiv.addEventListener('mouseleave', function() {
                console.log(`🖱️ Hover LEAVE en overlay ${index + 1}`);
                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1)';
            });
        } else {
            console.log(`❌ No se encontró overlay en contenedor ${index + 1}`);
        }
    });
    
    console.log('✅ Hover Overlay Script inicializado correctamente');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHoverOverlays);
} else {
    // Si el DOM ya está listo, ejecutar inmediatamente
    initHoverOverlays();
}

// También ejecutar después de un pequeño delay para asegurar que todo esté cargado
setTimeout(initHoverOverlays, 1000);
