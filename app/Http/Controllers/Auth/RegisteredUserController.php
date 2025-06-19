<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use App\Traits\ApiResponse;

class RegisteredUserController extends Controller
{
    use ApiResponse;

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'qr_code' => $this->generateUniqueQrCode(),
            ]);

            event(new Registered($user));

            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->successResponse([
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 'User registered successfully', 201);

        } catch (\Exception $e) {
            \Log::error('Registration Error: ' . $e->getMessage());
            return $this->errorResponse('An unexpected error occurred during registration.', 500);
        }
    }

    private function generateUniqueQrCode(): string
    {
        do {
            $qrCode = Str::random(32);
        } while (User::where('qr_code', $qrCode)->exists());
        return $qrCode;
    }
}
