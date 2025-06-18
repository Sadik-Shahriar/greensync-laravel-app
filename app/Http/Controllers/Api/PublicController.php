<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use App\Models\User;
use App\Models\Partner;
use App\Models\RealTimeStat;

class PublicController extends Controller
{
    use ApiResponse;

    /**
     * Fetch the top users for the leaderboard.
     */
    public function leaderboard()
    {
        $leaderboard = User::orderByDesc('eco_points')
            ->select('name', 'eco_points', 'avatar')
            ->take(10)
            ->get();

        return $this->successResponse($leaderboard, 'Leaderboard fetched successfully.');
    }

    /**
     * Fetch the list of active partners.
     */
    public function partners()
    {
        $partners = Partner::where('active', true)->get();

        return $this->successResponse($partners, 'Partners fetched successfully.');
    }

    /**
     * Fetch all real-time statistics.
     */
    public function realTimeStats()
    {
        // Pluck turns the collection into an associative array ('metric_name' => 'metric_value')
        $stats = RealTimeStat::pluck('metric_value', 'metric_name');

        return $this->successResponse($stats, 'Real-time stats fetched successfully.');
    }
}
