/**
 * Composant d'affichage du statut de stock
 * Affiche un tag coloré selon la disponibilité du produit
 */

interface StockTagProps {
  stock: number;
  availabilityStatus: string;
  size?: "sm" | "base" | "lg" | "xl";
}

export default function StockTag({
  stock,
  availabilityStatus,
  size = "base",
}: StockTagProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    base: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
    xl: "px-4 py-1.5 text-base",
  };

  const currentSizeClasses = sizeClasses[size];
  if (stock === 0) {
    return (
      <span
        className={`inline-flex items-center rounded-full font-medium bg-red-100 text-red-800 ${currentSizeClasses}`}
      >
        Rupture
      </span>
    );
  }

  if (availabilityStatus === "Low Stock") {
    return (
      <span
        className={`inline-flex items-center rounded-full font-medium bg-orange-100 text-orange-800 ${currentSizeClasses}`}
      >
        Stock faible
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium bg-green-100 text-green-800 ${currentSizeClasses}`}
    >
      En stock
    </span>
  );
}
