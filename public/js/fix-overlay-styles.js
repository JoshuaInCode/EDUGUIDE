/**
 * Fix Overlay Styles Script
 * Elimina estilos inline problemáticos y configura el hover correctamente
 */

console.log('🔧 INICIANDO FIX DE ESTILOS DE OVERLAY...');

function fixOverlayStyles() {
    console.log('🔧 Aplicando fix de estilos...');
    
    // Buscar todos los overlays
    const overlays = document.querySelectorAll('.university-overlay');
    const facultyDivs = document.querySelectorAll('.faculty-div');
    
    console.log(`📦 Encontrados ${overlays.length} overlays y ${facultyDivs.length} faculty divs`);
    
    overlays.forEach(function(overlay, index) {
        console.log(`🔧 Configurando overlay ${index + 1}...`);
        
        // Eliminar estilos inline problemáticos
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
        overlay.style.transform = 'scale(1)';
        overlay.style.backdropFilter = 'blur(2px)';
        overlay.style.webkitBackdropFilter = 'blur(2px)';
        overlay.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        console.log(`✅ Overlay ${index + 1} configurado`);
    });
    
    // Configurar event listeners para hover
    facultyDivs.forEach(function(facultyDiv, index) {
        const overlay = facultyDiv.querySelector('.university-overlay');
        
        if (overlay) {
            console.log(`🎯 Configurando hover para faculty div ${index + 1}...`);
            
            // Event listener para mouse enter
            facultyDiv.addEventListener('mouseenter', function() {
                console.log(`🖱️ Hover ENTER en faculty div ${index + 1}`);
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(0.95)';
            });
            
            // Event listener para mouse leave
            facultyDiv.addEventListener('mouseleave', function() {
                console.log(`🖱️ Hover LEAVE en faculty div ${index + 1}`);
                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1)';
            });
            
            console.log(`✅ Hover configurado para faculty div ${index + 1}`);
        }
    });
    
    console.log('✅ Fix de estilos completado');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixOverlayStyles);
} else {
    fixOverlayStyles();
}

// También ejecutar después de un delay para asegurar que todo esté cargado
setTimeout(fixOverlayStyles, 1000);
