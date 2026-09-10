import Link from "next/link";
import type { Restaurant } from "@/db/schema";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className="block rounded-lg border border-black/10 p-4 transition hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
    >
      <h3 className="text-lg font-semibold">{restaurant.name}</h3>
      {restaurant.cuisine ? (
        <p className="text-sm text-black/60 dark:text-white/60">
          {restaurant.cuisine}
        </p>
      ) : null}
      <p className="mt-2 text-sm">{restaurant.address}</p>
    </Link>
  );
}
