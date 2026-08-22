import { query } from "./db";
import type { Attempt, Badge, Family, Parent, ParentInvite, Profile, SkillState, Subject } from "./types";

const PROFILE_COLS = `id, "familyId", name, age, "avatarKey", "createdAt"::text AS "createdAt"`;
const SKILL_STATE_COLS = `"profileId", subject, topic, level, streak, "updatedAt"::text AS "updatedAt", status, "masteredAt"::text AS "masteredAt", "lastReviewedAt"::text AS "lastReviewedAt", "teachCompletedAt"::text AS "teachCompletedAt"`;
const ATTEMPT_COLS = `id, "profileId", subject, topic, prompt, "kidResponse", correct, "timestamp"::text AS "timestamp"`;
const BADGE_COLS = `id, "profileId", key, "earnedAt"::text AS "earnedAt"`;
const FAMILY_COLS = `id, "createdAt"::text AS "createdAt"`;
const PARENT_COLS = `id, "familyId", "googleSub", email, name, "createdAt"::text AS "createdAt"`;
const INVITE_COLS = `id, "familyId", email, "invitedByParentId", "createdAt"::text AS "createdAt"`;

export async function listProfiles(familyId: number): Promise<Profile[]> {
  return query<Profile>(
    `SELECT ${PROFILE_COLS} FROM profiles WHERE "familyId" = $1 ORDER BY "createdAt" ASC`,
    [familyId]
  );
}

export async function getProfileForFamily(id: number, familyId: number): Promise<Profile | undefined> {
  const rows = await query<Profile>(
    `SELECT ${PROFILE_COLS} FROM profiles WHERE id = $1 AND "familyId" = $2`,
    [id, familyId]
  );
  return rows[0];
}

export async function createProfile(
  familyId: number,
  name: string,
  age: number,
  avatarKey: string
): Promise<Profile> {
  const rows = await query<Profile>(
    `INSERT INTO profiles ("familyId", name, age, "avatarKey") VALUES ($1, $2, $3, $4)
     RETURNING ${PROFILE_COLS}`,
    [familyId, name, age, avatarKey]
  );
  return rows[0];
}

export async function deleteProfile(id: number, familyId: number): Promise<void> {
  await query(`DELETE FROM profiles WHERE id = $1 AND "familyId" = $2`, [id, familyId]);
}

