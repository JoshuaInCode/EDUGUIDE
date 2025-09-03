// Auth Manager - Maneja el estado de autenticación y la UI del header
import { auth } from '../firebase/firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        // Escuchar cambios en el estado de autenticación
        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;
            this.isAuthenticated = !!user;
            this.updateHeader();
            this.updatePageContent();
        });
    }

    updateHeader() {
        const navbarNav = document.querySelector('#navbarNav .navbar-nav');
        if (!navbarNav) return;

        // Limpiar elementos de autenticación existentes
        const existingAuthItems = navbarNav.querySelectorAll('.auth-item');
        existingAuthItems.forEach(item => item.remove());

        if (this.isAuthenticated) {
            // Usuario autenticado - mostrar perfil y logout
            this.showAuthenticatedHeader(navbarNav);
        } else {
            // Usuario no autenticado - mostrar login y signup
            this.showUnauthenticatedHeader(navbarNav);
        }
    }

    showAuthenticatedHeader(navbarNav) {
        // Determinar la ruta base según la página actual
        const isInPages = window.location.pathname.includes('/pages/');
        const basePath = isInPages ? '' : 'pages/';
        
        // Crear elemento de perfil
        const profileItem = document.createElement('li');
        profileItem.className = 'nav-item auth-item ms-3';
        profileItem.innerHTML = `
            <a class="nav-link btn btn-primary btn-sm" href="${basePath}dashboard.html" style="border-radius: 20px; padding: 8px 20px; background: linear-gradient(135deg, #1769aa, #2196f3); border: none; color: white; font-weight: 600; transition: all 0.3s ease;">
                <i class="fas fa-user me-1"></i>Mi Perfil
            </a>
        `;

        // Crear elemento de logout
        const logoutItem = document.createElement('li');
        logoutItem.className = 'nav-item auth-item ms-2';
        logoutItem.innerHTML = `
            <a class="nav-link btn btn-outline-danger btn-sm" href="#" onclick="authManager.logout()" style="border-radius: 20px; padding: 8px 20px; border: 2px solid #dc3545; color: #dc3545; font-weight: 600; transition: all 0.3s ease;">
                <i class="fas fa-sign-out-alt me-1"></i>Cerrar Sesión
            </a>
        `;

        navbarNav.appendChild(profileItem);
        navbarNav.appendChild(logoutItem);
    }

    showUnauthenticatedHeader(navbarNav) {
        // Determinar la ruta base según la página actual
        const isInPages = window.location.pathname.includes('/pages/');
        const basePath = isInPages ? '' : 'pages/';
        
        // Crear elemento de login
        const loginItem = document.createElement('li');
        loginItem.className = 'nav-item auth-item ms-3';
        loginItem.innerHTML = `
            <a class="nav-link btn btn-outline-primary btn-sm" href="${basePath}login.html" style="border-radius: 20px; padding: 8px 20px; border: 2px solid #2196f3; color: #2196f3; font-weight: 600; transition: all 0.3s ease;">
                <i class="fas fa-sign-in-alt me-1"></i>Login
            </a>
        `;

        // Crear elemento de signup
        const signupItem = document.createElement('li');
        signupItem.className = 'nav-item auth-item ms-2';
        signupItem.innerHTML = `
            <a class="nav-link btn btn-primary btn-sm" href="${basePath}signup.html" style="border-radius: 20px; padding: 8px 20px; background: linear-gradient(135deg, #1769aa, #2196f3); border: none; color: white; font-weight: 600; transition: all 0.3s ease;">
                <i class="fas fa-user-plus me-1"></i>Sign Up
            </a>
        `;

        navbarNav.appendChild(loginItem);
        navbarNav.appendChild(signupItem);
    }

    updatePageContent() {
        // Si estamos en el dashboard y no hay usuario autenticado, redirigir
        if (window.location.pathname.includes('dashboard.html') && !this.isAuthenticated) {
            const isInPages = window.location.pathname.includes('/pages/');
            const redirectPath = isInPages ? '../index.html' : 'index.html';
            window.location.href = redirectPath;
            return;
        }

        // Si estamos en login/signup y ya hay usuario autenticado, redirigir al dashboard
        if ((window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) && this.isAuthenticated) {
            const isInPages = window.location.pathname.includes('/pages/');
            const redirectPath = isInPages ? 'dashboard.html' : 'pages/dashboard.html';
            window.location.href = redirectPath;
            return;
        }
    }

    async logout() {
        try {
            await signOut(auth);
            console.log('Usuario cerró sesión exitosamente');
            
            // Mostrar mensaje de éxito
            this.showMessage('Sesión cerrada exitosamente', 'success');
            
            // Redirigir a la página principal
            setTimeout(() => {
                const isInPages = window.location.pathname.includes('/pages/');
                const redirectPath = isInPages ? '../index.html' : 'index.html';
                window.location.href = redirectPath;
            }, 1500);
            
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            this.showMessage('Error al cerrar sesión', 'error');
        }
    }

    showMessage(message, type = 'info') {
        // Crear elemento de mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message auth-message-${type}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        // Configurar colores según el tipo
        switch (type) {
            case 'success':
                messageDiv.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
                messageDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
                break;
            case 'error':
                messageDiv.style.background = 'linear-gradient(135deg, #f44336, #e57373)';
                messageDiv.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i>${message}`;
                break;
            default:
                messageDiv.style.background = 'linear-gradient(135deg, #2196f3, #42a5f5)';
                messageDiv.innerHTML = `<i class="fas fa-info-circle me-2"></i>${message}`;
        }

        document.body.appendChild(messageDiv);

        // Remover después de 3 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isUserAuthenticated() {
        return this.isAuthenticated;
    }
}

// Crear instancia global
window.authManager = new AuthManager();

// Agregar estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

export default window.authManager;
