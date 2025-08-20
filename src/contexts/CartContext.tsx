/**
 * Contexte du panier pour la gestion des articles sélectionnés
 * Gère l'ajout, suppression, modification des quantités
 */

"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product, CartItem, CartContextType } from "@/types";

interface CartState {
  cart: CartItem[];
}

/**
 * Actions possibles pour le reducer du panier
 */
type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity?: number } } // Ajouter un produit
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    } // Modifier la quantité
  | { type: "CLEAR_CART" } // Vider le panier
  | { type: "LOAD_CART"; payload: CartItem[] }; // Charger le panier

const initialState: CartState = {
  cart: [],
};

/**
 * Reducer pour la gestion de l'état du panier
 */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { product, quantity }],
        };
      }
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.product._id !== productId),
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "LOAD_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: cart });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  /**
   * Ajoute un produit au panier avec validation du stock
   */
  const addToCart = (product: Product, quantity: number = 1) => {
    // Vérifier si le produit existe déjà dans le panier
    const existingItem = state.cart.find(
      (item) => item.product._id === product._id
    );
    const currentQuantity = existingItem?.quantity || 0;
    const newTotalQuantity = currentQuantity + quantity;

    // Validation du stock disponible
    if (newTotalQuantity > product.stock) {
      throw new Error(`Stock insuffisant. Disponible: ${product.stock}`);
    }

    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
  };

  /**
   * Met à jour la quantité d'un produit dans le panier
   */
  const updateQuantity = (productId: string, quantity: number) => {
    // Vérifier le stock disponible avant la mise à jour
    const cartItem = state.cart.find((item) => item.product._id === productId);
    if (cartItem && quantity > cartItem.product.stock) {
      throw new Error(
        `Stock insuffisant. Disponible: ${cartItem.product.stock}`
      );
    }

    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  /**
   * Vide complètement le panier
   */
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  /**
   * Calcule le prix total de tous les articles dans le panier
   */
  const getTotalPrice = () => {
    return state.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  /**
   * Compte le nombre total d'articles dans le panier
   */
  const getTotalItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cart: state.cart,
    addToCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
