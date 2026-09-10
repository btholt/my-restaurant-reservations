import { z } from "zod";

export const createReservationSchema = z.object({
  restaurantId: z.coerce.number().int().positive(),
  customerName: z.string().min(1, "Name is required").max(256),
  customerEmail: z.string().email("A valid email is required"),
  partySize: z.coerce.number().int().min(1).max(20),
  reservationTime: z.coerce.date(),
  notes: z.string().max(1000).optional(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
