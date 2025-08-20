# Sistema de Autenticación EduGuide

## Descripción

Este sistema implementa una autenticación persistente que mantiene la sesión del usuario a través de todas las páginas de EduGuide. El header cambia dinámicamente según el estado de autenticación del usuario.

## Características

### 🔐 Autenticación Persistente
- La sesión se mantiene automáticamente entre páginas
- Usa Firebase Auth con persistencia local
- No es necesario volver a iniciar sesión al navegar

### 🎨 Header Dinámico
- **Usuario NO autenticado**: Muestra botones "Login" y "Sign Up"
- **Usuario autenticado**: Muestra "Mi Perfil" y "Cerrar Sesión"

### 🛡️ Protección de Rutas
- **Dashboard**: Solo accesible para usuarios autenticados
- **Login/Signup**: Redirige al dashboard si ya está autenticado
- **Redirecciones automáticas** según el estado de autenticación

## Archivos Principales

### `public/js/auth-manager.js`
- Maneja toda la lógica de autenticación
- Actualiza el header dinámicamente
- Controla las redirecciones automáticas
- Gestiona el logout

### `public/firebase/firebase-config.js`
- Configuración de Firebase
- Inicialización de Auth y Firestore
- Persistencia de sesión

## Funcionalidades

### Inicio de Sesión
1. Usuario ingresa credenciales en `/pages/login.html`
2. Se autentica con Firebase Auth
3. Se redirige automáticamente al dashboard
4. El header cambia a mostrar opciones de usuario autenticado

### Registro
1. Usuario completa formulario en `/pages/signup.html`
2. Se crea cuenta en Firebase Auth
3. Se guarda información adicional en Firestore
4. Se redirige al dashboard

### Navegación
- Al navegar entre páginas, el header mantiene el estado correcto
- Las rutas se ajustan automáticamente según la ubicación actual
- Mensajes de confirmación para acciones importantes

### Cerrar Sesión
- Botón "Cerrar Sesión" en el header
- Limpia la sesión de Firebase
- Redirige a la página principal
- Muestra mensaje de confirmación

## Implementación en Páginas

### Páginas con Header Dinámico
- `index.html` (página principal)
- `pages/universities.html`
- `pages/careers.html`
- `pages/scholarships.html`
- `pages/contact.html`
- `pages/dashboard.html`

### Cómo Agregar a una Nueva Página

1. **Remover botones estáticos de autenticación** del header:
```html
<!-- Remover estos elementos -->
<li class="nav-item ms-3">
    <a class="nav-link btn btn-outline-primary btn-sm" href="login.html">Login</a>
</li>
<li class="nav-item ms-2">
    <a class="nav-link btn btn-primary btn-sm" href="signup.html">Sign Up</a>
</li>

<!-- Reemplazar con: -->
<!-- Los elementos de autenticación se cargarán dinámicamente aquí -->
```

2. **Agregar el script de autenticación** antes del cierre de `</body>`:
```html
<!-- Firebase Auth Manager -->
<script type="module" src="../js/auth-manager.js"></script>
```

## Estados del Header

### Usuario No Autenticado
```
[Login] [Sign Up]
```

### Usuario Autenticado
```
[Mi Perfil] [Cerrar Sesión]
```

## Mensajes del Sistema

### Tipos de Mensajes
- **Éxito**: Verde - Confirmaciones de acciones exitosas
- **Error**: Rojo - Errores y problemas
- **Info**: Azul - Información general

### Ubicación
- Aparecen en la esquina superior derecha
- Desaparecen automáticamente después de 3 segundos
- Animaciones suaves de entrada y salida

## Seguridad

### Firebase Auth
- Autenticación segura con email/contraseña
- Tokens JWT automáticos
- Persistencia local segura

### Firestore
- Reglas de seguridad configuradas
- Datos de usuario protegidos
- Solo el usuario puede acceder a sus datos

## Troubleshooting

### Problemas Comunes

1. **Header no cambia después del login**
   - Verificar que `auth-manager.js` esté cargado
   - Revisar la consola del navegador para errores

2. **Redirecciones incorrectas**
   - Verificar rutas relativas en el auth manager
   - Asegurar que las rutas sean correctas según la ubicación de la página

3. **Sesión se pierde**
   - Verificar configuración de Firebase
   - Revisar reglas de Firestore

### Debug
- Abrir consola del navegador (F12)
- Buscar mensajes de `authManager`
- Verificar estado de Firebase Auth

## Próximas Mejoras

- [ ] Perfil de usuario editable
- [ ] Recuperación de contraseña
- [ ] Autenticación con Google/Facebook
- [ ] Notificaciones push
- [ ] Historial de actividades del usuario
