<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\IoTController;
use App\Http\Controllers\Api\PublicController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/leaderboard', [PublicController::class, 'leaderboard']);
Route::get('/partners', [PublicController::class, 'partners']);
Route::get('/real-time-stats', [PublicController::class, 'realTimeStats']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Require Authentication)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', function (Request $request) {
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
