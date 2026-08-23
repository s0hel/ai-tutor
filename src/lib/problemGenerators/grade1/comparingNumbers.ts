import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const comparingNumbers: ProblemGenerator = {
  skillSlug: "g1-comparing-numbers",
  generate(level) {
    const max = level < 5 ? 20 : 100;
    const a = randInt(1, max);
    let b = randInt(1, max);
    while (a === b) b = randInt(1, max);
    const bigger = Math.max(a, b);

    return {
      problemData: { a, b },
      answerType: "text",
      correctAnswer: { type: "text", value: String(bigger) },
      hintLadder: [
        `Think about which number comes later when you count up.`,
        `${bigger} is bigger than ${Math.min(a, b)}.`,
      ],
      explanation: `${bigger} is the bigger number.`,
    };
  },
};
