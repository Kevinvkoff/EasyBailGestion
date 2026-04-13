<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bails', function (Blueprint $table) {
            $table->id();
            
            // La colonne user_id pour lier le bail au bailleur (l'utilisateur connecté)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Le nom du locataire
            $table->string('locataire_name');
            
            // Le nom du bien (ex: Appartement A1)
            $table->string('bien_nom');
            
            // Le montant du loyer (précision pour les calculs financiers)
            $table->decimal('montant_loyer', 10, 2);
            
            // Le statut du paiement
            $table->enum('statut', ['payé', 'en attente', 'en retard'])->default('en attente');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bails');
    }
};