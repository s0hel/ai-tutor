import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const CONTAINERS = ["baskets", "boxes", "bags", "shelves"] as const;
const ITEMS = ["apples", "books", "toy cars", "eggs"] as const;

export const multWordProblems3: ProblemGenerator = {
  skillSlug: "g3-mult-word-problems-3",
  generate(level) {
    const groups = randInt(2, level < 5 ? 6 : 9);
    const size = randInt(2, level < 5 ? 6 : 9);
    const container = choice(CONTAINERS);
    const item = choice(ITEMS);
    const answer = groups * size;

    return {
      problemData: { instruction: `There are ${groups} ${container} with ${size} ${item} in each. How many ${item} are there in total?` },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `This is equal groups — multiply the number of ${container} by the number in each.`,
        `${groups} × ${size} = ${answer}.`,
      ],
      explanation: `${groups} × ${size} = ${answer} ${item}.`,
    };
  },
};
