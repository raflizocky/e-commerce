# E-Commerce

A modern e-commerce backend built with Laravel.

## Features

- Dashboard, Product, Order, Category, User management with Filament
- API endpoints for frontend integration with Sanctum

## Project Structure

```
app/             # Application core (Models, Controllers, etc.)
Filament/        # Filament resources (Pages, Resources, Widgets, etc.)
config/          # Configuration files
database/        # Migrations, seeders, factories
routes/          # API and web route definitions
```

## Getting Started

1. **Install dependencies:**
   ```sh
   composer install
   ```

2. **Copy `.env` file and set up environment variables:**
   ```sh
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configure your database in `.env`.**

4. **Run migrations and seeders:**
   ```sh
   php artisan migrate --seed
   ```

5. **Start the development server:**
   ```sh
   php artisan serve
   ```

## API

- All API routes are defined in `routes/api.php`.
- Use tools like Postman to test endpoints.
