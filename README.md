# Bric-à-brac - Application E-commerce Full-Stack

Une application de boutique en ligne complète et moderne construite avec **Next.js 15**, **React 19**, **TypeScript** et **Tailwind CSS**. Le projet inclut un backend Express.js avec MongoDB.

## 📚 **Repositories du projet**

- **🖥️ Frontend** : [Ce repository](https://github.com/votre-username/test-technique) - Interface utilisateur Next.js 15 + React 19
- **🔧 Backend** : [Shopjsv2-Backend](https://github.com/tujustine/Shopjsv2-Backend) - API Express.js + MongoDB

## 🛠️ Stack

### Frontend

- **Framework** : Next.js 15 (App Router)
- **React** : Version 19 avec hooks avancés
- **TypeScript** : Typage strict et interfaces complètes
- **Styling** : Tailwind CSS avec composants personnalisés
- **État** : Context API + useReducer pour la gestion globale
- **Formulaires** : useActionState (React 19) pour la gestion des états

### Backend

- **Runtime** : Node.js avec Express.js
- **Base de données** : MongoDB avec Mongoose
- **Authentification** : JWT avec middleware de protection
- **Déploiement** : Northflank

## 📁 Architecture du projet

```
src/
├── app/                   # Pages Next.js App Router
│   ├── users/            # Authentification
│   ├── products/         # Catalogue et détails
│   ├── cart/            # Panier
│   ├── payment/         # Finalisation commande
│   └── admin/           # Interface administrateur
├── components/           # Composants réutilisables
├── contexts/            # Contextes React (Auth, Cart)
└── types/               # Types TypeScript
```

## 🎯 Fonctionnalités Clés

### 🔐 Authentification & Sécurité

- **Inscription/Connexion** avec validation des formulaires
- **JWT** pour la gestion des sessions
- **Routes protégées** pour les utilisateurs connectés
- **Gestion des droits** administrateur

### 🛍️ E-commerce

- **Catalogue de produits** avec grille responsive
- **Détail des produits** avec gestion des quantités
- **Panier intelligent** avec validation du stock
- **Processus de commande** sécurisé

### ⚡ Performance & cache

- **Cache Next.js** avec revalidation automatique
- **Server Components** pour le rendu optimisé
- **Client Components** pour l'interactivité
- **Images optimisées** avec Next.js Image

### 🎨 Interface utilisateur

- **Design responsive** mobile-first
- **Composants réutilisables** pour la cohérence
- **Drag & Drop** pour l'administration
- **Animations fluides** et micro-interactions

## 🛣️ Routes Frontend

### Pages Publiques

- **`/`** - Page d'accueil
- **`/products`** - Catalogue des produits
- **`/products/[id]`** - Détail d'un produit
- **`/users/login`** - Connexion utilisateur
- **`/users/signup`** - Inscription utilisateur

### Pages Protégées

- **`/cart`** - Gestion du panier (utilisateur connecté)
- **`/payment`** - Finalisation de commande (utilisateur connecté)
- **`/admin`** - Interface administrateur (admin uniquement)

## 🚀 Installation et Démarrage

### Prérequis

- **Node.js** : Version 18+ recommandée
- **MongoDB** : Base de données locale ou cloud
- **Yarn** : Gestionnaire de paquets (npm également supporté)

### 1. Installation des dépendances frontend

```bash
cd test-technique
yarn install
```

### 2. Configuration des variables d'environnement

```bash
# Créer .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_API_URL_FALLBACK=http://localhost:4000
API_URL=http://localhost:4000
API_URL_FALLBACK=http://localhost:4000
```

### 3. Installation et démarrage du backend

```bash
# Cloner le repository backend
git clone https://github.com/tujustine/Shopjsv2-Backend.git
cd Shopjsv2-Backend

# Installer les dépendances
npm install

# Démarrer le serveur
npm start
```

Le serveur backend démarre sur `http://localhost:4000`

### 4. Démarrage du Frontend

```bash
cd ../test-technique

# en développement
yarn dev

# en production
yarn build
yarn start
```

L'application est accessible sur `http://localhost:3000`

### 5. Initialisation de la base de données

Appelez une fois l'endpoint `POST /create-db` pour peupler la BDD avec des produits.
