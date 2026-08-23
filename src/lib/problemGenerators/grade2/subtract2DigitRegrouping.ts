import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const subtract2DigitRegrouping: ProblemGenerator = {
  skillSlug: "g2-subtract-2digit-regrouping",
  generate() {
    const aOnes = randInt(0, 4);
    const bOnes = randInt(aOnes + 1, 9);
    const bTens = randInt(1, 7);
    const aTens = randInt(bTens + 1, 9);
    const a = aTens * 10 + aOnes;
    const b = bTens * 10 + bOnes;
    const answer = a - b;

    return {
      problemData: { a, b, op: "subtract" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `The ones digit of ${a} (${aOnes}) is smaller than the ones digit of ${b} (${bOnes}), so you'll need to borrow a ten.`,
        `Borrow 1 ten: ${aOnes} becomes ${aOnes + 10}, and ${aTens} tens becomes ${aTens - 1} tens. Now subtract: ${aOnes + 10} - ${bOnes} = ${aOnes + 10 - bOnes}, and ${aTens - 1} - ${bTens} = ${aTens - 1 - bTens}.`,
      ],
      explanation: `${a} - ${b} = ${answer}.`,
    };
  },
};
