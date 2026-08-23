import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const multFacts: ProblemGenerator = {
  skillSlug: "g3-mult-facts",
  generate(level) {
    const a = randInt(2, level < 5 ? 6 : 10);
    const b = randInt(2, level < 5 ? 6 : 10);
    const answer = a * b;

    return {
      problemData: { a, b, op: "multiply" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Think of this as ${a} groups of ${b}, or skip-count by ${b}, ${a} times.`,
        `${Array.from({ length: a }, (_, i) => (i + 1) * b).join(", ")}.`,
      ],
      explanation: `${a} × ${b} = ${answer}.`,
    };
  },
};
