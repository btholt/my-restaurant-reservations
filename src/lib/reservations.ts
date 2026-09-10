import { and, desc, eq, notInArray } from "drizzle-orm";
import { db } from "@/db";
import { customers, reservations, restaurants, tables } from "@/db/schema";
import type { CreateReservationInput } from "@/lib/validation";

export async function getRestaurants() {
  return db.select().from(restaurants).orderBy(restaurants.name);
}

export async function getRestaurantById(id: number) {
  const [restaurant] = await db
    .select()
    .from(restaurants)
    .where(eq(restaurants.id, id));
  return restaurant;
}

export async function getTablesForRestaurant(restaurantId: number) {
  return db.select().from(tables).where(eq(tables.restaurantId, restaurantId));
}

export async function getReservationsForRestaurant(restaurantId: number) {
  return db
    .select()
    .from(reservations)
    .where(eq(reservations.restaurantId, restaurantId))
    .orderBy(desc(reservations.reservationTime));
}

async function findOrCreateCustomer(name: string, email: string) {
  const [customer] = await db
    .insert(customers)
    .values({ name, email })
    .onConflictDoUpdate({
      target: customers.email,
      set: { name },
    })
    .returning();

  return customer;
}

export async function createReservation(input: CreateReservationInput) {
  const customer = await findOrCreateCustomer(
    input.customerName,
    input.customerEmail,
  );

  const [reservation] = await db
    .insert(reservations)
    .values({
      restaurantId: input.restaurantId,
      customerId: customer.id,
      partySize: input.partySize,
      reservationTime: input.reservationTime,
      notes: input.notes,
    })
    .returning();

  return reservation;
}

export async function cancelReservation(id: number) {
  const [updated] = await db
    .update(reservations)
    .set({ status: "cancelled" })
    .where(
      and(
        eq(reservations.id, id),
        notInArray(reservations.status, ["cancelled", "completed"]),
      ),
    )
    .returning();

  return updated;
}
