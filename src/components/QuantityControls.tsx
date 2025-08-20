/**
 * Composant de contrôle des quantités de produits
 * Permet d'ajouter, retirer et modifier les quantités dans le panier
 */

"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";

interface QuantityControlsProps {
  product: Product;
  className?: string;
}

/**
 * Composant principal de contrôle des quantités
 * Gère l'ajout, la suppression et la modification des quantités
 */
export default function QuantityControls({
  product,
  className = "",
}: QuantityControlsProps) {
  const { cart, updateQuantity, addToCart } = useCart();
  const [error, setError] = useState<string | null>(null);

  const cartItem = cart.find((item) => item.product._id === product._id);
  const currentQuantity = cartItem?.quantity || 0;
  const isMaxStockReached = currentQuantity >= product.stock;

  /**
   * Gère l'incrémentation de la quantité
   * Si la quantité est 0, ajoute le produit au panier, sinon met à jour la quantité
   */
  const handleIncrement = () => {
    try {
      setError(null);
      if (currentQuantity === 0) {
        addToCart(product, 1);
      } else {
        updateQuantity(product._id, currentQuantity + 1);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de l'ajout"
      );
    }
  };

  /**
   * Gère la décrémentation de la quantité
   * Supprime une unité si la quantité est supérieure à 0
   */
  const handleDecrement = () => {
    try {
      setError(null);
      if (currentQuantity > 0) {
        updateQuantity(product._id, currentQuantity - 1);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Erreur lors de la modification"
      );
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-2">
        {/* Bouton de décrémentation */}
        <button
          onClick={handleDecrement}
          disabled={currentQuantity === 0}
          className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        >
          -
        </button>

        {/* Affichage de la quantité actuelle */}
        <span className="w-8 text-center font-medium text-gray-700">
          {currentQuantity}
        </span>

        {/* Bouton d'incrémentation */}
        <button
          onClick={handleIncrement}
          disabled={isMaxStockReached}
          className="w-8 h-8 bg-green-800 text-white rounded-full flex items-center justify-center hover:bg-green-900 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Affichage du stock disponible restant */}
      <div className="text-xs text-gray-500 mt-3">
        <span>Stock disponible: {product.stock - currentQuantity}</span>
      </div>

      {error && (
        <div className="text-xs text-red-500 bg-red-50 p-2 rounded mt-2">
          {error}
        </div>
      )}
    </div>
  );
}
