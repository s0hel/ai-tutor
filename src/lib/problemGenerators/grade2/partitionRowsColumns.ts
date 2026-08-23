import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const partitionRowsColumns: ProblemGenerator = {
  skillSlug: "g2-partition-rows-columns",
  generate() {
    const rows = randInt(2, 6);
    const cols = randInt(2, 6);
    const answer = rows * cols;

    return {
      problemData: {
        instruction: `A rectangle is split into ${rows} equal rows and ${cols} equal columns of small squares. How many small squares are there in total?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Multiply the number of rows by the number of columns.`,
        `${rows} × ${cols} = ${answer}.`,
      ],
      explanation: `${rows} rows × ${cols} columns = ${answer} squares.`,
    };
  },
};
