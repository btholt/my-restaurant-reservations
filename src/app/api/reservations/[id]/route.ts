import { NextRequest, NextResponse } from "next/server";
import { cancelReservation } from "@/lib/reservations";
import { parsePositiveIntId } from "@/lib/ids";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const reservationId = parsePositiveIntId(id);

  if (reservationId === null) {
    return NextResponse.json(
      { error: "id must be a positive integer" },
      { status: 400 },
    );
  }

  const reservation = await cancelReservation(reservationId);

  if (!reservation) {
    return NextResponse.json(
      { error: "Reservation not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ reservation });
}
