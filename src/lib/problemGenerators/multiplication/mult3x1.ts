import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const mult3x1: ProblemGenerator = {
  skillSlug: "mult-3digit-1digit",
  generate(level) {
    const a = randInt(level < 5 ? 100 : 400, level < 5 ? 499 : 999);
    const b = randInt(2, level < 5 ? 6 : 9);
    const answer = a * b;
    const hundreds = Math.floor(a / 100) * 100;
    const rest = a - hundreds;
    return {
      problemData: { a, b, op: "multiply" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Break ${a} into ${hundreds} and ${rest}, then multiply each part by ${b}.`,
        `${hundreds} × ${b} = ${hundreds * b}, and ${rest} × ${b} = ${rest * b}. Add those two results together.`,
      ],
      explanation: `${a} × ${b} = ${answer}.`,
    };
  },
};
