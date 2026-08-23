import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const add2DigitRegrouping: ProblemGenerator = {
  skillSlug: "g2-add-2digit-regrouping",
  generate(level) {
    const aOnes = randInt(level < 5 ? 5 : 6, 9);
    const bOnes = randInt(10 - aOnes, 9);
    const aTens = randInt(1, 7);
    const bTens = randInt(1, 8 - aTens);
    const a = aTens * 10 + aOnes;
    const b = bTens * 10 + bOnes;
    const answer = a + b;

    return {
      problemData: { a, b, op: "add" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Add the ones first: ${aOnes} + ${bOnes} = ${aOnes + bOnes}. That's 10 or more, so you'll need to regroup.`,
        `Write down ${(aOnes + bOnes) % 10} in the ones place and carry 1 ten. Then add the tens: ${aTens} + ${bTens} + 1 = ${aTens + bTens + 1}.`,
      ],
      explanation: `${a} + ${b} = ${answer}.`,
    };
  },
};
