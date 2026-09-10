import { notFound } from "next/navigation";
import { getRestaurantById } from "@/lib/reservations";
import { ReservationForm } from "@/components/reservation-form";
import { parsePositiveIntId } from "@/lib/ids";

export const dynamic = "force-dynamic";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurantId = parsePositiveIntId(id);

  if (restaurantId === null) {
    notFound();
  }

  const restaurant = await getRestaurantById(restaurantId);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        {restaurant.cuisine ? (
          <p className="text-black/60 dark:text-white/60">
            {restaurant.cuisine}
          </p>
        ) : null}
        <p className="mt-2">{restaurant.address}</p>
        {restaurant.description ? (
          <p className="mt-2 text-sm">{restaurant.description}</p>
        ) : null}
      </div>
      <div>
        <h2 className="text-lg font-semibold">Reserve a table</h2>
        <ReservationForm restaurantId={restaurant.id} />
      </div>
    </div>
  );
}
