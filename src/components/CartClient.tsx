/**
 * Composant client de la page du panier
 * Affiche les produits ajoutés au panier avec possibilité de modification
 * et passage à la commande
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import QuantityControls from "@/components/QuantityControls";
import PriceDisplay from "@/components/PriceDisplay";

/**
 * Composant principal de la page du panier
 * Gère l'affichage des produits et la navigation vers la commande
 */
export default function CartClient() {
  const cartContext = useCart();
  const authContext = useAuth();

  const { cart, getTotalPrice, clearCart } = cartContext;
  const { user } = authContext;

  // Cas où le panier est vide
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Votre panier est vide
              </h2>
              <p className="text-gray-600 mb-6">
                Ajoutez des produits pour commencer vos achats
              </p>
              <Link
                href="/products"
                className="bg-amber-800 text-white px-6 py-3 rounded-md hover:bg-amber-900 font-medium"
              >
                Voir nos produits
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste des produits */}
          <div className="flex-1 lg:flex-[2]">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Produits ({cart.length})
                </h2>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          sizes="80px"
                          className="object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.product.title}
                        </h3>
                        <PriceDisplay price={item.product.price} size="lg" />
                      </div>

                      <div className="flex items-center">
                        <QuantityControls
                          product={item.product}
                          className="flex-shrink-0"
                        />
                      </div>

                      <div className="text-right">
                        <PriceDisplay
                          price={item.product.price * item.quantity}
                          size="lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                  >
                    Vider le panier
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Résumé et actions */}
          <div className="flex-1 lg:flex-[1]">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Résumé
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <PriceDisplay
                    price={getTotalPrice()}
                    size="base"
                    className="text-gray-400"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium text-gray-400">Gratuite</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <PriceDisplay price={getTotalPrice()} size="2xl" />
                  </div>
                </div>
              </div>

              {user ? (
                <Link
                  href="/payment"
                  className="w-full bg-green-800 text-white py-3 px-4 rounded-md hover:bg-green-900 font-medium text-center block"
                >
                  Procéder au paiement
                </Link>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 text-center">
                    Connectez-vous pour finaliser votre commande
                  </p>
                  <Link
                    href="/users/login"
                    className="w-full bg-amber-500 text-white py-3 px-4 rounded-md hover:bg-amber-600 font-medium text-center block"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/users/signup"
                    className="w-full bg-amber-800 text-white py-3 px-4 rounded-md hover:bg-amber-900 font-medium text-center block"
                  >
                    Créer un compte
                  </Link>
                </div>
              )}

              <div className="mt-6 text-center">
                <Link
                  href="/products"
                  className="text-orange-900 hover:text-orange-950 font-medium"
                >
                  Continuer les achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
