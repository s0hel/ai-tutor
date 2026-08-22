import type { FractionValue } from "../fractionMath";

export type AnswerType = "integer" | "decimal" | "fraction" | "text";

export type CanonicalAnswer =
  | { type: "integer"; value: number }
  | { type: "decimal"; value: number }
  | { type: "fraction"; value: FractionValue; requireSimplified: boolean }
  | { type: "text"; value: string; acceptedAliases?: string[] };

export interface GeneratedProblem {
  problemData: Record<string, unknown>;
  answerType: AnswerType;
  correctAnswer: CanonicalAnswer;
  hintLadder: [string, string];
  explanation: string;
}

export interface ProblemGenerator {
  skillSlug: string;
  generate(level: number): GeneratedProblem;
}
