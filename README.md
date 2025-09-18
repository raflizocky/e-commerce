# E-Commerce

A modern e-commerce frontend built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Product listing, detail, and search
- User authentication (Sign In/Sign Up)
- Profile management
- Order creation and history
- Responsive design (mobile & desktop)
- API integration with Axios

## Project Structure

```
src/
  components/      # Reusable UI components (Navbar, Footer, ProductCard, etc.)
  pages/           # Route pages (Home, Products, ProductDetail, Checkout, etc.)
  services/        # API service modules (auth, product, orders)
  assets/          # Static assets
  index.css        # Tailwind CSS entry
  App.tsx          # Main app component with routing
  main.tsx         # App entry point
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

3. **Build for production:**
   ```sh
   npm run build
   ```

4. **Preview the production build:**
   ```sh
   npm run preview
   ```

## Configuration

- API base URL is set via `.env` file using `VITE_API_URL`.
- Tailwind CSS is configured via `tailwindcss` and `@tailwindcss/vite`.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code with ESLint
