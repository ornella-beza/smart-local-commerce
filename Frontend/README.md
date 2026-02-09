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

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## License

ISC
