# Smart Local Commerce - Frontend

Frontend application for the Smart Local Commerce Platform built with React, TypeScript, and Vite.

## Features

- Browse products by category and location
- Search and filter products
- View shop profiles
- View promotions and deals
- User authentication
- Admin and Business Owner dashboards
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see Backend README)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

**Note:** If your backend is running on a different port or URL, update this accordingly.

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # API service utilities
├── context/        # React context providers
├── data/           # Mock data (being migrated to API)
└── lib/            # Utility functions
```

## API Integration

The frontend now fetches data from the backend API. Make sure:

1. The backend server is running
2. The `VITE_API_URL` in `.env` points to your backend API
3. MongoDB is seeded with data (run `npm run seed` in the backend)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

<<<<<<< HEAD
## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## License

ISC
=======
### User Roles

**NiceShop has two types of authenticated users:**

#### 👨‍💼 Admin
- **Full platform control**
- Monitor all businesses and products
- View platform-wide analytics
- Access admin dashboard with charts and statistics
- Track business registrations and activity

#### 🏪 Business Owner
- **Manage own business**
- Add/edit products and promotions
- View business-specific analytics
- Track sales and inventory
- Access business dashboard

#### 🛍️ Customer (No Login Required)
- **Browse without account**
- Search and filter products
- View shop details and promotions
- No registration needed for browsing
- Future: Cart and checkout functionality

### Test Accounts

```typescript
// Admin Account
Email: admin@niceshop.com
Password: admin123
Access: Admin Dashboard - Full platform control

// Business Owner 1 (Simba Supermarket)
Email: simba@shop.com
Password: business123
Access: Business Dashboard - Manage products & promotions

// Business Owner 2 (Aaky Fashion)
Email: aaky@shop.com
Password: business123
Access: Business Dashboard - Manage products & promotions
```

### Dashboard Differences

| Feature | Admin Dashboard | Business Dashboard |
|---------|----------------|--------------------|
| **View All Businesses** | ✅ Yes | ❌ No |
| **View All Products** | ✅ Yes | ❌ Only own products |
| **Platform Analytics** | ✅ Yes | ❌ No |
| **Manage Own Products** | ❌ No | ✅ Yes |
| **Create Promotions** | ❌ No | ✅ Yes |
| **Business Analytics** | ❌ No | ✅ Yes |
| **User Management** | ✅ Yes | ❌ No |

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
>>>>>>> ef4649c2d4c28ecf93063332a498517e3d9fd0f2
