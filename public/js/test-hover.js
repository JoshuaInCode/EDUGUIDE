/**
 * Test Hover Script - Para verificar que el hover funcione
 */

console.log('🧪 Iniciando Test Hover Script...');

// Función de prueba simple
function testHover() {
    console.log('🔍 Probando hover...');
    
    // Buscar el primer overlay
    const firstOverlay = document.querySelector('.university-overlay');
    const firstFacultyDiv = document.querySelector('.faculty-div');
    
    if (firstOverlay && firstFacultyDiv) {
        console.log('✅ Encontrado overlay y faculty-div');
        console.log('📍 Overlay opacity inicial:', firstOverlay.style.opacity);
        
        // Agregar un event listener de prueba
        firstFacultyDiv.addEventListener('mouseenter', function() {
            console.log('🖱️ MOUSE ENTER detectado!');
            firstOverlay.style.opacity = '0';
            firstOverlay.style.transform = 'scale(0.95)';
            console.log('📍 Overlay opacity después de hover:', firstOverlay.style.opacity);
        });
        
        firstFacultyDiv.addEventListener('mouseleave', function() {
            console.log('🖱️ MOUSE LEAVE detectado!');
            firstOverlay.style.opacity = '1';
            firstOverlay.style.transform = 'scale(1)';
            console.log('📍 Overlay opacity después de salir:', firstOverlay.style.opacity);
        });
        
        console.log('✅ Event listeners agregados correctamente');
    } else {
        console.log('❌ No se encontraron elementos necesarios');
        console.log('📍 Faculty div encontrado:', !!firstFacultyDiv);
        console.log('📍 Overlay encontrado:', !!firstOverlay);
    }
}

// Ejecutar después de un delay
setTimeout(testHover, 2000);
