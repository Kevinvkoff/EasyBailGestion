<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bail extends Model
{
    use HasFactory;

    // On autorise Laravel à remplir ces colonnes
    protected $fillable = [
        'user_id',
        'locataire_name',
        'bien_nom',
        'montant_loyer',
        'statut'
    ];

    // Relation : Un bail appartient à un utilisateur (bailleur)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}