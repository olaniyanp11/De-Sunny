<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Category;
use App\Models\Product;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Stock filter
        if ($request->has('stock_status')) {
            if ($request->stock_status === 'low') {
                $query->where('stock', '<=', 5);
            } elseif ($request->stock_status === 'out') {
                $query->where('stock', 0);
            } elseif ($request->stock_status === 'in') {
                $query->where('stock', '>', 5);
            }
        }

        $products = $query->latest()->paginate(20);
        
        $categories = Category::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id', 'stock_status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Products/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::create($request->all());

        // Log activity and create notification
        NotificationService::logActivity(
            'product.created',
            'product',
            $product->id,
            "Created product: {$product->name} (SKU: {$product->sku})"
        );

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load('category');
        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $oldStock = $product->stock;
        
        $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku,' . $product->id,
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product->update($request->all());

        // Log product update
        NotificationService::logActivity(
            'product.updated',
            'product',
            $product->id,
            "Updated product: {$product->name}"
        );

        // Log inventory change if stock changed
        if ($oldStock !== $product->stock) {
            NotificationService::logActivity(
                'inventory.updated',
                'product',
                $product->id,
                "Inventory updated for {$product->name}: {$oldStock} -> {$product->stock}",
                ['old_stock' => $oldStock, 'new_stock' => $product->stock]
            );
        }

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $productName = $product->name;
        $product->delete();

        // Log product deletion
        NotificationService::logActivity(
            'product.deleted',
            'product',
            null,
            "Deleted product: {$productName}"
        );

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }

    /**
     * Download CSV template for product import.
     */
    public function importTemplate()
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="product_import_template.csv"',
        ];

        $callback = function ($handle) {
            fputcsv($handle, ['name', 'sku', 'price', 'stock', 'description', 'category_name']);
            fputcsv($handle, ['Sample Product', 'SKU-001', '100.00', '50', 'Product description here', 'Electronics']);
            fputcsv($handle, ['Example Item', 'SKU-002', '250.50', '100', 'Another description', 'Clothing']);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Import products from CSV file.
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:10240',
        ]);

        $file = $request->file('file');
        $handle = fopen($file->getRealPath(), 'r');
        $header = fgetcsv($handle);

        // Validate header
        $requiredColumns = ['name', 'sku', 'price', 'stock', 'category_name'];
        $missingColumns = array_diff($requiredColumns, $header);
        
        if (!empty($missingColumns)) {
            fclose($handle);
            return redirect()->back()->withErrors([
                'file' => 'CSV missing required columns: ' . implode(', ', $missingColumns)
            ]);
        }

        $errors = [];
        $successCount = 0;
        $rowNumber = 2; // Start from row 2 (after header)

        DB::transaction(function () use ($handle, $header, &$errors, &$successCount, &$rowNumber) {
            while (($row = fgetcsv($handle)) !== false) {
                $data = array_combine($header, $row);
                
                // Validate required fields
                if (empty($data['name']) || empty($data['sku']) || empty($data['price']) || empty($data['stock']) || empty($data['category_name'])) {
                    $errors[] = "Row {$rowNumber}: Missing required fields (name, sku, price, stock, category_name)";
                    $rowNumber++;
                    continue;
                }

                // Find category
                $category = Category::where('name', $data['category_name'])->first();
                if (!$category) {
                    $errors[] = "Row {$rowNumber}: Category '{$data['category_name']}' not found";
                    $rowNumber++;
                    continue;
                }

                // Check if SKU already exists
                $existingProduct = Product::where('sku', $data['sku'])->first();
                if ($existingProduct) {
                    $errors[] = "Row {$rowNumber}: SKU '{$data['sku']}' already exists";
                    $rowNumber++;
                    continue;
                }

                // Validate numeric fields
                if (!is_numeric($data['price']) || $data['price'] < 0) {
                    $errors[] = "Row {$rowNumber}: Invalid price value";
                    $rowNumber++;
                    continue;
                }

                if (!is_numeric($data['stock']) || $data['stock'] < 0) {
                    $errors[] = "Row {$rowNumber}: Invalid stock value";
                    $rowNumber++;
                    continue;
                }

                // Create product
                try {
                    $product = Product::create([
                        'name' => $data['name'],
                        'sku' => $data['sku'],
                        'price' => $data['price'],
                        'stock' => $data['stock'],
                        'description' => $data['description'] ?? '',
                        'category_id' => $category->id,
                    ]);

                    // Log activity
                    NotificationService::logActivity(
                        'product.created',
                        'product',
                        $product->id,
                        "Imported product: {$product->name} (SKU: {$product->sku})"
                    );

                    $successCount++;
                } catch (\Exception $e) {
                    $errors[] = "Row {$rowNumber}: " . $e->getMessage();
                }

                $rowNumber++;
            }
        });

        fclose($handle);

        if (empty($errors)) {
            return redirect()->route('products.index')->with('success', "Successfully imported {$successCount} products.");
        }

        return redirect()->back()->with('import_errors', $errors)->with('import_success', $successCount);
    }
}

