// Enhanced University Search with No Results Message
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('universitySearch');
    const searchResults = document.getElementById('searchResults');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const provinceFilter = document.getElementById('provinceFilter');
    const universityCards = document.querySelectorAll('.faculty-div');

    // Función para mostrar mensaje de no resultados
    function showNoResultsMessage(searchTerm) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results-message';
        noResultsDiv.innerHTML = `
            <i class="fas fa-search"></i>
            <h4>No se encontraron universidades</h4>
            <p>No se encontraron universidades que coincidan con "<strong>${searchTerm}</strong>"</p>
            <div class="suggestions">
                <h5>💡 Sugerencias:</h5>
                <ul>
                    <li>• Verifica la ortografía de tu búsqueda</li>
                    <li>• Intenta con términos más generales</li>
                    <li>• Usa el filtro de provincia para refinar</li>
                    <li>• Revisa todas las universidades disponibles</li>
                </ul>
            </div>
            <button class="btn btn-outline-primary mt-3" onclick="showAllUniversities()">
                <i class="fas fa-eye me-2"></i>Ver Todas las Universidades
            </button>
        `;
        
        // Limpiar resultados anteriores
        searchResults.innerHTML = '';
        searchResults.appendChild(noResultsDiv);
        searchResults.style.display = 'block';
    }

    // Función para mostrar todas las universidades
    window.showAllUniversities = function() {
        universityCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        
        // Limpiar búsqueda
        searchInput.value = '';
        searchResults.style.display = 'none';
        clearSearchBtn.style.display = 'none';
        
        // Resetear filtro de provincia
        if (provinceFilter) {
            provinceFilter.value = '';
        }
        
        // Mostrar mensaje de éxito
        showSuccessMessage('Todas las universidades están ahora visibles');
    };

    // Función para mostrar mensaje de éxito
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show';
        successDiv.style.position = 'fixed';
        successDiv.style.top = '100px';
        successDiv.style.right = '20px';
        successDiv.style.zIndex = '9999';
        successDiv.style.minWidth = '300px';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(successDiv);
        
        // Auto-remover después de 3 segundos
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);
    }

    // Función para realizar búsqueda
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedProvince = provinceFilter ? provinceFilter.value.toLowerCase() : '';
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            clearSearchBtn.style.display = 'none';
            showAllUniversities();
            return;
        }

        let foundUniversities = [];
        let hiddenCount = 0;

        universityCards.forEach(card => {
            const title = card.querySelector('.university-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.content p')?.textContent.toLowerCase() || '';
            const location = card.querySelector('.university-info p')?.textContent.toLowerCase() || '';
            
            const matchesSearch = title.includes(searchTerm) || 
                                description.includes(searchTerm) || 
                                location.includes(searchTerm);
            
            const matchesProvince = !selectedProvince || location.includes(selectedProvince);
            
            if (matchesSearch && matchesProvince) {
                foundUniversities.push(card);
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                hiddenCount++;
            }
        });

        // Mostrar botón de limpiar
        clearSearchBtn.style.display = 'block';

        // Mostrar resultados o mensaje de no resultados
        if (foundUniversities.length > 0) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            
            // Resaltar universidades encontradas
            foundUniversities.forEach(card => {
                card.classList.add('highlight');
                setTimeout(() => card.classList.remove('highlight'), 2000);
            });
            
            showSuccessMessage(`Se encontraron ${foundUniversities.length} universidad(es)`);
        } else {
            showNoResultsMessage(searchTerm);
        }
    }

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchResults.style.display = 'none';
            clearSearchBtn.style.display = 'none';
            showAllUniversities();
        });
    }

    if (provinceFilter) {
        provinceFilter.addEventListener('change', performSearch);
    }

    // Función para limpiar búsqueda al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Función para mostrar sugerencias de búsqueda
    function showSearchSuggestions() {
        const suggestions = [
            'Universidad de Panamá',
            'UTP',
            'UDELAS',
            'Medicina',
            'Ingeniería',
            'Panamá',
            'Chiriquí',
            'Veraguas'
        ];
        
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'search-suggestions';
        suggestionsDiv.innerHTML = `
            <div class="suggestions-header">
                <h6><i class="fas fa-lightbulb me-2"></i>Sugerencias de búsqueda:</h6>
            </div>
            <div class="suggestions-list">
                ${suggestions.map(suggestion => 
                    `<span class="suggestion-tag" onclick="searchInput.value='${suggestion}';performSearch();">${suggestion}</span>`
                ).join('')}
            </div>
        `;
        
        // Mostrar sugerencias solo si no hay texto en la búsqueda
        if (!searchInput.value.trim()) {
            searchResults.innerHTML = '';
            searchResults.appendChild(suggestionsDiv);
            searchResults.style.display = 'block';
        }
    }

    // Mostrar sugerencias al hacer focus en el input
    if (searchInput) {
        searchInput.addEventListener('focus', showSearchSuggestions);
    }
});

// Estilos CSS adicionales para las mejoras
const additionalStyles = `
    .search-suggestions {
        padding: 20px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
    }
    
    .suggestions-header h6 {
        color: #1565C0;
        margin-bottom: 15px;
        font-weight: 600;
    }
    
    .suggestions-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .suggestion-tag {
        background: linear-gradient(135deg, #E3F2FD, #BBDEFB);
        color: #1565C0;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid #BBDEFB;
    }
    
    .suggestion-tag:hover {
        background: linear-gradient(135deg, #BBDEFB, #90CAF9);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
    }
    
    .highlight {
        border: 3px solid #2196F3 !important;
        box-shadow: 0 0 20px 2px rgba(33, 150, 243, 0.3) !important;
        transition: all 0.3s ease;
    }
    
    .alert {
        border-radius: 15px;
        border: none;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .alert-success {
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
    }
`;

// Aplicar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
