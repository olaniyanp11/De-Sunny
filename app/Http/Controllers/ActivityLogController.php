<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    /**
     * Display activity logs (admin/manager only).
     */
    public function index(Request $request)
    {
        $query = ActivityLog::with('user');

        // Filter by action
        if ($request->has('action') && $request->action) {
            $query->where('action', $request->action);
        }

        // Filter by user
        if ($request->has('user_id') && $request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by resource type
        if ($request->has('resource_type') && $request->resource_type) {
            $query->where('resource_type', $request->resource_type);
        }

        // Date filters
        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $logs = $query->latest()->paginate(20);

        // Get users for filter dropdown
        $users = \App\Models\User::select('id', 'name')->orderBy('name')->get();

        // Get unique actions for filter
        $actions = ActivityLog::distinct()->pluck('action');

        return Inertia::render('ActivityLogs/Index', [
            'logs' => $logs,
            'filters' => $request->only(['action', 'user_id', 'resource_type', 'date_from', 'date_to']),
            'users' => $users,
            'actions' => $actions,
        ]);
    }
}

