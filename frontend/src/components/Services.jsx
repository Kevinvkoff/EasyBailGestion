import React from 'react';
import { Users, CreditCard, ShieldCheck } from 'lucide-react';

export default function Services() {
  const data = [
    { icon: <Users className="w-8 h-8 md:w-10 md:h-10" />, title: "Locataires", desc: "Gestion centralisée des profils et documents." },
    { icon: <CreditCard className="w-8 h-8 md:w-10 md:h-10" />, title: "Loyers", desc: "Encaissement digital et relances automatiques." },
    { icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />, title: "Légal", desc: "Contrats conformes au droit congolais." }
  ];

  return (
    <section id="services" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-24 md:mb-40 px-4">
      {data.map((s, i) => (
        <div key={i} className="bg-white/50 backdrop-blur-sm p-8 md:p-10 rounded-[35px] md:rounded-[45px] border border-white/20 hover:bg-white transition-all group">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center shadow-sm mb-6 md:mb-8 group-hover:scale-110 transition-transform text-black">
            {s.icon}
          </div>
          <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">{s.title}</h3>
          <p className="text-black/50 font-medium text-sm md:text-base leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </section>
  );
}