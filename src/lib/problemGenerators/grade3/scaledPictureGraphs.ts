import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const ITEMS = ["apples", "stars", "books", "flowers"] as const;

export const scaledPictureGraphs: ProblemGenerator = {
  skillSlug: "g3-scaled-picture-graphs",
  generate() {
    const scale = choice([2, 5, 10] as const);
    const icons = randInt(2, 8);
    const item = choice(ITEMS);
    const answer = scale * icons;

    return {
      problemData: {
        instruction: `In a picture graph, each ${item.slice(0, -1)} icon stands for ${scale} ${item}. One row has ${icons} icons. How many ${item} does that row represent?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Multiply the number of icons by what each icon is worth.`,
        `${icons} × ${scale} = ${answer}.`,
      ],
      explanation: `${icons} icons × ${scale} each = ${answer} ${item}.`,
    };
  },
};
