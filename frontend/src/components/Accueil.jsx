import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Receipt } from 'lucide-react';

export default function Accueil() {
  return (
    <section id="home" className="relative text-center max-w-6xl mx-auto pt-16 md:pt-28 pb-20 md:pb-36 px-4">
      
      {/* Badge Contextuel : Gestion Immobilière */}
      
      {/* Titre orienté Business */}
      <h1 className="text-5xl sm:text-7xl md:text-[100px] leading-[0.9] font-black tracking-tighter mb-8 text-slate-900">
        Zéro impayé. <br />
        <span className="bg-gradient-to-r from-[#1e5d40] to-teal-700 bg-clip-text text-transparent  font-medium">
          Zéro paperasse.
        </span>
      </h1>

      {/* Description orientée Solution */}
      <p className="text-lg md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
        EasyBail automatise la collecte de vos loyers, génère vos contrats certifiés et suit vos locataires en temps réel. <span className="text-black font-bold">Gagnez 10h de gestion par mois.</span>
      </p>

      {/* Actions Principales */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
        <a href="#dashboard" className="group bg-black text-white px-10 py-6 rounded-full text-xl font-black hover:scale-105 transition-all shadow-2xl flex items-center gap-3 w-full sm:w-auto justify-center">
          Démarrer ma gestion
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </a>
        
        <button className="px-10 py-6 rounded-full text-xl font-black border-2 border-slate-200 bg-white/50 hover:bg-white transition-all w-full sm:w-auto">
          Calculer mon ROI
        </button>
      </div>

      {/* Statistiques Rapides (Micro-Dashboard) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto border-t border-slate-200 pt-12">
        <div className="flex flex-col items-center p-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm mb-4">
            <Zap className="w-6 h-6 text-yellow-500" />
          </div>
          <span className="text-3xl font-black text-slate-900">2 min</span>
          <span className="text-sm font-bold opacity-40 uppercase tracking-widest mt-1">Pour créer un bail</span>
        </div>

        <div className="flex flex-col items-center p-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm mb-4">
            <Receipt className="w-6 h-6 text-blue-500" />
          </div>
          <span className="text-3xl font-black text-slate-900">100%</span>
          <span className="text-sm font-bold opacity-40 uppercase tracking-widest mt-1">Quittances auto</span>
        </div>

        <div className="flex flex-col items-center p-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm mb-4">
            <ShieldCheck className="w-6 h-6 text-green-500" />
          </div>
          <span className="text-3xl font-black text-slate-900">0%</span>
          <span className="text-sm font-bold opacity-40 uppercase tracking-widest mt-1">Risque d'oubli</span>
        </div>
      </div>

      {/* Décoration de fond */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1e5d40]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -z-10" />

    </section>
  );
}