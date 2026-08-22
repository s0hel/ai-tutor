import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const mult2x2: ProblemGenerator = {
  skillSlug: "mult-2digit-2digit",
  generate(level) {
    const a = randInt(level < 5 ? 11 : 25, level < 5 ? 40 : 99);
    const b = randInt(level < 5 ? 11 : 20, level < 5 ? 30 : 99);
    const answer = a * b;
    const bTens = Math.floor(b / 10) * 10;
    const bOnes = b % 10;
    return {
      problemData: { a, b, op: "multiply" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Split ${b} into ${bTens} and ${bOnes}, then multiply ${a} by each part.`,
        `${a} × ${bTens} = ${a * bTens}, and ${a} × ${bOnes} = ${a * bOnes}. Add those two results together.`,
      ],
      explanation: `${a} × ${b} = ${answer}.`,
    };
  },
};
