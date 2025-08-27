// EduGuide Chatbot Configuration
// Este archivo lee la configuración desde variables de entorno o usa valores por defecto

// Función para obtener variables de entorno del navegador
function getEnvVar(name, defaultValue = '') {
    // Intentar obtener desde variables globales (si están definidas)
    if (typeof window !== 'undefined' && window.ENV && window.ENV[name]) {
        return window.ENV[name];
    }
    
    // Intentar obtener desde meta tags (si están definidos)
    const metaTag = document.querySelector(`meta[name="${name}"]`);
    if (metaTag) {
        return metaTag.getAttribute('content');
    }
    
    // Intentar obtener desde localStorage (si está configurado)
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(name);
        if (stored) {
            return stored;
        }
    }
    
    return defaultValue;
}

const CHATBOT_CONFIG = {
    // Hugging Face API Token
    // Obtén tu token en: https://huggingface.co/settings/tokens
    HUGGING_FACE_TOKEN: getEnvVar('HUGGING_FACE_TOKEN', 'your_hugging_face_token_here'),
    
    // Firebase Configuration
    // Obtén estos valores de tu proyecto Firebase
    FIREBASE: {
        apiKey: getEnvVar('FIREBASE_API_KEY', 'AIzaSyCasgTfvpgBZtcdWeQm9ZarKux_S5NbJsA'),
        authDomain: getEnvVar('FIREBASE_AUTH_DOMAIN', 'expo-project-4c968.firebaseapp.com'),
        projectId: getEnvVar('FIREBASE_PROJECT_ID', 'expo-project-4c968'),
        storageBucket: getEnvVar('FIREBASE_STORAGE_BUCKET', 'expo-project-4c968.firebasestorage.app'),
        messagingSenderId: getEnvVar('FIREBASE_MESSAGING_SENDER_ID', '358955898614'),
        appId: getEnvVar('FIREBASE_APP_ID', '1:358955898614:web:4d8a59e1dd70c2e49efed7')
    },
    
    // Chatbot Settings
    CHATBOT: {
        enabled: getEnvVar('CHATBOT_ENABLED', 'true') === 'true',
        model: getEnvVar('CHATBOT_MODEL', 'facebook/blenderbot-400M-distill'),
        maxLength: parseInt(getEnvVar('CHATBOT_MAX_LENGTH', '200')),
        temperature: parseFloat(getEnvVar('CHATBOT_TEMPERATURE', '0.7')),
        welcomeMessage: "¡Hola! Soy el asistente virtual de EduGuide. Puedo ayudarte con información sobre universidades, carreras, becas y cualquier consulta sobre educación superior en Panamá. ¿En qué puedo ayudarte hoy?"
    }
};

// Función para validar la configuración
function validateChatbotConfig() {
    const config = CHATBOT_CONFIG;
    
    if (config.HUGGING_FACE_TOKEN === 'your_hugging_face_token_here') {
        console.warn('⚠️ Chatbot: HUGGING_FACE_TOKEN no configurado. El chatbot usará respuestas predefinidas.');
        return false;
    }
    
    if (config.FIREBASE.apiKey === 'your_firebase_api_key_here') {
        console.warn('⚠️ Chatbot: Configuración de Firebase no completada.');
        return false;
    }
    
    console.log('✅ Chatbot: Configuración válida.');
    return true;
}

// Función para obtener la configuración
function getChatbotConfig() {
    return CHATBOT_CONFIG;
}

// Función para configurar variables desde localStorage (útil para desarrollo)
function setConfigFromLocalStorage() {
    const envVars = [
        'HUGGING_FACE_TOKEN',
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_STORAGE_BUCKET',
        'FIREBASE_MESSAGING_SENDER_ID',
        'FIREBASE_APP_ID'
    ];
    
    envVars.forEach(varName => {
        const value = localStorage.getItem(varName);
        if (value) {
            console.log(`📝 Chatbot: Configurando ${varName} desde localStorage`);
        }
    });
}

// Inicializar configuración
setConfigFromLocalStorage();

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CHATBOT_CONFIG, validateChatbotConfig, getChatbotConfig };
}
