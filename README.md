# E-Commerce

A modern e-commerce frontend built with React, TypeScript, Vite, and Tailwind CSS. 

Need custom features? [Contact Me](mailto:work.raflizocky@gmail.com).

<img width="6725" height="3521" alt="Image" src="https://github.com/user-attachments/assets/b2f1aadc-e313-49be-9aa9-e797e0c19cfc" />

<img width="7992" height="4041" alt="Image" src="https://github.com/user-attachments/assets/6de23a00-42a9-42f4-8be9-f02c983ed9bc" />

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
