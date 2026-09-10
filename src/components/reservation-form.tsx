"use client";

import { useState } from "react";

export function ReservationForm({ restaurantId }: { restaurantId: number }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId,
          customerName: formData.get("customerName"),
          customerEmail: formData.get("customerEmail"),
          partySize: formData.get("partySize"),
          reservationTime: formData.get("reservationTime"),
          notes: formData.get("notes"),
        }),
      });

      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
      <label className="flex flex-col gap-1 text-sm">
        Name
        <input
          name="customerName"
          type="text"
          required
          className="rounded border border-black/20 px-2 py-1 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          name="customerEmail"
          type="email"
          required
          className="rounded border border-black/20 px-2 py-1 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Party size
        <input
          name="partySize"
          type="number"
          min={1}
          max={20}
          defaultValue={2}
          required
          className="rounded border border-black/20 px-2 py-1 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Date &amp; time
        <input
          name="reservationTime"
          type="datetime-local"
          required
          className="rounded border border-black/20 px-2 py-1 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Notes
        <textarea
          name="notes"
          className="rounded border border-black/20 px-2 py-1 dark:border-white/20"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded bg-black px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {status === "submitting" ? "Booking..." : "Reserve a table"}
      </button>
      {status === "success" ? (
        <p className="text-sm text-green-600">Reservation requested!</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
