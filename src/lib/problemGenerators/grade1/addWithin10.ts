import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const addWithin10: ProblemGenerator = {
  skillSlug: "g1-add-within-10",
  generate(level) {
    const a = randInt(level < 5 ? 1 : 3, level < 5 ? 5 : 7);
    const b = randInt(1, 10 - a);
    const answer = a + b;

    return {
      problemData: { a, b, op: "add" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Start at ${a} and count on ${b} more.`,
        `${a}, then ${Array.from({ length: b }, (_, i) => a + i + 1).join(", ")}.`,
      ],
      explanation: `${a} + ${b} = ${answer}.`,
    };
  },
};
