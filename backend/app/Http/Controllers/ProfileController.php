<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Affiche les infos du bailleur connecté
     */
    public function show(Request $request)
    {
        // Retourne l'utilisateur actuellement connecté via le token Sanctum
        return response()->json($request->user());
    }

    /**
     * Met à jour les infos du profil (depuis ton onglet Paramètres)
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => $user
        ]);
    }
}