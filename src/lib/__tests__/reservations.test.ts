import { describe, expect, it, vi } from "vitest";

const returningMock = vi.fn();
const onConflictDoUpdateMock = vi.fn(() => ({ returning: returningMock }));
const valuesMock = vi.fn(() => ({
  onConflictDoUpdate: onConflictDoUpdateMock,
  returning: returningMock,
}));
const insertMock = vi.fn(() => ({ values: valuesMock }));

const whereUpdateReturningMock = vi.fn();
const whereMock = vi.fn(() => ({ returning: whereUpdateReturningMock }));
const setMock = vi.fn(() => ({ where: whereMock }));
const updateMock = vi.fn(() => ({ set: setMock }));

vi.mock("@/db", () => ({
  db: {
    insert: insertMock,
    update: updateMock,
  },
}));

const { createReservation, cancelReservation } = await import(
  "@/lib/reservations"
);

describe("createReservation", () => {
  it("upserts the customer by email and inserts a reservation for them", async () => {
    returningMock
      .mockResolvedValueOnce([{ id: 42, name: "Ada", email: "ada@example.com" }])
      .mockResolvedValueOnce([
        { id: 7, restaurantId: 1, customerId: 42, partySize: 2 },
      ]);

    const reservation = await createReservation({
      restaurantId: 1,
      customerName: "Ada",
      customerEmail: "ada@example.com",
      partySize: 2,
      reservationTime: new Date("2024-01-01T19:00:00.000Z"),
    });

    expect(insertMock).toHaveBeenCalledTimes(2);
    expect(onConflictDoUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({ set: { name: "Ada" } }),
    );
    expect(reservation).toEqual(
      expect.objectContaining({ id: 7, customerId: 42 }),
    );
  });
});

describe("cancelReservation", () => {
  it("marks the reservation as cancelled", async () => {
    whereUpdateReturningMock.mockResolvedValueOnce([
      { id: 7, status: "cancelled" },
    ]);

    const reservation = await cancelReservation(7);

    expect(setMock).toHaveBeenCalledWith({ status: "cancelled" });
    expect(reservation).toEqual({ id: 7, status: "cancelled" });
  });
});
