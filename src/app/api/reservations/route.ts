import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  createReservation,
  getReservationsForRestaurant,
} from "@/lib/reservations";
import { createReservationSchema } from "@/lib/validation";
import { parsePositiveIntId } from "@/lib/ids";

export async function GET(request: NextRequest) {
  const restaurantIdParam = request.nextUrl.searchParams.get("restaurantId");

  if (!restaurantIdParam) {
    return NextResponse.json(
      { error: "restaurantId query parameter is required" },
      { status: 400 },
    );
  }

  const restaurantId = parsePositiveIntId(restaurantIdParam);

  if (restaurantId === null) {
    return NextResponse.json(
      { error: "restaurantId must be a positive integer" },
      { status: 400 },
    );
  }

  const reservations = await getReservationsForRestaurant(restaurantId);
  return NextResponse.json({ reservations });
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 },
    );
  }

  try {
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
