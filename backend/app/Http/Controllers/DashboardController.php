<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    /**
     * Récupère les statistiques globales du dashboard
     */
    public function getStats() {
        // Note : On retire number_format ici pour envoyer des nombres bruts. 
        // C'est ton composant React qui s'occupe de l'affichage avec $ ou virgules.
        return response()->json([
            'revenue' => 4500, // Envoie un entier/float
            'tenants_count' => 24,
            'overdue' => 850
        ]);
    }

    /**
     * Liste des dernières transactions
     */
    public function getTransactions() {
        // Cette structure correspond exactement à ta boucle .map() dans le Dashboard React
        return response()->json([
            ['id' => 1, 'locataire' => "Jean Kabamba", 'bien' => "Appartement B3", 'montant' => 450, 'statut' => "Payé"],
            ['id' => 2, 'locataire' => "Merveille Kyungu", 'bien' => "Villa Bel-Air", 'montant' => 800, 'statut' => "En attente"],
            ['id' => 3, 'locataire' => "Patrick Mwamba", 'bien' => "Studio Goma", 'montant' => 200, 'statut' => "Payé"],
        ]);
    }

    /**
     * Récupère les informations du profil connecté
     */
    public function getProfile() {
        // Auth::user() récupère l'utilisateur authentifié via Sanctum
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            // Génération de l'ID EasyBail dynamique
            'landlord_id' => "EB-2026-" . str_pad($user->id, 4, '0', STR_PAD_LEFT),
        ]);
    }

    /**
     * Met à jour le profil (Logique WhatsApp)
     */
    public function updateProfile(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mise à jour en base de données
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'landlord_id' => "EB-2026-" . str_pad($user->id, 4, '0', STR_PAD_LEFT),
            ]
        ]);
    }

    /**
     * Enregistre un nouveau bail
     */
    public function storeBail(Request $request) {
        $validator = Validator::make($request->all(), [
            'locataire_name' => 'required|string',
            'bien_id' => 'required',
            'montant' => 'required|numeric',
            'date_debut' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Logique de création (Exemple) :
        // $bail = new Bail();
        // $bail->user_id = Auth::id();
        // ...
        // $bail->save();

        return response()->json([
            'message' => 'Le nouveau bail a été créé avec succès !'
        ]);
    }
}