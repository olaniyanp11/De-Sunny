<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_order()
    {
        // Create a user
        $user = User::factory()->create(['role' => 'staff']);

        // Create products with stock
        $product1 = Product::factory()->create(['stock' => 10, 'price' => 100]);
        $product2 = Product::factory()->create(['stock' => 5, 'price' => 200]);

        // Act as the user
        $this->actingAs($user);

        // Attempt to create an order
        $response = $this->post(route('orders.store'), [
            'items' => [
                ['product_id' => $product1->id, 'quantity' => 2],
                ['product_id' => $product2->id, 'quantity' => 1],
            ],
        ]);

        // Assert redirect to orders index
        $response->assertRedirect(route('orders.index'));

        // Assert order was created
        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'total' => 400, // (2*100) + (1*200)
            'status' => 'completed',
        ]);

        // Assert stock was decremented
        $this->assertEquals(8, $product1->fresh()->stock);
        $this->assertEquals(4, $product2->fresh()->stock);
    }

    public function test_order_creation_fails_with_insufficient_stock()
    {
        $user = User::factory()->create(['role' => 'staff']);
        $product = Product::factory()->create(['stock' => 2, 'price' => 100]);

        $this->actingAs($user);

        $response = $this->post(route('orders.store'), [
            'items' => [
                ['product_id' => $product->id, 'quantity' => 5], // More than available
            ],
        ]);

        // Should redirect back with error
        $response->assertRedirect();

        // Order should not be created
        $this->assertDatabaseMissing('orders', [
            'user_id' => $user->id,
        ]);

        // Stock should remain unchanged
        $this->assertEquals(2, $product->fresh()->stock);
    }
}
