import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const subtractWithin20: ProblemGenerator = {
  skillSlug: "g1-subtract-within-20",
  generate(level) {
    const a = randInt(level < 5 ? 5 : 12, 20);
    const b = randInt(1, Math.min(a, level < 5 ? 5 : 9));
    const answer = a - b;

    return {
      problemData: { a, b, op: "subtract" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Start at ${a} and count backward ${b} times.`,
        `${a}, ${Array.from({ length: b }, (_, i) => a - i - 1).join(", ")}.`,
      ],
      explanation: `${a} - ${b} = ${answer}.`,
    };
  },
};