export async function getSkillState(profileId: number, subject: Subject, topic: string): Promise<SkillState> {
  const rows = await query<SkillState>(
    `SELECT ${SKILL_STATE_COLS} FROM skill_state WHERE "profileId" = $1 AND subject = $2 AND topic = $3`,
    [profileId, subject, topic]
  );
  if (rows[0]) return rows[0];
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

export async function listSkillStates(profileId: number, subject?: Subject): Promise<SkillState[]> {
  if (subject) {
    return query<SkillState>(
      `SELECT ${SKILL_STATE_COLS} FROM skill_state WHERE "profileId" = $1 AND subject = $2`,
      [profileId, subject]
    );
  }
  return query<SkillState>(`SELECT ${SKILL_STATE_COLS} FROM skill_state WHERE "profileId" = $1`, [profileId]);
}

export async function upsertSkillState(state: SkillState): Promise<void> {
  await query(
    `INSERT INTO skill_state
       ("profileId", subject, topic, level, streak, "updatedAt", status, "masteredAt", "lastReviewedAt", "teachCompletedAt")
     VALUES
       ($1, $2, $3, $4, $5, now(), $6, $7, $8, $9)
     ON CONFLICT ("profileId", subject, topic)
     DO UPDATE SET
       level = $4,
       streak = $5,
       "updatedAt" = now(),
       status = $6,
       "masteredAt" = $7,
       "lastReviewedAt" = $8,
       "teachCompletedAt" = $9`,
    [
      state.profileId,
      state.subject,
      state.topic,
      state.level,
      state.streak,
      state.status,
      state.masteredAt,
      state.lastReviewedAt,
      state.teachCompletedAt,
    ]
  );
}

export async function logAttempt(a: Omit<Attempt, "id" | "timestamp">): Promise<Attempt> {
  const rows = await query<Attempt>(
    `INSERT INTO attempts ("profileId", subject, topic, prompt, "kidResponse", correct)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING ${ATTEMPT_COLS}`,
    [a.profileId, a.subject, a.topic, a.prompt, a.kidResponse, a.correct]
  );
  return rows[0];
}

export async function recentAttempts(profileId: number, subject: Subject, limit = 8): Promise<Attempt[]> {
  return query<Attempt>(
    `SELECT ${ATTEMPT_COLS} FROM attempts WHERE "profileId" = $1 AND subject = $2 ORDER BY id DESC LIMIT $3`,
    [profileId, subject, limit]
  );
}

export async function allAttempts(profileId: number, limit = 200): Promise<Attempt[]> {
  return query<Attempt>(
    `SELECT ${ATTEMPT_COLS} FROM attempts WHERE "profileId" = $1 ORDER BY id DESC LIMIT $2`,
    [profileId, limit]
  );
}

export async function distinctTopics(profileId: number, subject: Subject): Promise<string[]> {
  const rows = await query<{ topic: string }>(
    `SELECT DISTINCT topic FROM attempts WHERE "profileId" = $1 AND subject = $2`,
    [profileId, subject]
  );
  return rows.map((r) => r.topic);
}

export async function listBadges(profileId: number): Promise<Badge[]> {
  return query<Badge>(`SELECT ${BADGE_COLS} FROM badges WHERE "profileId" = $1 ORDER BY "earnedAt" ASC`, [
    profileId,
  ]);
}

export async function hasBadge(profileId: number, key: string): Promise<boolean> {
  const rows = await query(`SELECT 1 FROM badges WHERE "profileId" = $1 AND key = $2`, [profileId, key]);
  return rows.length > 0;
}

export async function awardBadge(profileId: number, key: string): Promise<boolean> {
  if (await hasBadge(profileId, key)) return false;
  await query(
    `INSERT INTO badges ("profileId", key) VALUES ($1, $2) ON CONFLICT ("profileId", key) DO NOTHING`,
    [profileId, key]
  );
  return true;
}

export async function recordPracticeDay(profileId: number): Promise<void> {
  const day = new Date().toISOString().slice(0, 10);
  await query(
    `INSERT INTO practice_days ("profileId", day) VALUES ($1, $2) ON CONFLICT ("profileId", day) DO NOTHING`,
    [profileId, day]
  );
}

export async function currentDailyStreak(profileId: number): Promise<number> {
  const rows = await query<{ day: string }>(
    `SELECT day FROM practice_days WHERE "profileId" = $1 ORDER BY day DESC`,
    [profileId]
  );
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

export async function recordSkillPracticeDay(profileId: number, subject: Subject, topic: string): Promise<void> {
  const day = new Date().toISOString().slice(0, 10);
  await query(
    `INSERT INTO skill_practice_days ("profileId", subject, topic, day) VALUES ($1, $2, $3, $4)
     ON CONFLICT ("profileId", subject, topic, day) DO NOTHING`,
    [profileId, subject, topic, day]
  );
}

export async function skillPracticeDayCount(profileId: number, subject: Subject, topic: string): Promise<number> {
  const rows = await query<{ c: number }>(
    `SELECT COUNT(DISTINCT day)::int AS c FROM skill_practice_days
     WHERE "profileId" = $1 AND subject = $2 AND topic = $3`,
    [profileId, subject, topic]
  );
  return rows[0].c;
}

export async function attemptStatsForTopic(
  profileId: number,
  subject: Subject,
  topic: string,
  limit = 8
): Promise<{ total: number; correct: number }> {
  const rows = await query<{ correct: number }>(
    `SELECT correct FROM attempts
     WHERE "profileId" = $1 AND subject = $2 AND topic = $3 AND correct IS NOT NULL
     ORDER BY id DESC LIMIT $4`,
    [profileId, subject, topic, limit]
  );
  return { total: rows.length, correct: rows.filter((r) => r.correct === 1).length };
}

export async function createFamily(): Promise<Family> {
  const rows = await query<Family>(`INSERT INTO families DEFAULT VALUES RETURNING ${FAMILY_COLS}`);
  return rows[0];
}

export async function getParentByGoogleSub(googleSub: string): Promise<Parent | undefined> {
  const rows = await query<Parent>(`SELECT ${PARENT_COLS} FROM parents WHERE "googleSub" = $1`, [googleSub]);
  return rows[0];
}

export async function createParent(
  familyId: number,
  googleSub: string,
  email: string,
  name: string | null
): Promise<Parent> {
  const rows = await query<Parent>(
    `INSERT INTO parents ("familyId", "googleSub", email, name) VALUES ($1, $2, $3, $4)
     RETURNING ${PARENT_COLS}`,
    [familyId, googleSub, email, name]
  );
  return rows[0];
}

export async function createInvite(
  familyId: number,
  email: string,
  invitedByParentId: number
): Promise<ParentInvite> {
  const rows = await query<ParentInvite>(
    `INSERT INTO parent_invites ("familyId", email, "invitedByParentId") VALUES ($1, $2, $3)
     RETURNING ${INVITE_COLS}`,
    [familyId, email, invitedByParentId]
  );
  return rows[0];
}

export async function listInvitesForFamily(familyId: number): Promise<ParentInvite[]> {
  return query<ParentInvite>(
    `SELECT ${INVITE_COLS} FROM parent_invites WHERE "familyId" = $1 ORDER BY "createdAt" ASC`,
    [familyId]
  );
}

export async function consumeInviteForEmail(email: string): Promise<ParentInvite | undefined> {
  const rows = await query<ParentInvite>(
    `SELECT ${INVITE_COLS} FROM parent_invites WHERE email = $1 ORDER BY "createdAt" ASC LIMIT 1`,
    [email]
  );
  const invite = rows[0];
  if (invite) await query(`DELETE FROM parent_invites WHERE id = $1`, [invite.id]);
  return invite;
}
