// Auth Stability Manager - Mejora la estabilidad visual de los botones de autenticación
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔒 Auth Stability Manager iniciado');
    
    // Función para estabilizar el navbar
    function stabilizeNavbar() {
        const navbar = document.querySelector('.navbar');
        const navbarNav = document.querySelector('#navbarNav .navbar-nav');
        
        if (!navbar || !navbarNav) return;
        
        // Agregar clase de estabilidad
        navbar.classList.add('navbar-stable');
        navbarNav.classList.add('nav-stable');
        
        // Prevenir cambios bruscos en el layout
        navbar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        navbarNav.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Función para manejar cambios de página sin recargar
    function handlePageTransitions() {
        // Interceptar clicks en enlaces del navbar
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.auth-item .nav-link)');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Solo para enlaces internos
                if (this.href && this.href.includes(window.location.origin)) {
                    e.preventDefault();
                    
                    // Agregar clase de transición
                    document.body.classList.add('page-transitioning');
                    
                    // Navegar después de un breve delay
                    setTimeout(() => {
                        window.location.href = this.href;
                    }, 150);
                }
            });
        });
    }
    
    // Función para mantener los botones de autenticación estables
    function maintainAuthButtonsStability() {
        const authItems = document.querySelectorAll('.auth-item');
        
        authItems.forEach(item => {
            // Agregar clase de estabilidad
            item.classList.add('auth-stable');
            
            // Prevenir cambios bruscos
            item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
    
    // Función para detectar cambios en el DOM y estabilizar
    function observeDOMChanges() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // Si se agregaron o removieron nodos, estabilizar
                    setTimeout(() => {
                        maintainAuthButtonsStability();
                    }, 100);
                }
            });
        });
        
        const navbarNav = document.querySelector('#navbarNav .navbar-nav');
        if (navbarNav) {
            observer.observe(navbarNav, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Inicializar todas las funciones
    function init() {
        stabilizeNavbar();
        handlePageTransitions();
        maintainAuthButtonsStability();
        observeDOMChanges();
        
        // Estabilizar después de un breve delay para asegurar que el DOM esté listo
        setTimeout(() => {
            maintainAuthButtonsStability();
        }, 500);
    }
    
    // Ejecutar inicialización
    init();
    
    // Re-estabilizar cuando la ventana gane el foco (para casos de navegación)
    window.addEventListener('focus', function() {
        setTimeout(() => {
            maintainAuthButtonsStability();
        }, 100);
    });
    
    // Re-estabilizar cuando se complete la carga de la página
    window.addEventListener('load', function() {
        setTimeout(() => {
            maintainAuthButtonsStability();
        }, 200);
    });
});

// Agregar estilos CSS adicionales para estabilidad
const stabilityStyles = document.createElement('style');
stabilityStyles.textContent = `
    .navbar-stable {
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1030;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .nav-stable {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .auth-stable {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        will-change: auto !important;
    }
    
    .page-transitioning .navbar {
        opacity: 0.9;
        transform: translateY(-2px);
    }
    
    .page-transitioning .auth-item {
        opacity: 0.8;
    }
    
    /* Prevenir cambios bruscos */
    .navbar * {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    /* Asegurar que los botones mantengan su posición */
    .auth-item {
        position: relative !important;
        z-index: 1;
    }
    
    /* Estilos para evitar saltos */
    .navbar-nav {
        position: relative;
        overflow: visible;
    }
    
    /* Prevenir FOUC */
    .navbar {
        visibility: visible !important;
        opacity: 1 !important;
    }
`;

document.head.appendChild(stabilityStyles);

