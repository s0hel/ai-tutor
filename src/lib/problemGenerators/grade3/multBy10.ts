import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const multBy10: ProblemGenerator = {
  skillSlug: "g3-mult-by-10",
  generate(level) {
    const a = randInt(2, level < 5 ? 20 : 99);
    const answer = a * 10;

    return {
      problemData: { a, b: 10, op: "multiply" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Multiplying by 10 shifts every digit one place to the left.`,
        `Just add a zero to the end of ${a}.`,
      ],
      explanation: `${a} × 10 = ${answer}.`,
    };
  },
};
