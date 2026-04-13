import React, { useState } from 'react';
import axiosClient from '../api/axios';

export default function TenantLoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [codeAcces, setCodeAcces] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // On appelle la route que nous avons prévue côté Laravel
      const response = await axiosClient.post('/tenant-login', {
        email: email,
        code_acces: codeAcces
      });

      // On stocke les données du locataire et son bail
      localStorage.setItem('TENANT_DATA', JSON.stringify(response.data));
      
      onLoginSuccess();
    } catch (err) {
      setError("Email ou code d'accès invalide. Vérifiez les informations envoyées par votre bailleur.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Espace Locataire</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-slate-500 mb-6 text-sm">
            Entrez vos identifiants fournis par votre bailleur pour consulter votre dossier.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Code d'accès</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="Ex: EB45Z2"
                value={codeAcces}
                onChange={(e) => setCodeAcces(e.target.value.toUpperCase())}
              />
            </div>

            {error && <p className="text-red-500 text-xs italic">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/30"
            >
              {loading ? 'Vérification...' : 'Accéder à mon espace'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}