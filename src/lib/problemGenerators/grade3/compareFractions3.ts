import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const compareFractions3: ProblemGenerator = {
  skillSlug: "g3-compare-fractions-3",
  generate() {
    const sameDenominator = choice([true, false]);

    if (sameDenominator) {
      const denominator = randInt(3, 9);
      const n1 = randInt(1, denominator - 1);
      let n2 = randInt(1, denominator - 1);
      while (n1 === n2) n2 = randInt(1, denominator - 1);
      const biggerN = Math.max(n1, n2);

      return {
        problemData: { instruction: `Which fraction is bigger: ${n1}/${denominator} or ${n2}/${denominator}?` },
        answerType: "text",
        correctAnswer: { type: "text", value: `${biggerN}/${denominator}` },
        hintLadder: [
          `When the denominators match, the fraction with the bigger numerator is bigger.`,
          `${biggerN} is more than ${Math.min(n1, n2)}.`,
        ],
        explanation: `${biggerN}/${denominator} is bigger, since the denominators match and ${biggerN} is the bigger numerator.`,
      };
    }

    const numerator = randInt(1, 4);
    const d1 = randInt(numerator + 1, 9);
    let d2 = randInt(numerator + 1, 9);
    while (d1 === d2) d2 = randInt(numerator + 1, 9);
    const smallerD = Math.min(d1, d2);

    return {
      problemData: { instruction: `Which fraction is bigger: ${numerator}/${d1} or ${numerator}/${d2}?` },
      answerType: "text",
      correctAnswer: { type: "text", value: `${numerator}/${smallerD}` },
      hintLadder: [
        `When the numerators match, the fraction with the smaller denominator is bigger — the pieces are larger.`,
        `${smallerD} is smaller than ${Math.max(d1, d2)}, so its pieces are bigger.`,
      ],
      explanation: `${numerator}/${smallerD} is bigger, since the numerators match and smaller denominators mean bigger pieces.`,
    };
  },
};
