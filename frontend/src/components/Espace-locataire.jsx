// Aperçu rapide du composant TenantPortal.jsx
const TenantPortal = ({ leaseData }) => {
    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <h1 className="text-2xl font-bold">Bienvenue, {leaseData.tenant_name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Carte du Bail */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500">Mon Logement</h3>
                    <p className="text-xl font-semibold">{leaseData.bien_nom}</p>
                    <p className="mt-2 text-blue-600 font-bold">{leaseData.montant_loyer} $ / mois</p>
                </div>

                {/* Statut de Paiement */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500">Statut du mois actuel</h3>
                    <span className={`px-3 py-1 rounded-full ${leaseData.statut === 'payé' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {leaseData.statut}
                    </span>
                </div>
            </div>
        </div>
    );
};