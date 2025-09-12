<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Customer;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // --- Users ---
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Superadmin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'superadmin',
        ]);

        // --- Customers ---
        $customer1 = Customer::create([
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'password' => Hash::make('password'),
            'phone' => '081234567890',
            'address' => 'Jl. Merdeka No. 123, Jakarta',
        ]);

        $customer2 = Customer::create([
            'name' => 'Jane Smith',
            'email' => 'jane@gmail.com',
            'password' => Hash::make('password'),
            'phone' => '081234567891',
            'address' => 'Jl. Sudirman No. 456, Medan',
        ]);

        // --- Categories ---
        $living = Category::create(['name' => 'Living Room', 'slug' => 'living-room']);
        $dining = Category::create(['name' => 'Dining Room', 'slug' => 'dining-room']);
        $bedroom = Category::create(['name' => 'Bedroom', 'slug' => 'bedroom']);
        $office = Category::create(['name' => 'Office', 'slug' => 'office']);

        // --- Furniture Products (20 pcs) ---
        $products = [
            // Living Room
            ['Modern Sofa', $living->id, 499.99, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'],
            ['Classic Armchair', $living->id, 199.99, 'https://images.unsplash.com/photo-1585559604903-f7c1f3b4b9c8?w=400&h=400&fit=crop'],
            ['Wooden Coffee Table', $living->id, 149.99, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop'],
            ['Minimalist TV Stand', $living->id, 179.99, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop'],
            ['Bookshelf Cabinet', $living->id, 249.99, 'https://images.unsplash.com/photo-1616627985120-68f35c2c22fc?w=400&h=400&fit=crop'],

            // Dining Room
            ['Dining Table Set', $dining->id, 699.99, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=400&fit=crop'],
            ['Wooden Chair', $dining->id, 89.99, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop'],
            ['Bar Stool', $dining->id, 119.99, 'https://images.unsplash.com/photo-1616627566165-fc2a06a9bc14?w=400&h=400&fit=crop'],
            ['Sideboard Cabinet', $dining->id, 399.99, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=400&h=400&fit=crop'],
            ['Dining Bench', $dining->id, 229.99, 'https://images.unsplash.com/photo-1616627566741-3bc7a64b0c02?w=400&h=400&fit=crop'],

            // Bedroom
            ['King Size Bed', $bedroom->id, 799.99, 'https://images.unsplash.com/photo-1600607687126-1d4d2b85d2b2?w=400&h=400&fit=crop'],
            ['Nightstand', $bedroom->id, 139.99, 'https://images.unsplash.com/photo-1600607687181-d30ef6a0a913?w=400&h=400&fit=crop'],
            ['Wardrobe Closet', $bedroom->id, 599.99, 'https://images.unsplash.com/photo-1600607687191-60f9d85cb5c3?w=400&h=400&fit=crop'],
            ['Dresser with Mirror', $bedroom->id, 459.99, 'https://images.unsplash.com/photo-1616627567170-09844d5d1c2a?w=400&h=400&fit=crop'],
            ['Bunk Bed', $bedroom->id, 549.99, 'https://images.unsplash.com/photo-1600607687191-2a1340b5bfcf?w=400&h=400&fit=crop'],

            // Office
            ['Ergonomic Office Chair', $office->id, 249.99, 'https://images.unsplash.com/photo-1598300055091-2341a4f9089a?w=400&h=400&fit=crop'],
            ['Office Desk', $office->id, 349.99, 'https://images.unsplash.com/photo-1598300054760-4a7df6e480c9?w=400&h=400&fit=crop'],
            ['Bookshelf', $office->id, 199.99, 'https://images.unsplash.com/photo-1600607687184-3a4d1e3b6aee?w=400&h=400&fit=crop'],
            ['Filing Cabinet', $office->id, 189.99, 'https://images.unsplash.com/photo-1600607687119-5a57d4d9e5f9?w=400&h=400&fit=crop'],
            ['Conference Table', $office->id, 799.99, 'https://images.unsplash.com/photo-1598300055091-1237a4e409ab?w=400&h=400&fit=crop'],
        ];

        foreach ($products as $p) {
            Product::create([
                'category_id'   => $p[1],
                'name'          => $p[0],
                'slug'          => strtolower(str_replace(' ', '-', $p[0])),
                'description'   => $faker->paragraph(),
                'price'         => $p[2],
                'stock_qty'     => $faker->numberBetween(10, 100),
                'image'         => $p[3],
                'is_featured'   => $faker->boolean(),
                'is_recommended' => $faker->boolean(),
            ]);
        }

        // --- Orders Example ---
        $order1 = Order::create([
            'customer_id' => $customer1->id,
            'total_amount' => 999.98,
            'status' => 'paid',
        ]);

        $order2 = Order::create([
            'customer_id' => $customer2->id,
            'total_amount' => 459.99,
            'status' => 'delivered',
        ]);

        OrderItem::create([
            'order_id' => $order1->id,
            'product_id' => 1,
            'quantity' => 2,
            'price' => 499.99,
        ]);

        OrderItem::create([
            'order_id' => $order2->id,
            'product_id' => 14,
            'quantity' => 1,
            'price' => 459.99,
        ]);
    }
}
