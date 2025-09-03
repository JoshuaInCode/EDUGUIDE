# Configuración de Firebase para EduGuide

## Pasos para configurar Firebase

### 1. Configurar Firebase Auth
1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Authentication** > **Sign-in method**
4. Habilita **Email/Password** como método de autenticación
5. Opcionalmente, habilita **Google** y **Facebook** si quieres usar login social

### 2. Configurar Firestore Database
1. Ve a **Firestore Database** en la consola
2. Crea una nueva base de datos si no existe
3. Selecciona **Start in test mode** para desarrollo
4. Elige la ubicación más cercana a tus usuarios

### 3. Configurar Reglas de Seguridad
1. Ve a **Firestore Database** > **Rules**
2. Reemplaza las reglas existentes con el contenido del archivo `firestore.rules`
3. Publica las reglas

### 4. Estructura de Datos en Firestore

#### Colección: `users`
Cada documento representa un usuario registrado:

```json
{
  "uid": "user_id_from_firebase_auth",
  "email": "usuario@ejemplo.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+1234567890",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "profileCompleted": true,
  "role": "student"
}
```

### 5. Verificar Configuración
1. Asegúrate de que el archivo `public/firebase/firebase-config.js` tenga las credenciales correctas
2. Verifica que las reglas de Firestore estén publicadas
3. Prueba el registro de un nuevo usuario
4. Verifica que el usuario pueda hacer login después del registro

## Flujo de Autenticación

### Registro (signup.html)
1. Usuario llena el formulario de registro
2. Se crea cuenta en Firebase Auth
3. Se guardan datos adicionales en Firestore
4. Usuario es redirigido al dashboard

### Login (login.html)
1. Usuario ingresa email y contraseña
2. Se verifica contra Firebase Auth
3. Si es correcto, se redirige al dashboard
4. Si es incorrecto, se muestra mensaje de error

### Dashboard (dashboard.html)
1. Se verifica que el usuario esté autenticado
2. Se obtienen datos del usuario desde Firestore
3. Se muestra información personalizada
4. Usuario puede cerrar sesión

## Solución de Problemas

### Error: "Firebase: Error (auth/invalid-credential)"
**Causa:** Las credenciales no son válidas o el usuario no existe.
**Solución:**
1. Verifica que el email esté escrito correctamente
2. Asegúrate de que la contraseña sea la correcta
3. Si es un usuario nuevo, regístrate primero en signup.html
4. Verifica que Email/Password esté habilitado en Firebase Console

### Error: "Firebase: Error (auth/too-many-requests)"
**Causa:** Demasiados intentos fallidos de login.
**Solución:**
1. Espera 5-10 minutos antes de intentar de nuevo
2. Verifica que las credenciales sean correctas
3. Limpia el caché del navegador
4. Intenta desde una ventana de incógnito

### Error: "Firebase: Error (auth/operation-not-allowed)"
**Causa:** El método de autenticación no está habilitado.
**Solución:**
1. Ve a Firebase Console > Authentication > Sign-in method
2. Habilita "Email/Password"
3. Guarda los cambios

### Error: "Firebase: Error (auth/network-request-failed)"
**Causa:** Problemas de conexión.
**Solución:**
1. Verifica tu conexión a internet
2. Asegúrate de que las reglas de Firestore permitan acceso
3. Verifica que no haya bloqueadores de anuncios interfiriendo

### Error: "Firebase: Error (auth/email-already-in-use)"
**Causa:** El email ya está registrado.
**Solución:**
1. Usa otro email para registrarte
2. O intenta hacer login con las credenciales existentes
3. Si olvidaste la contraseña, usa la función de recuperación

### Los datos no se guardan en Firestore
**Causa:** Problemas con las reglas de seguridad o autenticación.
**Solución:**
1. Verifica que las reglas de Firestore permitan escritura
2. Revisa la consola del navegador para errores específicos
3. Asegúrate de que el usuario esté autenticado antes de escribir datos
4. Verifica que la configuración de Firebase sea correcta

## Pasos de Verificación

### 1. Probar la configuración
1. Abre `public/test-firebase.html` en tu navegador
2. Haz clic en "Test Signup" para crear una cuenta de prueba
3. Haz clic en "Test Login" para verificar el login
4. Haz clic en "Test Firestore" para verificar la base de datos

### 2. Verificar Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto "expo-project-4c968"
3. Ve a Authentication > Users para ver usuarios registrados
4. Ve a Firestore Database > Data para ver datos guardados

### 3. Verificar reglas de Firestore
1. Ve a Firestore Database > Rules
2. Asegúrate de que las reglas permitan lectura/escritura para usuarios autenticados
3. Las reglas deben estar publicadas

### 4. Limpiar caché y cookies
1. Abre las herramientas de desarrollador (F12)
2. Ve a Application > Storage
3. Limpia IndexedDB, Local Storage y Session Storage
4. Recarga la página

## Seguridad

- Las reglas de Firestore aseguran que los usuarios solo puedan acceder a sus propios datos
- Los datos públicos (universidades, becas, carreras) son de solo lectura
- La autenticación se maneja completamente a través de Firebase Auth
