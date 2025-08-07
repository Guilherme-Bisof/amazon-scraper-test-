import express from 'express';
import cors from 'cors';
import { scrapeAmazonProducts } from './scraper.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permitir requisições do frontend
app.use(express.json());

/**
 * Endpoint principal para scraping da Amazon
 * GET /api/scrape?keyword=termo_de_busca
 */
app.get('/api/scrape', async (req, res) => {
  try {
    // Validar parâmetro keyword
    const { keyword } = req.query;
    
    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Parâmetro "keyword" é obrigatório'
      });
    }

    console.log(`\n🔍 Nova requisição de scraping para: "${keyword}"`);
    console.log(`⏰ Timestamp: ${new Date().toISOString()}`);

    // Executar o scraping
    const products = await scrapeAmazonProducts(keyword);

    // Resposta de sucesso
    res.json({
      success: true,
      keyword: keyword,
      totalProducts: products.length,
      timestamp: new Date().toISOString(),
      products: products
    });

    console.log(`✅ Scraping concluído com sucesso: ${products.length} produtos encontrados`);

  } catch (error) {
    console.error('❌ Erro no endpoint /api/scrape:', error.message);
    
    // Resposta de erro
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Endpoint de health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

/**
 * Endpoint raiz - informações da API
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Amazon Scraper API',
    version: '1.0.0',
    endpoints: {
      scrape: 'GET /api/scrape?keyword=termo_de_busca',
      health: 'GET /api/health'
    },
    documentation: 'Consulte o README.md para instruções de uso'
  });
});

/**
 * Middleware de tratamento de rotas não encontradas
 */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint não encontrado',
    message: `A rota ${req.method} ${req.originalUrl} não existe`
  });
});

/**
 * Middleware de tratamento de erros globais
 */
app.use((error, req, res, next) => {
  console.error('❌ Erro não capturado:', error);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: error.message
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}`);
  console.log(`🔍 Endpoint de scraping: http://localhost:${PORT}/api/scrape?keyword=termo_de_busca`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`);
});