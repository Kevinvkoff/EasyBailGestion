import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, User } from 'lucide-react';
import axiosClient from '../api/axios';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false); // État pour basculer
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isRegister ? '/register' : '/login';
    
    try {
      const { data } = await axiosClient.post(endpoint, formData);
      localStorage.setItem('ACCESS_TOKEN', data.access_token);
      onLoginSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] p-8 md:p-10 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full dark:text-white">
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1e5d40] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-black text-2xl">EB</span>
          </div>
          <h2 className="text-2xl font-black dark:text-white">
            {isRegister ? 'Créer un compte' : 'Connexion EasyBail'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
          
          {isRegister && (
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Nom Complet</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#1e5d40] dark:text-white"
                  placeholder="Jean Kabamba"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#1e5d40] dark:text-white"
                placeholder="bailleur@easybail.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#1e5d40] dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {isRegister && (
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" required
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#1e5d40] dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-[#1e5d40] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-lg">
            {isRegister ? "S'inscrire" : "Se connecter"} <ArrowRight size={18} />
          </button>
        </form>

        <button 
          onClick={() => setIsRegister(!isRegister)}
          className="w-full mt-6 text-slate-500 dark:text-slate-400 text-xs font-bold hover:underline"
        >
          {isRegister ? "Déjà un compte ? Connectez-vous" : "Pas encore de compte ? Inscrivez-vous"}
        </button>
      </div>
    </div>
  );
}