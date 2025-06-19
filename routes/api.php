<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\IoTController;
use App\Http\Controllers\Api\PublicController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/leaderboard', [PublicController::class, 'leaderboard']);
Route::get('/partners', [PublicController::class, 'partners']);
Route::get('/real-time-stats', [PublicController::class, 'realTimeStats']);

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    // This route is stateless and does not need a session.
    Route::post('/register', [RegisteredUserController::class, 'store']);

    // These routes ARE STATEFUL and need session middleware.
    Route::middleware(\Illuminate\Session\Middleware\StartSession::class)->group(function () {
        Route::post('/login', [AuthenticatedSessionController::class, 'store']);
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth');
    });
});

/*
|--------------------------------------------------------------------------
| Protected Routes (Require Authentication)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // User & Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/user/qr-code', [UserController::class, 'getQrCode']);
    Route::get('/user/sessions', [UserController::class, 'sessions']);
    Route::get('/user/bottle-stats', [UserController::class, 'bottleStats']);

    // IoT Integration
    Route::post('/iot/authenticate', [IoTController::class, 'authenticateDevice']);
    Route::post('/iot/bottle-detected', [IoTController::class, 'recordBottleDetection']);
    Route::post('/iot/end-session', [IoTController::class, 'endSession']);
});

// Public API registration route for SPA signup
Route::post('/register', [RegisteredUserController::class, 'store']);
