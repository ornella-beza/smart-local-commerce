# NiceShop E-Commerce Homepage

A modern e-commerce homepage built with React, TypeScript, Tailwind CSS v4, and shadcn/ui components.

## Features

- **Responsive Design**: Clean, modern layout optimized for all screen sizes
- **Top Banner**: Phone support, shipping info, and language/currency selectors
- **Search Functionality**: Prominent search bar with icon button
- **Shopping Features**: User account, wishlist, and cart with item counters
- **Navigation Menu**: Full navigation with dropdown support
- **Hero Section**: Large hero with featured product display
- **Product Cards**: Interactive product cards with badges and pricing
- **Feature Highlights**: Free shipping, quality guarantee, and 24/7 support badges
- **Trending Collections**: Featured summer collection with large display card
- **Category Grid**: Browse by category - Men's Wear, Kid's Fashion, Beauty Products, and Accessories
- **Pastel Color Theme**: Beautiful pastel backgrounds for category cards

## Tech Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: Zustand (configured but not yet used)
- **Router**: React Router v7 (configured but not yet used)

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── TopBanner.tsx        # Top banner with contact & shipping info
│   ├── Header.tsx           # Main header with logo, search & icons
│   ├── Navigation.tsx       # Navigation menu
│   ├── HeroSection.tsx      # Hero section with featured content
│   ├── ProductCard.tsx      # Reusable product card component
│   ├── TrendingSection.tsx  # Trending collections section
│   └── CategoryCard.tsx     # Category card for browsing
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles & Tailwind config

```

## Design Tokens

The theme uses a neutral color palette with black and white as primary colors, complemented by pastel accents:

- **Primary**: Black (for navigation, buttons)
- **Background**: Light gray (#F9F9F9)
- **Card**: White (#FFFFFF)
- **Text**: Black for headings, gray for body text
- **Accent**: Red badges for cart counters
- **Pastel Colors**: 
  - Purple (#F3E8FF) - Featured collection
  - Blue (#E0F2FE) - Men's Wear
  - Beige (#FEF3E2) - Kid's Fashion
  - Pink (#FCE7F3) - Beauty Products
  - Green (#DCFCE7) - Accessories

## Product Images

All product images are sourced from:
- **Pexels**: Ksenia Chernaya, José Martin Segura Benites, Artem Podrez, Duy's House of Photo, Ray Piedra, Fashion Needles
- **Pixabay**: Chillsoffear

## Future Enhancements

- Add product listing pages
- Implement shopping cart functionality
- Add user authentication
- Connect to a backend API
- Add more interactive features (filters, sorting)
- Implement responsive mobile menu

## License

MIT
# smart-local-commerce
# smart-local-commerce
# smart-local-commerce
