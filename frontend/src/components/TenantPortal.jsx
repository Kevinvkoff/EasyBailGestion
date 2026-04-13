import React from 'react';

export default function TenantPortal({ onLogout }) {
  // On récupère les données stockées lors de la connexion
  const tenantData = JSON.parse(localStorage.getItem('TENANT_DATA'));
  const { tenant, bail } = tenantData;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header du Portail */}
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Espace Locataire</h1>
            <p className="text-slate-500 text-sm">Bienvenue, {tenant.prenom} {tenant.nom}</p>
          </div>
          <button 
            onClick={onLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            Déconnexion
          </button>
        </header>

        {/* Grille d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Carte du Bail */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-blue-600">
            <h3 className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-4">Détails de mon bail</h3>
            {bail ? (
              <div className="space-y-3">
                <p className="text-lg font-semibold text-slate-700">{bail.bien_nom}</p>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Montant du loyer</span>
                  <span className="font-bold text-blue-600">{bail.montant_loyer} $</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Statut actuel</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    bail.statut === 'payé' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {bail.statut}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 italic">Aucun bail actif trouvé pour le moment.</p>
            )}
          </div>

          {/* Carte Contact Propriétaire */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-4">Mon Bailleur</h3>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500">
                K
              </div>
              <div>
                <p className="font-bold text-slate-800">Tsgiweshi Kevin</p>
                <p className="text-sm text-slate-500">Lubumbashi, RDC</p>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 transition-colors">
                Contacter via EasyBail
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}