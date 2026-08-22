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

    CREATE TABLE IF NOT EXISTS practice_days (
      profileId INTEGER NOT NULL,
      day TEXT NOT NULL,
      PRIMARY KEY (profileId, day),
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );
  `);
  return db;
}

export const db = globalThis.__tutorDb ?? createDb();
if (process.env.NODE_ENV !== "production") globalThis.__tutorDb = db;
