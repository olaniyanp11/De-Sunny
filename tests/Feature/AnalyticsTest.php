<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnalyticsTest extends TestCase
{
    use RefreshDatabase;

    public function test_analytics_page_requires_authentication()
    {
        $response = $this->get(route('analytics.index'));

        $response->assertRedirect(route('login'));
    }

    public function test_analytics_page_requires_admin_or_manager_role()
    {
        $user = User::factory()->create(['role' => 'staff']);

        $response = $this->actingAs($user)->get(route('analytics.index'));

        $response->assertForbidden();
    }

    public function test_admin_can_access_analytics_page()
    {
        $user = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($user)->get(route('analytics.index'));

        $response->assertOk();
    }

    public function test_manager_can_access_analytics_page()
    {
        $user = User::factory()->create(['role' => 'manager']);

        $response = $this->actingAs($user)->get(route('analytics.index'));

        $response->assertOk();
    }

    public function test_analytics_data_structure()
    {
        $user = User::factory()->create(['role' => 'admin']);

        // Create some test data
        $product = Product::factory()->create(['price' => 100, 'stock' => 10]);
        $order = Order::factory()->create([
            'user_id' => $user->id,
            'items' => json_encode([
                [
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'quantity' => 2,
                ]
            ]),
            'total' => 200,
            'status' => 'completed',
        ]);

        $response = $this->actingAs($user)->get(route('analytics.index'));

        $response->assertOk();

        // For Inertia responses, check that the component is rendered
        $response->assertInertia(fn ($page) => $page
            ->component('Analytics/Index')
            ->has('salesData')
            ->has('ordersData')
            ->has('topProducts')
            ->has('summary')
            ->where('summary.total_sales', 200)
            ->where('summary.total_orders', 1)
            ->where('summary.completed_orders', 1)
        );
    }

    public function test_analytics_filters_work()
    {
        $user = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($user)->get(route('analytics.index', [
            'period' => 'month',
            'date' => '2024-01-01'
        ]));

        $response->assertOk();
    }
}