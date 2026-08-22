import type { ProblemGenerator } from "../types";
import { gcd, reduceFraction } from "../../fractionMath";
import { randInt } from "../helpers";

export const fractionAddUnlike: ProblemGenerator = {
  skillSlug: "fraction-add-unlike",
  generate(level) {
    const d1 = randInt(2, level < 5 ? 6 : 9);
    let d2 = randInt(2, level < 5 ? 6 : 9);
    while (d2 === d1) d2 = randInt(2, level < 5 ? 6 : 9);
    const n1 = randInt(1, d1 - 1);
    const n2 = randInt(1, d2 - 1);
    const commonDen = (d1 * d2) / gcd(d1, d2);
    const numerator = n1 * (commonDen / d1) + n2 * (commonDen / d2);
    const reduced = reduceFraction({ numerator, denominator: commonDen });

    return {
      problemData: { a: { numerator: n1, denominator: d1 }, b: { numerator: n2, denominator: d2 }, op: "add" },
      answerType: "fraction",
      correctAnswer: { type: "fraction", value: reduced, requireSimplified: false },
      hintLadder: [
        `Find a common denominator for ${d1} and ${d2} first.`,
        `${commonDen} works — rewrite both fractions with that denominator, then add the numerators: ${n1 * (commonDen / d1)}/${commonDen} + ${n2 * (commonDen / d2)}/${commonDen}.`,
      ],
      explanation: `${n1}/${d1} + ${n2}/${d2} = ${numerator}/${commonDen} = ${reduced.numerator}/${reduced.denominator}.`,
    };
  },
};
