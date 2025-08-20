/**
 * Composant de carte produit pour l'affichage en grille
 * Affiche l'image, le titre, la description, le prix et les contrôles de quantité
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import QuantityControls from "./QuantityControls";
import StockTag from "./StockTag";
import PriceDisplay from "./PriceDisplay";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />

          <div className="absolute top-2 right-2">
            <StockTag
              stock={product.stock}
              availabilityStatus={product.availabilityStatus}
            />
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <PriceDisplay price={product.price} size="xl" />

          <QuantityControls product={product} className="" />
        </div>
      </div>
    </div>
  );
}
