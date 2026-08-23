import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const skipCounting100s: ProblemGenerator = {
  skillSlug: "g2-skip-counting-100s",
  generate() {
    const step = choice([5, 10, 100] as const);
    const startMultiple = randInt(0, 8);
    const sequence = [0, 1, 2, 3, 4].map((i) => (startMultiple + i) * step);
    const missingIndex = randInt(2, 4);
    const answer = sequence[missingIndex];
    const displaySequence = sequence.map((n, i) => (i === missingIndex ? "__" : String(n))).join(", ");

    return {
      problemData: { sequence: displaySequence, step },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `This is counting by ${step}s — each number is ${step} more than the last.`,
        `The full sequence is ${sequence.join(", ")}.`,
      ],
      explanation: `Counting by ${step}s, the missing number is ${answer}.`,
    };
  },
};
