# Amazon Product Scraper

🛒 **Uma aplicação completa para extrair informações de produtos da Amazon usando web scraping**

Este projeto consiste em uma API backend construída com **Bun** e **Express** que faz scraping da Amazon, e um frontend responsivo desenvolvido com **HTML, CSS e JavaScript vanilla** usando **Vite**.

## 📋 Índice

- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
- [Uso da API](#uso-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Solução de Problemas](#solução-de-problemas)
- [Considerações Legais](#considerações-legais)
- [Contribuição](#contribuição)

## ✨ Características

- 🔍 **Scraping Inteligente**: Extrai título, rating, número de reviews, imagem e preço dos produtos
- 🎨 **Interface Moderna**: Design responsivo inspirado na Amazon
- ⚡ **Performance**: Backend otimizado com Bun e frontend com Vite
- 🛡️ **Tratamento de Erros**: Sistema robusto de error handling
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🔄 **Loading States**: Indicadores visuais de carregamento
- 🎯 **Validação**: Validação de input em tempo real

## 🛠️ Tecnologias Utilizadas

### Backend
- **[Bun](https://bun.sh/)** - Runtime JavaScript ultra-rápido
- **[Express.js](https://expressjs.com/)** - Framework web minimalista
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições
- **[JSDOM](https://github.com/jsdom/jsdom)** - Implementação DOM para Node.js
- **[CORS](https://github.com/expressjs/cors)** - Middleware para Cross-Origin Resource Sharing

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com Flexbox e Grid
- **JavaScript ES6+** - Lógica da aplicação
- **[Vite](https://vitejs.dev/)** - Build tool e dev server
- **[Font Awesome](https://fontawesome.com/)** - Ícones

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Bun](https://bun.sh/)** - Versão 1.0.0 ou superior
- **[Node.js](https://nodejs.org/)** - Versão 18.0.0 ou superior (para Vite)
- **[Git](https://git-scm.com/)** - Para clonar o repositório

### Instalação do Bun

```bash
# No Windows (PowerShell)
irm bun.sh/install.ps1 | iex

# No macOS/Linux
curl -fsSL https://bun.sh/install | bash
```

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/amazon-scraper.git
cd amazon-scraper
```

### 2. Configure o Backend

```bash
cd backend
bun install
```

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
```

## ▶️ Como Executar

### 1. Iniciar o Backend (Terminal 1)

```bash
cd backend
bun run dev
```

O servidor estará disponível em: `http://localhost:3000`

### 2. Iniciar o Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

### 3. Acessar a Aplicação

Abra seu navegador e acesse `http://localhost:5173`

## 🔗 Uso da API

### Endpoints Disponíveis

#### 1. Scraping de Produtos
```http
GET /api/scrape?keyword=termo_de_busca
```

**Parâmetros:**
- `keyword` (string, obrigatório): Termo de busca para produtos

**Exemplo de Resposta:**
```json
{
  "success": true,
  "keyword": "smartphone",
  "totalProducts": 16,
  "timestamp": "2025-08-07T10:30:00.000Z",
  "products": [
    {
      "id": 1,
      "title": "Samsung Galaxy S23 Ultra 5G",
      "rating": 4.5,
      "reviewCount": "1,234",
      "imageUrl": "https://m.media-amazon.com/images/I/...",
      "price": "$1,199.99"
    }
  ]
}
```

#### 2. Health Check
```http
GET /api/health
```

#### 3. Informações da API
```http
GET /
```

### Exemplos de Uso da API

```bash
# Buscar smartphones
curl "http://localhost:3000/api/scrape?keyword=smartphone"

# Buscar notebooks
curl "http://localhost:3000/api/scrape?keyword=notebook"

# Health check
curl "http://localhost:3000/api/health"
```

## 📁 Estrutura do Projeto

```
amazon-scraper/
├── backend/                    # API Backend
│   ├── package.json           # Dependências do backend
│   ├── server.js              # Servidor Express principal
│   └── scraper.js             # Lógica de web scraping
├── frontend/                   # Interface Frontend
│   ├── package.json           # Dependências do frontend
│   ├── index.html             # Página principal
│   ├── style.css              # Estilos CSS
│   └── script.js              # JavaScript da aplicação
└── README.md                   # Este arquivo
```

## 🎯 Funcionalidades

### Backend Features
- ✅ Scraping robusto com múltiplos seletores CSS
- ✅ Headers personalizados para evitar detecção de bot
- ✅ Timeout configurável nas requisições
- ✅ Tratamento de erros abrangente
- ✅ API RESTful bem documentada
- ✅ Logs detalhados para debugging
- ✅ Cors habilitado para frontend

### Frontend Features
- ✅ Interface intuitiva e responsiva
- ✅ Validação de input em tempo real
- ✅ Estados de loading animados
- ✅ Tratamento visual de erros
- ✅ Grid responsivo de produtos
- ✅ Sistema de rating com estrelas
- ✅ Lazy loading de imagens
- ✅ Retry automático em erros

## 🔧 Solução de Problemas

### Problemas Comuns

#### 1. "Servidor não está rodando"
**Solução:**
```bash
# Verificar se o backend está rodando
cd backend
bun run dev
```

#### 2. "CORS Error"
**Causa:** Frontend e backend em portas diferentes
**Solução:** O CORS já está configurado. Certifique-se de que o backend está rodando na porta 3000.

#### 3. "Poucos produtos retornados"
**Causa:** Amazon pode estar retornando layouts diferentes
**Solução:** O scraper já possui múltiplos seletores CSS para diferentes layouts.

#### 4. "Bun command not found"
**Solução:**
```bash
# Reinstalar Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc  # ou ~/.zshrc
```

#### 5. "Timeout Error"
**Causa:** Amazon pode estar lenta ou bloqueando requisições
**Solução:** O timeout está configurado para 10 segundos. Aguarde ou tente novamente.

### Logs de Debug

Para habilitar logs detalhados:

```bash
# Backend com logs detalhados
cd backend
DEBUG=* bun run dev

# Ver logs do frontend no console do navegador
# Abra DevTools (F12) > Console
```

### Testando os Endpoints

```bash
# Testar conectividade
curl http://localhost:3000/api/health

# Testar scraping simples
curl "http://localhost:3000/api/scrape?keyword=test"
```

## ⚖️ Considerações Legais

> **⚠️ IMPORTANTE:** Este projeto é apenas para fins educacionais e demonstração técnica.

- 📖 **Uso Educacional**: Destinado ao aprendizado de web scraping e desenvolvimento web
- 🤖 **Robots.txt**: Respeite sempre o arquivo robots.txt dos sites
- 🚫 **Rate Limiting**: Não faça requisições excessivas que possam sobrecarregar os servidores
- 📜 **Termos de Serviço**: Leia e respeite os termos de serviço da Amazon
- 🛡️ **Responsabilidade**: Use com responsabilidade e ética

### Boas Práticas Implementadas

- ✅ Headers que simulam navegadores reais
- ✅ Timeout nas requisições para evitar sobrecarga
- ✅ Tratamento gentil de erros
- ✅ Não armazenamento de dados pessoais
- ✅ Foco apenas em informações públicas

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estas etapas:

### 1. Fork do Projeto
```bash
gh repo fork https://github.com/seu-usuario/amazon-scraper.git
```

### 2. Criar Branch
```bash
git checkout -b feature/nova-funcionalidade
```

### 3. Commit das Alterações
```bash
git commit -m "feat: adiciona nova funcionalidade"
```

### 4. Push para Branch
```bash
git push origin feature/nova-funcionalidade
```

### 5. Abrir Pull Request
Crie um Pull Request detalhando suas alterações.

### Diretrizes de Contribuição

- 📝 Siga os padrões de código existentes
- ✅ Adicione testes quando necessário
- 📚 Atualize a documentação
- 🐛 Reporte bugs com detalhes
- 💡 Sugira melhorias via Issues

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- 🐛 **Bugs**: Abra uma [Issue](https://github.com/seu-usuario/amazon-scraper/issues)
- 💡 **Sugestões**: Use as [Discussions](https://github.com/seu-usuario/amazon-scraper/discussions)
- 📧 **Email**: seu-email@exemplo.com

---

**Desenvolvido com ❤️ para fins educacionais**

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!