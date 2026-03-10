<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        // Create manager user
        User::factory()->create([
            'name' => 'Manager User',
            'email' => 'manager@example.com',
            'role' => 'manager',
        ]);

        // Create staff user
        User::factory()->create([
            'name' => 'Staff User',
            'email' => 'staff@example.com',
            'role' => 'staff',
        ]);

        // Create categories
        $electronics = \App\Models\Category::create(['name' => 'Electronics']);
        $accessories = \App\Models\Category::create(['name' => 'Accessories']);
        $groceries = \App\Models\Category::create(['name' => 'Groceries']);

        // Create sample products
        \App\Models\Product::create([
            'name' => 'Wireless Earbuds Pro',
            'sku' => 'WEB001',
            'price' => 15000.00,
            'stock' => 50,
            'description' => 'High-quality wireless earbuds with noise cancellation.',
            'category_id' => $electronics->id,
        ]);

        \App\Models\Product::create([
            'name' => 'Smartphone Case',
            'sku' => 'SPC001',
            'price' => 2500.00,
            'stock' => 100,
            'description' => 'Protective case for smartphones.',
            'category_id' => $accessories->id,
        ]);

        \App\Models\Product::create([
            'name' => 'Laptop Charger',
            'sku' => 'LPC001',
            'price' => 8000.00,
            'stock' => 20,
            'description' => 'Universal laptop charger.',
            'category_id' => $electronics->id,
        ]);

        \App\Models\Product::create([
            'name' => 'Organic Rice',
            'sku' => 'ORC001',
            'price' => 2000.00,
            'stock' => 200,
            'description' => 'Premium organic rice.',
            'category_id' => $groceries->id,
        ]);
    }
}
