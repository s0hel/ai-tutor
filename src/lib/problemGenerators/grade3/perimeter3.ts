import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const perimeter3: ProblemGenerator = {
  skillSlug: "g3-perimeter-3",
  generate() {
    const length = randInt(2, 12);
    const width = randInt(2, 10);
    const answer = 2 * (length + width);

    return {
      problemData: { length, width },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Perimeter is the total distance around all four sides.`,
        `2 × (${length} + ${width}) = ${answer}.`,
      ],
      explanation: `Perimeter = 2 × (${length} + ${width}) = ${answer} units.`,
    };
  },
};
