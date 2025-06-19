<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponse;

class AuthenticatedSessionController extends Controller
{
    use ApiResponse;

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // This authenticates the user using email/password
        $request->authenticate();

        // This regenerates the session for security
        $request->session()->regenerate();

        // Get the now authenticated user
        $user = Auth::user();

        // Create a new Sanctum API token for this session
        $token = $user->createToken('auth-token')->plainTextToken;

        // Return the user and the new token in the expected format
        return $this->successResponse([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 'Login successful.');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        // Get the authenticated user
        $user = $request->user();

        // Revoke the token that was used to authenticate the current request
        $user->currentAccessToken()->delete();
        
        // Also, invalidate the web session
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $this->successResponse(null, 'Successfully logged out.');
    }
}
