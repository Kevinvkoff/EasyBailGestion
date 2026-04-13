import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Accueil from './components/Accueil';
import Apropos from './components/Apropos';
import Services from './components/Services';
import Tarifs from './components/Tarifs';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import TenantLoginModal from './components/TenantLoginModal'; // Nouveau
import TenantPortal from './components/TenantPortal'; // Nouveau
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  // ÉTAT BAILLEUR (Kevin)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('ACCESS_TOKEN'));
  const [showLogin, setShowLogin] = useState(false);

  // ÉTAT LOCATAIRE
  const [isTenantLoggedIn, setIsTenantLoggedIn] = useState(!!localStorage.getItem('TENANT_DATA'));
  const [showTenantLogin, setShowTenantLogin] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // GESTION BAILLEUR
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    window.scrollTo(0, 0);
  };

  // GESTION LOCATAIRE
  const handleTenantLoginSuccess = () => {
    setIsTenantLoggedIn(true);
    setShowTenantLogin(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    // On nettoie tous les types de sessions
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('TENANT_DATA');
    setIsLoggedIn(false);
    setIsTenantLoggedIn(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 transition-colors duration-500">
        
        <main>
          {isLoggedIn ? (
            /* --- VUE PRIVÉE : DASHBOARD DU BAILLEUR (Kevin) --- */
            <Dashboard onLogout={handleLogout} />
          ) : isTenantLoggedIn ? (
            /* --- VUE PRIVÉE : PORTAIL DU LOCATAIRE --- */
            <TenantPortal onLogout={handleLogout} />
          ) : (
            /* --- VUE PUBLIQUE : SITE VITRINE --- */
            <>
              <Navbar 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode} 
                onLoginClick={() => setShowLogin(true)} 
                onTenantLoginClick={() => setShowTenantLogin(true)} // Nouveau bouton à prévoir dans Navbar
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

        {/* Modal pour le Bailleur */}
        {showLogin && (
          <LoginModal 
            onClose={() => setShowLogin(false)} 
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {/* Modal pour le Locataire */}
        {showTenantLogin && (
          <TenantLoginModal 
            onClose={() => setShowTenantLogin(false)} 
            onLoginSuccess={handleTenantLoginSuccess}
          />
        )}
      </div>
    </div>
  );
}