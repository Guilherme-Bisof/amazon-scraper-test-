/**
 * Amazon Scraper Frontend JavaScript
 * Gerencia a interface e comunicação com a API
 */

// Configurações da aplicação
const CONFIG = {
    API_BASE_URL: 'http://localhost:3000',
    MAX_KEYWORD_LENGTH: 100,
    MIN_KEYWORD_LENGTH: 2
};

// Elementos DOM
const elements = {
    keywordInput: document.getElementById('keywordInput'),
    searchBtn: document.getElementById('searchBtn'),
    loadingSection: document.getElementById('loadingSection'),
    resultsSection: document.getElementById('resultsSection'),
    errorSection: document.getElementById('errorSection'),
    productsContainer: document.getElementById('productsContainer'),
    resultsCount: document.getElementById('resultsCount'),
    searchKeyword: document.getElementById('searchKeyword'),
    errorMessage: document.getElementById('errorMessage'),
    retryBtn: document.getElementById('retryBtn')
};

/**
 * Estado da aplicação
 */
let appState = {
    isLoading: false,
    currentKeyword: '',
    lastSearchResults: null
};

/**
 * Utilitários
 */
const utils = {
    /**
     * Sanitizar entrada do usuário
     */
    sanitizeInput: (input) => {
        return input.trim().replace(/[<>]/g, '');
    },

    /**
     * Validar keyword de busca
     */
    validateKeyword: (keyword) => {
        if (!keyword || keyword.length < CONFIG.MIN_KEYWORD_LENGTH) {
            return { valid: false, message: 'Digite pelo menos 2 caracteres' };
        }
        if (keyword.length > CONFIG.MAX_KEYWORD_LENGTH) {
            return { valid: false, message: 'Máximo de 100 caracteres' };
        }
        return { valid: true };
    },

    /**
     * Debounce para evitar requisições excessivas
     */
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Formatear número de reviews
     */
    formatReviewCount: (count) => {
        if (count === 'N/A' || !count) return 'Sem avaliações';
        const num = parseInt(count.toString().replace(/[^\d]/g, ''));
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k avaliações`;
        }
        return `${num} avaliações`;
    },

    /**
     * Gerar estrelas baseado no rating
     */
    generateStars: (rating) => {
        if (rating === 'N/A' || !rating) {
            return '<span class="rating-text">Sem avaliação</span>';
        }
        
        const numRating = parseFloat(rating);
        const fullStars = Math.floor(numRating);
        const hasHalfStar = numRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHTML = '<div class="stars">';
        
        // Estrelas cheias
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star star"></i>';
        }
        
        // Estrela meio cheia
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt star"></i>';
        }
        
        // Estrelas vazias
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star star"></i>';
        }
        
        starsHTML += '</div>';
        starsHTML += `<span class="rating-text">${numRating.toFixed(1)}</span>`;
        
        return starsHTML;
    }
};

/**
 * Gerenciamento de estado da UI
 */
const uiManager = {
    /**
     * Mostrar seção de loading
     */
    showLoading: () => {
        elements.resultsSection.classList.add('hidden');
        elements.errorSection.classList.add('hidden');
        elements.loadingSection.classList.remove('hidden');
        elements.searchBtn.disabled = true;
        elements.searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Buscando...</span>';
    },

    /**
     * Esconder loading
     */
    hideLoading: () => {
        elements.loadingSection.classList.add('hidden');
        elements.searchBtn.disabled = false;
        elements.searchBtn.innerHTML = '<i class="fas fa-search"></i><span>Buscar Produtos</span>';
    },

    /**
     * Mostrar resultados
     */
    showResults: (data) => {
        elements.errorSection.classList.add('hidden');
        elements.resultsSection.classList.remove('hidden');
        
        // Atualizar informações dos resultados
        elements.resultsCount.textContent = `${data.totalProducts} produtos encontrados`;
        elements.searchKeyword.textContent = `Busca: "${data.keyword}"`;
        
        // Renderizar produtos
        uiManager.renderProducts(data.products);
    },

    /**
     * Mostrar erro
     */
    showError: (message) => {
        elements.resultsSection.classList.add('hidden');
        elements.errorSection.classList.remove('hidden');
        elements.errorMessage.textContent = message || 'Erro desconhecido ocorreu';
    },

    /**
     * Renderizar lista de produtos
     */
    renderProducts: (products) => {
        if (!products || products.length === 0) {
            elements.productsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <p style="color: #666;">Nenhum produto encontrado para esta busca.</p>
                    <p style="color: #888; font-size: 0.9rem;">Tente usar palavras-chave diferentes.</p>
                </div>
            `;
            return;
        }

        elements.productsContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image-container">
                    ${product.imageUrl && product.imageUrl !== 'N/A' 
                        ? `<img src="${product.imageUrl}" alt="${product.title}" class="product-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                           <div class="image-placeholder" style="display: none;">
                               <i class="fas fa-image"></i>
                           </div>`
                        : `<div class="image-placeholder">
                               <i class="fas fa-image"></i>
                           </div>`
                    }
                </div>
                
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    
                    <div class="product-meta">
                        <div class="rating-container">
                            ${utils.generateStars(product.rating)}
                        </div>
                        
                        <div class="reviews-count">
                            <i class="fas fa-comment-alt"></i>
                            ${utils.formatReviewCount(product.reviewCount)}
                        </div>
                        
                        ${product.price && product.price !== 'N/A' 
                            ? `<div class="product-price">
                                   <i class="fas fa-tag"></i>
                                   ${product.price}
                               </div>`
                            : ''
                        }
                    </div>
                </div>
            </div>
        `).join('');
    }
};

/**
 * API Service para comunicação com o backend
 */
const apiService = {
    /**
     * Fazer requisição de scraping
     */
    scrapeProducts: async (keyword) => {
        try {
            const url = `${CONFIG.API_BASE_URL}/api/scrape?keyword=${encodeURIComponent(keyword)}`;
            console.log('Fazendo requisição para:', url);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30 segundos de timeout
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Erro na resposta da API');
            }

            return data;
        } catch (error) {
            console.error('Erro na API:', error);
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Erro de conexão. Verifique se o servidor está rodando.');
            }
            
            throw error;
        }
    }
};

/**
 * Controlador principal da aplicação
 */
const appController = {
    /**
     * Inicializar a aplicação
     */
    init: () => {
        console.log('🚀 Inicializando Amazon Scraper Frontend');
        appController.bindEvents();
        elements.keywordInput.focus();
    },

    /**
     * Vincular eventos
     */
    bindEvents: () => {
        // Evento de busca via botão
        elements.searchBtn.addEventListener('click', appController.handleSearch);
        
        // Evento de busca via Enter
        elements.keywordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !appState.isLoading) {
                appController.handleSearch();
            }
        });

        // Evento do botão de tentar novamente
        elements.retryBtn.addEventListener('click', appController.handleRetry);

        // Validação em tempo real do input
        elements.keywordInput.addEventListener('input', utils.debounce((e) => {
            const keyword = utils.sanitizeInput(e.target.value);
            const validation = utils.validateKeyword(keyword);
            
            if (!validation.valid && keyword.length > 0) {
                e.target.setCustomValidity(validation.message);
            } else {
                e.target.setCustomValidity('');
            }
        }, 300));
    },

    /**
     * Manipular busca
     */
    handleSearch: async () => {
        try {
            // Validar se já está carregando
            if (appState.isLoading) {
                console.log('Busca já em andamento...');
                return;
            }

            // Obter e validar keyword
            const keyword = utils.sanitizeInput(elements.keywordInput.value);
            const validation = utils.validateKeyword(keyword);
            
            if (!validation.valid) {
                alert(validation.message);
                elements.keywordInput.focus();
                return;
            }

            console.log(`🔍 Iniciando busca para: "${keyword}"`);

            // Atualizar estado
            appState.isLoading = true;
            appState.currentKeyword = keyword;

            // Mostrar loading
            uiManager.showLoading();

            // Fazer requisição à API
            const data = await apiService.scrapeProducts(keyword);

            // Armazenar resultados
            appState.lastSearchResults = data;

            console.log(`✅ Busca concluída: ${data.totalProducts} produtos encontrados`);

            // Mostrar resultados
            uiManager.showResults(data);

        } catch (error) {
            console.error('❌ Erro na busca:', error.message);
            uiManager.showError(error.message);
        } finally {
            // Limpar estado
            appState.isLoading = false;
            uiManager.hideLoading();
        }
    },

    /**
     * Manipular tentativa de nova busca
     */
    handleRetry: () => {
        console.log('🔄 Tentando novamente...');
        if (appState.currentKeyword) {
            elements.keywordInput.value = appState.currentKeyword;
            appController.handleSearch();
        }
    }
};

/**
 * Inicializar quando DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', appController.init);

/**
 * Tratamento de erros globais
 */
window.addEventListener('error', (event) => {
    console.error('❌ Erro global capturado:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promise rejeitada:', event.reason);
    event.preventDefault();
});