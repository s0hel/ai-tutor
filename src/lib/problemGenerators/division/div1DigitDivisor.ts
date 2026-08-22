import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const div1DigitDivisor: ProblemGenerator = {
  skillSlug: "div-1digit-divisor",
  generate(level) {
    const divisor = randInt(2, level < 5 ? 6 : 9);
    const quotient = randInt(level < 5 ? 10 : 40, level < 5 ? 49 : 199);
    const dividend = divisor * quotient;
    return {
      problemData: { a: dividend, b: divisor, op: "divide" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: quotient },
      hintLadder: [
        `How many groups of ${divisor} fit inside ${dividend}?`,
        `Try ${divisor} × 10 = ${divisor * 10} as a starting point, then adjust up or down from there.`,
      ],
      explanation: `${dividend} ÷ ${divisor} = ${quotient}.`,
    };
  },
};
