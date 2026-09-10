import { NextResponse } from "next/server";
import { getRestaurants } from "@/lib/reservations";

export async function GET() {
  const restaurants = await getRestaurants();
  return NextResponse.json({ restaurants });
}
