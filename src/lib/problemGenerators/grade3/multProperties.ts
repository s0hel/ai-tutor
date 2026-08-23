import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const multProperties: ProblemGenerator = {
  skillSlug: "g3-mult-properties",
  generate() {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const answer = a * b;

    return {
      problemData: { instruction: `If ${a} × ${b} = ${answer}, what is ${b} × ${a}?` },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Multiplication lets you swap the order of the numbers — the answer stays the same.`,
        `${b} × ${a} is the same as ${a} × ${b}, which is ${answer}.`,
      ],
      explanation: `${b} × ${a} = ${answer}, the same as ${a} × ${b}.`,
    };
  },
};
