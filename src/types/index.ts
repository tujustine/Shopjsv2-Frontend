/**
 * Interface représentant un utilisateur de l'application
 * Utilisée pour l'authentification et la gestion des droits
 */
export interface User {
  _id: string;
  username: string;
  email: string;
  admin: boolean;
}

/**
 * Interface représentant un produit
 * Contient toutes les informations nécessaires à l'affichage et à la vente
 */
export interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  images: string[];
}

/**
 * Interface représentant un article dans le panier
 * Associe un produit à sa quantité sélectionnée
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Interface représentant une commande
 * Contient les informations de livraison et les produits commandés
 */
export interface Order {
  _id: string;
  products: {
    product: string;
    quantity: number;
  }[];
  address: string;
  price: number;
  delivered: boolean;
  owner: User;
}

/**
 * Interface du contexte d'authentification
 * Définit les méthodes et états disponibles pour la gestion des utilisateurs
 */
export interface AuthContextType {
  user: User | null; // Utilisateur connecté ou null si déconnecté
  login: (email: string, password: string) => Promise<void>; // Connexion
  logout: () => void; // Déconnexion
  signup: (username: string, email: string, password: string) => Promise<void>; // Inscription
  isLoading: boolean;
}

/**
 * Interface du contexte du panier
 * Définit les méthodes pour gérer les articles dans le panier
 */
export interface CartContextType {
  cart: CartItem[]; // Liste des articles dans le panier
  addToCart: (product: Product, quantity?: number) => void; // Ajouter un produit
  updateQuantity: (productId: string, quantity: number) => void; // Modifier la quantité
  clearCart: () => void; // Vider le panier
  getTotalPrice: () => number; // Calculer le prix total
  getTotalItems: () => number; // Compter le nombre d'articles
}
