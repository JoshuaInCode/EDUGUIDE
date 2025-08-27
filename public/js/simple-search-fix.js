/**
 * Simple Search Fix - Asegura que el buscador de universidades funcione correctamente
 * EduGuide - Professional University Search Fix
 * Version: 2.0 - Enhanced functionality and positioning
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        searchDelay: 300,
        minSearchLength: 2,
        maxResults: 10
    };
    
    // State management
    let state = {
        isInitialized: false,
        searchTimeout: null,
        currentSearchTerm: ''
    };
    
    // DOM elements cache
    let elements = {
        searchInput: null,
        searchResults: null,
        searchContainer: null,
        clearSearchBtn: null
    };
    
    /**
     * Initialize the search fix system
     */
    function initializeSearchFix() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeSearchFix);
                return;
            }
            
            // Get DOM elements
            elements.searchInput = document.getElementById('universitySearch');
            elements.searchResults = document.getElementById('searchResults');
            elements.searchContainer = document.querySelector('.search-input-wrapper'); // Updated to use the wrapper
            elements.clearSearchBtn = document.getElementById('clearSearchBtn');
            
            // Validate elements exist
            if (!validateElements()) {
                console.warn('Search elements not found, retrying...');
                setTimeout(initializeSearchFix, 500);
                return;
            }
            
            // Apply fixes
            applySearchFixes();
            
            // Add event listeners
            addEventListeners();
            
            // Initialize state
            state.isInitialized = true;
            
            console.log('✅ Simple search fix initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing search fix:', error);
        }
    }
    
    /**
     * Validate that all required elements exist
     */
    function validateElements() {
        return elements.searchInput && 
               elements.searchResults && 
               elements.searchContainer &&
               elements.clearSearchBtn;
    }
    
    /**
     * Apply fixes to search elements
     */
    function applySearchFixes() {
        // Ensure proper positioning
        if (elements.searchContainer) {
            elements.searchContainer.style.position = 'relative';
            elements.searchContainer.style.zIndex = '1000';
            elements.searchContainer.style.overflow = 'visible';
        }
        
        // Ensure search results have proper positioning
        if (elements.searchResults) {
            elements.searchResults.style.position = 'absolute';
            elements.searchResults.style.top = '100%';
            elements.searchResults.style.left = '0';
            elements.searchResults.style.right = '0';
            elements.searchResults.style.zIndex = '1001';
            elements.searchResults.style.display = 'none';
            elements.searchResults.style.marginTop = '0';
            elements.searchResults.style.maxWidth = '100%';
            elements.searchResults.style.boxSizing = 'border-box';
        }
        
        // Ensure search input has proper styling
        if (elements.searchInput) {
            elements.searchInput.style.position = 'relative';
            elements.searchInput.style.zIndex = '1';
        }
    }
    
    /**
     * Add event listeners
     */
    function addEventListeners() {
        // Input event for real-time search
        elements.searchInput.addEventListener('input', handleInputChange);
        
        // Focus event
        elements.searchInput.addEventListener('focus', handleInputFocus);
        
        // Blur event
        elements.searchInput.addEventListener('blur', handleInputBlur);
        
        // Clear search button event
        elements.clearSearchBtn.addEventListener('click', handleClearSearchClick);
        
        // Search results click events - Use event delegation
        elements.searchResults.addEventListener('click', handleResultClick);
        
        // Keydown event for keyboard navigation
        elements.searchInput.addEventListener('keydown', handleKeydown);
        
        // Click outside to close dropdown
        document.addEventListener('click', handleOutsideClick);
        
        // Window resize to reposition dropdown
        window.addEventListener('resize', handleWindowResize);
        
        // Scroll to reposition dropdown
        window.addEventListener('scroll', handleScroll);
        
        console.log('Event listeners added successfully in simple-search-fix');
    }
    
    /**
     * Handle input change
     */
    function handleInputChange(event) {
        const searchTerm = event.target.value.trim();
        state.currentSearchTerm = searchTerm;
        
        // Clear previous timeout
        if (state.searchTimeout) {
            clearTimeout(state.searchTimeout);
        }
        
        // If search term is empty, hide dropdown immediately
        if (searchTerm === '') {
            hideDropdown();
            toggleClearButton(false);
            return;
        }
        
        // If search term is too short, hide dropdown
        if (searchTerm.length < CONFIG.minSearchLength) {
            hideDropdown();
            toggleClearButton(true);
            return;
        }
        
        // Show clear button
        toggleClearButton(true);
        
        // Debounce search
        state.searchTimeout = setTimeout(() => {
            // Trigger search if UniversitySearchDropdown is available
            if (window.UniversitySearchDropdown && window.UniversitySearchDropdown.performSearch) {
                window.UniversitySearchDropdown.performSearch();
            }
        }, CONFIG.searchDelay);
    }
    
    /**
     * Handle input focus
     */
    function handleInputFocus() {
        // Only show dropdown if there's a valid search term
        if (state.currentSearchTerm && state.currentSearchTerm.length >= CONFIG.minSearchLength) {
            if (window.UniversitySearchDropdown && window.UniversitySearchDropdown.performSearch) {
                window.UniversitySearchDropdown.performSearch();
            }
        }
    }
    
    /**
     * Handle input blur
     */
    function handleInputBlur() {
        // Delay hiding to allow for clicks on results
        setTimeout(() => {
            if (!elements.searchResults.matches(':hover')) {
                hideDropdown();
            }
        }, 150);
    }
    
    /**
     * Handle keydown events
     */
    function handleKeydown(event) {
        switch (event.key) {
            case 'Escape':
                event.preventDefault();
                clearSearch();
                break;
            case 'Enter':
                event.preventDefault();
                // Navigate to first result or perform search
                const firstResult = elements.searchResults.querySelector('.search-result-item');
                if (firstResult) {
                    firstResult.click();
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                navigateResults('down');
                break;
            case 'ArrowUp':
                event.preventDefault();
                navigateResults('up');
                break;
        }
    }
    
    /**
     * Navigate through search results
     */
    function navigateResults(direction) {
        const results = Array.from(elements.searchResults.querySelectorAll('.search-result-item'));
        const currentIndex = results.findIndex(item => item.classList.contains('selected'));
        
        let newIndex;
        if (direction === 'down') {
            newIndex = currentIndex < results.length - 1 ? currentIndex + 1 : 0;
        } else {
            newIndex = currentIndex > 0 ? currentIndex - 1 : results.length - 1;
        }
        
        // Remove previous selection
        results.forEach(item => item.classList.remove('selected'));
        
        // Add selection to new item
        if (results[newIndex]) {
            results[newIndex].classList.add('selected');
            results[newIndex].scrollIntoView({ block: 'nearest' });
        }
    }
    
    /**
     * Handle clicking outside search results
     */
    function handleOutsideClick(event) {
        if (!elements.searchInput.contains(event.target) && !elements.searchResults.contains(event.target)) {
            hideDropdown();
        }
    }
    
    /**
     * Handle window resize
     */
    function handleWindowResize() {
        // Reposition dropdown if visible
        if (elements.searchResults.style.display === 'block') {
            repositionDropdown();
        }
    }
    
    /**
     * Handle scroll
     */
    function handleScroll() {
        // Reposition dropdown if visible
        if (elements.searchResults.style.display === 'block') {
            repositionDropdown();
        }
    }
    
    /**
     * Reposition dropdown
     */
    function repositionDropdown() {
        if (elements.searchResults && elements.searchContainer) {
            const containerRect = elements.searchContainer.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Check if dropdown would go below viewport
            const dropdownHeight = Math.min(300, elements.searchResults.scrollHeight);
            const spaceBelow = viewportHeight - containerRect.bottom;
            
            if (spaceBelow < dropdownHeight && containerRect.top > dropdownHeight) {
                // Position dropdown above input
                elements.searchResults.style.top = 'auto';
                elements.searchResults.style.bottom = '100%';
                elements.searchResults.style.borderTop = '2px solid #e3f2fd';
                elements.searchResults.style.borderBottom = 'none';
                elements.searchResults.style.borderRadius = '20px 20px 0 0';
            } else {
                // Position dropdown below input
                elements.searchResults.style.top = '100%';
                elements.searchResults.style.bottom = 'auto';
                elements.searchResults.style.borderTop = 'none';
                elements.searchResults.style.borderBottom = '2px solid #e3f2fd';
                elements.searchResults.style.borderRadius = '0 0 20px 20px';
            }
        }
    }
    
    /**
     * Hide dropdown
     */
    function hideDropdown() {
        if (elements.searchResults) {
            elements.searchResults.style.display = 'none';
            elements.searchResults.classList.add('hidden');
            
            // Remove selection
            const selectedItems = elements.searchResults.querySelectorAll('.selected');
            selectedItems.forEach(item => item.classList.remove('selected'));
        }
    }
    
    /**
     * Handle clicking on the clear search button
     */
    function handleClearSearchClick(event) {
        event.preventDefault();
        event.stopPropagation();
        clearSearch();
    }
    
    /**
     * Toggle the visibility of the clear search button
     */
    function toggleClearButton(show) {
        if (elements.clearSearchBtn) {
            elements.clearSearchBtn.style.display = show ? 'flex' : 'none';
            // Toggle the class for padding adjustment
            if (elements.searchInput) {
                elements.searchInput.classList.toggle('has-clear-btn', show);
            }
        }
    }
    
    /**
     * Clear search
     */
    function clearSearch() {
        if (elements.searchInput) {
            elements.searchInput.value = '';
            state.currentSearchTerm = '';
        }
        hideDropdown();
        toggleClearButton(false);
        
        // Clear highlights
        const highlightedCards = document.querySelectorAll('.faculty-div.highlight');
        highlightedCards.forEach(card => card.classList.remove('highlight'));
    }
    
    /**
     * Handle clicking on a search result
     */
    function handleResultClick(event) {
        console.log('Click event detected:', event.target);
        
        // Check if the clicked element is a search result item or its child
        let resultItem = event.target;
        while (resultItem && !resultItem.classList.contains('search-result-item')) {
            resultItem = resultItem.parentElement;
        }
        
        if (resultItem && resultItem.classList.contains('search-result-item')) {
            const cardId = resultItem.getAttribute('data-card-id');
            console.log('Card ID found:', cardId);
            
            const targetCard = document.getElementById(cardId);
            console.log('Target card found:', targetCard);
            
            if (targetCard) {
                // Remove previous highlights
                const allCards = document.querySelectorAll('.faculty-div');
                allCards.forEach(card => card.classList.remove('highlight'));
                
                // Add highlight to selected card
                targetCard.classList.add('highlight');
                
                // Scroll to the card
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide dropdown but keep the search text
                hideDropdown();
                
                // Remove highlights after a delay
                setTimeout(() => {
                    targetCard.classList.remove('highlight');
                }, 3000);
                
                console.log('Successfully navigated to card:', cardId);
            } else {
                console.error('Target card not found for ID:', cardId);
            }
        } else {
            console.log('Click was not on a search result item');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSearchFix);
    } else {
        initializeSearchFix();
    }
    
    // Also initialize on window load for safety
    window.addEventListener('load', function() {
        if (!state.isInitialized) {
            setTimeout(initializeSearchFix, 100);
        }
    });
    
    // Export functions for external use
    window.SimpleSearchFix = {
        clearSearch,
        hideDropdown,
        repositionDropdown,
        toggleClearButton
    };
    
})();
