import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const arraysRepeatedAddition: ProblemGenerator = {
  skillSlug: "g2-arrays-repeated-addition",
  generate() {
    const rows = randInt(2, 6);
    const perRow = randInt(2, 8);
    const answer = rows * perRow;

    return {
      problemData: { instruction: `An array has ${rows} rows with ${perRow} dots in each row. Using repeated addition, how many dots are there in total?` },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Add ${perRow} once for every row — that's ${rows} times.`,
        `${Array.from({ length: rows }, () => perRow).join(" + ")} = ${answer}.`,
      ],
      explanation: `${rows} rows of ${perRow} = ${answer} dots.`,
    };
  },
};
