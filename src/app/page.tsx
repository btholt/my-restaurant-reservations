import { getRestaurants } from "@/lib/reservations";
import { RestaurantCard } from "@/components/restaurant-card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const restaurants = await getRestaurants();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Find a table</h1>
        <p className="text-black/60 dark:text-white/60">
          Browse restaurants and reserve a table for your next visit.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
        {restaurants.length === 0 ? (
          <p className="text-sm text-black/60 dark:text-white/60">
            No restaurants yet. Seed the database to get started.
          </p>
        ) : null}
      </div>
    </div>
  );
}
