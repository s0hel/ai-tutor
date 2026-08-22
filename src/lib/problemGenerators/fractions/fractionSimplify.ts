import type { ProblemGenerator } from "../types";
import { reduceFraction } from "../../fractionMath";
import { randInt } from "../helpers";

export const fractionSimplify: ProblemGenerator = {
  skillSlug: "fraction-simplify",
  generate(level) {
    const factor = randInt(2, level < 5 ? 4 : 8);
    const reducedD = randInt(2, level < 5 ? 6 : 9);
    const reducedN = randInt(1, reducedD - 1);
    const n = reducedN * factor;
    const d = reducedD * factor;
    const reduced = reduceFraction({ numerator: n, denominator: d });

    return {
      problemData: { numerator: n, denominator: d },
      answerType: "fraction",
      correctAnswer: { type: "fraction", value: reduced, requireSimplified: true },
      hintLadder: [
        `What's the largest number that divides evenly into both ${n} and ${d}?`,
        `${n} and ${d} both divide evenly by ${factor}: ${n}/${factor} = ${reduced.numerator}, ${d}/${factor} = ${reduced.denominator}.`,
      ],
      explanation: `${n}/${d} simplifies to ${reduced.numerator}/${reduced.denominator}.`,
    };
  },
};
