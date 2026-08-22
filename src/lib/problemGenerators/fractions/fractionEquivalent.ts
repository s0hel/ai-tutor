import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const fractionEquivalent: ProblemGenerator = {
  skillSlug: "fraction-equivalent",
  generate(level) {
    const d = randInt(2, level < 5 ? 6 : 9);
    const n = randInt(1, d - 1);
    const scale = randInt(2, level < 5 ? 3 : 6);
    const targetDenominator = d * scale;

    return {
      problemData: { numerator: n, denominator: d, targetDenominator },
      answerType: "fraction",
      correctAnswer: { type: "fraction", value: { numerator: n * scale, denominator: targetDenominator }, requireSimplified: false },
      hintLadder: [
        `What do you multiply ${d} by to get ${targetDenominator}?`,
        `${d} × ${scale} = ${targetDenominator}, so multiply the top number by ${scale} too: ${n} × ${scale} = ${n * scale}.`,
      ],
      explanation: `${n}/${d} = ${n * scale}/${targetDenominator}.`,
    };
  },
};
