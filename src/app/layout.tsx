import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Restaurant Reservations",
  description: "Find a table and book a reservation at your favorite restaurant.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-black/10 px-6 py-4 dark:border-white/10">
          <Link href="/" className="text-lg font-semibold">
            My Restaurant Reservations
          </Link>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
        <footer className="border-t border-black/10 px-6 py-4 text-sm text-black/60 dark:border-white/10 dark:text-white/60">
          Book a table in minutes.
        </footer>
      </body>
    </html>
  );
}
