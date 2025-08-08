# Amazon Product Scraper

🛒 **A complete application to extract Amazon product information using web scraping**

This project consists of a backend API built with **Bun** and **Express** that scrapes Amazon, and a responsive frontend developed with **HTML, CSS, and vanilla JavaScript** using **Vite**.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [API Usage](#api-usage)
- [Project Structure](#project-structure)
- [Functionality](#functionality)
- [Troubleshooting](#troubleshooting)
- [Legal Considerations](#legal-considerations)
- [Contributing](#contributing)

## ✨ Features

- 🔍 **Smart Scraping**: Extracts product title, rating, number of reviews, image, and price
- 🎨 **Modern Interface**: Responsive design inspired by Amazon
- ⚡ **Performance**: Backend optimized with Bun and frontend with Vite
- 🛡️ **Error Handling**: Robust error handling system
- 📱 **Responsive**: Works perfectly on desktop and mobile
- 🔄 **Loading States**: Visual loading indicators
- 🎯 **Validation**: Real-time input validation

## 🛠️ Technologies Used

### Backend
- **[Bun](https://bun.sh/)** - Ultra-fast JavaScript runtime
- **[Express.js](https://expressjs.com/)** - Minimalist web framework
- **[Axios](https://axios-http.com/)** - HTTP client for requests
- **[JSDOM](https://github.com/jsdom/jsdom)** - DOM implementation for Node.js
- **[CORS](https://github.com/expressjs/cors)** - Middleware for Cross-Origin Resource Sharing

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript ES6+** - Application logic
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Font Awesome](https://fontawesome.com/)** - Icons

## 📦 Prerequisites

Before you start, make sure you have installed:

- **[Bun](https://bun.sh/)** - Version 1.0.0 or higher
- **[Node.js](https://nodejs.org/)** - Version 18.0.0 or higher (for Vite)
- **[Git](https://git-scm.com/)** - To clone the repository

### Installing Bun

```bash
# On Windows (PowerShell)
irm bun.sh/install.ps1 | iex

# On macOS/Linux
curl -fsSL https://bun.sh/install | bash
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/amazon-scraper.git
cd amazon-scraper
```

### 2. Set up the Backend

```bash
cd backend
bun install
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

## ▶️ How to Run

### 1. Start the Backend (Terminal 1)

```bash
cd backend
bun run dev
```

The server will be available at: `http://localhost:3000`

### 2. Start the Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### 3. Access the Application

Open your browser and go to `http://localhost:5173`

## 🔗 API Usage

### Available Endpoints

#### 1. Product Scraping
```http
GET /api/scrape?keyword=search_term
```

**Parameters:**
- `keyword` (string, required): Search term for products

**Example Response:**
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

#### 3. API Information
```http
GET /
```

### API Usage Examples

```bash
# Search for smartphones
curl "http://localhost:3000/api/scrape?keyword=smartphone"

# Search for laptops
curl "http://localhost:3000/api/scrape?keyword=notebook"

# Health check
curl "http://localhost:3000/api/health"
```

## 📁 Project Structure

```
amazon-scraper/
├── backend/                    # API Backend
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Main Express server
│   └── scraper.js             # Web scraping logic
├── frontend/                   # Frontend interface
│   ├── package.json           # Frontend dependencies
│   ├── index.html             # Main page
│   ├── style.css              # CSS styles
│   └── script.js              # Application JavaScript
└── README.md                   # This file
```

## 🎯 Functionality

### Backend Features
- ✅ Robust scraping with multiple CSS selectors
- ✅ Custom headers to avoid bot detection
- ✅ Configurable request timeout
- ✅ Comprehensive error handling
- ✅ Well-documented RESTful API
- ✅ Detailed logs for debugging
- ✅ CORS enabled for frontend

### Frontend Features
- ✅ Intuitive and responsive interface
- ✅ Real-time input validation
- ✅ Animated loading states
- ✅ Visual error handling
- ✅ Responsive product grid
- ✅ Star rating system
- ✅ Lazy image loading
- ✅ Automatic retry on errors

## 🔧 Troubleshooting

### Common Issues

#### 1. "Server is not running"
**Solution:**
```bash
# Check if the backend is running
cd backend
bun run dev
```

#### 2. "CORS Error"
**Cause:** Frontend and backend on different ports  
**Solution:** CORS is already configured. Make sure the backend is running on port 3000.

#### 3. "Few products returned"
**Cause:** Amazon may be returning different layouts  
**Solution:** The scraper already has multiple CSS selectors for different layouts.

#### 4. "Bun command not found"
**Solution:**
```bash
# Reinstall Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc  # or ~/.zshrc
```

#### 5. "Timeout Error"
**Cause:** Amazon may be slow or blocking requests  
**Solution:** The timeout is set to 10 seconds. Wait or try again.

### Debug Logs

To enable detailed logs:

```bash
# Backend with detailed logs
cd backend
DEBUG=* bun run dev

# View frontend logs in the browser console
# Open DevTools (F12) > Console
```

### Testing Endpoints

```bash
# Test connectivity
curl http://localhost:3000/api/health

# Simple scraping test
curl "http://localhost:3000/api/scrape?keyword=test"
```

## ⚖️ Legal Considerations

> **⚠️ IMPORTANT:** This project is for educational and demonstration purposes only.

- 📖 **Educational Use**: Intended for learning web scraping and web development
- 🤖 **Robots.txt**: Always respect the site's robots.txt file
- 🚫 **Rate Limiting**: Do not make excessive requests that may overload servers
- 📜 **Terms of Service**: Read and respect Amazon's terms of service
- 🛡️ **Responsibility**: Use responsibly and ethically

### Best Practices Implemented

- ✅ Headers that simulate real browsers
- ✅ Request timeout to avoid overload
- ✅ Gentle error handling
- ✅ No storage of personal data
- ✅ Focus only on public information

## 🤝 Contributing

Contributions are welcome! Follow these steps:

### 1. Fork the Project
```bash
gh repo fork https://github.com/your-username/amazon-scraper.git
```

### 2. Create a Branch
```bash
git checkout -b feature/new-feature
```

### 3. Commit Your Changes
```bash
git commit -m "feat: add new feature"
```

### 4. Push to Branch
```bash
git push origin feature/new-feature
```

### 5. Open a Pull Request
Create a Pull Request detailing your changes.

### Contribution Guidelines

- 📝 Follow existing code standards
- ✅ Add tests when necessary
- 📚 Update documentation
- 🐛 Report bugs with details
- 💡 Suggest improvements via Issues

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Support

- 🐛 **Bugs**: Open an [Issue](https://github.com/your-username/amazon-scraper/issues)
- 💡 **Suggestions**: Use [Discussions](https://github.com/your-username/amazon-scraper/discussions)
- 📧 **Email**: your-email@example.com

---

**Developed with ❤️ for educational purposes**

⭐ If this project helped you, consider giving it a star on GitHub!
