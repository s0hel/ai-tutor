import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const tensAndOnes: ProblemGenerator = {
  skillSlug: "g1-tens-and-ones",
  generate() {
    const tens = randInt(1, 9);
    const ones = randInt(0, 9);
    const n = tens * 10 + ones;
    const askTens = choice([true, false]);
    const answer = askTens ? tens : ones;

    return {
      problemData: {
        n,
        instruction: `How many ${askTens ? "tens" : "ones"} are in the number ${n}?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Break ${n} into tens and ones: how many groups of ten, and how many left over?`,
        `${n} = ${tens} ten${tens === 1 ? "" : "s"} and ${ones} one${ones === 1 ? "" : "s"}.`,
      ],
      explanation: `${n} has ${tens} ten${tens === 1 ? "" : "s"} and ${ones} one${ones === 1 ? "" : "s"}.`,
    };
  },
};
