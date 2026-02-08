<div align="center">
  <img src="public/favicon.svg" alt="NiceShop Logo" width="120" height="120"/>
  <h1>🛍️ NiceShop - Local Commerce Platform</h1>
  <p><strong>Connecting Local Businesses with Customers Across Rwanda</strong></p>
  
  [![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Authentication](#-authentication)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

NiceShop is a comprehensive local commerce platform designed for Rwanda, enabling businesses to showcase their products and customers to discover local deals. Built with modern web technologies, it features role-based dashboards, real-time promotions, and a fully responsive design.

### 🎯 Key Highlights

- 🏪 **Multi-Vendor Support** - Multiple businesses can manage their products
- 📊 **Analytics Dashboards** - Admin and business owner dashboards with charts
- ⚡ **Flash Sales** - Live countdown timers for promotions
- 🎨 **Modern UI** - Gradient designs, smooth animations, and responsive layouts
- 🔐 **Role-Based Access** - Admin, Business Owner, and Customer roles
- 🌍 **Location-Based** - Filter by Rwanda regions (Kigali, Musanze, Rubavu, etc.)

---

## ✨ Features

### 🛒 E-Commerce Core
- **Product Catalog** - Browse 15+ products across 7 categories
- **Advanced Search** - Search by name, category, location, and brand
- **Product Details** - Full product pages with images, pricing, and business info
- **Shopping Cart** - Add to cart functionality (UI ready)
- **Wishlist** - Save favorite products
- **Promotions** - Active deals with discount badges and validity dates

### 🏢 Business Features
- **Shop Directory** - Browse all local businesses
- **Shop Profiles** - Logo, description, contact info, and product listings
- **Business Dashboard** - Manage products, promotions, and view analytics
- **Product Management** - Add/edit products with images and pricing
- **Promotion Management** - Create time-limited deals

### 👨‍💼 Admin Features
- **Admin Dashboard** - Platform-wide statistics and analytics
- **Business Monitoring** - Track all registered businesses
- **Product Oversight** - View all products across the platform
- **Analytics Charts** - Weekly activity and category distribution

### 🎨 UI/UX Features
- **Flash Sale Section** - Animated countdown timer (days/hours/minutes/seconds)
- **Hero Section** - Featured content banner
- **Trending Collections** - Curated product showcases
- **Best Sellers** - Popular products section
- **Category Cards** - Pastel-themed category browsing
- **Responsive Design** - Mobile-first, optimized for all screen sizes
- **Gradient Themes** - Modern gradient backgrounds and cards
- **Smooth Animations** - Hover effects and transitions

### 🔐 Authentication & Authorization
- **User Login** - Email/password authentication
- **User Registration** - Sign up as Customer or Business Owner
- **Protected Routes** - Role-based access control
- **Mock Users** - Pre-configured test accounts

---

## 🛠️ Tech Stack

### Frontend Framework
- ![React](https://img.shields.io/badge/-React_19.2-61DAFB?logo=react&logoColor=white&style=flat-square) **React 19.2** - UI library
- ![TypeScript](https://img.shields.io/badge/-TypeScript_5.9-3178C6?logo=typescript&logoColor=white&style=flat-square) **TypeScript 5.9** - Type safety
- ![Vite](https://img.shields.io/badge/-Vite_7.2-646CFF?logo=vite&logoColor=white&style=flat-square) **Vite 7.2** - Build tool

### Styling & UI
- ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS_4.1-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square) **Tailwind CSS v4** - Utility-first CSS
- ![shadcn/ui](https://img.shields.io/badge/-shadcn/ui-000000?logo=shadcnui&logoColor=white&style=flat-square) **shadcn/ui** - Component library
- ![Lucide](https://img.shields.io/badge/-Lucide_React-F56565?logo=lucide&logoColor=white&style=flat-square) **Lucide React** - Icon library

### Routing & State
- ![React Router](https://img.shields.io/badge/-React_Router_7-CA4245?logo=react-router&logoColor=white&style=flat-square) **React Router v7** - Client-side routing
- **Context API** - Authentication state management

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.19+ or 22.12+
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/ornella-beza/smart-local-commerce.git
cd smart-local-commerce

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

No environment variables required - uses mock data for development.

---

## 📁 Project Structure

```
smart-local-commerce/
├── public/
│   └── favicon.svg              # NiceShop logo
├── src/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── BestSellersSection.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── Charts.tsx           # Line & Bar charts
│   │   ├── FlashSale.tsx        # Countdown timer
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProductCard.tsx
│   │   ├── TopBanner.tsx
│   │   └── TrendingSection.tsx
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication context
│   ├── data/
│   │   └── mockData.ts          # Mock users, products, businesses
│   ├── pages/
│   │   ├── AdminDashboard.tsx
│   │   ├── BusinessDashboard.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── PromotionDetailPage.tsx
│   │   ├── PromotionsPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ShopDetailPage.tsx
│   │   └── ShopsPage.tsx
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── App.tsx                  # Main app with routing
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json                  # Vercel deployment config
└── README.md
```

---

## 🗺️ Pages & Routes

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/` | Home | Public | Hero, Flash Sale, Trending, Best Sellers |
| `/login` | Login | Public | User authentication |
| `/register` | Register | Public | User registration |
| `/shops` | Shops | Public | Browse all businesses |
| `/shop/:id` | Shop Detail | Public | Individual shop page |
| `/products` | Products | Public | Product catalog with filters |
| `/product/:id` | Product Detail | Public | Individual product page |
| `/promotions` | Promotions | Public | Active deals and discounts |
| `/promotion/:id` | Promotion Detail | Public | Individual promotion page |
| `/admin/dashboard` | Admin Dashboard | Admin Only | Platform analytics |
| `/business/dashboard` | Business Dashboard | Business Only | Product/promotion management |

---

## 🔐 Authentication

### Test Accounts

```typescript
// Admin Account
Email: admin@niceshop.com
Password: admin123

// Business Owner 1
Email: simba@shop.com
Password: business123

// Business Owner 2
Email: aaky@shop.com
Password: business123
```

### User Roles

- **Admin** - Full platform access, analytics, business monitoring
- **Business Owner** - Manage own products and promotions
- **Customer** - Browse and shop (default role)

---

## 🎨 Design System

### Color Palette

- **Primary**: Black (#000000) - Navigation, buttons
- **Background**: Light Gray (#F9F9F9)
- **Card**: White (#FFFFFF)
- **Text**: Black for headings, gray for body
- **Accent**: Red for badges

### Pastel Accents

- 🟣 Purple (#F3E8FF) - Featured collections
- 🔵 Blue (#E0F2FE) - Men's Wear
- 🟡 Beige (#FEF3E2) - Kid's Fashion
- 🩷 Pink (#FCE7F3) - Beauty Products
- 🟢 Green (#DCFCE7) - Accessories

---

## 📊 Mock Data

- **4 Businesses** - Simba Supermarket, Aaky Fashion, SBO Electronics, Levi Store
- **15 Products** - Clothing, Electronics, Home & Kitchen, Beauty, Sports, Books, Toys
- **4 Promotions** - Active deals with discounts
- **7 Areas** - Kigali (Gasabo, Kicukiro, Nyarugenge), Musanze, Rubavu, Huye, Muhanga
- **7 Categories** - Clothing, Electronics, Home & Kitchen, Beauty, Sports, Books, Toys
- **8 Brands** - Nike, Adidas, Puma, Reebok, Under Armour, New Balance, Columbia, Miki

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Configure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Deploy!

The `vercel.json` file ensures proper SPA routing.

### Other Platforms

- **Netlify**: Automatic detection, uses `dist` folder
- **GitHub Pages**: Requires additional routing configuration
- **AWS Amplify**: Auto-detects Vite configuration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
## 🙏 Acknowledgments

### Image Credits
- **Pexels**: Ksenia Chernaya, José Martin Segura Benites, Artem Podrez, Duy's House of Photo, Ray Piedra, Fashion Needles, Salvador Olague, Alana Kato, Pablo Ravazi, Antonio Bracho, Ron Lach
- **Unsplash**: Anastasiia Balandina, lo lindo, Jay Soundo
- **Pixabay**: Chillsoffear

### Technologies
- [React](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Components
- [Lucide](https://lucide.dev/) - Icons
- [Vite](https://vitejs.dev/) - Build Tool

---

<div align="center">
  <p>Made with ❤️ for Rwanda's Local Commerce</p>
  <p>© 2026 NiceShop. All rights reserved.</p>
</div>
