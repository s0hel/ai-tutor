import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const fractionsNumberLine: ProblemGenerator = {
  skillSlug: "g3-fractions-number-line",
  generate() {
    const denominator = randInt(2, 8);
    const numerator = randInt(1, denominator - 1);

    return {
      problemData: {
        instruction: `A number line from 0 to 1 is split into ${denominator} equal parts. What fraction is located ${numerator} part${numerator > 1 ? "s" : ""} from 0?`,
      },
      answerType: "fraction",
      correctAnswer: { type: "fraction", value: { numerator, denominator }, requireSimplified: false },
      hintLadder: [
        `The denominator is the total number of equal parts (${denominator}), and the numerator is how many parts you've counted over.`,
        `${numerator} parts out of ${denominator} equal parts is ${numerator}/${denominator}.`,
      ],
      explanation: `${numerator} parts from 0, out of ${denominator} equal parts, is ${numerator}/${denominator}.`,
    };
  },
};
