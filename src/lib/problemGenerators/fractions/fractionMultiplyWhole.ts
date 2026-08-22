import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const fractionMultiplyWhole: ProblemGenerator = {
  skillSlug: "fraction-multiply-whole",
  generate(level) {
    const d = randInt(2, level < 5 ? 6 : 9);
    const n = randInt(1, d - 1);
    const whole = randInt(2, level < 5 ? 4 : 8);
    const productNumerator = n * whole;

    return {
      problemData: { numerator: n, denominator: d, whole, op: "multiply" },
      answerType: "fraction",
      correctAnswer: { type: "fraction", value: { numerator: productNumerator, denominator: d }, requireSimplified: false },
      hintLadder: [
        `Multiplying a fraction by a whole number only changes the numerator.`,
        `${n} × ${whole} = ${productNumerator}, keep the denominator ${d}.`,
      ],
      explanation: `${n}/${d} × ${whole} = ${productNumerator}/${d}.`,
    };
  },
};
