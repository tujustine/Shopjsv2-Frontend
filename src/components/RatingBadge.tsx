/**
 * Composant d'affichage des notes de produits
 * Affiche un badge coloré selon la note avec une étoile
 */

interface RatingBadgeProps {
  rating: number;
}

export default function RatingBadge({ rating }: RatingBadgeProps) {
  const getBadgeStyle = (rating: number) => {
    if (rating >= 4.5) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (rating >= 4) {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else if (rating >= 3) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else {
      return "bg-red-100 text-red-800 border-red-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getBadgeStyle(
        rating
      )}`}
    >
      {rating.toFixed(1)} ⭐
    </span>
  );
}
