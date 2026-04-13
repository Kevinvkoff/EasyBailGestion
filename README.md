# 🏠 EasyBail - Système de Gestion Immobilière SaaS

**EasyBail** est une plateforme SaaS moderne conçue pour simplifier la gestion locative pour les bailleurs et propriétaires immobiliers. Elle permet de centraliser le suivi des biens, des locataires et l'automatisation des paiements.

---

## 🚀 Fonctionnalités Clés

- **Tableau de Bord Intuitif** : Vue d'ensemble sur les revenus mensuels, les locataires actifs et les impayés.
- **Gestion des Baux** : Enregistrement rapide des nouveaux contrats de location.
- **Suivi des Transactions** : Historique détaillé des paiements en temps réel.
- **Profil Bailleur** : Gestion personnalisée des informations du propriétaire.
- **Interface Responsive** : Expérience fluide sur Desktop, Tablette et Mobile (Sidebar adaptative).

---

## 🛠️ Stack Technique

### Frontend
- **React.js** : Pour une interface utilisateur dynamique et réactive.
- **Tailwind CSS** : Design système moderne, épuré et ultra-rapide.
- **Lucide React** : Bibliothèque d'icônes élégantes.
- **Axios** : Gestion des requêtes API vers le backend.

### Backend
- **Laravel** : Puissant framework PHP pour la logique métier.
- **Laravel Sanctum** : Système d'authentification sécurisé par jetons (Tokens).
- **PostgreSQL** : Base de données robuste pour la persistance des données.

---

## 📦 Installation et Configuration

### Prérequis
- Node.js & npm
- PHP 8.x & Composer
- Un serveur PostgreSQL

### 1. Configuration du Backend (Laravel)
```bash
git clone [https://github.com/votre-username/easybail-api.git](https://github.com/votre-username/easybail-api.git)
cd easybail-api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
