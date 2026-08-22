import { db } from "./db";
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

export function getPendingProblem(
  profileId: number,
  subject: Subject,
  topic: string
): PendingProblem | undefined {
  const row = db
    .prepare(
      "SELECT problemData, answerType, correctAnswer, hintLadder, explanation, attemptCount FROM pending_problems WHERE profileId = ? AND subject = ? AND topic = ?"
    )
    .get(profileId, subject, topic) as PendingProblemRow | undefined;
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

export function savePendingProblem(
  profileId: number,
  subject: Subject,
  topic: string,
  problem: GeneratedProblem
): void {
  db.prepare(
    `INSERT INTO pending_problems
       (profileId, subject, topic, problemData, answerType, correctAnswer, hintLadder, explanation, attemptCount, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, datetime('now'))
     ON CONFLICT(profileId, subject, topic) DO UPDATE SET
       problemData = excluded.problemData,
       answerType = excluded.answerType,
       correctAnswer = excluded.correctAnswer,
       hintLadder = excluded.hintLadder,
       explanation = excluded.explanation,
       attemptCount = 0,
       createdAt = datetime('now')`
  ).run(
    profileId,
    subject,
    topic,
    JSON.stringify(problem.problemData),
    problem.answerType,
    JSON.stringify(problem.correctAnswer),
    JSON.stringify(problem.hintLadder),
    problem.explanation
  );
}

export function incrementPendingAttempt(profileId: number, subject: Subject, topic: string): void {
  db.prepare(
    "UPDATE pending_problems SET attemptCount = attemptCount + 1 WHERE profileId = ? AND subject = ? AND topic = ?"
  ).run(profileId, subject, topic);
}

export function clearPendingProblem(profileId: number, subject: Subject, topic: string): void {
  db.prepare("DELETE FROM pending_problems WHERE profileId = ? AND subject = ? AND topic = ?").run(
    profileId,
    subject,
    topic
  );
}
