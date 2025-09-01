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

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $superadmin = User::create([
            'name' => 'Superadmin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'superadmin',
        ]);

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

        $electronics = Category::create(['name' => 'Electronics', 'slug' => 'electronics']);
        $clothing = Category::create(['name' => 'Clothing', 'slug' => 'clothing']);

        $phone = Product::create([
            'category_id' => $electronics->id,
            'name' => 'iPhone 15',
            'slug' => 'iphone-15',
            'description' => $faker->paragraph(),
            'price' => 999.99,
            'stock_qty' => 50,
            'image' => 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
        ]);

        $laptop = Product::create([
            'category_id' => $electronics->id,
            'name' => 'MacBook Air',
            'slug' => 'macbook-air',
            'description' => $faker->paragraph(),
            'price' => 1299.99,
            'stock_qty' => 25,
            'image' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        ]);

        $tshirt = Product::create([
            'category_id' => $clothing->id,
            'name' => 'Basic T-Shirt',
            'slug' => 'basic-tshirt',
            'description' => $faker->paragraph(),
            'price' => 29.99,
            'stock_qty' => 100,
            'image' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        ]);

        $order1 = Order::create([
            'customer_id' => $customer1->id,
            'total_amount' => 1029.98,
            'status' => 'paid',
        ]);

        $order2 = Order::create([
            'customer_id' => $customer2->id,
            'total_amount' => 59.98,
            'status' => 'delivered',
        ]);

        OrderItem::create([
            'order_id' => $order1->id,
            'product_id' => $phone->id,
            'quantity' => 1,
            'price' => 999.99,
        ]);

        OrderItem::create([
            'order_id' => $order1->id,
            'product_id' => $tshirt->id,
            'quantity' => 1,
            'price' => 29.99,
        ]);

        OrderItem::create([
            'order_id' => $order2->id,
            'product_id' => $tshirt->id,
            'quantity' => 2,
            'price' => 29.99,
        ]);
    }
}
