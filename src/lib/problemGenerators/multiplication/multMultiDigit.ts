import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const multMultiDigit: ProblemGenerator = {
  skillSlug: "mult-multidigit",
  generate(level) {
    const a = randInt(level < 5 ? 100 : 1000, level < 5 ? 999 : 9999);
    const b = randInt(level < 5 ? 11 : 20, level < 5 ? 30 : 99);
    const answer = a * b;
    const bTens = Math.floor(b / 10) * 10;
    const bOnes = b % 10;
    return {
      problemData: { a, b, op: "multiply" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Split ${b} into ${bTens} and ${bOnes}, then multiply ${a} by each part separately.`,
        `${a} × ${bTens} = ${a * bTens}, and ${a} × ${bOnes} = ${a * bOnes}. Add those two results together.`,
      ],
      explanation: `${a} × ${b} = ${answer}.`,
    };
  },
};
