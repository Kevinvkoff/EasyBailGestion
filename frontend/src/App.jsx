import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Accueil from './components/Accueil';
import Apropos from './components/Apropos';
import Services from './components/Services';
import Tarifs from './components/Tarifs';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  // INITIALISATION : On vérifie si un token existe déjà dans le navigateur
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('ACCESS_TOKEN'));
  const [showLogin, setShowLogin] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    // NETTOYAGE : On retire le token pour fermer la session réellement
    localStorage.removeItem('ACCESS_TOKEN');
    setIsLoggedIn(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 transition-colors duration-500">
        
        <main>
          {isLoggedIn ? (
            /* --- VUE PRIVÉE : UNIQUEMENT LE DASHBOARD --- */
            /* Pas de Navbar ici pour un look "App" propre */
            <Dashboard onLogout={handleLogout} />
          ) : (
            /* --- VUE PUBLIQUE : NAVBAR + CONTENU --- */
            <>
              <Navbar 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode} 
                onLoginClick={() => setShowLogin(true)} 
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
              <div id="home"><Accueil onStartClick={() => setShowLogin(true)} /></div>
              <div id="about"><Apropos /></div>
              <div id="services"><Services /></div>
              <div id="pricing"><Tarifs /></div>
              <Footer />
            </>
          )}
        </main>

        {showLogin && (
          <LoginModal 
            onClose={() => setShowLogin(false)} 
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </div>
  );
}