import { query } from "./db";
import type { Subject } from "./types";
import type { GeneratedProblem } from "./problemGenerators/types";

export interface PendingProblem extends GeneratedProblem {
  attemptCount: number;
}

interface PendingProblemRow {
  problemData: string;
  answerType: string;
  correctAnswer: string;
  hintLadder: string;
  explanation: string;
  attemptCount: number;
}

export async function getPendingProblem(
  profileId: number,
  subject: Subject,
  topic: string
): Promise<PendingProblem | undefined> {
  const rows = await query<PendingProblemRow>(
    `SELECT "problemData", "answerType", "correctAnswer", "hintLadder", explanation, "attemptCount"
     FROM pending_problems WHERE "profileId" = $1 AND subject = $2 AND topic = $3`,
    [profileId, subject, topic]
  );
  const row = rows[0];
  if (!row) return undefined;
  return {
    problemData: JSON.parse(row.problemData),
    answerType: row.answerType as GeneratedProblem["answerType"],
    correctAnswer: JSON.parse(row.correctAnswer),
    hintLadder: JSON.parse(row.hintLadder),
    explanation: row.explanation,
    attemptCount: row.attemptCount,
  };
}

export async function savePendingProblem(
  profileId: number,
  subject: Subject,
  topic: string,
  problem: GeneratedProblem
): Promise<void> {
  await query(
    `INSERT INTO pending_problems
       ("profileId", subject, topic, "problemData", "answerType", "correctAnswer", "hintLadder", explanation, "attemptCount", "createdAt")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, now())
     ON CONFLICT ("profileId", subject, topic) DO UPDATE SET
       "problemData" = excluded."problemData",
       "answerType" = excluded."answerType",
       "correctAnswer" = excluded."correctAnswer",
       "hintLadder" = excluded."hintLadder",
       explanation = excluded.explanation,
       "attemptCount" = 0,
       "createdAt" = now()`,
    [
      profileId,
      subject,
      topic,
      JSON.stringify(problem.problemData),
      problem.answerType,
      JSON.stringify(problem.correctAnswer),
      JSON.stringify(problem.hintLadder),
      problem.explanation,
    ]
  );
}

export async function incrementPendingAttempt(profileId: number, subject: Subject, topic: string): Promise<void> {
  await query(
    `UPDATE pending_problems SET "attemptCount" = "attemptCount" + 1
     WHERE "profileId" = $1 AND subject = $2 AND topic = $3`,
    [profileId, subject, topic]
  );
}

export async function clearPendingProblem(profileId: number, subject: Subject, topic: string): Promise<void> {
  await query(`DELETE FROM pending_problems WHERE "profileId" = $1 AND subject = $2 AND topic = $3`, [
    profileId,
    subject,
    topic,
  ]);
}
