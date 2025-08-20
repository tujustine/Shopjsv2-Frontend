/**
 * Composant d'en-tête de l'application
 * Gère la navigation, l'affichage du panier et l'authentification
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

/**
 * Composant principal de l'en-tête
 * Gère l'affichage conditionnel selon l'état de l'utilisateur
 */
export default function Header() {
  const { user, logout } = useAuth();
  const { getTotalPrice, getTotalItems } = useCart();
  const router = useRouter();

  /**
   * Gère la déconnexion et redirige vers l'accueil
   */
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Bric-à-brac
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/products"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Produits
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <div className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900">
                Panier ({getTotalItems()})
              </div>
              {getTotalPrice() > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
                </div>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {user.admin && (
                  <Link
                    href="/admin"
                    className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 cursor-pointer"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/users/login"
                  className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600"
                >
                  Se connecter
                </Link>
                <Link
                  href="/users/signup"
                  className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900"
                >
                  Créer un compte
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
