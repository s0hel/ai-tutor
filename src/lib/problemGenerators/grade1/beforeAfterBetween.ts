import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const beforeAfterBetween: ProblemGenerator = {
  skillSlug: "g1-before-after-between",
  generate(level) {
    const max = level < 5 ? 20 : 100;
    const kind = choice(["before", "after", "between"] as const);

    if (kind === "between") {
      const low = randInt(2, max - 2);
      return {
        problemData: { low, high: low + 2 },
        answerType: "integer",
        correctAnswer: { type: "integer", value: low + 1 },
        hintLadder: [
          `Count forward from ${low} — what's the very next number?`,
          `${low}, ${low + 1}, ${low + 2} — the middle number is ${low + 1}.`,
        ],
        explanation: `The number between ${low} and ${low + 2} is ${low + 1}.`,
      };
    }

    const n = randInt(2, max - 1);
    const answer = kind === "before" ? n - 1 : n + 1;
    return {
      problemData: { n, kind },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        kind === "before" ? `Count backward one step from ${n}.` : `Count forward one step from ${n}.`,
        `The number ${kind === "before" ? "right before" : "right after"} ${n} is ${answer}.`,
      ],
      explanation: `The number ${kind === "before" ? "before" : "after"} ${n} is ${answer}.`,
    };
  },
};
