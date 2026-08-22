import { db } from "./db";
import type { Attempt, Badge, Family, Parent, ParentInvite, Profile, SkillState, Subject } from "./types";

export function listProfiles(familyId: number): Profile[] {
  return db
    .prepare("SELECT * FROM profiles WHERE familyId = ? ORDER BY createdAt ASC")
    .all(familyId) as Profile[];
}

export function getProfileForFamily(id: number, familyId: number): Profile | undefined {
  return db.prepare("SELECT * FROM profiles WHERE id = ? AND familyId = ?").get(id, familyId) as
    | Profile
    | undefined;
}

export function createProfile(
  familyId: number,
  name: string,
  age: number,
  avatarKey: string
): Profile {
  const info = db
    .prepare("INSERT INTO profiles (familyId, name, age, avatarKey) VALUES (?, ?, ?, ?)")
    .run(familyId, name, age, avatarKey);
  return db.prepare("SELECT * FROM profiles WHERE id = ?").get(info.lastInsertRowid) as Profile;
}

export function deleteProfile(id: number, familyId: number): void {
  db.prepare("DELETE FROM profiles WHERE id = ? AND familyId = ?").run(id, familyId);
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

export function createFamily(): Family {
  const info = db.prepare("INSERT INTO families DEFAULT VALUES").run();
  return db.prepare("SELECT * FROM families WHERE id = ?").get(info.lastInsertRowid) as Family;
}

export function getParentByGoogleSub(googleSub: string): Parent | undefined {
  return db.prepare("SELECT * FROM parents WHERE googleSub = ?").get(googleSub) as
    | Parent
    | undefined;
}

export function createParent(
  familyId: number,
  googleSub: string,
  email: string,
  name: string | null
): Parent {
  const info = db
    .prepare("INSERT INTO parents (familyId, googleSub, email, name) VALUES (?, ?, ?, ?)")
    .run(familyId, googleSub, email, name);
  return db.prepare("SELECT * FROM parents WHERE id = ?").get(info.lastInsertRowid) as Parent;
}

export function createInvite(familyId: number, email: string, invitedByParentId: number): ParentInvite {
  const info = db
    .prepare("INSERT INTO parent_invites (familyId, email, invitedByParentId) VALUES (?, ?, ?)")
    .run(familyId, email, invitedByParentId);
  return db
    .prepare("SELECT * FROM parent_invites WHERE id = ?")
    .get(info.lastInsertRowid) as ParentInvite;
}

export function listInvitesForFamily(familyId: number): ParentInvite[] {
  return db
    .prepare("SELECT * FROM parent_invites WHERE familyId = ? ORDER BY createdAt ASC")
    .all(familyId) as ParentInvite[];
}

export function consumeInviteForEmail(email: string): ParentInvite | undefined {
  const invite = db
    .prepare("SELECT * FROM parent_invites WHERE email = ? ORDER BY createdAt ASC LIMIT 1")
    .get(email) as ParentInvite | undefined;
  if (invite) db.prepare("DELETE FROM parent_invites WHERE id = ?").run(invite.id);
  return invite;
}
