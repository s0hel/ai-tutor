import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const fractionAddLike: ProblemGenerator = {
  skillSlug: "fraction-add-like",
  generate(level) {
    const d = randInt(3, level < 5 ? 8 : 12);
    const n1 = randInt(1, d - 2);
    const n2 = randInt(1, d - n1 - 1 > 0 ? d - n1 - 1 : d - 1);
    const numeratorSum = n1 + n2;

    return {
      problemData: { a: { numerator: n1, denominator: d }, b: { numerator: n2, denominator: d }, op: "add" },
      answerType: "fraction",
      correctAnswer: { type: "fraction", value: { numerator: numeratorSum, denominator: d }, requireSimplified: false },
      hintLadder: [
        `The denominators already match, so you only need to add the top numbers.`,
        `${n1} + ${n2} = ${numeratorSum}, keep the denominator ${d}.`,
      ],
      explanation: `${n1}/${d} + ${n2}/${d} = ${numeratorSum}/${d}.`,
    };
  },
};
