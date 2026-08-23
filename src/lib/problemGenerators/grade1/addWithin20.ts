import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const addWithin20: ProblemGenerator = {
  skillSlug: "g1-add-within-20",
  generate(level) {
    const a = randInt(level < 5 ? 6 : 8, 9);
    const toTen = 10 - a;
    const b = randInt(Math.max(toTen, level < 5 ? 3 : 5), 9);
    const answer = a + b;

    return {
      problemData: { a, b, op: "add" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Try making a ten first: how many more does ${a} need to reach 10?`,
        `${a} needs ${toTen} more to make 10. ${b} - ${toTen} = ${b - toTen} left over. 10 + ${b - toTen} = ${answer}.`,
      ],
      explanation: `${a} + ${b} = ${answer}.`,
    };
  },
};
