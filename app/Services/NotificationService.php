<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class NotificationService
{
    const CACHE_KEY = 'notifications';
    const CACHE_TTL = 1440; // 24 hours

    /**
     * Log an activity and create a notification.
     */
    public static function logActivity(string $action, ?string $resourceType = null, ?int $resourceId = null, ?string $description = null, ?array $metadata = null): ActivityLog
    {
        // Log to activity table
        $log = ActivityLog::log($action, $resourceType, $resourceId, $description, $metadata);

        // Create notification
        self::addNotification([
            'type' => $action,
            'title' => self::getNotificationTitle($action),
            'message' => $description ?? self::getDefaultMessage($action, $resourceType),
            'resource_type' => $resourceType,
            'resource_id' => $resourceId,
            'created_at' => now()->toISOString(),
        ]);

        // Check for low stock alert
        if (in_array($action, ['product.created', 'product.updated', 'inventory.updated']) && $resourceType === 'product' && $resourceId) {
            $product = Product::find($resourceId);
            if ($product && $product->stock <= 5) {
                self::addNotification([
                    'type' => 'low_stock',
                    'title' => 'Low Stock Alert',
                    'message' => "Product '{$product->name}' is running low (stock: {$product->stock})",
                    'resource_type' => 'product',
                    'resource_id' => $product->id,
                    'created_at' => now()->toISOString(),
                ]);
            }
        }

        return $log;
    }

    /**
     * Add a notification to the cache.
     */
    public static function addNotification(array $notification): void
    {
        $notifications = self::getNotifications();
        array_unshift($notifications, $notification);
        
        // Keep only last 50 notifications
        $notifications = array_slice($notifications, 0, 50);
        
        Cache::put(self::CACHE_KEY, $notifications, self::CACHE_TTL);
    }

    /**
     * Get all notifications.
     */
    public static function getNotifications(): array
    {
        return Cache::get(self::CACHE_KEY, []);
    }

    /**
     * Get unread notification count.
     */
    public static function getUnreadCount(): int
    {
        return count(self::getNotifications());
    }

    /**
     * Mark notifications as read.
     */
    public static function markAsRead(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * Get notification title based on action.
     */
    private static function getNotificationTitle(string $action): string
    {
        return match ($action) {
            'order.created' => 'New Order',
            'product.created' => 'Product Created',
            'product.updated' => 'Product Updated',
            'product.deleted' => 'Product Deleted',
            'inventory.updated' => 'Inventory Updated',
            'user.created' => 'User Created',
            'category.created' => 'Category Created',
            'low_stock' => 'Low Stock Alert',
            default => 'System Notification',
        };
    }

    /**
     * Get default message based on action.
     */
    private static function getDefaultMessage(string $action, ?string $resourceType): string
    {
        return match ($action) {
            'order.created' => 'A new order has been placed',
            'product.created' => 'A new product has been added',
            'product.updated' => 'A product has been updated',
            'product.deleted' => 'A product has been deleted',
            'inventory.updated' => 'Inventory has been updated',
            default => "A {$resourceType} was modified",
        };
    }

    /**
     * Check and create low stock notifications for all products.
     */
    public static function checkLowStockProducts(): void
    {
        $lowStockProducts = Product::where('stock', '<=', 5)->get();
        
        foreach ($lowStockProducts as $product) {
            self::addNotification([
                'type' => 'low_stock',
                'title' => 'Low Stock Alert',
                'message' => "Product '{$product->name}' is running low (stock: {$product->stock})",
                'resource_type' => 'product',
                'resource_id' => $product->id,
                'created_at' => now()->toISOString(),
            ]);
        }
    }
}

