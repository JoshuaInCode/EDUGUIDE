# 🚀 Configuración del Chatbot EduGuide

## 📋 Resumen

Tu chatbot ya está completamente implementado y funcionando. Solo necesitas configurar el **token de Hugging Face** para que la IA funcione correctamente.

## 🔧 Configuración Rápida

### Opción 1: Configuración Automática (Recomendada)

1. **Abre tu sitio web** en el navegador
2. **Abre la consola del navegador** (F12 → Console)
3. **Ejecuta este comando:**
   ```javascript
   autoSetup()
   ```
4. **Configura tu token de Hugging Face:**
   ```javascript
   setHuggingFaceToken("tu_token_aqui")
   ```
5. **Recarga la página**

### Opción 2: Página de Configuración Visual

1. **Ve a:** `public/chatbot-config.html`
2. **Llena el formulario** con tus credenciales
3. **Guarda la configuración**

## 🔑 Obtener Token de Hugging Face

1. Ve a [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Inicia sesión o crea una cuenta
3. Haz clic en "New token"
4. Dale un nombre (ej: "EduGuide Chatbot")
5. Selecciona "Read" permissions
6. Copia el token generado (empieza con `hf_`)

## 📁 Estructura de Archivos

```
public/
├── js/
│   ├── config.js          # Configuración del chatbot
│   ├── setup-env.js       # Script de configuración
│   └── chatbot.js         # Lógica del chatbot
├── chatbot-config.html     # Página de configuración visual
└── chatbot-demo.html      # Página de demostración
```

## 🛠️ Comandos de Consola Disponibles

| Comando | Descripción |
|---------|-------------|
| `autoSetup()` | Configura Firebase automáticamente |
| `setHuggingFaceToken("token")` | Configura el token de Hugging Face |
| `getCurrentConfig()` | Muestra la configuración actual |
| `checkConfigStatus()` | Verifica el estado de la configuración |
| `clearConfig()` | Limpia toda la configuración |

## ✅ Verificación

Después de configurar, ejecuta:
```javascript
checkConfigStatus()
```

Deberías ver:
```
🔍 Estado de la configuración:
   Hugging Face: ✅ Configurado
   Firebase: ✅ Configurado
🎉 ¡Tu chatbot está completamente configurado!
```

## 🚨 Solución de Problemas

### Error: "HUGGING_FACE_TOKEN no configurado"
- Ejecuta: `setHuggingFaceToken("tu_token_aqui")`
- Recarga la página

### Error: "Configuración de Firebase no completada"
- Ejecuta: `autoSetup()`
- Recarga la página

### El chatbot no aparece
- Verifica que los scripts estén cargados
- Revisa la consola del navegador para errores
- Ejecuta: `checkConfigStatus()`

## 🔄 Flujo de Trabajo

1. **Configurar credenciales** (una sola vez)
2. **Recargar página** para aplicar cambios
3. **Probar chatbot** haciendo clic en el ícono
4. **Verificar respuestas** de la IA

## 📱 Funcionalidades del Chatbot

- ✅ **IA Inteligente** con Hugging Face
- ✅ **Integración con Firebase** para datos
- ✅ **Interfaz moderna** y responsive
- ✅ **Persistencia** de conversaciones
- ✅ **Integrado en todas las páginas**
- ✅ **Configuración fácil** desde consola

## 🎯 Próximos Pasos

1. **Configura el token** de Hugging Face
2. **Prueba el chatbot** en tu sitio
3. **Personaliza respuestas** si es necesario
4. **Monitorea el uso** desde la consola

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa la consola del navegador
2. Ejecuta `checkConfigStatus()`
3. Verifica que tu token de Hugging Face sea válido
4. Asegúrate de recargar la página después de configurar

¡Tu chatbot estará funcionando en minutos! 🚀
