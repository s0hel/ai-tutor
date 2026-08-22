import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const fractionCompare: ProblemGenerator = {
  skillSlug: "fraction-compare",
  generate(level) {
    const d1 = randInt(2, level < 5 ? 6 : 12);
    const d2 = randInt(2, level < 5 ? 6 : 12);
    const n1 = randInt(1, d1 - 1);
    let n2 = randInt(1, d2 - 1);
    // avoid an equal-fraction case so the question always has one clear larger answer
    while (n1 * d2 === n2 * d1) {
      n2 = randInt(1, d2 - 1);
    }
    const firstIsBigger = n1 * d2 > n2 * d1;
    const answerText = firstIsBigger ? `${n1}/${d1}` : `${n2}/${d2}`;
    const common = d1 * d2;

    return {
      problemData: { a: { numerator: n1, denominator: d1 }, b: { numerator: n2, denominator: d2 } },
      answerType: "text",
      correctAnswer: { type: "text", value: answerText },
      hintLadder: [
        `Rewrite both fractions with the same denominator so you can compare them directly.`,
        `Using ${common} as the common denominator: ${n1}/${d1} = ${n1 * d2}/${common}, and ${n2}/${d2} = ${n2 * d1}/${common}.`,
      ],
      explanation: `${answerText} is bigger.`,
    };
  },
};
