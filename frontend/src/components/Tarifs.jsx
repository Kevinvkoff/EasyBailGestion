import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Tarifs() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto mb-20 md:mb-32 px-4">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter ">Simple & Transparent</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-center">
        <PricingCard plan="Standard" price="15" />
        <PricingCard plan="Business" price="45" popular={true} />
        <PricingCard plan="Expert" price="99" />
      </div>
    </section>
  );
}

function PricingCard({ plan, price, popular }) {
  const features = ["Mises à jour illimitées", "Support 24/7", "Export PDF"];
  
  return (
    <div className={`p-8 md:p-10 rounded-[40px] md:rounded-[50px] flex flex-col transition-all ${
      popular 
      ? 'bg-black text-white md:scale-105 shadow-2xl z-10 border-4 border-white/10' 
      : 'bg-white text-black border border-gray-100'
    }`}>
      {popular && (
        <span className="bg-red-500 text-[10px] font-black uppercase px-4 py-1.5 rounded-full w-fit mb-6 self-center md:self-start">
          Recommandé
        </span>
      )}
      <h4 className="text-xl font-bold mb-2 text-center md:text-left">{plan}</h4>
      <div className="mb-8 text-center md:text-left">
        <span className="text-5xl md:text-6xl font-black">${price}</span>
        <span className="opacity-40 text-sm"> /mois</span>
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm font-bold">
            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${popular ? 'text-green-400' : 'text-green-600'}`} /> 
            <span className="leading-tight">{f}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-4 md:py-5 rounded-full font-black text-lg transition-transform active:scale-95 ${
        popular ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'
      }`}>
        Essayer
      </button>
    </div>
  );
}