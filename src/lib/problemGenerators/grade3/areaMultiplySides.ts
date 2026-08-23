import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const areaMultiplySides: ProblemGenerator = {
  skillSlug: "g3-area-multiply-sides",
  generate() {
    const length = randInt(2, 12);
    const width = randInt(2, 10);
    const answer = length * width;

    return {
      problemData: { length, width },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Area of a rectangle = length × width.`,
        `${length} × ${width} = ${answer}.`,
      ],
      explanation: `Area = ${length} × ${width} = ${answer} square units.`,
    };
  },
};
