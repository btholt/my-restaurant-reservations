import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  createReservation,
  getReservationsForRestaurant,
} from "@/lib/reservations";
import { createReservationSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const restaurantId = request.nextUrl.searchParams.get("restaurantId");

  if (!restaurantId) {
    return NextResponse.json(
      { error: "restaurantId query parameter is required" },
      { status: 400 },
    );
  }

  const reservations = await getReservationsForRestaurant(Number(restaurantId));
  return NextResponse.json({ reservations });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = createReservationSchema.parse(body);
    const reservation = await createReservation(input);
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid reservation payload", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 },
    );
  }
}
