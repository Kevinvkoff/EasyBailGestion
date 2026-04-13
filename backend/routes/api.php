<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
// Routes pour l'accès initial (Login/Register)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Sanctum)
|--------------------------------------------------------------------------
| Le middleware 'auth:sanctum' vérifie la présence du Bearer Token 
| envoyé par ton intercepteur Axios.
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // 1. Authentification
    Route::post('/logout', [AuthController::class, 'logout']);

    // 2. Données du Dashboard (Stats & Transactions)
    // URL cible: http://127.0.0.1:8000/api/dashboard/stats
    Route::prefix('dashboard')->group(function () {
        Route::get('/stats', [DashboardController::class, 'getStats']);
        Route::get('/transactions', [DashboardController::class, 'getTransactions']);
    });
    
    // 3. Gestion du Profil (Interface style WhatsApp)
    // URL cible: http://127.0.0.1:8000/api/user-profile
    Route::get('/user-profile', [DashboardController::class, 'getProfile']);
    Route::put('/user-profile', [DashboardController::class, 'updateProfile']);
    
    // 4. Gestion des Bails
    Route::post('/bails', [DashboardController::class, 'storeBail']);
    
    // 5. Route utilitaire (Optionnelle pour le debug frontend)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});