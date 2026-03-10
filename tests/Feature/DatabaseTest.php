<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Category;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DatabaseTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_database_has_products_with_categories()
    {
        // Create test data
        $category = Category::create([
            'name' => 'Test Category',
        ]);
        
        Product::create([
            'name' => 'Test Product',
            'sku' => 'TEST-001',
            'price' => 100.00,
            'stock' => 50,
            'description' => 'Test description',
            'category_id' => $category->id,
        ]);
        
        $products = Product::with('category')->get();
        
        $this->assertGreaterThan(0, $products->count(), 'No products in database');
        $this->assertNotNull($products->first()->category, 'Product has no category');
    }
}
