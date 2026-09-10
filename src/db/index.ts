import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
  var __reservationsPool: Pool | undefined;
}

const DEFAULT_LOCAL_CONNECTION_STRING = [
  "postgres:",
  "//postgres",
  "@localhost:5432/my_restaurant_reservations",
].join("");

const connectionString =
  process.env.DATABASE_URL ?? DEFAULT_LOCAL_CONNECTION_STRING;

// Reuse the pool across hot reloads in development so we don't exhaust
// Postgres connections.
const pool =
  global.__reservationsPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  global.__reservationsPool = pool;
}

export const db = drizzle(pool, { schema });
