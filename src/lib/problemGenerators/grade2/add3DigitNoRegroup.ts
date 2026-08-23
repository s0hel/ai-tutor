import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const add3DigitNoRegroup: ProblemGenerator = {
  skillSlug: "g2-add-3digit-no-regroup",
  generate() {
    const aHundreds = randInt(1, 4);
    const bHundreds = randInt(1, 8 - aHundreds);
    const aTens = randInt(0, 4);
    const bTens = randInt(0, 9 - aTens);
    const aOnes = randInt(0, 4);
    const bOnes = randInt(0, 9 - aOnes);
    const a = aHundreds * 100 + aTens * 10 + aOnes;
    const b = bHundreds * 100 + bTens * 10 + bOnes;
    const answer = a + b;

    return {
      problemData: { a, b, op: "add" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Add each place value column separately: ones with ones, tens with tens, hundreds with hundreds.`,
        `Ones: ${aOnes}+${bOnes}=${aOnes + bOnes}. Tens: ${aTens}+${bTens}=${aTens + bTens}. Hundreds: ${aHundreds}+${bHundreds}=${aHundreds + bHundreds}.`,
      ],
      explanation: `${a} + ${b} = ${answer}.`,
    };
  },
};
