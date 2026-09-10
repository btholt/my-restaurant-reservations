import { NextRequest, NextResponse } from "next/server";
import { cancelReservation } from "@/lib/reservations";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const reservation = await cancelReservation(Number(id));

  if (!reservation) {
    return NextResponse.json(
      { error: "Reservation not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ reservation });
}
