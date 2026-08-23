import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const hundredsTensOnes: ProblemGenerator = {
  skillSlug: "g2-hundreds-tens-ones",
  generate() {
    const hundreds = randInt(1, 9);
    const tens = randInt(0, 9);
    const ones = randInt(0, 9);
    const n = hundreds * 100 + tens * 10 + ones;
    const place = choice(["hundreds", "tens", "ones"] as const);
    const answer = place === "hundreds" ? hundreds : place === "tens" ? tens : ones;

    return {
      problemData: { n, instruction: `How many ${place} are in the number ${n}?` },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Break ${n} apart into hundreds, tens, and ones.`,
        `${n} = ${hundreds} hundred${hundreds === 1 ? "" : "s"}, ${tens} ten${tens === 1 ? "" : "s"}, and ${ones} one${ones === 1 ? "" : "s"}.`,
      ],
      explanation: `${n} has ${answer} ${place}.`,
    };
  },
};
