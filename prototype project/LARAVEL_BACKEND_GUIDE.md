
# Laravel Backend Implementation Guide for GreenSync

This guide provides detailed instructions for building the Laravel backend that corresponds to this React frontend.

## Project Setup

```bash
# Create new Laravel project
composer create-project laravel/laravel greensync-backend
cd greensync-backend

# Install required packages
composer require laravel/sanctum
composer require laravel/breeze --dev
php artisan breeze:install api

# Database setup
php artisan migrate
```

## Environment Configuration

```env
# .env file
APP_NAME=GreenSync
APP_ENV=local
APP_KEY=base64:generated_key
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=greensync
DB_USERNAME=root
DB_PASSWORD=

# CORS settings for React frontend
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SPA_URL=http://localhost:3000
```

## Database Migrations

Run these commands to create the database structure:

```bash
# User migration (extend default)
php artisan make:migration add_greensync_fields_to_users_table

# IoT Device migration
php artisan make:migration create_iot_devices_table

# Disposal Sessions migration
php artisan make:migration create_disposal_sessions_table

# Bottle Detections migration
php artisan make:migration create_bottle_detections_table

# Partners migration
php artisan make:migration create_partners_table

# Rewards migration
php artisan make:migration create_rewards_table

# User Rewards migration
php artisan make:migration create_user_rewards_table

# Real-time Stats migration
php artisan make:migration create_real_time_stats_table
```

## Model Structure

### User Model (app/Models/User.php)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'eco_points', 
        'total_disposals', 'total_bottles_recycled', 'qr_code', 'avatar'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'eco_points' => 'integer',
        'total_disposals' => 'integer',
        'total_bottles_recycled' => 'integer',
    ];

    // Relationships
    public function disposalSessions()
    {
        return $this->hasMany(DisposalSession::class);
    }

    public function userRewards()
    {
        return $this->hasMany(UserReward::class);
    }

    public function achievements()
    {
        return $this->hasMany(Achievement::class);
    }

    // Generate unique QR code
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($user) {
            $user->qr_code = 'USER_' . uniqid() . '_' . time();
        });
    }
}
```

### IoTDevice Model (app/Models/IoTDevice.php)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IoTDevice extends Model
{
    use HasFactory;

    protected $table = 'iot_devices';
    
    protected $fillable = [
        'device_id', 'device_name', 'location', 'status',
        'last_heartbeat', 'bottles_processed_today', 'total_bottles_processed'
    ];

    protected $casts = [
        'last_heartbeat' => 'datetime',
        'bottles_processed_today' => 'integer',
        'total_bottles_processed' => 'integer',
    ];

    // Relationships
    public function disposalSessions()
    {
        return $this->hasMany(DisposalSession::class, 'device_id');
    }
}
```

## Controller Structure

