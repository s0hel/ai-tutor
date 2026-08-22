import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "tutor.db");

declare global {
  var __tutorDb: Database.Database | undefined;
}

function createDb() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      avatarKey TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS skill_state (
      profileId INTEGER NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT NOT NULL,
      level REAL NOT NULL DEFAULT 1,
      streak INTEGER NOT NULL DEFAULT 0,
      updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (profileId, subject, topic),
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profileId INTEGER NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT NOT NULL,
      prompt TEXT NOT NULL,
      kidResponse TEXT,
      correct INTEGER,
      timestamp TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS badges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profileId INTEGER NOT NULL,
      key TEXT NOT NULL,
      earnedAt TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(profileId, key),
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS parent_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      pinHash TEXT NOT NULL,
      sessionSecret TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS families (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS parents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      familyId INTEGER NOT NULL,
      googleSub TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      name TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (familyId) REFERENCES families(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS parent_invites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      familyId INTEGER NOT NULL,
      email TEXT NOT NULL,
      invitedByParentId INTEGER NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (familyId) REFERENCES families(id) ON DELETE CASCADE,
      FOREIGN KEY (invitedByParentId) REFERENCES parents(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS practice_days (
      profileId INTEGER NOT NULL,
      day TEXT NOT NULL,
      PRIMARY KEY (profileId, day),
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pending_problems (
      profileId INTEGER NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT NOT NULL,
      problemData TEXT NOT NULL,
      answerType TEXT NOT NULL,
      correctAnswer TEXT NOT NULL,
      hintLadder TEXT NOT NULL,
      explanation TEXT NOT NULL,
      attemptCount INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (profileId, subject, topic),
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS skill_practice_days (
      profileId INTEGER NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT NOT NULL,
      day TEXT NOT NULL,
      PRIMARY KEY (profileId, subject, topic, day),
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );
  `);

  function ensureColumn(table: string, column: string, ddl: string) {
    const cols = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
    if (!cols.some((c) => c.name === column)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${ddl}`);
  }
  ensureColumn("skill_state", "status", `status TEXT NOT NULL DEFAULT 'not_started'`);
  ensureColumn("skill_state", "masteredAt", `masteredAt TEXT`);
  ensureColumn("skill_state", "lastReviewedAt", `lastReviewedAt TEXT`);
  ensureColumn("skill_state", "teachCompletedAt", `teachCompletedAt TEXT`);
  ensureColumn("profiles", "familyId", `familyId INTEGER REFERENCES families(id)`);

  return db;
}

export const db = globalThis.__tutorDb ?? createDb();
if (process.env.NODE_ENV !== "production") globalThis.__tutorDb = db;
