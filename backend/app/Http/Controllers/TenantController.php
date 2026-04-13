<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\Bail; // Importation du modèle Bail pour récupérer ses infos
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TenantController extends Controller
{
    // 1. Fonction pour enregistrer un locataire (Action de Kevin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:tenants,email',
            'telephone' => 'required|string',
            'adresse_actuelle' => 'nullable|string',
        ]);

        $tenant = Tenant::create([
            'user_id' => Auth::id(), 
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'telephone' => $validated['telephone'],
            'adresse_actuelle' => $validated['adresse_actuelle'],
            'code_acces' => strtoupper(Str::random(6)), 
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Locataire ajouté avec succès !',
            'data' => $tenant
        ], 201);
    }

    // 2. Fonction pour lister les locataires sur ton Dashboard
    public function index()
    {
        $tenants = Tenant::where('user_id', Auth::id())->get();
        return response()->json($tenants);
    }

    // 3. NOUVEAU : Fonction de connexion pour le Locataire (Action du Locataire)
    public function loginTenant(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code_acces' => 'required|string',
        ]);

        // Vérification des identifiants
        $tenant = Tenant::where('email', $request->email)
                        ->where('code_acces', $request->code_acces)
                        ->first();

        if (!$tenant) {
            return response()->json([
                'message' => 'Email ou code d\'accès incorrect.'
            ], 401);
        }

        // On cherche le bail associé à ce locataire pour qu'il puisse voir ses infos
        // On cherche par le nom (ou tu pourras plus tard lier par tenant_id)
        $bail = Bail::where('locataire_name', $tenant->nom)->first();

        return response()->json([
            'success' => true,
            'tenant' => $tenant,
            'bail' => $bail
        ], 200);
    }
}