import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const compare3DigitNumbers: ProblemGenerator = {
  skillSlug: "g2-compare-3digit-numbers",
  generate() {
    const a = randInt(100, 999);
    let b = randInt(100, 999);
    while (a === b) b = randInt(100, 999);
    const bigger = Math.max(a, b);

    return {
      problemData: { a, b },
      answerType: "text",
      correctAnswer: { type: "text", value: String(bigger) },
      hintLadder: [
        `Compare the hundreds digit of each number first.`,
        `${bigger} is bigger than ${Math.min(a, b)}.`,
      ],
      explanation: `${bigger} is the bigger number.`,
    };
  },
};
