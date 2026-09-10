import { describe, expect, it } from "vitest";
import { createReservationSchema } from "@/lib/validation";

describe("createReservationSchema", () => {
  it("accepts a valid reservation payload", () => {
    const result = createReservationSchema.safeParse({
      restaurantId: 1,
      customerName: "Ada Lovelace",
      customerEmail: "ada@example.com",
      partySize: 4,
      reservationTime: "2024-01-01T19:00:00.000Z",
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
      reservationTime: "2024-01-01T19:00:00.000Z",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a party size larger than the maximum", () => {
    const result = createReservationSchema.safeParse({
      restaurantId: 1,
      customerName: "Ada Lovelace",
      customerEmail: "ada@example.com",
      partySize: 21,
      reservationTime: "2024-01-01T19:00:00.000Z",
    });

    expect(result.success).toBe(false);
  });
});
