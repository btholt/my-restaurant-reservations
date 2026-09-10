import { getReservationsForRestaurant } from "@/lib/reservations";

export const dynamic = "force-dynamic";

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ restaurantId?: string }>;
}) {
  const { restaurantId } = await searchParams;

  if (!restaurantId) {
    return (
      <p className="text-sm text-black/60 dark:text-white/60">
        Pass a <code>restaurantId</code> query parameter to view its
        reservations.
      </p>
    );
  }

  const reservations = await getReservationsForRestaurant(
    Number(restaurantId),
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Reservations</h1>
      <ul className="flex flex-col gap-2">
        {reservations.map((reservation) => (
          <li
            key={reservation.id}
            className="rounded border border-black/10 p-3 dark:border-white/10"
          >
            <p className="font-medium">
              Party of {reservation.partySize} &mdash; {reservation.status}
            </p>
            <p className="text-sm text-black/60 dark:text-white/60">
              {new Date(reservation.reservationTime).toLocaleString()}
            </p>
          </li>
        ))}
        {reservations.length === 0 ? (
          <p className="text-sm text-black/60 dark:text-white/60">
            No reservations yet.
          </p>
        ) : null}
      </ul>
    </div>
  );
}
