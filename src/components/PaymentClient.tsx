/**
 * Composant client de la page de paiement
 * Gère la création de commandes et la confirmation de paiement
 */

"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

/**
 * Composant principal de la page de paiement
 * Gère la soumission du formulaire et la création de commande
 */
export default function PaymentClient() {
  const router = useRouter();
  const cartContext = useCart();

  const { cart, getTotalPrice, clearCart } = cartContext;

  // Rediriger si panier vide
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const [state, formAction] = useActionState(
    async (
      prevState: { success: boolean; error: string | null },
      formData: FormData
    ) => {
      const address = formData.get("address") as string;

      if (!address.trim()) {
        return {
          success: false,
          error: "Veuillez saisir une adresse de livraison",
        };
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token d'authentification manquant");
        }

        const orderData = {
          products: cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          address: address.trim(),
          price: getTotalPrice(),
        };

        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL ||
            process.env.NEXT_PUBLIC_API_URL_FALLBACK
          }/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la création de la commande");
        }

        // Vider le panier après commande réussie
        clearCart();

        alert(`Commande confirmée !`);
        router.push("/");

        return { success: true, error: null };
      } catch (error) {
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Erreur lors de la création de la commande",
        };
      }
    },
    { success: false, error: null }
  );

  // Cas où le panier est vide
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Finaliser votre commande
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulaire de commande */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Informations de livraison
            </h2>

            <form action={formAction} className="space-y-6">
              {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {state.error}
                </div>
              )}

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Adresse de livraison
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-900 placeholder-gray-400"
                  placeholder="55 Rue Etienne Marey, 75020 Paris"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-800 text-white py-3 px-4 rounded-md hover:bg-green-900 font-medium cursor-pointer"
              >
                Confirmer la commande
              </button>
            </form>
          </div>

          {/* Récapitulatif de la commande */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Récapitulatif
            </h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between items-center py-2 border-b border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">{item.quantity}x</span>
                    <span className="font-medium text-gray-900">
                      {item.product.title}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </span>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium text-gray-400">
                    {getTotalPrice().toFixed(2)} €
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium text-gray-400">Gratuite</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {getTotalPrice().toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
