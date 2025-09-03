# ✅ Verificación Rápida - EduGuide Firebase

## 🚀 Pasos para verificar que todo funcione:

### 1. **Abrir el servidor local**
```bash
# En la terminal, desde la carpeta del proyecto:
python -m http.server 8000
```

### 2. **Probar la configuración de Firebase**
1. Abre en tu navegador: `http://localhost:8000/public/test-firebase.html`
2. Haz clic en "Test Signup" para crear una cuenta de prueba
3. Haz clic en "Test Login" para verificar el login
4. Haz clic en "Test Firestore" para verificar la base de datos

### 3. **Probar el registro**
1. Abre: `http://localhost:8000/public/pages/signup.html`
2. Llena el formulario con datos de prueba
3. Haz clic en "Create Account"
4. Debería redirigir al dashboard

### 4. **Probar el login**
1. Abre: `http://localhost:8000/public/pages/login.html`
2. Usa las credenciales que creaste en el paso anterior
3. Haz clic en "Sign In"
4. Debería redirigir al dashboard

### 5. **Verificar Firebase Console**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto "expo-project-4c968"
3. Ve a **Authentication** > **Users** - deberías ver usuarios registrados
4. Ve a **Firestore Database** > **Data** - deberías ver datos de usuarios

## 🔧 Si algo no funciona:

### **Error: "auth/operation-not-allowed"**
- Ve a Firebase Console > Authentication > Sign-in method
- Habilita "Email/Password"

### **Error: "auth/invalid-credential"**
- Verifica que el email y contraseña sean correctos
- Si es un usuario nuevo, regístrate primero

### **Error: "auth/too-many-requests"**
- Espera 5-10 minutos
- Limpia el caché del navegador

### **Los datos no se guardan en Firestore**
- Ve a Firestore Database > Rules
- Asegúrate de que las reglas estén publicadas
- Las reglas deben permitir escritura para usuarios autenticados

## 📝 Reglas de Firestore actualizadas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public data that anyone can read
    match /universities/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /scholarships/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /careers/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Test collection for debugging
    match /test/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Default deny all
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## ✅ Estado esperado:

- ✅ Firebase Auth habilitado
- ✅ Firestore Database creado
- ✅ Reglas de seguridad publicadas
- ✅ Usuarios pueden registrarse
- ✅ Usuarios pueden hacer login
- ✅ Datos se guardan en Firestore
- ✅ Dashboard muestra información del usuario
- ✅ Logout funciona correctamente

## 🎯 Próximos pasos:

1. **Prueba la página de test** para verificar la configuración
2. **Registra un usuario** en signup.html
3. **Haz login** con las credenciales creadas
4. **Verifica el dashboard** muestra la información correcta
5. **Prueba el logout** y verifica que redirija al login

¡Todo debería funcionar perfectamente ahora! 🚀
