/**
 * Title Animations Enhancement Script
 * Mejora las animaciones de títulos usando Intersection Observer
 */

(function() {
    'use strict';

    // Configuración de las animaciones
    const ANIMATION_CONFIG = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Función para crear animaciones escalonadas
    function createStaggeredAnimation(elements, delay = 0.1) {
        elements.forEach((element, index) => {
            element.style.animationDelay = `${delay * index}s`;
        });
    }

    // Función para animar elementos cuando entran en el viewport
    function animateOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Agregar clase de animación activa
                element.classList.add('animate-in');
                
                // Remover el observer después de la animación
                observer.unobserve(element);
            }
        });
    }

    // Función para inicializar las animaciones
    function initAnimations() {
        // Crear Intersection Observer
        const observer = new IntersectionObserver(animateOnScroll, ANIMATION_CONFIG);

        // Animar títulos de categorías
        const categoryTitles = document.querySelectorAll('.category-title-animation');
        createStaggeredAnimation(categoryTitles, 0.2);
        categoryTitles.forEach(title => observer.observe(title));

        // Animar títulos de programas/becas
        const programTitles = document.querySelectorAll('.program-title-animation');
        createStaggeredAnimation(programTitles, 0.15);
        programTitles.forEach(title => observer.observe(title));

        // Animar títulos de universidades
        const universityTitles = document.querySelectorAll('.university-title');
        createStaggeredAnimation(universityTitles, 0.1);
        universityTitles.forEach(title => observer.observe(title));

        // Animar elementos con animación escalonada
        const staggerElements = document.querySelectorAll('.stagger-animation');
        createStaggeredAnimation(staggerElements, 0.1);
        staggerElements.forEach(element => observer.observe(element));

        console.log('🎬 Animaciones de títulos inicializadas');
    }

    // Función para agregar efectos hover mejorados
    function addHoverEffects() {
        const animatedTitles = document.querySelectorAll('.section-title-animation, .category-title-animation, .program-title-animation, .university-title');
        
        animatedTitles.forEach(title => {
            title.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            title.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Función para agregar animaciones de scroll suave
    function addSmoothScrollAnimations() {
        const animatedElements = document.querySelectorAll('.section-title-animation, .section-subtitle-animation, .category-title-animation, .program-title-animation, .university-title');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    // Función para activar animaciones cuando el elemento es visible
    function activateAnimation(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    // Función para crear animaciones personalizadas basadas en el tipo de elemento
    function createCustomAnimations() {
        // Animación para títulos principales
        const mainTitles = document.querySelectorAll('.section-title-animation');
        mainTitles.forEach((title, index) => {
            title.style.animationDelay = `${0.2 + (index * 0.1)}s`;
        });

        // Animación para subtítulos
        const subtitles = document.querySelectorAll('.section-subtitle-animation');
        subtitles.forEach((subtitle, index) => {
            subtitle.style.animationDelay = `${0.4 + (index * 0.1)}s`;
        });

        // Animación para categorías
        const categories = document.querySelectorAll('.category-title-animation');
        categories.forEach((category, index) => {
            category.style.animationDelay = `${0.6 + (index * 0.15)}s`;
        });

        // Animación para programas/becas
        const programs = document.querySelectorAll('.program-title-animation');
        programs.forEach((program, index) => {
            program.style.animationDelay = `${0.8 + (index * 0.1)}s`;
        });
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initAnimations, 100);
            setTimeout(addHoverEffects, 200);
            setTimeout(createCustomAnimations, 300);
        });
    } else {
        setTimeout(initAnimations, 100);
        setTimeout(addHoverEffects, 200);
        setTimeout(createCustomAnimations, 300);
    }

    // Reinicializar animaciones cuando cambie el tamaño de la ventana
    window.addEventListener('resize', function() {
        setTimeout(initAnimations, 100);
    });

    // Función para reiniciar animaciones (útil para navegación SPA)
    window.resetTitleAnimations = function() {
        setTimeout(initAnimations, 100);
        setTimeout(addHoverEffects, 200);
        setTimeout(createCustomAnimations, 300);
    };

})();
