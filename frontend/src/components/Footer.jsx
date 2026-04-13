import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white rounded-t-[50px] md:rounded-t-[80px] px-6 py-12 md:py-20 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-5xl font-black italic">EasyBail</h2>
        <p className="opacity-40 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Propulsez votre gestion immobilière dans le futur. Conçu à Lubumbashi pour les bailleurs de demain.
        </p>
        <div className="pt-8 border-t border-white/10 text-[10px] uppercase font-bold opacity-30 tracking-[0.3em]">
          © 2026 KEVIN CODE • TOUS DROITS RÉSERVÉS
        </div>
      </div>
    </footer>
  );
}