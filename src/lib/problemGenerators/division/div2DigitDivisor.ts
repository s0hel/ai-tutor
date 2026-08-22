import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const div2DigitDivisor: ProblemGenerator = {
  skillSlug: "div-2digit-divisor",
  generate(level) {
    const divisor = randInt(level < 5 ? 10 : 25, level < 5 ? 24 : 50);
    const quotient = randInt(level < 5 ? 3 : 10, level < 5 ? 9 : 30);
    const dividend = divisor * quotient;
    return {
      problemData: { a: dividend, b: divisor, op: "divide" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: quotient },
      hintLadder: [
        `How many groups of ${divisor} fit inside ${dividend}? Try estimating with a nearby round number first.`,
        `${divisor} × ${quotient} = ${dividend}, so that's your answer.`,
      ],
      explanation: `${dividend} ÷ ${divisor} = ${quotient}.`,
    };
  },
};
