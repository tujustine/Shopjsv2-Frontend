/**
 * Composant client de la page de détail d'un produit
 * Affiche toutes les informations détaillées d'un produit avec image, prix, stock et avis
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import QuantityControls from "@/components/QuantityControls";
import RatingBadge from "@/components/RatingBadge";
import PriceDisplay from "@/components/PriceDisplay";
import StockTag from "@/components/StockTag";
import { HiArrowLeft } from "react-icons/hi";

interface ProductDetailClientProps {
  product: Product;
}

/**
 * Composant principal de la page de détail produit
 * Gère l'affichage complet des informations du produit
 */
export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="text-orange-900 hover:text-orange-950 flex items-center"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            Retour aux produits
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-8">
            {/* Image du produit */}
            <div className="flex-1 relative h-80 lg:h-96">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover rounded-lg"
              />
            </div>

            {/* Informations du produit */}
            <div className="flex-1 space-y-6">
              {/* En-tête du produit */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-gray-600 text-lg mb-4">
                  {product.description}
                </p>
                <div className="mb-4">
                  <RatingBadge rating={product.rating} />
                </div>
              </div>

              {/* Prix, tags et contrôles de quantité */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <PriceDisplay price={product.price} size="4xl" />
                  <div className="flex flex-wrap gap-2">
                    {product.tags &&
                      product.tags.length > 0 &&
                      product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <QuantityControls product={product} className="" />
                </div>
              </div>

              {/* Informations détaillées du produit */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  Détails du produit
                </h3>

                {/* Statut de disponibilité */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Statut</span>
                  <StockTag
                    stock={product.stock}
                    availabilityStatus={product.availabilityStatus}
                    size="lg"
                  />
                </div>

                {/* Marque */}
                {product.brand && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Marque</span>
                    <span className="text-gray-900 font-medium">
                      {product.brand}
                    </span>
                  </div>
                )}

                {/* Catégorie */}
                {product.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Catégorie</span>
                    <span className="text-gray-900 font-medium">
                      {product.category}
                    </span>
                  </div>
                )}

                {/* Garantie */}
                {product.warrantyInformation && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Garantie</span>
                    <span className="text-gray-900 font-medium">
                      {product.warrantyInformation}
                    </span>
                  </div>
                )}

                {/* Informations de livraison */}
                {product.shippingInformation && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Livraison</span>
                    <span className="text-gray-900 font-medium">
                      {product.shippingInformation}
                    </span>
                  </div>
                )}

                {/* Politique de retour */}
                {product.returnPolicy && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">
                      Politique de retour
                    </span>
                    <span className="text-gray-900 font-medium">
                      {product.returnPolicy}
                    </span>
                  </div>
                )}

                {/* Dimensions */}
                {product.dimensions && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">
                      Dimensions
                    </span>
                    <span className="text-gray-900 font-medium">
                      {product.dimensions.width} × {product.dimensions.height} ×{" "}
                      {product.dimensions.depth} cm
                    </span>
                  </div>
                )}

                {/* Poids */}
                {product.weight && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Poids</span>
                    <span className="text-gray-900 font-medium">
                      {product.weight} kg
                    </span>
                  </div>
                )}
              </div>

              {/* Avis clients */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    Avis clients ({product.reviews.length})
                  </h3>

                  <div className="space-y-4">
                    {product.reviews.slice(0, 3).map((review, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {review.reviewerName}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {new Date(review.date).toLocaleDateString(
                                "fr-FR"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">
                          {review.comment}
                        </p>
                      </div>
                    ))}

                    {product.reviews.length > 3 && (
                      <p className="text-gray-500 text-sm text-center">
                        Et {product.reviews.length - 3} autres avis...
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
