import Link from "next/link";
import ProductDetailClient from "@/components/ProductDetailClient";
import { Product } from "@/types";

// Fonction pour récupérer un produit avec cache Next.js
async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(
    `${process.env.API_URL || process.env.API_URL_FALLBACK}/products/${id}`,
    {
      next: {
        revalidate: 180,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Produit non trouvé");
  }

  return response.json();
}

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  try {
    const { id } = await params;
    const product = await fetchProduct(id);
    return <ProductDetailClient product={product} />;
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md max-w-md mx-auto">
              <p className="font-medium">Produit non trouvé</p>
              <p className="text-sm mt-1">
                Le produit que vous recherchez n&apos;existe pas
              </p>
            </div>
            <div className="mt-4">
              <Link
                href="/products"
                className="bg-orange-900 text-white px-4 py-2 rounded-md hover:bg-orange-950 cursor-pointer"
              >
                Retour aux produits
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