### IoTController (app/Http/Controllers/Api/IoTController.php)
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\IoTDevice;
use App\Models\DisposalSession;
use App\Models\BottleDetection;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class IoTController extends Controller
{
    public function authenticateDevice(Request $request)
    {
        $request->validate([
            'qr_code' => 'required|string',
            'device_id' => 'required|string'
        ]);

        $user = User::where('qr_code', $request->qr_code)->first();
        $device = IoTDevice::where('device_id', $request->device_id)->first();

        if (!$user || !$device) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid QR code or device'
            ], 404);
        }

        // Create new disposal session
        $session = DisposalSession::create([
            'user_id' => $user->id,
            'device_id' => $device->id,
            'session_token' => Str::uuid(),
            'started_at' => now(),
            'status' => 'active'
        ]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'session_token' => $session->session_token,
                'user' => $user,
                'device' => $device
            ]
        ]);
    }

    public function recordBottleDetection(Request $request)
    {
        $request->validate([
            'session_id' => 'required|string',
            'device_id' => 'required|string',
            'timestamp' => 'required|date'
        ]);

        $session = DisposalSession::where('session_token', $request->session_id)
                                 ->where('status', 'active')
                                 ->first();

        if (!$session) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired session'
            ], 404);
        }

        // Record bottle detection
        $bottleDetection = BottleDetection::create([
            'session_id' => $session->id,
            'bottle_number' => $session->total_bottles + 1,
            'detected_at' => $request->timestamp,
            'points_awarded' => 5, // 5 points per bottle
            'verified' => true
        ]);

        // Update session
        $session->increment('total_bottles');
        $session->increment('points_earned', 5);

        // Update user stats
        $session->user->increment('eco_points', 5);
        $session->user->increment('total_bottles_recycled');

        // Update device stats
        $session->device->increment('bottles_processed_today');
        $session->device->increment('total_bottles_processed');

        return response()->json([
            'status' => 'success',
            'data' => [
                'bottle_number' => $bottleDetection->bottle_number,
                'points_earned' => 5,
                'total_bottles' => $session->total_bottles,
                'total_points' => $session->points_earned
            ]
        ]);
    }

    public function endSession(Request $request)
    {
        $request->validate([
            'session_id' => 'required|string'
        ]);

        $session = DisposalSession::where('session_token', $request->session_id)->first();

        if (!$session) {
            return response()->json([
                'status' => 'error',
                'message' => 'Session not found'
            ], 404);
        }

        $session->update([
            'ended_at' => now(),
            'status' => 'completed'
        ]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_bottles' => $session->total_bottles,
                'total_points' => $session->points_earned,
                'session_duration' => $session->started_at->diffInMinutes($session->ended_at)
            ]
        ]);
    }
}
```

## Route Structure (routes/api.php)

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\IoTController;
use App\Http\Controllers\Api\LeaderboardController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\RealTimeController;

// Public routes
Route::get('/partners', [PartnerController::class, 'index']);
Route::get('/leaderboard', [LeaderboardController::class, 'index']);
Route::get('/real-time-stats', [RealTimeController::class, 'getStats']);

// Authentication routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// IoT Device routes (no auth required for devices)
Route::prefix('iot')->group(function () {
    Route::post('/authenticate', [IoTController::class, 'authenticateDevice']);
    Route::post('/bottle-detected', [IoTController::class, 'recordBottleDetection']);
    Route::post('/end-session', [IoTController::class, 'endSession']);
    Route::post('/heartbeat', [IoTController::class, 'deviceHeartbeat']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
    Route::get('/user/qr-code', [DashboardController::class, 'getQRCode']);
    Route::get('/user/sessions', [DashboardController::class, 'getSessions']);
    Route::get('/user/bottle-stats', [DashboardController::class, 'getBottleStats']);
    Route::get('/user/{id}/live-session', [RealTimeController::class, 'getUserSession']);
});

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::apiResource('users', AdminUserController::class);
    Route::apiResource('devices', AdminDeviceController::class);
    Route::get('/iot-monitoring', [AdminController::class, 'iotMonitoring']);
    Route::apiResource('rewards', AdminRewardController::class);
    Route::apiResource('partners', AdminPartnerController::class);
});
```

## CORS Configuration (config/cors.php)

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## Frontend Integration Points

This React frontend is designed to work seamlessly with the Laravel backend through:

1. **Type-safe API integration** with TypeScript interfaces matching Laravel models
2. **Authentication flow** using Laravel Sanctum tokens
3. **Real-time updates** through polling endpoints
4. **IoT device communication** via REST API endpoints
5. **Admin panel integration** with protected routes

## Key Features to Implement

1. **User authentication** with QR code generation
2. **IoT device management** and monitoring
3. **Real-time bottle counting** and session management
4. **Dashboard statistics** and analytics
5. **Leaderboard system** with multiple categories
6. **Reward system** and redemption
7. **Partner management** system
8. **Admin panel** with comprehensive monitoring

This structure provides a complete foundation for building the Laravel backend that will work perfectly with this React frontend.
