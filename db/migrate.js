import { sql } from '../lib/db.js'

try {
  await sql`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      type VARCHAR(30) NOT NULL,
      public BOOLEAN NOT NULL,
      actor JSONB NOT NULL,
      repo JSONB NOT NULL,
      payload JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `
} finally {
  await sql.end({ timeout: 5 })
}
