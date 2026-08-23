import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const equivalentFractions3: ProblemGenerator = {
  skillSlug: "g3-equivalent-fractions-3",
  generate() {
    const denominator = randInt(2, 5);
    const numerator = randInt(1, denominator - 1);

    return {
      problemData: {
        instruction: `${numerator}/${denominator} is equivalent to what fraction if you double both the numerator and denominator?`,
      },
      answerType: "fraction",
      correctAnswer: {
        type: "fraction",
        value: { numerator: numerator * 2, denominator: denominator * 2 },
        requireSimplified: false,
      },
      hintLadder: [
        `Doubling means multiplying both numbers by 2.`,
        `${numerator} × 2 = ${numerator * 2}, and ${denominator} × 2 = ${denominator * 2}.`,
      ],
      explanation: `${numerator}/${denominator} = ${numerator * 2}/${denominator * 2}.`,
    };
  },
};
