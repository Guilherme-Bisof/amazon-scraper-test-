import axios from 'axios';
import { JSDOM } from 'jsdom';

/**
 * Função para fazer scraping dos produtos da Amazon
 * @param {string} keyword - Palavra-chave para busca
 * @returns {Promise<Array>} Lista de produtos extraídos
 */
export async function scrapeAmazonProducts(keyword) {
  try {
    // URL de busca da Amazon
    const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    
    // Headers para simular um navegador real
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    };

    console.log(`Buscando produtos para: ${keyword}`);
    
    // Fazer requisição HTTP
    const response = await axios.get(searchUrl, { 
      headers,
      timeout: 10000 // Timeout de 10 segundos
    });

    // Parse do HTML usando JSDOM
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Array para armazenar os produtos
    const products = [];

    // Seletores para diferentes layouts da Amazon
    const productSelectors = [
      '[data-component-type="s-search-result"]',
      '.s-result-item',
      '[data-asin]:not([data-asin=""])'
    ];

    let productElements = [];
    
    // Tentar diferentes seletores até encontrar produtos
    for (const selector of productSelectors) {
      productElements = document.querySelectorAll(selector);
      if (productElements.length > 0) {
        console.log(`Encontrados ${productElements.length} produtos com seletor: ${selector}`);
        break;
      }
    }

    // Extrair dados de cada produto
    productElements.forEach((element, index) => {
      try {
        // Extrair título do produto
        const titleElement = element.querySelector('h2 a span, h2 span, .a-text-normal, [data-cy="title-recipe-title"]');
        const title = titleElement ? titleElement.textContent.trim() : 'Título não encontrado';

        // Extrair rating (estrelas)
        const ratingElement = element.querySelector('.a-icon-alt, .a-offscreen');
        let rating = 'N/A';
        if (ratingElement) {
          const ratingText = ratingElement.textContent;
          const ratingMatch = ratingText.match(/(\d+\.?\d*)\s*out\s*of\s*5|(\d+\.?\d*)\s*de\s*5|(\d+\.?\d*)/);
          if (ratingMatch) {
            rating = parseFloat(ratingMatch[1] || ratingMatch[2] || ratingMatch[3]);
          }
        }

        // Extrair número de reviews
        const reviewsElement = element.querySelector('.a-size-base, .a-link-normal .a-size-base, a[href*="customerReviews"]');
        let reviewCount = 'N/A';
        if (reviewsElement) {
          const reviewText = reviewsElement.textContent;
          const reviewMatch = reviewText.match(/[\d,]+/);
          if (reviewMatch) {
            reviewCount = reviewMatch[0].replace(',', '');
          }
        }

        // Extrair URL da imagem
        const imageElement = element.querySelector('img.s-image, .a-dynamic-image, img[data-src]');
        let imageUrl = 'N/A';
        if (imageElement) {
          imageUrl = imageElement.src || imageElement.getAttribute('data-src') || 'N/A';
        }

        // Extrair preço (opcional)
        const priceElement = element.querySelector('.a-price .a-offscreen, .a-price-whole');
        const price = priceElement ? priceElement.textContent.trim() : 'N/A';

        // Só adicionar se tiver pelo menos o título
        if (title && title !== 'Título não encontrado') {
          products.push({
            id: index + 1,
            title,
            rating,
            reviewCount,
            imageUrl,
            price
          });
        }
      } catch (error) {
        console.log(`Erro ao processar produto ${index + 1}:`, error.message);
      }
    });

    console.log(`Extraídos ${products.length} produtos com sucesso`);
    return products;

  } catch (error) {
    console.error('Erro no scraping:', error.message);
    throw new Error(`Falha ao fazer scraping: ${error.message}`);
  }
}