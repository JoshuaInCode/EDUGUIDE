/**
 * University Search Dropdown System
 * EduGuide - Professional University Search with Dropdown Results
 * Version: 1.0
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
        }
    };
    
    // State management
    let state = {
        searchTerm: '',
        isInitialized: false,
        searchTimeout: null
    };
    
    // DOM elements cache
    let elements = {
        searchInput: null,
        searchResults: null,
        universityCards: []
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
            
            // Validate elements exist
            if (!validateElements()) {
                console.warn('Search elements not found, retrying...');
                setTimeout(initializeSearch, 500);
                return;
            }
            
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
               elements.universityCards.length > 0;
    }
    
    /**
     * Add event listeners to search elements
     */
    function addEventListeners() {
        // Search input events
        elements.searchInput.addEventListener('input', handleSearchInput);
        
        // Search results click events
        elements.searchResults.addEventListener('click', handleResultClick);
        
        // Close search results when clicking outside
        document.addEventListener('click', handleOutsideClick);
        
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
        
        // Debounce search
        state.searchTimeout = setTimeout(() => {
            performSearch();
        }, 300);
    }
    
    /**
     * Perform the search and display results
     */
    function performSearch() {
        const searchTerm = state.searchTerm;
        
        if (searchTerm.length < 2) {
            elements.searchResults.style.display = 'none';
            elements.searchResults.classList.remove('hidden');
            return;
        }
        
        const matches = findMatches(searchTerm);
        
        if (matches.length > 0) {
            displayResults(matches);
        } else {
            elements.searchResults.style.display = 'none';
            elements.searchResults.classList.remove('hidden');
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
    }
    
    /**
     * Handle clicking on a search result
     */
    function handleResultClick(event) {
        if (event.target.classList.contains('search-result-item')) {
            const cardId = event.target.getAttribute('data-card-id');
            const targetCard = document.getElementById(cardId);
            
            if (targetCard) {
                // Remove previous highlights
                elements.universityCards.forEach(card => card.classList.remove('highlight'));
                
                // Add highlight to selected card
                targetCard.classList.add('highlight');
                
                // Scroll to the card
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Clear search
                clearSearch();
            }
        }
    }
    
    /**
     * Handle clicking outside search results
     */
    function handleOutsideClick(event) {
        if (!elements.searchInput.contains(event.target) && !elements.searchResults.contains(event.target)) {
            elements.searchResults.style.display = 'none';
            elements.searchResults.classList.remove('hidden');
        }
    }
    
    /**
     * Clear search and reset
     */
    function clearSearch() {
        state.searchTerm = '';
        elements.searchInput.value = '';
        elements.searchResults.style.display = 'none';
        elements.searchResults.classList.remove('hidden');
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
    window.UniversitySearchDropdown = {
        clearSearch,
        performSearch
    };
    
})();
