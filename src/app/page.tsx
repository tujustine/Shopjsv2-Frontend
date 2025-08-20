import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenue au <span className="text-red-800">Bric-à-brac</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Découvrez notre sélection de produits variés et EXCEPTIONNELS. Des
            articles de qualité à des prix compétitifs, livrés directement chez
            vous.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-amber-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-900"
            >
              Voir nos produits
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
