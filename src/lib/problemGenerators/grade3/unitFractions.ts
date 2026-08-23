import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const unitFractions: ProblemGenerator = {
  skillSlug: "g3-unit-fractions",
  generate() {
    const denominator = randInt(2, 8);

    return {
      problemData: {
        instruction: `A shape is split into ${denominator} equal parts, and 1 part is shaded. What fraction of the shape is shaded?`,
      },
      answerType: "fraction",
      correctAnswer: { type: "fraction", value: { numerator: 1, denominator }, requireSimplified: false },
      hintLadder: [
        `The denominator (bottom number) is how many equal parts the whole is split into.`,
        `Since 1 part out of ${denominator} is shaded, the fraction is 1/${denominator}.`,
      ],
      explanation: `1 out of ${denominator} equal parts is 1/${denominator}.`,
    };
  },
};
