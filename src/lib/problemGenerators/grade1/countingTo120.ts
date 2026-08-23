import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const countingTo120: ProblemGenerator = {
  skillSlug: "g1-counting-to-120",
  generate(level) {
    const start = randInt(1, level < 5 ? 30 : 117);
    const sequence = [start, start + 1, start + 2];
    const missingIndex = randInt(1, 2);
    const answer = sequence[missingIndex];
    const displaySequence = sequence.map((n, i) => (i === missingIndex ? "__" : String(n))).join(", ");

    return {
      problemData: { sequence: displaySequence },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Count forward one at a time to figure out which number is missing.`,
        `The numbers in order are ${sequence.join(", ")}.`,
      ],
      explanation: `The missing number is ${answer}.`,
    };
  },
};
