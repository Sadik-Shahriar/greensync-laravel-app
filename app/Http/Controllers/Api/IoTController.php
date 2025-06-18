<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use App\Models\User;
use App\Models\IoTDevice;
use App\Models\DisposalSession;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class IoTController extends Controller
{
    use ApiResponse;

    private const POINTS_PER_BOTTLE = 5;

    /**
     * Authenticates a device and user, and starts a new disposal session.
     */
    public function authenticateDevice(Request $request)
    {
        $validated = $request->validate([
            'qr_code' => 'required|string|exists:users,qr_code',
            'device_id' => 'required|string|exists:iot_devices,device_id',
        ]);

        $user = User::where('qr_code', $validated['qr_code'])->first();
        $device = IoTDevice::where('device_id', $validated['device_id'])->first();

        // Check if device is active
        if ($device->status !== 'active') {
            return $this->errorResponse('Device is currently inactive.', 403);
        }
        
        // Check if user already has an active session
        $existingSession = DisposalSession::where('user_id', $user->id)
            ->where('status', 'active')
            ->exists();
        
        if ($existingSession) {
            return $this->errorResponse('User already has an active session.', 409); // 409 Conflict
        }

        // All checks passed, create a new session
        $session = DisposalSession::create([
            'user_id' => $user->id,
            'iot_device_id' => $device->id,
            'session_token' => Str::random(40),
            'started_at' => now(),
            'status' => 'active',
        ]);

        return $this->successResponse(
            ['session_token' => $session->session_token, 'user_name' => $user->name],
            'Authentication successful. Session started.'
        );
    }

    /**
     * Records a bottle detection for an active session.
     */
    public function recordBottleDetection(Request $request)
    {
        $validated = $request->validate([
            'session_token' => 'required|string|exists:disposal_sessions,session_token',
        ]);

        $session = DisposalSession::where('session_token', $validated['session_token'])
            ->where('status', 'active')
            ->first();

        if (!$session) {
            return $this->errorResponse('Active session not found or has expired.', 404);
        }

        try {
            DB::transaction(function () use ($session) {
                // 1. Update session stats
                $session->total_bottles += 1;
                $session->points_earned += self::POINTS_PER_BOTTLE;
                
                // 2. Create a record of this specific bottle detection
                $session->bottleDetections()->create([
                    'bottle_number' => $session->total_bottles,
                    'detected_at' => now(),
                    'points_awarded' => self::POINTS_PER_BOTTLE,
                ]);

                // 3. Update the User's total points and bottle count
                $session->user->eco_points += self::POINTS_PER_BOTTLE;
                $session->user->total_bottles_recycled += 1;

                // 4. Update the IoT Device's stats
                $session->iotDevice->total_bottles_processed += 1;
                $session->iotDevice->bottles_processed_today += 1;
                $session->iotDevice->last_heartbeat = now();
                
                // Save all changes
                $session->save();
                $session->user->save();
                $session->iotDevice->save();
            });
        } catch (\Exception $e) {
            // Log the exception e.g., \Log::error($e->getMessage());
            return $this->errorResponse('Could not process bottle detection due to a server error.', 500);
        }
        
        return $this->successResponse(
            ['session_bottle_count' => $session->total_bottles],
            'Bottle detected successfully.'
        );
    }

    /**
     * Ends an active disposal session.
     */
    public function endSession(Request $request)
    {
        $validated = $request->validate([
            'session_token' => 'required|string|exists:disposal_sessions,session_token',
        ]);

        $session = DisposalSession::where('session_token', $validated['session_token'])
            ->where('status', 'active')
            ->first();

        if (!$session) {
            return $this->errorResponse('Active session not found.', 404);
        }

        DB::transaction(function () use ($session) {
            // 1. Update the session status
            $session->status = 'completed';
            $session->ended_at = now();

            // 2. Update the user's total number of disposals
            $session->user->total_disposals += 1;

            // Save changes
            $session->save();
            $session->user->save();
        });

        return $this->successResponse(null, 'Session ended successfully.');
    }
}
