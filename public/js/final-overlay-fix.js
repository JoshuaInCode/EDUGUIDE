/**
 * Final Overlay Fix Script
 * Solución definitiva para hacer desaparecer el overlay con logo y título
 */

console.log('🎯 INICIANDO FIX FINAL DE OVERLAY...');

function finalOverlayFix() {
    console.log('🎯 Aplicando fix final...');
    
    // Buscar todos los overlays
    const overlays = document.querySelectorAll('.university-overlay');
    const facultyDivs = document.querySelectorAll('.faculty-div');
    
    console.log(`📦 Encontrados ${overlays.length} overlays y ${facultyDivs.length} faculty divs`);
    
    overlays.forEach(function(overlay, index) {
        console.log(`🎯 Configurando overlay ${index + 1}...`);
        
        // ELIMINAR COMPLETAMENTE los estilos inline problemáticos
        overlay.removeAttribute('style');
        
        // Aplicar estilos correctos via JavaScript
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(255,255,255,0.97)';
        overlay.style.zIndex = '10';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.pointerEvents = 'none';
        overlay.style.cursor = 'pointer';
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        overlay.style.transform = 'scale(1)';
        overlay.style.backdropFilter = 'blur(2px)';
        overlay.style.webkitBackdropFilter = 'blur(2px)';
        overlay.style.transition = 'all 0.3s ease';
        
        console.log(`✅ Overlay ${index + 1} configurado`);
    });
    
    // Configurar event listeners para hover
    facultyDivs.forEach(function(facultyDiv, index) {
        const overlay = facultyDiv.querySelector('.university-overlay');
        
        if (overlay) {
            console.log(`🎯 Configurando hover para faculty div ${index + 1}...`);
            
            // Event listener para mouse enter - OCULTAR COMPLETAMENTE
            facultyDiv.addEventListener('mouseenter', function() {
                console.log(`🖱️ Hover ENTER en faculty div ${index + 1} - OCULTANDO OVERLAY`);
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                overlay.style.transform = 'scale(0.95)';
            });
            
            // Event listener para mouse leave - MOSTRAR COMPLETAMENTE
            facultyDiv.addEventListener('mouseleave', function() {
                console.log(`🖱️ Hover LEAVE en faculty div ${index + 1} - MOSTRANDO OVERLAY`);
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                overlay.style.transform = 'scale(1)';
            });
            
            console.log(`✅ Hover configurado para faculty div ${index + 1}`);
        }
    });
    
    console.log('✅ Fix final completado');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', finalOverlayFix);
} else {
    finalOverlayFix();
}

// También ejecutar después de un delay para asegurar que todo esté cargado
setTimeout(finalOverlayFix, 1000);
