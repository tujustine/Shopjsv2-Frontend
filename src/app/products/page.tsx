/**
 * Page de liste des produits
 *
 */

import ProductsClient from "@/components/ProductsClient";
import { Product } from "@/types";

/**
 * Récupère la liste des produits depuis l'API backend
 * Utilise le cache Next.js avec revalidation toutes les 3 minutes
 *
 * @returns Promise<Product[]> - Liste des produits
 * @throws Error si la récupération échoue
 */
async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${process.env.API_URL || process.env.API_URL_FALLBACK}/products`,
    {
      next: { revalidate: 180 },
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des produits");
  }

  return response.json();
}

/**
 * Composant principal de la page des produits
 * Gère la récupération des données et l'affichage des erreurs
 */
export default async function ProductsPage() {
  try {
    const products = await getProducts();
    return <ProductsClient initialProducts={products} />;
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md max-w-md mx-auto">
              <p className="font-medium">
                Erreur lors du chargement des produits
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
