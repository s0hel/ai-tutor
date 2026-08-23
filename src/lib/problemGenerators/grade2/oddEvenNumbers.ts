import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const oddEvenNumbers: ProblemGenerator = {
  skillSlug: "g2-odd-even-numbers",
  generate() {
    const n = randInt(1, 99);
    const isEven = n % 2 === 0;

    return {
      problemData: { instruction: `Is the number ${n} odd or even?` },
      answerType: "text",
      correctAnswer: { type: "text", value: isEven ? "even" : "odd" },
      hintLadder: [
        `Look at the last digit — even numbers end in 0, 2, 4, 6, or 8.`,
        `${n} ends in ${n % 10}, which is ${isEven ? "even" : "odd"}.`,
      ],
      explanation: `${n} is ${isEven ? "even" : "odd"}.`,
    };
  },
};
