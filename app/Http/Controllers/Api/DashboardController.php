<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class DashboardController extends Controller
{
    use ApiResponse;

    /**
     * Get the authenticated user's main dashboard statistics.
     */
    public function stats(Request $request)
    {
        $user = $request->user();

        $stats = [
            'eco_points' => $user->eco_points,
            'total_disposals' => $user->total_disposals,
            'total_bottles_recycled' => $user->total_bottles_recycled,
        ];

        return $this->successResponse($stats, 'Dashboard statistics fetched successfully.');
    }
}
