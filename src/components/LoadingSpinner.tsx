/**
 * Composant de chargement
 * Affiche un message de chargement
 */

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  text = "Chargement...",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
