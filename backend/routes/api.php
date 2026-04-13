<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BailController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes - EasyBail
|--------------------------------------------------------------------------
*/

// --- ROUTES PUBLIQUES ---
// Ces routes doivent être accessibles par LoginModal.jsx ou tes pages d'accueil
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']); 


// --- ROUTES PROTÉGÉES (Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {

    // Utilisé par Dashboard.jsx (handleCreateLease)
    Route::post('/bails', [BailController::class, 'store']);
    Route::get('/bails', [BailController::class, 'index']);

    // Utilisé par Dashboard.jsx pour les graphiques et stats
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/transactions', [DashboardController::class, 'transactions']);

    // Utilisé par l'onglet Paramètres dans Dashboard.jsx
    Route::get('/user-profile', [ProfileController::class, 'show']);
    Route::put('/user-profile', [ProfileController::class, 'update']);

    // Infos utilisateur courant et Déconnexion
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});