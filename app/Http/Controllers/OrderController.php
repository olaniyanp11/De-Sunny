<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Order::with('user');

        // Staff can only see their own orders
        if ($user->role === 'staff') {
            $query->where('user_id', $user->id);
        }
        // Admin and Manager can see all orders

        // Search functionality - by order ID, customer name, email, or product name
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                               ->orWhere('email', 'like', "%{$search}%");
                  })
                  // Search by product name in items
                  ->orWhereRaw("JSON_SEARCH(items, 'one', ?, NULL, '$[*].product_id') IS NOT NULL", ["%{$search}%"]);
            });
        }

        // Product filter - filter orders containing specific product
        if ($request->has('product_id') && $request->product_id) {
            $query->whereRaw("JSON_CONTAINS(items, '{\"product_id\": '{$request->product_id}'}', '$') = 1");
        }

        // Status filter
        if ($request->has('status') && $request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // User filter (admin/manager only) - filter by staff who created the order
        if ($user->role !== 'staff' && $request->has('user_id') && $request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        // Amount range filters
        if ($request->has('min_amount') && $request->min_amount) {
            $query->where('total', '>=', $request->min_amount);
        }
        if ($request->has('max_amount') && $request->max_amount) {
            $query->where('total', '<=', $request->max_amount);
        }

        // Date filters
        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }
        
        // Legacy single date filter for backward compatibility
        if ($request->has('date') && $request->date && !$request->has('date_from') && !$request->has('date_to')) {
            $query->whereDate('created_at', $request->date);
        }

        $orders = $query->latest()->paginate(10);

        // Get users for filter dropdown (admin/manager only)
        $users = null;
        if ($user->role !== 'staff') {
            $users = \App\Models\User::select('id', 'name')->orderBy('name')->get();
        }

        // Get products for filter dropdown
        $products = Product::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'status', 'user_id', 'product_id', 'min_amount', 'max_amount', 'date_from', 'date_to', 'date']),
            'users' => $users,
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::with('category')->where('stock', '>', 0)->get();
        return Inertia::render('Orders/Create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \Log::info('Order store request received', [
            'user_id' => auth()->id(),
            'request_data' => $request->all(),
            'headers' => $request->headers->all(),
        ]);

        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        \Log::info('Validation passed for user ' . auth()->id());

        $items = [];
        $total = 0;

        try {
            DB::transaction(function () use ($request, &$items, &$total) {
                foreach ($request->items as $item) {
                    \Log::info('Processing item', $item);
                    $product = Product::find($item['product_id']);
                    if (!$product) {
                        throw new \Exception("Product with ID {$item['product_id']} not found");
                    }
                    if ($product->stock < $item['quantity']) {
                        throw new \Exception("Insufficient stock for {$product->name}. Available: {$product->stock}");
                    }
                    $product->decrement('stock', $item['quantity']);
                    $items[] = [
                        'product_id' => $product->id,
                        'quantity' => $item['quantity'],
                        'price' => $product->price,
                    ];
                    $total += $product->price * $item['quantity'];
                }

                $order = Order::create([
                    'user_id' => auth()->id(),
                    'total' => $total,
                    'status' => 'completed',
                    'items' => $items,
                ]);

                \Log::info('Order created successfully', ['order_id' => $order->id, 'total' => $total]);

                // Log activity and create notification
                $productNames = collect($items)->map(function ($item) use ($request) {
                    $product = Product::find($item['product_id']);
                    return $product ? $product->name : 'Unknown';
                })->join(', ');

                NotificationService::logActivity(
                    'order.created',
                    'order',
                    $order->id,
                    "New order #{$order->id} created by " . auth()->user()->name . " - Total: ₦" . number_format($total, 2),
                    [
                        'total' => $total,
                        'items_count' => count($items),
                        'products' => $productNames
                    ]
                );
            });

            return redirect()->route('orders.index')->with('success', 'Order completed successfully.');
        } catch (\Exception $e) {
            \Log::error('Order creation failed', [
                'user_id' => auth()->id(),
                'error' => $e->getMessage(),
                'request_data' => $request->all(),
            ]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load('user');
        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Download PDF receipt for the order.
     */
    public function downloadReceipt(Order $order)
    {
        $order->load('user');

        $pdf = Pdf::loadView('receipt', compact('order'));

        return $pdf->download('receipt-' . $order->id . '.pdf');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Not needed for MVP
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Not needed for MVP
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Not needed for MVP
    }
}

