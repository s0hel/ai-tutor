import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const partitionShapesFractions3: ProblemGenerator = {
  skillSlug: "g3-partition-shapes-fractions-3",
  generate() {
    const parts = randInt(2, 8);
    const taken = randInt(1, parts - 1);

    return {
      problemData: {
        instruction: `A rectangle is split into ${parts} equal-area parts. If you take ${taken} of those parts, what fraction of the whole rectangle is that?`,
      },
      answerType: "fraction",
      correctAnswer: { type: "fraction", value: { numerator: taken, denominator: parts }, requireSimplified: false },
      hintLadder: [
        `The denominator is the total number of equal parts, and the numerator is how many parts you took.`,
        `${taken} out of ${parts} equal parts is ${taken}/${parts}.`,
      ],
      explanation: `${taken} out of ${parts} equal parts is ${taken}/${parts} of the whole.`,
    };
  },
};
