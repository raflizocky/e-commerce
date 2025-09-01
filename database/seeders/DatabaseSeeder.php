<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
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

        $user = User::create([
            'name' => 'Superadmin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'superadmin',
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
            'image' => $faker->imageUrl(400, 400, 'technics'),
        ]);

        $laptop = Product::create([
            'category_id' => $electronics->id,
            'name' => 'MacBook Air',
            'slug' => 'macbook-air',
            'description' => $faker->paragraph(),
            'price' => 1299.99,
            'stock_qty' => 25,
            'image' => $faker->imageUrl(400, 400, 'technics'),
        ]);

        $tshirt = Product::create([
            'category_id' => $clothing->id,
            'name' => 'Basic T-Shirt',
            'slug' => 'basic-tshirt',
            'description' => $faker->paragraph(),
            'price' => 29.99,
            'stock_qty' => 100,
            'image' => $faker->imageUrl(400, 400, 'fashion'),
        ]);

        $order1 = Order::create([
            'customer_id' => $user->id,
            'total_amount' => 1029.98,
            'status' => 'paid',
        ]);

        $order2 = Order::create([
            'customer_id' => $admin->id,
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
