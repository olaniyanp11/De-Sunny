<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Category;
use Tests\TestCase;

class DatabaseTest extends TestCase
{
    public function test_database_has_products_with_categories()
    {
        // This test runs on the actual database, not refresh
        $products = \App\Models\Product::with('category')->get();
        
        dump('Products in database:');
        foreach ($products as $product) {
            dump([
                'id' => $product->id,
                'name' => $product->name,
                'stock' => $product->stock,
                'category_id' => $product->category_id,
                'category_name' => $product->category?->name,
            ]);
        }
        
        $this->assertGreaterThan(0, $products->count(), 'No products in database');
    }
}
