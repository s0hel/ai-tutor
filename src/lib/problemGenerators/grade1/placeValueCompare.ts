import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const placeValueCompare: ProblemGenerator = {
  skillSlug: "g1-place-value-compare",
  generate() {
    const a = randInt(10, 99);
    let b = randInt(10, 99);
    while (a === b) b = randInt(10, 99);
    const bigger = Math.max(a, b);

    return {
      problemData: { a, b },
      answerType: "text",
      correctAnswer: { type: "text", value: String(bigger) },
      hintLadder: [
        `Look at the tens digit of each number first — whichever has more tens is bigger.`,
        `${bigger} is bigger than ${Math.min(a, b)}.`,
      ],
      explanation: `${bigger} is the bigger number.`,
    };
  },
};
