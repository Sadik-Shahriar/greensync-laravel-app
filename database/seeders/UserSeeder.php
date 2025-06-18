<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a specific test user you can log in with
        User::create([
           'name' => 'Test User',
           'email' => 'test@greensync.com',
           'password' => Hash::make('password'),
           'role' => 'user',
           'qr_code' => 'TEST_USER_QR_CODE_12345',
        ]);
        // Create a specific admin user
        User::create([
           'name' => 'Admin User',
           'email' => 'admin@greensync.com',
           'password' => Hash::make('password'),
           'role' => 'admin',
           'qr_code' => 'ADMIN_USER_QR_CODE_67890',
        ]);
        // Create 10 additional random users using the factory
        User::factory(10)->create();
    }
}
