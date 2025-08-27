# 🤖 EduGuide Chatbot - Asistente Virtual Inteligente

## Descripción

El **EduGuide Chatbot** es un asistente virtual inteligente integrado en todas las páginas del sitio web EduGuide. Utiliza la API de Hugging Face para proporcionar respuestas inteligentes y contextuales sobre educación superior en Panamá.

## ✨ Características

- **🤖 IA Avanzada**: Integración con modelos de Hugging Face para respuestas inteligentes
- **🌐 Multi-página**: Funciona en todas las páginas del sitio web
- **💬 Chat en tiempo real**: Interfaz de chat moderna y responsiva
- **📱 Responsive**: Diseño adaptativo para móviles y escritorio
- **💾 Persistencia**: Guarda el historial de conversaciones en localStorage
- **🎨 UI Moderna**: Diseño atractivo con animaciones y efectos visuales
- **🔧 Configurable**: Fácil personalización de respuestas y comportamiento

## 🚀 Instalación y Configuración

### 1. Configurar Variables de Entorno

Edita el archivo `public/js/config.js` con tus tokens reales:

```javascript
const CHATBOT_CONFIG = {
    // Token de Hugging Face
    HUGGING_FACE_TOKEN: 'tu_token_real_aqui',
    
    // Configuración de Firebase (opcional)
    FIREBASE: {
        apiKey: 'tu_firebase_api_key',
        authDomain: 'tu_proyecto.firebaseapp.com',
        projectId: 'tu_proyecto_id',
        storageBucket: 'tu_bucket.appspot.com',
        messagingSenderId: 'tu_sender_id',
        appId: 'tu_app_id'
    },
    
    // Configuración del Chatbot
    CHATBOT: {
        enabled: true,
        model: 'facebook/blenderbot-400M-distill',
        maxLength: 200,
        temperature: 0.7,
        welcomeMessage: "¡Hola! Soy el asistente virtual de EduGuide..."
    }
};
```

### 2. Obtener Token de Hugging Face

1. Ve a [Hugging Face](https://huggingface.co/settings/tokens)
2. Crea una cuenta o inicia sesión
3. Genera un nuevo token
4. Copia el token y pégalo en `config.js`

### 3. Verificar Integración

El chatbot ya está integrado en todas las páginas del sitio. Solo necesitas:

1. Configurar el token en `config.js`
2. Recargar cualquier página del sitio
3. Ver el botón flotante del chatbot en la esquina inferior derecha

## 📁 Estructura de Archivos

```
public/
├── js/
│   ├── chatbot.js          # Lógica principal del chatbot
│   └── config.js           # Configuración y tokens
├── pages/
│   ├── index.html          # Página principal (ya integrada)
│   ├── universities.html   # Universidades (ya integrada)
│   ├── careers.html        # Carreras (ya integrada)
│   ├── scholarships.html   # Becas (ya integrada)
│   ├── contact.html        # Contacto (ya integrada)
│   ├── login.html          # Login (ya integrada)
│   ├── signup.html         # Registro (ya integrada)
│   └── dashboard.html      # Dashboard (ya integrada)
└── env.example             # Ejemplo de variables de entorno
```

## 🎯 Funcionalidades del Chatbot

### Respuestas Inteligentes
- **Universidades**: Información sobre instituciones panameñas
- **Carreras**: Orientación sobre programas de estudio
- **Becas**: Información sobre financiamiento y becas
- **Sitio Web**: Explicaciones sobre EduGuide
- **Firebase**: Información técnica sobre la base de datos

### Características de la UI
- **Botón flotante**: Acceso rápido desde cualquier página
- **Chat expandible**: Ventana de chat con animaciones suaves
- **Indicador de escritura**: Muestra cuando el bot está "escribiendo"
- **Historial persistente**: Guarda conversaciones anteriores
- **Responsive**: Se adapta a diferentes tamaños de pantalla

### Interacciones
- **Enter**: Enviar mensaje
- **Escape**: Cerrar chat
- **Click**: Abrir/cerrar chatbot
- **Scroll**: Navegar por el historial

## 🔧 Personalización

### Cambiar Respuestas Predefinidas

Edita el método `getPredefinedResponse()` en `chatbot.js`:

```javascript
getPredefinedResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Agregar nuevas respuestas aquí
    if (lowerMessage.includes('tu_palabra_clave')) {
        return "Tu respuesta personalizada aquí";
    }
    
    // Respuesta por defecto
    return "Respuesta general del chatbot";
}
```

### Cambiar Apariencia

Modifica los estilos en el método `addStyles()` de `chatbot.js`:

```javascript
addStyles() {
    const styles = `
        .chatbot-button {
            background: linear-gradient(135deg, #tu_color1, #tu_color2);
            /* Más personalizaciones... */
        }
    `;
    // ...
}
```

### Cambiar Modelo de IA

Modifica la configuración en `config.js`:

```javascript
CHATBOT: {
    model: 'otro/modelo/aqui',
    maxLength: 300,
    temperature: 0.5
}
```

## 🧪 Testing

### Probar Respuestas Predefinidas
1. Abre cualquier página del sitio
2. Haz clic en el botón del chatbot
3. Escribe preguntas como:
   - "¿Qué universidades hay en Panamá?"
   - "¿Qué carreras ofrecen?"
   - "¿Cómo funciona el sitio?"

### Probar Integración con Hugging Face
1. Configura tu token en `config.js`
2. Recarga la página
3. Verifica en la consola del navegador que no hay errores
4. Haz preguntas complejas para probar la IA

## 🐛 Solución de Problemas

### El chatbot no aparece
- Verifica que `config.js` y `chatbot.js` estén incluidos en la página
- Revisa la consola del navegador para errores
- Asegúrate de que Font Awesome esté cargado

### Error de API de Hugging Face
- Verifica que el token sea válido
- Revisa la consola para mensajes de error específicos
- El chatbot usará respuestas predefinidas como fallback

### Problemas de estilo
- Verifica que no haya conflictos CSS
- El chatbot tiene `z-index: 10000` para estar por encima de otros elementos
- Los estilos se inyectan dinámicamente para evitar conflictos

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Desktop, Tablet, Mobile
- **Frameworks**: Compatible con Bootstrap 5, Font Awesome 6
- **Firebase**: Compatible con Firebase v9+

## 🔒 Seguridad

- **Tokens**: Nunca expongas tokens en código público
- **API Keys**: Mantén las claves de Firebase seguras
- **Validación**: El chatbot valida entradas del usuario
- **Sanitización**: Las respuestas se muestran de forma segura

## 📈 Mejoras Futuras

- [ ] Integración con más modelos de IA
- [ ] Análisis de sentimientos
- [ ] Respuestas multilingües
- [ ] Integración con base de datos en tiempo real
- [ ] Chatbot personalizado por usuario
- [ ] Estadísticas de uso
- [ ] Exportación de conversaciones

## 🤝 Contribución

Para contribuir al desarrollo del chatbot:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Implementa las mejoras
4. Envía un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

- **Email**: eduguide.pa@gmail.com
- **Issues**: Crea un issue en el repositorio
- **Documentación**: Revisa este README y los comentarios en el código

## 📄 Licencia

Este chatbot es parte del proyecto EduGuide y está bajo la misma licencia.

---

**¡El chatbot está listo para usar! 🎉**

Solo configura tu token de Hugging Face y disfruta de un asistente virtual inteligente en tu sitio web.
