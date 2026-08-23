import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const addSubtractTens: ProblemGenerator = {
  skillSlug: "g1-add-subtract-tens",
  generate() {
    const isAdd = Math.random() < 0.5;
    const aTens = randInt(1, isAdd ? 8 : 9);
    const bTens = randInt(1, isAdd ? 9 - aTens : aTens - 1 || 1);
    const a = aTens * 10;
    const b = bTens * 10;
    const answer = isAdd ? a + b : a - b;

    return {
      problemData: { a, b, op: isAdd ? "add" : "subtract" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Think of these as groups of ten: ${a} is ${aTens} tens, ${b} is ${bTens} tens.`,
        isAdd
          ? `${aTens} tens + ${bTens} tens = ${aTens + bTens} tens, which is ${answer}.`
          : `${aTens} tens - ${bTens} tens = ${aTens - bTens} tens, which is ${answer}.`,
      ],
      explanation: `${a} ${isAdd ? "+" : "-"} ${b} = ${answer}.`,
    };
  },
};
