import { useState } from "react";
import type { Restaurant } from "@/types/restaurant";

const RestaurantIcon = ({ size = 48 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-restaurant"
  >
    <path d="M7 2v11" />
    <path d="M4 2v11" />
    <path d="M10 2v11" />
    <path d="M4 18h16" />
    <circle cx="11" cy="7" r="2" />
  </svg>
);

const RestaurantCard = ({
  restaurant,
  onClick
}: {
  restaurant: Restaurant;
  onClick: () => void;
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="border rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      <div className="relative w-full h-72 bg-muted flex items-center justify-center overflow-hidden">
        {restaurant.cuisine && !imgError ? (
          <img
            src={restaurant.cuisine}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center text-muted-foreground">
            <RestaurantIcon size={48} />
          </div>
        )}
      </div>

      <div className="p-3 space-y-1.5">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {restaurant.name}
        </h3>
        <p className="text-muted-foreground text-xs">{restaurant.borough}</p>
        {restaurant.borough && restaurant.borough.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {restaurant.borough.slice(0, 2).map((g: string) => (
              <span
                key={g}
                className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { RestaurantCard };