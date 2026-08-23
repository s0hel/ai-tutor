import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const areaCountingSquares: ProblemGenerator = {
  skillSlug: "g3-area-counting-squares",
  generate() {
    const rows = randInt(2, 8);
    const cols = randInt(2, 8);
    const answer = rows * cols;

    return {
      problemData: {
        instruction: `A rectangle is drawn on a grid, made of ${rows} rows and ${cols} columns of unit squares. What is its area, in square units?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Count all the unit squares that fill the rectangle.`,
        `${rows} rows × ${cols} columns = ${answer} unit squares.`,
      ],
      explanation: `The area is ${rows} × ${cols} = ${answer} square units.`,
    };
  },
};
