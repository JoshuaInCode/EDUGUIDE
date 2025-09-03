/**
 * University Search Dropdown System
 * EduGuide - Professional University Search with Dropdown Results
 * Version: 2.0 - Fixed positioning and visibility issues
 */

(function() {
    'use strict';
    
    // University data for search results
    const UNIVERSITY_DATA = {
        'up-block': { 
            name: 'University of Panama', 
            province: 'Panamá', 
            location: 'Panama City',
            programs: '+80 programs',
            website: 'www.up.ac.pa',
            phone: '(507) 523-5000',
            keywords: ['universidad', 'panama', 'up', 'ancon', 'panamá'] 
        },
        'utp-block': { 
            name: 'Technological University of Panama', 
            province: 'Panamá', 
            location: 'Victor Levi Sasso Campus',
            programs: '+35 technical programs',
            website: 'www.utp.ac.pa',
            phone: '(507) 560-3000',
            keywords: ['utp', 'tecnologica', 'ingenieria', 'tecnologia', 'tecnológica'] 
        },
        'udelas-block': { 
            name: 'UDELAS', 
            province: 'Panamá', 
            location: 'Albrook, Panama City',
            programs: '+25 programs',
            website: 'www.udelas.ac.pa',
            phone: '(507) 501-1000',
            keywords: ['udelas', 'salud', 'educacion', 'especial', 'educación'] 
        },
        'umip-block': { 
            name: 'Maritime University of Panama', 
            province: 'Panamá', 
            location: 'Panama City',
            programs: '+15 maritime programs',
            website: 'www.umip.edu.pa',
            phone: '(507) 501-5000',
            keywords: ['umip', 'maritima', 'nautica', 'maritimo', 'marítima', 'náutica'] 
        },
        'unachi-block': { 
            name: 'UNACHI', 
            province: 'Chiriquí', 
            location: 'David, Chiriquí',
            programs: '+40 programs',
            website: 'www.unachi.ac.pa',
            phone: '(507) 730-0000',
            keywords: ['unachi', 'chiriqui', 'david', 'occidental', 'chiriquí'] 
        },
        'ulatina-block': { 
            name: 'Latin University of Panama', 
            province: 'Panamá', 
            location: 'Panama City',
            programs: '+50 programs',
            website: 'www.ulatina.edu.pa',
            phone: '(507) 230-8600',
            keywords: ['latina', 'ulatina', 'privada', 'innovacion', 'innovación'] 
        },
        'usma-block': { 
            name: 'Santa María La Antigua Catholic University', 
            province: 'Panamá', 
            location: 'Panama City',
            programs: '+30 programs',
            website: 'www.usma.ac.pa',
            phone: '(507) 236-8000',
            keywords: ['usma', 'catolica', 'humanidades', 'sociales', 'católica'] 
        },
        'uip-block': { 
            name: 'Interamerican University of Panama', 
            province: 'Panamá', 
            location: 'Panama City',
            programs: '+25 programs',
            website: 'www.uip.edu.pa',
            phone: '(507) 279-6200',
            keywords: ['uip', 'interamericana', 'negocios', 'tecnologia', 'tecnología'] 
        },
        'udi-block': { 
            name: 'Isthmus University', 
            province: 'Panamá', 
            location: 'Panama City',
            programs: '+20 programs',
            website: 'www.udi.edu.pa',
            phone: '(507) 279-6200',
            keywords: ['udi', 'istmo', 'isthmus', 'negocios'] 
        },
        'upancon-block': { 
            name: 'University of Panama - Ancon', 
            province: 'Panamá', 
            location: 'Ancon, Panamá',
            programs: '+50 programs',
            website: 'www.up.ac.pa',
            phone: '(507) 523-5000',
            keywords: ['up', 'ancon', 'panama', 'campus', 'ancon'] 
        },
        'utpveraguas-block': { 
            name: 'UTP - Veraguas Campus', 
            province: 'Veraguas', 
            location: 'Santiago, Veraguas',
            programs: '+20 programs',
            website: 'www.utp.ac.pa',
            phone: '(507) 998-0000',
            keywords: ['utp', 'veraguas', 'santiago', 'regional'] 
        },
        'udelaschiriqui-block': { 
            name: 'UDELAS - Chiriqui Campus', 
            province: 'Chiriquí', 
            location: 'David, Chiriquí',
            programs: '+15 programs',
            website: 'www.udelas.ac.pa',
            phone: '(507) 730-0000',
            keywords: ['udelas', 'chiriqui', 'david', 'salud', 'chiriquí'] 
        },
        'umipcolon-block': { 
            name: 'UMIP - Colon Campus', 
            province: 'Colón', 
            location: 'Colón, Panamá',
            programs: '+10 programs',
            website: 'www.umip.ac.pa',
            phone: '(507) 441-0000',
            keywords: ['umip', 'colon', 'maritimo', 'portuario', 'colón'] 
        },
        'unachibocas-block': { 
            name: 'UNACHI - Bocas del Toro', 
            province: 'Bocas del Toro', 
            location: 'Bocas del Toro',
            programs: '+8 programs',
            website: 'www.unachi.ac.pa',
            phone: '(507) 758-0000',
            keywords: ['unachi', 'bocas', 'turismo', 'ambiental'] 
        },
        'ulatinavg-block': { 
            name: 'ULatina - Veraguas Campus', 
            province: 'Veraguas', 
            location: 'Santiago, Veraguas',
            programs: '+12 programs',
            website: 'www.ulatina.edu.pa',
            phone: '(507) 998-0000',
            keywords: ['ulatina', 'veraguas', 'santiago', 'negocios'] 
        },
        'usmachiriqui-block': { 
            name: 'USMA - Chiriqui Campus', 
            province: 'Chiriquí', 
            location: 'David, Chiriquí',
            programs: '+15 programs',
            website: 'www.usma.ac.pa',
            phone: '(507) 730-0000',
            keywords: ['usma', 'chiriqui', 'david', 'humanidades', 'chiriquí'] 
        },
        'uipchiriqui-block': { 
            name: 'UIP - Chiriqui Campus', 
            province: 'Chiriquí', 
            location: 'David, Chiriquí',
            programs: '+10 programs',
            website: 'www.uip.edu.pa',
            phone: '(507) 730-0000',
            keywords: ['uip', 'chiriqui', 'david', 'negocios', 'chiriquí'] 
        },
        'udichiriqui-block': { 
            name: 'UDI - Chiriqui Campus', 
            province: 'Chiriquí', 
            location: 'David, Chiriquí',
            programs: '+8 programs',
            website: 'www.udi.edu.pa',
            phone: '(507) 730-0000',
            keywords: ['udi', 'chiriqui', 'david', 'istmo', 'chiriquí'] 
        }
    };
    
    // State management
    let state = {
        searchTerm: '',
        isInitialized: false,
        searchTimeout: null,
        isDropdownVisible: false
    };
    
    // DOM elements cache
    let elements = {
        searchInput: null,
        searchResults: null,
        universityCards: [],
        searchContainer: null,
        clearSearchBtn: null
    };
    
    /**
     * Initialize the search dropdown system
     */
    function initializeSearch() {
        try {
            // Get DOM elements
            elements.searchInput = document.getElementById('universitySearch');
            elements.searchResults = document.getElementById('searchResults');
            elements.universityCards = document.querySelectorAll('.faculty-div');
            elements.searchContainer = document.querySelector('.search-input-wrapper'); // Updated to use the wrapper
            elements.clearSearchBtn = document.getElementById('clearSearchBtn');
            
            // Validate elements exist
            if (!validateElements()) {
                console.warn('Search elements not found, retrying...');
                setTimeout(initializeSearch, 500);
                return;
            }
            
            // Ensure search container has proper positioning
            ensureProperPositioning();
            
            // Add event listeners
            addEventListeners();
            
            // Initialize state
            state.isInitialized = true;
            
            console.log('✅ University search dropdown system initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing search dropdown system:', error);
        }
    }
    
    /**
     * Validate that all required elements exist
     */
    function validateElements() {
        return elements.searchInput && 
               elements.searchResults && 
               elements.universityCards.length > 0 &&
               elements.searchContainer &&
               elements.clearSearchBtn;
    }
    
    /**
     * Ensure proper positioning for the search container and results
     */
    function ensureProperPositioning() {
        // Ensure search container has relative positioning
        if (elements.searchContainer) {
            elements.searchContainer.style.position = 'relative';
            elements.searchContainer.style.zIndex = '1000';
        }
        
        // Ensure search results have proper positioning
        if (elements.searchResults) {
            elements.searchResults.style.position = 'absolute';
            elements.searchResults.style.top = '100%';
            elements.searchResults.style.left = '0';
            elements.searchResults.style.right = '0';
            elements.searchResults.style.zIndex = '1001';
            elements.searchResults.style.display = 'none';
        }
    }
    
    /**
     * Add event listeners to search elements
     */
    function addEventListeners() {
        // Search input events
        elements.searchInput.addEventListener('input', handleSearchInput);
        elements.searchInput.addEventListener('focus', handleSearchFocus);
        elements.searchInput.addEventListener('blur', handleSearchBlur);
        
        // Clear search button event
        elements.clearSearchBtn.addEventListener('click', handleClearSearchClick);
        
        // Search results click events - Use event delegation
        elements.searchResults.addEventListener('click', handleResultClick);
        
        // Close search results when clicking outside
        document.addEventListener('click', handleOutsideClick);
        
        // Clear search on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                clearSearchManually();
            }
        });
        
        // Handle input clearing
        elements.searchInput.addEventListener('input', function(e) {
            if (e.target.value === '') {
                hideDropdown();
                toggleClearButton(false);
            } else {
                toggleClearButton(true);
            }
        });
        
        console.log('Event listeners added successfully');
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
        
        // If search term is empty, hide dropdown immediately
        if (searchTerm === '') {
            hideDropdown();
            return;
        }
        
        // Debounce search
        state.searchTimeout = setTimeout(() => {
            performSearch();
        }, 300);
    }
    
    /**
     * Handle search input focus
     */
    function handleSearchFocus() {
        // Only show dropdown if there's a search term
        if (state.searchTerm && state.searchTerm.length >= 2) {
            performSearch();
        }
    }
    
    /**
     * Handle search input blur
     */
    function handleSearchBlur() {
        // Delay hiding to allow for clicks on results
        setTimeout(() => {
            if (!elements.searchResults.matches(':hover')) {
                hideDropdown();
            }
        }, 150);
    }
    
    /**
     * Perform the search and display results
     */
    function performSearch() {
        const searchTerm = state.searchTerm;
        
        // Always hide dropdown if search term is too short or empty
        if (!searchTerm || searchTerm.length < 2) {
            hideDropdown();
            return;
        }
        
        const matches = findMatches(searchTerm);
        
        if (matches.length > 0) {
            displayResults(matches);
        } else {
            hideDropdown();
        }
    }
    
    /**
     * Find universities that match the search term
     */
    function findMatches(searchTerm) {
        const matches = [];
        
        Object.keys(UNIVERSITY_DATA).forEach(cardId => {
            const universityData = UNIVERSITY_DATA[cardId];
            const searchableText = [
                universityData.name.toLowerCase(),
                universityData.province.toLowerCase(),
                universityData.location.toLowerCase(),
                ...universityData.keywords
            ].join(' ');
            
            if (searchableText.includes(searchTerm)) {
                matches.push({
                    cardId: cardId,
                    data: universityData
                });
            }
        });
        
        return matches;
    }
    
    /**
     * Display search results in dropdown
     */
    function displayResults(matches) {
        const resultsHTML = matches.map(match => {
            const { cardId, data } = match;
            return `
                <div class="search-result-item" data-card-id="${cardId}">
                    <div class="university-name">${data.name}</div>
                    <div class="university-details">
                        <span class="location"><i class="fas fa-map-marker-alt"></i> ${data.location}</span>
                        <span class="province">${data.province}</span>
                    </div>
                </div>
            `;
        }).join('');
        
        elements.searchResults.innerHTML = resultsHTML;
        elements.searchResults.style.display = 'block';
        elements.searchResults.classList.remove('hidden');
        state.isDropdownVisible = true;
    }
    
    /**
     * Hide the dropdown
     */
    function hideDropdown() {
        if (elements.searchResults) {
            elements.searchResults.style.display = 'none';
            elements.searchResults.classList.add('hidden');
            state.isDropdownVisible = false;
        }
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
                elements.universityCards.forEach(card => card.classList.remove('highlight'));
                
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
    
    /**
     * Handle clicking outside search results
     */
    function handleOutsideClick(event) {
        if (!elements.searchInput.contains(event.target) && !elements.searchResults.contains(event.target)) {
            hideDropdown();
        }
    }
    
    /**
     * Clear search and reset
     */
    function clearSearch() {
        state.searchTerm = '';
        elements.searchInput.value = '';
        hideDropdown();
        
        // Remove highlights
        elements.universityCards.forEach(card => card.classList.remove('highlight'));
    }
    
    /**
     * Clear search manually (for user-initiated clearing)
     */
    function clearSearchManually() {
        clearSearch();
        // Hide clear button
        toggleClearButton(false);
        // Focus back to input for better UX
        elements.searchInput.focus();
    }

    /**
     * Handle clicking on the clear search button
     */
    function handleClearSearchClick(event) {
        event.preventDefault();
        event.stopPropagation();
        clearSearchManually();
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
     * Test function to verify the search system is working
     */
    function testSearchSystem() {
        console.log('🧪 Testing search system...');
        
        // Test if elements exist
        console.log('Search input:', elements.searchInput);
        console.log('Search results:', elements.searchResults);
        console.log('Search container:', elements.searchContainer);
        console.log('Clear search button:', elements.clearSearchBtn);
        
        // Test if event listeners are working
        if (elements.searchInput) {
            console.log('✅ Search input found');
        } else {
            console.error('❌ Search input not found');
        }
        
        if (elements.searchResults) {
            console.log('✅ Search results container found');
        } else {
            console.error('❌ Search results container not found');
        }
        
        // Test if university data is available
        console.log('University data keys:', Object.keys(UNIVERSITY_DATA));
        
        console.log('🧪 Search system test completed');
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
        
        // Run test after initialization
        setTimeout(testSearchSystem, 500);
    });
    
    // Export functions for external use
    window.UniversitySearchDropdown = {
        clearSearch,
        clearSearchManually,
        performSearch,
        hideDropdown,
        toggleClearButton,
        testSearchSystem
    };
    
})();
