import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const ITEMS = ["cookies", "stickers", "marbles", "crayons"] as const;
const NAMES = ["Sam", "Mia", "Leo", "Ava", "Ben", "Zoe"] as const;

export const divWordProblems3: ProblemGenerator = {
  skillSlug: "g3-div-word-problems-3",
  generate(level) {
    const groups = randInt(2, level < 5 ? 6 : 10);
    const perGroup = randInt(2, level < 5 ? 6 : 9);
    const total = groups * perGroup;
    const item = choice(ITEMS);
    const name = choice(NAMES);

    return {
      problemData: {
        instruction: `${name} has ${total} ${item} and shares them equally among ${groups} friends. How many ${item} does each friend get?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: perGroup },
      hintLadder: [
        `Divide the total by the number of friends.`,
        `${total} ÷ ${groups} = ${perGroup}.`,
      ],
      explanation: `${total} ÷ ${groups} = ${perGroup} ${item} each.`,
    };
  },
};
