import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const OBJECTS = ["crayon", "paperclip", "toy car", "eraser", "marker"] as const;

export const measureLengthUnits: ProblemGenerator = {
  skillSlug: "g2-measure-length-units",
  generate() {
    const object = choice(OBJECTS);
    const inches = randInt(2, 12);

    return {
      problemData: {
        instruction: `A ${object} is lined up starting at 0 on a ruler, and its other end lines up exactly with the ${inches}-inch mark. How many inches long is the ${object}?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: inches },
      hintLadder: [
        `The length is the mark where the object ends, since it starts at 0.`,
        `The ${object} ends at the ${inches}-inch mark.`,
      ],
      explanation: `The ${object} is ${inches} inches long.`,
    };
  },
};
