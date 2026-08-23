import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const divFacts: ProblemGenerator = {
  skillSlug: "g3-div-facts",
  generate(level) {
    const divisor = randInt(2, level < 5 ? 6 : 10);
    const quotient = randInt(2, level < 5 ? 6 : 10);
    const dividend = divisor * quotient;

    return {
      problemData: { a: dividend, b: divisor, op: "divide" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: quotient },
      hintLadder: [
        `Think: what number times ${divisor} equals ${dividend}?`,
        `${divisor} × ${quotient} = ${dividend}.`,
      ],
      explanation: `${dividend} ÷ ${divisor} = ${quotient}.`,
    };
  },
};
