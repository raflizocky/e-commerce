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

        // --- Furniture Products with Reliable Images ---
        $products = [
            // Living Room - Using Picsum (Lorem Picsum) with furniture-related seeds
            ['Modern Sofa', $living->id, 499.99, 'https://picsum.photos/seed/sofa1/400/400'],
            ['Classic Armchair', $living->id, 199.99, 'https://picsum.photos/seed/chair1/400/400'],
            ['Wooden Coffee Table', $living->id, 149.99, 'https://picsum.photos/seed/table1/400/400'],
            ['Minimalist TV Stand', $living->id, 179.99, 'https://picsum.photos/seed/tvstand1/400/400'],
            ['Bookshelf Cabinet', $living->id, 249.99, 'https://picsum.photos/seed/bookshelf1/400/400'],

            // Dining Room
            ['Dining Table Set', $dining->id, 699.99, 'https://picsum.photos/seed/dining1/400/400'],
            ['Wooden Chair', $dining->id, 89.99, 'https://picsum.photos/seed/woodchair1/400/400'],
            ['Bar Stool', $dining->id, 119.99, 'https://picsum.photos/seed/barstool1/400/400'],
            ['Sideboard Cabinet', $dining->id, 399.99, 'https://picsum.photos/seed/sideboard1/400/400'],
            ['Dining Bench', $dining->id, 229.99, 'https://picsum.photos/seed/bench1/400/400'],

            // Bedroom
            ['King Size Bed', $bedroom->id, 799.99, 'https://picsum.photos/seed/bed1/400/400'],
            ['Nightstand', $bedroom->id, 139.99, 'https://picsum.photos/seed/nightstand1/400/400'],
            ['Wardrobe Closet', $bedroom->id, 599.99, 'https://picsum.photos/seed/wardrobe1/400/400'],
            ['Dresser with Mirror', $bedroom->id, 459.99, 'https://picsum.photos/seed/dresser1/400/400'],
            ['Bunk Bed', $bedroom->id, 549.99, 'https://picsum.photos/seed/bunk1/400/400'],

            // Office
            ['Ergonomic Office Chair', $office->id, 249.99, 'https://picsum.photos/seed/officechair1/400/400'],
            ['Office Desk', $office->id, 349.99, 'https://picsum.photos/seed/desk1/400/400'],
            ['Bookshelf', $office->id, 199.99, 'https://picsum.photos/seed/bookshelf2/400/400'],
            ['Filing Cabinet', $office->id, 189.99, 'https://picsum.photos/seed/filing1/400/400'],
            ['Conference Table', $office->id, 799.99, 'https://picsum.photos/seed/conference1/400/400'],
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
