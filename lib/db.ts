import "server-only";

import postgres from "postgres";

type SqlClient = ReturnType<typeof postgres>;

const globalForDatabase = globalThis as typeof globalThis & {
  muzeSql?: SqlClient;
};

export function getDatabase(): SqlClient | null {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) return null;

  globalForDatabase.muzeSql ??= postgres(databaseUrl, {
    // Vercel functions should use the provider's pooled URL. One connection
    // per warm instance avoids exhausting a small Postgres connection limit.
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    // Compatible with transaction-mode poolers such as PgBouncer.
    prepare: false,
  });

  return globalForDatabase.muzeSql;
}
