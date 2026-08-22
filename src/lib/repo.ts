import { db } from "./db";
import type { Attempt, Badge, Profile, SkillState, Subject } from "./types";

export function listProfiles(): Profile[] {
  return db.prepare("SELECT * FROM profiles ORDER BY createdAt ASC").all() as Profile[];
}

export function getProfile(id: number): Profile | undefined {
  return db.prepare("SELECT * FROM profiles WHERE id = ?").get(id) as Profile | undefined;
}

export function createProfile(name: string, age: number, avatarKey: string): Profile {
  const info = db
    .prepare("INSERT INTO profiles (name, age, avatarKey) VALUES (?, ?, ?)")
    .run(name, age, avatarKey);
  return getProfile(Number(info.lastInsertRowid))!;
}

export function deleteProfile(id: number): void {
  db.prepare("DELETE FROM profiles WHERE id = ?").run(id);
}

export function getSkillState(profileId: number, subject: Subject, topic: string): SkillState {
  const row = db
    .prepare("SELECT * FROM skill_state WHERE profileId = ? AND subject = ? AND topic = ?")
    .get(profileId, subject, topic) as SkillState | undefined;
  if (row) return row;
  return {
    profileId,
    subject,
    topic,
    level: 1,
    streak: 0,
    updatedAt: new Date().toISOString(),
    status: "not_started",
    masteredAt: null,
    lastReviewedAt: null,
    teachCompletedAt: null,
  };
}

export function listSkillStates(profileId: number, subject?: Subject): SkillState[] {
  if (subject) {
    return db
      .prepare("SELECT * FROM skill_state WHERE profileId = ? AND subject = ?")
      .all(profileId, subject) as SkillState[];
  }
  return db.prepare("SELECT * FROM skill_state WHERE profileId = ?").all(profileId) as SkillState[];
}

export function upsertSkillState(state: SkillState): void {
  db.prepare(
    `INSERT INTO skill_state
       (profileId, subject, topic, level, streak, updatedAt, status, masteredAt, lastReviewedAt, teachCompletedAt)
     VALUES
       (@profileId, @subject, @topic, @level, @streak, datetime('now'), @status, @masteredAt, @lastReviewedAt, @teachCompletedAt)
     ON CONFLICT(profileId, subject, topic)
     DO UPDATE SET
       level = @level,
       streak = @streak,
       updatedAt = datetime('now'),
       status = @status,
       masteredAt = @masteredAt,
       lastReviewedAt = @lastReviewedAt,
       teachCompletedAt = @teachCompletedAt`
  ).run(state);
}

export function logAttempt(a: Omit<Attempt, "id" | "timestamp">): Attempt {
  const info = db
    .prepare(
      `INSERT INTO attempts (profileId, subject, topic, prompt, kidResponse, correct)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(a.profileId, a.subject, a.topic, a.prompt, a.kidResponse, a.correct);
  return db.prepare("SELECT * FROM attempts WHERE id = ?").get(info.lastInsertRowid) as Attempt;
}

export function recentAttempts(profileId: number, subject: Subject, limit = 8): Attempt[] {
  return db
    .prepare(
      "SELECT * FROM attempts WHERE profileId = ? AND subject = ? ORDER BY id DESC LIMIT ?"
    )
    .all(profileId, subject, limit) as Attempt[];
}

export function allAttempts(profileId: number, limit = 200): Attempt[] {
  return db
    .prepare("SELECT * FROM attempts WHERE profileId = ? ORDER BY id DESC LIMIT ?")
    .all(profileId, limit) as Attempt[];
}

export function distinctTopics(profileId: number, subject: Subject): string[] {
  const rows = db
    .prepare("SELECT DISTINCT topic FROM attempts WHERE profileId = ? AND subject = ?")
    .all(profileId, subject) as { topic: string }[];
  return rows.map((r) => r.topic);
}

export function listBadges(profileId: number): Badge[] {
  return db
    .prepare("SELECT * FROM badges WHERE profileId = ? ORDER BY earnedAt ASC")
    .all(profileId) as Badge[];
}

export function hasBadge(profileId: number, key: string): boolean {
  return !!db
    .prepare("SELECT 1 FROM badges WHERE profileId = ? AND key = ?")
    .get(profileId, key);
}

export function awardBadge(profileId: number, key: string): boolean {
  if (hasBadge(profileId, key)) return false;
  db.prepare("INSERT OR IGNORE INTO badges (profileId, key) VALUES (?, ?)").run(profileId, key);
  return true;
}

export function recordPracticeDay(profileId: number): void {
  const day = new Date().toISOString().slice(0, 10);
  db.prepare("INSERT OR IGNORE INTO practice_days (profileId, day) VALUES (?, ?)").run(
    profileId,
    day
  );
}

export function currentDailyStreak(profileId: number): number {
  const rows = db
    .prepare("SELECT day FROM practice_days WHERE profileId = ? ORDER BY day DESC")
    .all(profileId) as { day: string }[];
  if (rows.length === 0) return 0;
  let streak = 0;
  const cursor = new Date();
  for (let i = 0; i < rows.length; i++) {
    const expected = cursor.toISOString().slice(0, 10);
    if (rows[i].day === expected) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (rows[i].day === yesterday.toISOString().slice(0, 10)) {
        streak++;
        cursor.setDate(cursor.getDate() - 2);
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return streak;
}

export function recordSkillPracticeDay(profileId: number, subject: Subject, topic: string): void {
  const day = new Date().toISOString().slice(0, 10);
  db.prepare(
    "INSERT OR IGNORE INTO skill_practice_days (profileId, subject, topic, day) VALUES (?, ?, ?, ?)"
  ).run(profileId, subject, topic, day);
}

export function skillPracticeDayCount(profileId: number, subject: Subject, topic: string): number {
  const row = db
    .prepare(
      "SELECT COUNT(DISTINCT day) AS c FROM skill_practice_days WHERE profileId = ? AND subject = ? AND topic = ?"
    )
    .get(profileId, subject, topic) as { c: number };
  return row.c;
}

export function attemptStatsForTopic(
  profileId: number,
  subject: Subject,
  topic: string,
  limit = 8
): { total: number; correct: number } {
  const rows = db
    .prepare(
      `SELECT correct FROM attempts
       WHERE profileId = ? AND subject = ? AND topic = ? AND correct IS NOT NULL
       ORDER BY id DESC LIMIT ?`
    )
    .all(profileId, subject, topic, limit) as { correct: number }[];
  return { total: rows.length, correct: rows.filter((r) => r.correct === 1).length };
}

export function getParentSettings(): { pinHash: string; sessionSecret: string } | undefined {
  return db.prepare("SELECT pinHash, sessionSecret FROM parent_settings WHERE id = 1").get() as
    | { pinHash: string; sessionSecret: string }
    | undefined;
}

export function setParentSettings(pinHash: string, sessionSecret: string): void {
  db.prepare(
    `INSERT INTO parent_settings (id, pinHash, sessionSecret) VALUES (1, ?, ?)
     ON CONFLICT(id) DO UPDATE SET pinHash = excluded.pinHash, sessionSecret = excluded.sessionSecret`
  ).run(pinHash, sessionSecret);
}
