<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
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

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Date filter
        if ($request->has('date') && $request->date) {
            $query->whereDate('created_at', $request->date);
        }

        $orders = $query->latest()->paginate(10);
        return Inertia::render('Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'date']),
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
