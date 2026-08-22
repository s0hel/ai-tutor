import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const fractionMixedImproper: ProblemGenerator = {
  skillSlug: "fraction-mixed-improper",
  generate(level) {
    const whole = randInt(1, level < 5 ? 4 : 9);
    const d = randInt(2, level < 5 ? 6 : 9);
    const n = randInt(1, d - 1);
    const toImproper = Math.random() < 0.5;
    const improperNumerator = whole * d + n;

    if (toImproper) {
      return {
        problemData: { direction: "mixed-to-improper", whole, numerator: n, denominator: d },
        answerType: "fraction",
        correctAnswer: { type: "fraction", value: { numerator: improperNumerator, denominator: d }, requireSimplified: false },
        hintLadder: [
          `Multiply the whole number ${whole} by the denominator ${d} first.`,
          `${whole} × ${d} = ${whole * d}, then add the numerator ${n}: ${whole * d} + ${n} = ${improperNumerator}. Keep the denominator ${d}.`,
        ],
        explanation: `${whole} ${n}/${d} = ${improperNumerator}/${d}.`,
      };
    }

    return {
      problemData: { direction: "improper-to-mixed", numerator: improperNumerator, denominator: d },
      answerType: "fraction",
      correctAnswer: { type: "fraction", value: { numerator: improperNumerator, denominator: d }, requireSimplified: false },
      hintLadder: [
        `How many whole times does ${d} go into ${improperNumerator}?`,
        `${d} goes into ${improperNumerator} exactly ${whole} whole time(s), with ${n} left over as the new numerator — write it as ${whole} ${n}/${d}.`,
      ],
      explanation: `${improperNumerator}/${d} = ${whole} ${n}/${d}.`,
    };
  },
};
