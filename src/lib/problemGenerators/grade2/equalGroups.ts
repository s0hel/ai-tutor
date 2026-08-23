import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const ITEMS = ["stickers", "cookies", "marbles", "toy cars"] as const;

export const equalGroups: ProblemGenerator = {
  skillSlug: "g2-equal-groups",
  generate() {
    const groups = randInt(2, 6);
    const size = randInt(2, 8);
    const item = choice(ITEMS);
    const answer = groups * size;

    return {
      problemData: { instruction: `There are ${groups} groups of ${item}, with ${size} ${item} in each group. How many ${item} are there in total?` },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Add ${size} together ${groups} times.`,
        `${Array.from({ length: groups }, () => size).join(" + ")} = ${answer}.`,
      ],
      explanation: `${groups} groups of ${size} = ${answer} ${item}.`,
    };
  },
};
