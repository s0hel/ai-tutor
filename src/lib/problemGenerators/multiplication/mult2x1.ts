import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const mult2x1: ProblemGenerator = {
  skillSlug: "mult-2digit-1digit",
  generate(level) {
    const a = randInt(level < 5 ? 10 : 40, level < 5 ? 49 : 99);
    const b = randInt(2, level < 5 ? 6 : 9);
    const answer = a * b;
    const tens = Math.floor(a / 10) * 10;
    const ones = a % 10;
    return {
      problemData: { a, b, op: "multiply" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Break ${a} into ${tens} and ${ones}, then multiply each part by ${b}.`,
        `${tens} × ${b} = ${tens * b}, and ${ones} × ${b} = ${ones * b}. Add those two results together.`,
      ],
      explanation: `${a} × ${b} = ${answer}.`,
    };
  },
};
