<?php

namespace App\Http\Controllers;

use App\Models\Bail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BailController extends Controller
{
    public function store(Request $request)
    {
        // Validation des données venant de React
        $validated = $request->validate([
            'locataire_name' => 'required|string',
            'bien_nom'       => 'required|string',
            'montant_loyer'  => 'required|numeric',
            'statut'         => 'required|string',
            'date_debut'     => 'required|date',
        ]);

        // Création du bail lié à l'utilisateur connecté
        $bail = Bail::create([
            'user_id'        => Auth::id(), // Récupère l'ID de celui qui est connecté
            'locataire_name' => $validated['locataire_name'],
            'bien_nom'       => $validated['bien_nom'],
            'montant_loyer'  => $validated['montant_loyer'],
            'statut'         => $validated['statut'],
        ]);

        return response()->json([
            'message' => 'Bail créé avec succès !',
            'bail' => $bail
        ], 201);
    }
}