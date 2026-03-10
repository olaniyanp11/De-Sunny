<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();
    $todaySales = \App\Models\Order::whereDate('created_at', today())
                                   ->where('status', 'completed')
                                   ->sum('total');
    $pendingOrders = \App\Models\Order::where('status', 'pending')->count();
    $lowStockProducts = \App\Models\Product::where('stock', '<=', 5)->count();

    return Inertia::render('Dashboard', [
        'todaySales' => $todaySales,
        'pendingOrders' => $pendingOrders,
        'lowStockProducts' => $lowStockProducts,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Category routes - Admin and Manager
Route::middleware(['auth', 'role:admin,manager'])->group(function () {
    Route::resource('categories', CategoryController::class);
});

// Order routes - Staff, Manager, Admin
Route::middleware(['auth'])->group(function () {
    Route::resource('orders', OrderController::class)->except(['edit', 'update', 'destroy']);
});

// User routes - Admin only
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('users', UserController::class);
});

require __DIR__.'/auth.php';
