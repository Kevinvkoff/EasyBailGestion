<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lease; // Assure-toi d'avoir un modèle Lease

class LeaseController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validation des données venant de React
        $validated = $request->validate([
            'locataire_name' => 'required|string|max:255',
            'loyer_montant' => 'required|numeric',
            'date_debut' => 'required|date',
            // 'bien_id' => 'required|exists:biens,id', // Décommente si tu as une table biens
        ]);

        // 2. Création du bail
        // Note : On suppose que tu as un modèle Lease et une table 'leases'
        $lease = new \App\Models\Lease();
        $lease->locataire_name = $validated['locataire_name'];
        $lease->loyer_montant = $validated['loyer_montant'];
        $lease->date_debut = $validated['date_debut'];
        $lease->user_id = auth()->id(); // Lie le bail à l'utilisateur connecté
        $lease->save();

        return response()->json([
            'message' => 'Bail créé avec succès !',
            'lease' => $lease
        ], 201);
    }
}