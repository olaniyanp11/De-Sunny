<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->get('period', 'month'); // day, week, month, year
        $date = $request->get('date', now()->format('Y-m-d'));

        // Calculate date range based on period
        $startDate = $this->getStartDate($period, $date);
        $endDate = $this->getEndDate($period, $date);

        // Get sales data
        $salesData = $this->getSalesData($startDate, $endDate, $period);

        // Get orders data
        $ordersData = $this->getOrdersData($startDate, $endDate, $period);

        // Get top products
        $topProducts = $this->getTopProducts($startDate, $endDate);

        // Get summary stats
        $summary = $this->getSummaryStats($startDate, $endDate);

        return Inertia::render('Analytics/Index', [
            'salesData' => $salesData,
            'ordersData' => $ordersData,
            'topProducts' => $topProducts,
            'summary' => $summary,
            'filters' => [
                'period' => $period,
                'date' => $date,
            ],
        ]);
    }

    private function getStartDate($period, $date)
    {
        return match($period) {
            'day' => $date,
            'week' => now()->parse($date)->startOfWeek()->format('Y-m-d'),
            'month' => now()->parse($date)->startOfMonth()->format('Y-m-d'),
            'year' => now()->parse($date)->startOfYear()->format('Y-m-d'),
            default => now()->parse($date)->startOfMonth()->format('Y-m-d'),
        };
    }

    private function getEndDate($period, $date)
    {
        return match($period) {
            'day' => $date,
            'week' => now()->parse($date)->endOfWeek()->format('Y-m-d'),
            'month' => now()->parse($date)->endOfMonth()->format('Y-m-d'),
            'year' => now()->parse($date)->endOfYear()->format('Y-m-d'),
            default => now()->parse($date)->endOfMonth()->format('Y-m-d'),
        };
    }

    private function getSalesData($startDate, $endDate, $period)
    {
        $query = Order::where('status', 'completed')
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59']);

        if ($period === 'day') {
            // Hourly data for the day
            $data = $query->select(
                DB::raw('strftime(\'%H\', created_at) as hour'),
                DB::raw('SUM(total) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->map(function ($item) {
                return [
                    'label' => $item->hour . ':00',
                    'sales' => (float) $item->total,
                    'orders' => (int) $item->count,
                ];
            });
        } else {
            // Daily data
            $data = $query->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'label' => $item->date,
                    'sales' => (float) $item->total,
                    'orders' => (int) $item->count,
                ];
            });
        }

        return $data;
    }

    private function getOrdersData($startDate, $endDate, $period)
    {
        $query = Order::whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59']);

        if ($period === 'day') {
            $data = $query->select(
                DB::raw('strftime(\'%H\', created_at) as hour'),
                DB::raw('COUNT(*) as total_orders'),
                DB::raw('SUM(CASE WHEN status = \'completed\' THEN 1 ELSE 0 END) as completed_orders'),
                DB::raw('SUM(CASE WHEN status = \'pending\' THEN 1 ELSE 0 END) as pending_orders')
            )
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->map(function ($item) {
                return [
                    'label' => $item->hour . ':00',
                    'total' => (int) $item->total_orders,
                    'completed' => (int) $item->completed_orders,
                    'pending' => (int) $item->pending_orders,
                ];
            });
        } else {
            $data = $query->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as total_orders'),
                DB::raw('SUM(CASE WHEN status = \'completed\' THEN 1 ELSE 0 END) as completed_orders'),
                DB::raw('SUM(CASE WHEN status = \'pending\' THEN 1 ELSE 0 END) as pending_orders')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'label' => $item->date,
                    'total' => (int) $item->total_orders,
                    'completed' => (int) $item->completed_orders,
                    'pending' => (int) $item->pending_orders,
                ];
            });
        }

        return $data;
    }

    private function getTopProducts($startDate, $endDate)
    {
        $orders = Order::where('status', 'completed')
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->get();

        $productStats = [];

        foreach ($orders as $order) {
            $items = is_string($order->items) ? json_decode($order->items, true) : $order->items;
            foreach ($items as $item) {
                $productId = $item['product_id'];
                if (!isset($productStats[$productId])) {
                    $product = Product::find($productId);
                    $productStats[$productId] = [
                        'name' => $product ? $product->name : 'Unknown Product',
                        'quantity' => 0,
                        'revenue' => 0,
                    ];
                }
                $productStats[$productId]['quantity'] += $item['quantity'];
                $productStats[$productId]['revenue'] += $item['quantity'] * $item['price'];
            }
        }

        // Sort by revenue and take top 10
        usort($productStats, function ($a, $b) {
            return $b['revenue'] <=> $a['revenue'];
        });

        return array_slice($productStats, 0, 10);
    }

    private function getSummaryStats($startDate, $endDate)
    {
        $totalSales = Order::where('status', 'completed')
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->sum('total');

        $totalOrders = Order::whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->count();

        $completedOrders = Order::where('status', 'completed')
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->count();

        $pendingOrders = Order::where('status', 'pending')
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->count();

        $lowStockProducts = Product::where('stock', '<=', 5)->count();

        $totalProducts = Product::count();

        return [
            'total_sales' => (float) $totalSales,
            'total_orders' => $totalOrders,
            'completed_orders' => $completedOrders,
            'pending_orders' => $pendingOrders,
            'low_stock_products' => $lowStockProducts,
            'total_products' => $totalProducts,
        ];
    }
}
