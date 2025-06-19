<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This "catch-all" route is essential for a Single Page Application (SPA).
| It directs all non-API requests (like /, /dashboard, /profile) to the
| single 'welcome' view. From there, React Router takes over to display
| the correct page on the frontend.
|
| This must be the main route definition in this file.
|
*/

// --- CATCH-ALL ROUTE FOR THE REACT APP ---
// This MUST be the last route in this file.
Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');
