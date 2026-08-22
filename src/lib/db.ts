import { Pool, type QueryResultRow } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

declare global {
  var __tutorPool: Pool | undefined;
  var __tutorMigrated: Promise<void> | undefined;
}

function createPool() {
  return new Pool({
    connectionString,
    // Supabase (and most hosted Postgres) require TLS; local/Docker Postgres doesn't.
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });
}

async function migrate(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      "avatarKey" TEXT NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS skill_state (
      "profileId" INTEGER NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT NOT NULL,
      level REAL NOT NULL DEFAULT 1,
      streak INTEGER NOT NULL DEFAULT 0,
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY ("profileId", subject, topic),
      FOREIGN KEY ("profileId") REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attempts (
      id SERIAL PRIMARY KEY,
      "profileId" INTEGER NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT NOT NULL,
      prompt TEXT NOT NULL,
      "kidResponse" TEXT,
      correct INTEGER,
      "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
      FOREIGN KEY ("profileId") REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS badges (
      id SERIAL PRIMARY KEY,
      "profileId" INTEGER NOT NULL,
      key TEXT NOT NULL,
      "earnedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE("profileId", key),
      FOREIGN KEY ("profileId") REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS parent_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      "pinHash" TEXT NOT NULL,
      "sessionSecret" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS families (
      id SERIAL PRIMARY KEY,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS parents (
      id SERIAL PRIMARY KEY,
      "familyId" INTEGER NOT NULL,
      "googleSub" TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      name TEXT,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      FOREIGN KEY ("familyId") REFERENCES families(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS parent_invites (
      id SERIAL PRIMARY KEY,
      "familyId" INTEGER NOT NULL,
      email TEXT NOT NULL,
      "invitedByParentId" INTEGER NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      FOREIGN KEY ("familyId") REFERENCES families(id) ON DELETE CASCADE,
      FOREIGN KEY ("invitedByParentId") REFERENCES parents(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS practice_days (
      "profileId" INTEGER NOT NULL,
      day TEXT NOT NULL,
      PRIMARY KEY ("profileId", day),
      FOREIGN KEY ("profileId") REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pending_problems (
      "profileId" INTEGER NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT NOT NULL,
      "problemData" TEXT NOT NULL,
      "answerType" TEXT NOT NULL,
      "correctAnswer" TEXT NOT NULL,
      "hintLadder" TEXT NOT NULL,
      explanation TEXT NOT NULL,
      "attemptCount" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY ("profileId", subject, topic),
      FOREIGN KEY ("profileId") REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS skill_practice_days (
      "profileId" INTEGER NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT NOT NULL,
      day TEXT NOT NULL,
      PRIMARY KEY ("profileId", subject, topic, day),
      FOREIGN KEY ("profileId") REFERENCES profiles(id) ON DELETE CASCADE
    );

    ALTER TABLE skill_state ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'not_started';
    ALTER TABLE skill_state ADD COLUMN IF NOT EXISTS "masteredAt" TIMESTAMPTZ;
    ALTER TABLE skill_state ADD COLUMN IF NOT EXISTS "lastReviewedAt" TIMESTAMPTZ;
    ALTER TABLE skill_state ADD COLUMN IF NOT EXISTS "teachCompletedAt" TIMESTAMPTZ;
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS "familyId" INTEGER REFERENCES families(id);
  `);
}

export const pool = globalThis.__tutorPool ?? createPool();
export const ready = globalThis.__tutorMigrated ?? migrate(pool);
if (process.env.NODE_ENV !== "production") {
  globalThis.__tutorPool = pool;
  globalThis.__tutorMigrated = ready;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  await ready;
  const result = await pool.query<T>(text, params);
  return result.rows;
}
