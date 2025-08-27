// EduGuide Chatbot Environment Setup
// Este script te permite configurar las variables de entorno desde la consola del navegador

console.log('🚀 EduGuide Chatbot Environment Setup');
console.log('Usa las siguientes funciones para configurar tu chatbot:');

// Función para configurar el token de Hugging Face
function setHuggingFaceToken(token) {
    if (!token || token === 'your_hugging_face_token_here') {
        console.error('❌ Token inválido. Proporciona un token válido de Hugging Face.');
        return false;
    }
    
    localStorage.setItem('HUGGING_FACE_TOKEN', token);
    console.log('✅ Token de Hugging Face configurado correctamente');
    console.log('🔄 Recarga la página para aplicar los cambios');
    return true;
}

// Función para configurar Firebase
function setFirebaseConfig(config) {
    const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    const missingFields = requiredFields.filter(field => !config[field]);
    
    if (missingFields.length > 0) {
        console.error('❌ Campos faltantes:', missingFields.join(', '));
        return false;
    }
    
    localStorage.setItem('FIREBASE_API_KEY', config.apiKey);
    localStorage.setItem('FIREBASE_AUTH_DOMAIN', config.authDomain);
    localStorage.setItem('FIREBASE_PROJECT_ID', config.projectId);
    localStorage.setItem('FIREBASE_STORAGE_BUCKET', config.storageBucket);
    localStorage.setItem('FIREBASE_MESSAGING_SENDER_ID', config.messagingSenderId);
    localStorage.setItem('FIREBASE_APP_ID', config.appId);
    
    console.log('✅ Configuración de Firebase guardada correctamente');
    console.log('🔄 Recarga la página para aplicar los cambios');
    return true;
}

// Función para configurar todo desde tu archivo .env
function setupFromEnv() {
    console.log('📋 Configurando desde variables de entorno...');
    
    // Aquí puedes copiar y pegar los valores de tu archivo .env
    // Ejemplo de uso:
    console.log(`
    Para configurar tu chatbot, usa una de estas opciones:

    1. Configurar solo el token de Hugging Face:
       setHuggingFaceToken('tu_token_aqui');

    2. Configurar Firebase completo:
       setFirebaseConfig({
           apiKey: 'tu_api_key',
           authDomain: 'tu_domain.firebaseapp.com',
           projectId: 'tu_project_id',
           storageBucket: 'tu_bucket.appspot.com',
           messagingSenderId: 'tu_sender_id',
           appId: 'tu_app_id'
       });

    3. Ver configuración actual:
       getCurrentConfig();

    4. Limpiar configuración:
       clearConfig();
    `);
}

// Función para obtener la configuración actual
function getCurrentConfig() {
    const config = {
        HUGGING_FACE_TOKEN: localStorage.getItem('HUGGING_FACE_TOKEN') || 'No configurado',
        FIREBASE: {
            apiKey: localStorage.getItem('FIREBASE_API_KEY') || 'No configurado',
            authDomain: localStorage.getItem('FIREBASE_AUTH_DOMAIN') || 'No configurado',
            projectId: localStorage.getItem('FIREBASE_PROJECT_ID') || 'No configurado',
            storageBucket: localStorage.getItem('FIREBASE_STORAGE_BUCKET') || 'No configurado',
            messagingSenderId: localStorage.getItem('FIREBASE_MESSAGING_SENDER_ID') || 'No configurado',
            appId: localStorage.getItem('FIREBASE_APP_ID') || 'No configurado'
        }
    };
    
    console.log('📋 Configuración actual:', config);
    return config;
}

// Función para limpiar toda la configuración
function clearConfig() {
    const keys = [
        'HUGGING_FACE_TOKEN',
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_STORAGE_BUCKET',
        'FIREBASE_MESSAGING_SENDER_ID',
        'FIREBASE_APP_ID'
    ];
    
    keys.forEach(key => localStorage.removeItem(key));
    console.log('🧹 Configuración limpiada. Recarga la página para aplicar los cambios.');
}

// Función para verificar el estado de la configuración
function checkConfigStatus() {
    const config = getCurrentConfig();
    const huggingFaceOk = config.HUGGING_FACE_TOKEN !== 'No configurado' && 
                          config.HUGGING_FACE_TOKEN !== 'your_hugging_face_token_here';
    const firebaseOk = config.FIREBASE.apiKey !== 'No configurado';
    
    console.log('🔍 Estado de la configuración:');
    console.log(`   Hugging Face: ${huggingFaceOk ? '✅ Configurado' : '❌ No configurado'}`);
    console.log(`   Firebase: ${firebaseOk ? '✅ Configurado' : '❌ No configurado'}`);
    
    if (huggingFaceOk && firebaseOk) {
        console.log('🎉 ¡Tu chatbot está completamente configurado!');
        console.log('🔄 Recarga la página para activar el chatbot');
    } else {
        console.log('⚠️  Tu chatbot necesita configuración adicional');
        if (!huggingFaceOk) {
            console.log('   - Necesitas configurar HUGGING_FACE_TOKEN');
        }
        if (!firebaseOk) {
            console.log('   - Necesitas configurar Firebase');
        }
    }
    
    return { huggingFaceOk, firebaseOk };
}

// Función para configurar automáticamente desde valores conocidos
function autoSetup() {
    console.log('🤖 Configuración automática...');
    
    // Configurar Firebase con los valores que ya tienes
    const firebaseConfig = {
        apiKey: 'AIzaSyCasgTfvpgBZtcdWeQm9ZarKux_S5NbJsA',
        authDomain: 'expo-project-4c968.firebaseapp.com',
        projectId: 'expo-project-4c968',
        storageBucket: 'expo-project-4c968.firebasestorage.app',
        messagingSenderId: '358955898614',
        appId: '1:358955898614:web:4d8a59e1dd70c2e49efed7'
    };
    
    setFirebaseConfig(firebaseConfig);
    
    console.log('📝 Ahora solo necesitas configurar tu token de Hugging Face:');
    console.log('   setHuggingFaceToken("tu_token_aqui");');
}

// Mostrar ayuda inicial
setupFromEnv();

// Exportar funciones para uso global
window.setHuggingFaceToken = setHuggingFaceToken;
window.setFirebaseConfig = setFirebaseConfig;
window.getCurrentConfig = getCurrentConfig;
window.clearConfig = clearConfig;
window.checkConfigStatus = checkConfigStatus;
window.autoSetup = autoSetup;

console.log('💡 Tip: Usa autoSetup() para configurar Firebase automáticamente');
console.log('💡 Tip: Usa checkConfigStatus() para ver el estado actual');
