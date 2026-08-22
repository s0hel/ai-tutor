import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const perimeterRectangle: ProblemGenerator = {
  skillSlug: "geo-perimeter-rectangle",
  generate(level) {
    const length = randInt(level < 5 ? 3 : 8, level < 5 ? 12 : 30);
    const width = randInt(level < 5 ? 3 : 6, level < 5 ? 10 : 20);
    const answer = 2 * (length + width);

    return {
      problemData: { length, width },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Perimeter is the total distance around all four sides.`,
        `2 × (${length} + ${width}) = 2 × ${length + width} = ${answer}.`,
      ],
      explanation: `Perimeter = 2 × (${length} + ${width}) = ${answer} units.`,
    };
  },
};
