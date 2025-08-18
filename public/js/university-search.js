/**
 * University Search and Filter System
 * EduGuide - Professional University Search Functionality
 * Version: 2.0
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        searchDelay: 300,
        animationDuration: 300,
        fadeInDuration: 200,
        fadeOutDuration: 200
    };
    
    // University data mapping
    const UNIVERSITY_DATA = {
        'up-block': { name: 'University of Panama', province: 'panama', keywords: ['universidad', 'panama', 'up', 'ancon'] },
        'utp-block': { name: 'Technological University of Panama', province: 'panama', keywords: ['utp', 'tecnologica', 'ingenieria', 'tecnologia'] },
        'udelas-block': { name: 'UDELAS', province: 'panama', keywords: ['udelas', 'salud', 'educacion', 'especial'] },
        'umip-block': { name: 'Maritime University of Panama', province: 'panama', keywords: ['umip', 'maritima', 'nautica', 'maritimo'] },
        'unachi-block': { name: 'UNACHI', province: 'chiriqui', keywords: ['unachi', 'chiriqui', 'david', 'occidental'] },
        'ulatina-block': { name: 'Latin University of Panama', province: 'panama', keywords: ['latina', 'ulatina', 'privada', 'innovacion'] },
        'usma-block': { name: 'Santa María La Antigua Catholic University', province: 'panama', keywords: ['usma', 'catolica', 'humanidades', 'sociales'] },
        'uip-block': { name: 'Interamerican University of Panama', province: 'panama', keywords: ['uip', 'interamericana', 'negocios', 'tecnologia'] },
        'udi-block': { name: 'Isthmus University', province: 'panama', keywords: ['udi', 'istmo', 'isthmus', 'negocios'] },
        'upancon-block': { name: 'University of Panama - Ancon', province: 'panama', keywords: ['up', 'ancon', 'panama', 'campus'] },
        'utpveraguas-block': { name: 'UTP - Veraguas Campus', province: 'veraguas', keywords: ['utp', 'veraguas', 'santiago', 'regional'] },
        'udelaschiriqui-block': { name: 'UDELAS - Chiriqui Campus', province: 'chiriqui', keywords: ['udelas', 'chiriqui', 'david', 'salud'] },
        'umipcolon-block': { name: 'UMIP - Colon Campus', province: 'colon', keywords: ['umip', 'colon', 'maritimo', 'portuario'] },
        'unachibocas-block': { name: 'UNACHI - Bocas del Toro', province: 'bocas-del-toro', keywords: ['unachi', 'bocas', 'turismo', 'ambiental'] },
        'ulatinavg-block': { name: 'ULatina - Veraguas Campus', province: 'veraguas', keywords: ['ulatina', 'veraguas', 'santiago', 'negocios'] },
        'usmachiriqui-block': { name: 'USMA - Chiriqui Campus', province: 'chiriqui', keywords: ['usma', 'chiriqui', 'david', 'humanidades'] },
        'uipchiriqui-block': { name: 'UIP - Chiriqui Campus', province: 'chiriqui', keywords: ['uip', 'chiriqui', 'david', 'negocios'] },
        'udichiriqui-block': { name: 'UDI - Chiriqui Campus', province: 'chiriqui', keywords: ['udi', 'chiriqui', 'david', 'istmo'] }
    };
    
    // State management
    let state = {
        searchTerm: '',
        selectedProvince: '',
        isInitialized: false,
        searchTimeout: null
    };
    
    // DOM elements cache
    let elements = {
        searchInput: null,
        provinceFilter: null,
        universityCards: [],
        searchContainer: null,
        noResultsMessage: null
    };
    
    /**
     * Initialize the search system
     */
    function initializeSearch() {
        try {
            // Get DOM elements
            elements.searchInput = document.getElementById('universitySearch');
            elements.provinceFilter = document.getElementById('provinceFilter');
            elements.universityCards = document.querySelectorAll('.faculty-div');
            elements.searchContainer = document.querySelector('.search-filter-container');
            
            // Validate elements exist
            if (!validateElements()) {
                console.warn('Search elements not found, retrying...');
                setTimeout(initializeSearch, 500);
                return;
            }
            
            // Create no results message
            createNoResultsMessage();
            
            // Add event listeners
            addEventListeners();
            
            // Initialize state
            state.isInitialized = true;
            
            // Add loading animation
            addLoadingAnimation();
            
            console.log('✅ University search system initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing search system:', error);
        }
    }
    
    /**
     * Validate that all required elements exist
     */
    function validateElements() {
        return elements.searchInput && 
               elements.provinceFilter && 
               elements.universityCards.length > 0 &&
               elements.searchContainer;
    }
    
    /**
     * Create no results message element
     */
    function createNoResultsMessage() {
        if (elements.noResultsMessage) return;
        
        elements.noResultsMessage = document.createElement('div');
        elements.noResultsMessage.className = 'no-results-message';
        elements.noResultsMessage.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No se encontraron universidades</h4>
                <p class="text-muted">Intenta con otros términos de búsqueda o cambia el filtro de provincia</p>
            </div>
        `;
        elements.noResultsMessage.style.display = 'none';
        
        // Insert after search container
        elements.searchContainer.parentNode.insertBefore(
            elements.noResultsMessage, 
            elements.searchContainer.nextSibling
        );
    }
    
    /**
     * Add event listeners to search elements
     */
    function addEventListeners() {
        // Search input events
        elements.searchInput.addEventListener('input', handleSearchInput);
        elements.searchInput.addEventListener('focus', handleSearchFocus);
        elements.searchInput.addEventListener('blur', handleSearchBlur);
        
        // Province filter events
        elements.provinceFilter.addEventListener('change', handleProvinceChange);
        
        // Keyboard navigation
        elements.searchInput.addEventListener('keydown', handleKeyboardNavigation);
        
        // Clear search on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                clearSearch();
            }
        });
    }
    
    /**
     * Handle search input changes
     */
    function handleSearchInput(event) {
        const searchTerm = event.target.value.trim().toLowerCase();
        state.searchTerm = searchTerm;
        
        // Clear previous timeout
        if (state.searchTimeout) {
            clearTimeout(state.searchTimeout);
        }
        
        // Add loading state
        addSearchLoadingState();
        
        // Debounce search
        state.searchTimeout = setTimeout(() => {
            performSearch();
        }, CONFIG.searchDelay);
    }
    
    /**
     * Handle search input focus
     */
    function handleSearchFocus() {
        elements.searchInput.parentElement.classList.add('search-focused');
    }
    
    /**
     * Handle search input blur
     */
    function handleSearchBlur() {
        elements.searchInput.parentElement.classList.remove('search-focused');
    }
    
    /**
     * Handle province filter change
     */
    function handleProvinceChange(event) {
        state.selectedProvince = event.target.value;
        performSearch();
    }
    
    /**
     * Handle keyboard navigation
     */
    function handleKeyboardNavigation(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Trigger search or navigate to first result
            const visibleCards = getVisibleCards();
            if (visibleCards.length > 0) {
                visibleCards[0].focus();
            }
        }
    }
    
    /**
     * Perform the actual search and filtering
     */
    function performSearch() {
        try {
            const visibleCards = [];
            let hasVisibleCards = false;
            
            elements.universityCards.forEach(card => {
                const cardId = card.id;
                const universityData = UNIVERSITY_DATA[cardId];
                
                if (!universityData) {
                    console.warn(`No data found for university card: ${cardId}`);
                    return;
                }
                
                const isVisible = matchesSearchCriteria(cardId, universityData);
                
                if (isVisible) {
                    showCard(card);
                    visibleCards.push(card);
                    hasVisibleCards = true;
                } else {
                    hideCard(card);
                }
            });
            
            // Show/hide no results message
            toggleNoResultsMessage(!hasVisibleCards);
            
            // Update search statistics
            updateSearchStats(visibleCards.length);
            
            // Remove loading state
            removeSearchLoadingState();
            
        } catch (error) {
            console.error('❌ Error performing search:', error);
            removeSearchLoadingState();
        }
    }
    
    /**
     * Check if a university matches the search criteria
     */
    function matchesSearchCriteria(cardId, universityData) {
        const { name, province, keywords } = universityData;
        
        // Check province filter
        if (state.selectedProvince && province !== state.selectedProvince) {
            return false;
        }
        
        // Check search term
        if (!state.searchTerm) {
            return true;
        }
        
        // Search in name and keywords
        const searchableText = [
            name.toLowerCase(),
            ...keywords,
            cardId.toLowerCase()
        ].join(' ');
        
        return searchableText.includes(state.searchTerm);
    }
    
    /**
     * Show a university card with animation
     */
    function showCard(card) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = `opacity ${CONFIG.fadeInDuration}ms ease, transform ${CONFIG.fadeInDuration}ms ease`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);
    }
    
    /**
     * Hide a university card with animation
     */
    function hideCard(card) {
        card.style.transition = `opacity ${CONFIG.fadeOutDuration}ms ease, transform ${CONFIG.fadeOutDuration}ms ease`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            card.style.display = 'none';
        }, CONFIG.fadeOutDuration);
    }
    
    /**
     * Get currently visible cards
     */
    function getVisibleCards() {
        return Array.from(elements.universityCards).filter(card => 
            card.style.display !== 'none' && card.style.opacity !== '0'
        );
    }
    
    /**
     * Toggle no results message
     */
    function toggleNoResultsMessage(show) {
        if (!elements.noResultsMessage) return;
        
        if (show) {
            elements.noResultsMessage.style.display = 'block';
            elements.noResultsMessage.style.opacity = '0';
            setTimeout(() => {
                elements.noResultsMessage.style.transition = `opacity ${CONFIG.fadeInDuration}ms ease`;
                elements.noResultsMessage.style.opacity = '1';
            }, 10);
        } else {
            elements.noResultsMessage.style.opacity = '0';
            setTimeout(() => {
                elements.noResultsMessage.style.display = 'none';
            }, CONFIG.fadeOutDuration);
        }
    }
    
    /**
     * Update search statistics
     */
    function updateSearchStats(visibleCount) {
        const totalCount = elements.universityCards.length;
        console.log(`🔍 Search results: ${visibleCount}/${totalCount} universities found`);
    }
    
    /**
     * Clear search and reset filters
     */
    function clearSearch() {
        state.searchTerm = '';
        state.selectedProvince = '';
        
        elements.searchInput.value = '';
        elements.provinceFilter.value = '';
        
        // Show all cards
        elements.universityCards.forEach(card => {
            showCard(card);
        });
        
        // Hide no results message
        toggleNoResultsMessage(false);
        
        // Update stats
        updateSearchStats(elements.universityCards.length);
    }
    
    /**
     * Add loading animation to search
     */
    function addSearchLoadingState() {
        elements.searchInput.classList.add('searching');
    }
    
    /**
     * Remove loading animation from search
     */
    function removeSearchLoadingState() {
        elements.searchInput.classList.remove('searching');
    }
    
    /**
     * Add initial loading animation
     */
    function addLoadingAnimation() {
        elements.searchContainer.style.opacity = '0';
        elements.searchContainer.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            elements.searchContainer.style.transition = `opacity ${CONFIG.fadeInDuration}ms ease, transform ${CONFIG.fadeInDuration}ms ease`;
            elements.searchContainer.style.opacity = '1';
            elements.searchContainer.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSearch);
    } else {
        initializeSearch();
    }
    
    // Also initialize on window load for safety
    window.addEventListener('load', function() {
        if (!state.isInitialized) {
            setTimeout(initializeSearch, 100);
        }
    });
    
    // Export functions for external use
    window.UniversitySearch = {
        clearSearch,
        performSearch,
        getVisibleCards: () => getVisibleCards()
    };
    
})();
