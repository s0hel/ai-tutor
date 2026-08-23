import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const OBJECT_EMOJI = ["🍎", "🍪", "⭐", "🚗", "🎈", "🐟"] as const;

export const countingTo20: ProblemGenerator = {
  skillSlug: "g1-counting-to-20",
  generate(level) {
    const count = randInt(level < 5 ? 3 : 8, level < 5 ? 12 : 20);
    const emoji = choice(OBJECT_EMOJI);
    const objectsDisplay = emoji.repeat(count);

    return {
      problemData: {
        objectsDisplay,
        instruction: `Show the kid this row of objects exactly as given: ${objectsDisplay} — then ask "How many are there?" Do not say or write the total number yourself.`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: count },
      hintLadder: [
        `Try pointing to each one as you count, so you don't count the same one twice or skip one.`,
        `Count them one at a time: 1, 2, 3... all the way to the end.`,
      ],
      explanation: `There are ${count} of them.`,
    };
  },
};
