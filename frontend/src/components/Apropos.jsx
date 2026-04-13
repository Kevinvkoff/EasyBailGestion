import React from 'react';

export default function Apropos() {
  return (
    <section id="about" className="relative max-w-5xl mx-auto mb-24 md:mb-40 h-[350px] md:h-[550px] px-4">
      {/* Ombre de profondeur */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[85%] h-full bg-black rounded-[40px] md:rounded-[50px] opacity-10 blur-2xl" />
      
      {/* Carte Dashboard simulée */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[95%] md:w-full h-full bg-[#fdf8e1] rounded-[40px] md:rounded-[50px] border-[6px] md:border-[10px] border-white shadow-2xl p-6 md:p-10 overflow-hidden">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center gap-2 md:gap-3 font-black text-xl md:text-2xl italic">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-xl md:rounded-2xl text-white flex items-center justify-center text-[10px] md:text-xs not-italic font-sans">EB</div> 
            EasyBail
          </div>
          <div className="hidden sm:flex gap-4 md:gap-6 text-[8px] md:text-xs font-black opacity-30 uppercase tracking-[0.2em]">
            <span>Analyses</span> <span>Patrimoine</span> <span>Sécurité</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-black leading-tight">Suivez vos revenus en temps réel.</h2>
            <div className="h-1.5 w-24 bg-red-500 rounded-full mx-auto md:mx-0" />
          </div>
          <div className="bg-black/5 rounded-[30px] md:rounded-[40px] p-6 md:p-8 border border-black/5 flex flex-col justify-center text-center">
             <span className="text-[10px] md:text-sm font-bold opacity-40 uppercase tracking-wider">Taux de recouvrement</span>
             <div className="text-4xl md:text-6xl font-black mt-2">98.5%</div>
          </div>
        </div>
      </div>
    </section>
  );
}