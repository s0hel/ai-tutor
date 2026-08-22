import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const decimalFractionConvert: ProblemGenerator = {
  skillSlug: "decimal-fraction-convert",
  generate(level) {
    const denominator = choice(level < 5 ? [10] : [10, 100]);
    const numerator = randInt(1, denominator - 1);
    const decimalValue = numerator / denominator;
    const decimalText = decimalValue.toFixed(denominator === 100 ? 2 : 1);

    return {
      problemData: { numerator, denominator },
      answerType: "decimal",
      correctAnswer: { type: "decimal", value: decimalValue },
      hintLadder: [
        `A fraction over ${denominator} converts directly to a decimal with ${denominator === 100 ? "two" : "one"} digit${denominator === 100 ? "s" : ""} after the point.`,
        `${numerator}/${denominator} = ${decimalText}.`,
      ],
      explanation: `${numerator}/${denominator} = ${decimalText}.`,
    };
  },
};
