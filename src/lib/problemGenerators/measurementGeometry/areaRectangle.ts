import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const areaRectangle: ProblemGenerator = {
  skillSlug: "geo-area-rectangle",
  generate(level) {
    const length = randInt(level < 5 ? 3 : 8, level < 5 ? 12 : 30);
    const width = randInt(level < 5 ? 3 : 6, level < 5 ? 10 : 20);
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
