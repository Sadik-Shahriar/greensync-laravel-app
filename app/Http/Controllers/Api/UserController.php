<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class UserController extends Controller
{
    use ApiResponse;

    /**
     * Get the authenticated user's QR code string.
     */
    public function getQrCode(Request $request)
    {
        $qrCode = $request->user()->qr_code;

        return $this->successResponse(['qr_code' => $qrCode], 'User QR code fetched successfully.');
    }

    /**
     * Get the authenticated user's disposal sessions, paginated.
     */
    public function sessions(Request $request)
    {
        $user = $request->user();

        $sessions = $user->disposalSessions()->latest()->paginate(15);

        return $this->successResponse($sessions, 'User sessions fetched successfully.');
    }

    /**
     * Get detailed bottle statistics for the authenticated user.
     */
    public function bottleStats(Request $request)
    {
        $user = $request->user();

        // Calculate average, handling division by zero.
        $averageBottles = ($user->total_disposals > 0)
            ? round($user->total_bottles_recycled / $user->total_disposals, 2)
            : 0;

        $lastDisposal = $user->disposalSessions()->latest()->first();

        $bottleStats = [
            'total_bottles' => $user->total_bottles_recycled,
            'average_bottles_per_session' => $averageBottles,
            'last_disposal_date' => $lastDisposal ? $lastDisposal->created_at->toDateTimeString() : null,
        ];

        return $this->successResponse($bottleStats, 'User bottle statistics fetched successfully.');
    }
}
