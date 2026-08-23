import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const expandedForm: ProblemGenerator = {
  skillSlug: "g2-expanded-form",
  generate() {
    const hundreds = randInt(1, 9);
    const tens = randInt(0, 9);
    const ones = randInt(0, 9);
    const n = hundreds * 100 + tens * 10 + ones;
    const place = choice(["hundreds", "tens", "ones"] as const);
    const answer = place === "hundreds" ? hundreds * 100 : place === "tens" ? tens * 10 : ones;

    return {
      problemData: {
        instruction: `In the number ${n}, what is the value of the digit in the ${place} place? (For example, in 352, the value of the hundreds digit is 300.)`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `${n} in expanded form is ${hundreds * 100} + ${tens * 10} + ${ones}.`,
        `The ${place} part of that expanded form is ${answer}.`,
      ],
      explanation: `The value of the ${place} digit in ${n} is ${answer}.`,
    };
  },
};
