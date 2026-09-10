import { describe, expect, it } from "vitest";
import { createReservationSchema } from "@/lib/validation";

const futureReservationTime = new Date(
  Date.now() + 24 * 60 * 60 * 1000,
).toISOString();

describe("createReservationSchema", () => {
  it("accepts a valid reservation payload", () => {
    const result = createReservationSchema.safeParse({
      restaurantId: 1,
      customerName: "Ada Lovelace",
      customerEmail: "ada@example.com",
      partySize: 4,
      reservationTime: futureReservationTime,
      notes: "Window seat please",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = createReservationSchema.safeParse({
      restaurantId: 1,
      customerName: "Ada Lovelace",
      customerEmail: "not-an-email",
      partySize: 4,
      reservationTime: futureReservationTime,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a party size larger than the maximum", () => {
    const result = createReservationSchema.safeParse({
      restaurantId: 1,
      customerName: "Ada Lovelace",
      customerEmail: "ada@example.com",
      partySize: 21,
      reservationTime: futureReservationTime,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a reservation time in the past", () => {
    const result = createReservationSchema.safeParse({
      restaurantId: 1,
      customerName: "Ada Lovelace",
      customerEmail: "ada@example.com",
      partySize: 4,
      reservationTime: "2020-01-01T19:00:00.000Z",
    });

    expect(result.success).toBe(false);
  });
});
