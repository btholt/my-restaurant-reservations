# My Restaurant Reservations

A restaurant reservation platform built with [Next.js](https://nextjs.org),
TypeScript, [Drizzle ORM](https://orm.drizzle.team), and PostgreSQL.

## Features

- Browse restaurants and view their details
- Reserve a table with a simple booking form
- View reservations for a restaurant
- REST API routes backed by a typed Drizzle schema

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Drizzle ORM** for typed SQL against **PostgreSQL**
- **Tailwind CSS** for styling
- **Zod** for request validation

## Project structure

```
src/
  app/                # Next.js App Router routes
    api/               # REST API route handlers
    restaurants/[id]/  # Restaurant detail + reservation form
    reservations/      # Reservations listing
  components/          # Shared React components
  db/                  # Drizzle schema, client, and seed script
  lib/                 # Data access + validation helpers
drizzle.config.ts       # Drizzle Kit configuration
```

## Getting started

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to point at a
   Postgres database.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Generate and run migrations:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. Seed some sample data:

   ```bash
   npm run db:seed
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.
