/**
 * Hover Debug Script - Diagnóstico específico para el problema del hover
 */

console.log('🔍 INICIANDO DIAGNÓSTICO DE HOVER...');

function debugHover() {
    console.log('🔍 DIAGNÓSTICO DE HOVER - UNIVERSITIES.HTML');
    console.log('==========================================');
    
    // 1. Verificar elementos del DOM
    const facultyDivs = document.querySelectorAll('.faculty-div');
    const overlays = document.querySelectorAll('.university-overlay');
    
    console.log('1. ELEMENTOS ENCONTRADOS:');
    console.log(`- Faculty divs: ${facultyDivs.length}`);
    console.log(`- Overlays: ${overlays.length}`);
    
    // 2. Verificar el primer overlay en detalle
    if (overlays.length > 0) {
        const firstOverlay = overlays[0];
        const firstFacultyDiv = facultyDivs[0];
        
        console.log('\n2. PRIMER OVERLAY - ESTILOS COMPUTADOS:');
        const overlayStyle = window.getComputedStyle(firstOverlay);
        console.log('- display:', overlayStyle.display);
        console.log('- visibility:', overlayStyle.visibility);
        console.log('- opacity:', overlayStyle.opacity);
        console.log('- pointer-events:', overlayStyle.pointerEvents);
        console.log('- z-index:', overlayStyle.zIndex);
        console.log('- position:', overlayStyle.position);
        
        console.log('\n3. PRIMER FACULTY DIV - ESTILOS COMPUTADOS:');
        const facultyStyle = window.getComputedStyle(firstFacultyDiv);
        console.log('- display:', facultyStyle.display);
        console.log('- visibility:', facultyStyle.visibility);
        console.log('- opacity:', facultyStyle.opacity);
        console.log('- pointer-events:', facultyStyle.pointerEvents);
        console.log('- position:', facultyStyle.position);
        
        // 3. Verificar estilos inline
        console.log('\n4. ESTILOS INLINE DEL OVERLAY:');
        console.log('- style.opacity:', firstOverlay.style.opacity);
        console.log('- style.display:', firstOverlay.style.display);
        console.log('- style.visibility:', firstOverlay.style.visibility);
        console.log('- style.pointerEvents:', firstOverlay.style.pointerEvents);
        
        // 4. Verificar si hay event listeners
        console.log('\n5. VERIFICANDO EVENT LISTENERS...');
        
        // Crear un event listener de prueba
        firstFacultyDiv.addEventListener('mouseenter', function() {
            console.log('🖱️ MOUSE ENTER DETECTADO!');
            console.log('- Overlay opacity antes:', firstOverlay.style.opacity);
            firstOverlay.style.opacity = '0';
            firstOverlay.style.transform = 'scale(0.95)';
            console.log('- Overlay opacity después:', firstOverlay.style.opacity);
            console.log('- Overlay transform después:', firstOverlay.style.transform);
        });
        
        firstFacultyDiv.addEventListener('mouseleave', function() {
            console.log('🖱️ MOUSE LEAVE DETECTADO!');
            console.log('- Overlay opacity antes:', firstOverlay.style.opacity);
            firstOverlay.style.opacity = '1';
            firstOverlay.style.transform = 'scale(1)';
            console.log('- Overlay opacity después:', firstOverlay.style.opacity);
            console.log('- Overlay transform después:', firstOverlay.style.transform);
        });
        
        console.log('✅ Event listeners agregados al primer faculty div');
        
        // 5. Verificar CSS que puede estar interfiriendo
        console.log('\n6. VERIFICANDO CSS INTERFIRIENDO...');
        const allCSS = Array.from(document.styleSheets);
        let overlayCSSRules = [];
        
        allCSS.forEach(sheet => {
            try {
                const rules = Array.from(sheet.cssRules || sheet.rules);
                rules.forEach(rule => {
                    if (rule.selectorText && rule.selectorText.includes('university-overlay')) {
                        overlayCSSRules.push({
                            selector: rule.selectorText,
                            cssText: rule.cssText
                        });
                    }
                });
            } catch (e) {
                // Ignorar errores de CORS
            }
        });
        
        console.log('- Reglas CSS que afectan overlays:', overlayCSSRules.length);
        overlayCSSRules.forEach((rule, index) => {
            console.log(`  ${index + 1}. ${rule.selector}`);
        });
        
    } else {
        console.log('❌ No se encontraron overlays');
    }
    
    console.log('\n==========================================');
    console.log('DIAGNÓSTICO DE HOVER COMPLETADO');
}

// Ejecutar después de un delay para asegurar que todo esté cargado
setTimeout(debugHover, 3000);
