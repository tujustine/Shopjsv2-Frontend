/**
 * Composant d'affichage des prix
 * Gère l'affichage des prix avec différentes tailles et options de formatage
 */

interface PriceDisplayProps {
  price: number;
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
}

export default function PriceDisplay({
  price,
  size = "base",
  className = "",
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  };

  return (
    <span
      className={`font-bold text-gray-700 ${sizeClasses[size]} ${className}`}
    >
      {price.toFixed(2)} €
    </span>
  );
}
