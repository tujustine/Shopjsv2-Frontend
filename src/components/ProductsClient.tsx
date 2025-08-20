/**
 * Composant client de la liste des produits
 * Gère l'affichage, la recherche et le filtrage des produits
 */

"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

interface ProductsClientProps {
  initialProducts: Product[];
}

/**
 * Composant principal de la liste des produits
 * Gère la recherche et le filtrage
 */
export default function ProductsClient({
  initialProducts,
}: ProductsClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);

  /**
   * Recherche dynamique dans les produits
   * Filtre par titre, description et catégorie
   */
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Nos Produits
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md  placeholder-gray-400 text-gray-900"
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {filteredProducts.length}{" "}
            {filteredProducts.length > 1
              ? "produits trouvés"
              : "produit trouvé"}
            {searchTerm && ` pour "${searchTerm}"`}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? "Aucun produit trouvé pour votre recherche"
                : "Aucun produit disponible"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
