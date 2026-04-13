import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, UserCircle } from 'lucide-react';

// Assure-toi que les props incluent onTenantLoginClick
export default function Navbar({ darkMode, toggleDarkMode, onLoginClick, onTenantLoginClick, isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 md:py-4' : 'py-4 md:py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center gap-4">
            
            {/* Status Badge */}
            <div className={`bg-white/90 text-black backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full shadow-sm flex items-center gap-2 w-fit shrink-0 transition-all ${
              scrolled ? 'scale-90' : 'scale-100'
            }`}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] md:text-sm font-bold tracking-tight uppercase text-black">Lubumbashi</span>
            </div>

            {/* Desktop Links - Masqués si connecté en tant que Bailleur */}
            {!isLoggedIn && (
              <div className="hidden md:flex bg-white/80 text-black backdrop-blur-lg px-8 py-3 rounded-full shadow-lg gap-8 font-bold text-sm">
                <a href="#home" className="hover:opacity-50 transition text-black">Accueil</a>
                <a href="#about" className="hover:opacity-50 transition text-black">À propos</a>
                <a href="#services" className="hover:opacity-50 transition text-black">Services</a>
                <a href="#pricing" className="hover:opacity-50 transition text-black">Tarifs</a>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* --- BOUTON ESPACE LOCATAIRE (Visible uniquement si déconnecté) --- */}
              {!isLoggedIn && (
                <button 
                  onClick={onTenantLoginClick}
                  className="hidden lg:flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 backdrop-blur-md border border-black/10 dark:border-white/20 text-black dark:text-white font-bold text-xs hover:bg-white/40 transition-all shadow-sm"
                >
                  <UserCircle className="w-4 h-4" />
                  Espace Locataire
                </button>
              )}

              {/* Toggle Dark Mode */}
              <button 
                onClick={toggleDarkMode}
                className="p-3 rounded-full bg-white/90 shadow-md text-black dark:text-yellow-400 transition-all hover:scale-110"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Bouton Connexion/Inscription Bailleur */}
              <button 
                onClick={onLoginClick}
                className={`hidden md:block px-6 py-3 rounded-full shadow-xl font-bold text-sm hover:scale-105 transition-transform cursor-pointer ${
                  isLoggedIn 
                  ? 'bg-red-500 text-white' 
                  : 'bg-black dark:bg-white text-white dark:text-black'
                }`}
              >
                {isLoggedIn ? 'Déconnexion' : "S'inscrire"}
              </button>
              
              {/* Menu Mobile Button */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full border border-white/20 dark:border-slate-700 shadow-md text-black dark:text-white"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isOpen && (
            <div className="absolute top-20 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[35px] p-8 shadow-2xl border border-white/20 dark:border-slate-800 md:hidden flex flex-col gap-6 items-center animate-in fade-in slide-in-from-top-5 duration-300">
              <div className="flex flex-col gap-6 text-center font-black text-xl tracking-tighter dark:text-white text-black">
                <a href="#home" onClick={() => setIsOpen(false)} className="hover:italic transition-all">ACCUEIL</a>
                <a href="#about" onClick={() => setIsOpen(false)} className="hover:italic transition-all">À PROPOS</a>
                <a href="#services" onClick={() => setIsOpen(false)} className="hover:italic transition-all">SERVICES</a>
                <a href="#pricing" onClick={() => setIsOpen(false)} className="hover:italic transition-all">TARIFS</a>
              </div>
              
              <div className="w-full h-[1px] bg-black/5 dark:bg-white/10" />
              
              {/* Accès Locataire Mobile */}
              {!isLoggedIn && (
                <button 
                  onClick={() => { onTenantLoginClick(); setIsOpen(false); }}
                  className="w-full border-2 border-black dark:border-white text-black dark:text-white py-4 rounded-2xl font-black text-sm uppercase"
                >
                  Accès Locataire
                </button>
              )}

              {/* Bouton Action Principal Mobile */}
              <button 
                onClick={() => { onLoginClick(); setIsOpen(false); }}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest"
              >
                {isLoggedIn ? 'Déconnexion' : "S'inscrire"}
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="h-20 md:h-28" />
    </>
  );
}