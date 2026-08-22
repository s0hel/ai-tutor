import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const decimalAddSubtract: ProblemGenerator = {
  skillSlug: "decimal-add-subtract",
  generate(level) {
    const decimals = level < 5 ? 1 : 2;
    const scale = 10 ** decimals;
    const isAdd = Math.random() < 0.5;

    let a = randInt(1, 20 * scale) / scale;
    let b = randInt(1, 20 * scale) / scale;
    if (!isAdd && b > a) [a, b] = [b, a];

    const answer = Number((isAdd ? a + b : a - b).toFixed(decimals));

    return {
      problemData: { a, b, op: isAdd ? "add" : "subtract" },
      answerType: "decimal",
      correctAnswer: { type: "decimal", value: answer },
      hintLadder: [
        `Line up the decimal points before you ${isAdd ? "add" : "subtract"}.`,
        isAdd
          ? `${a} + ${b}: add the digits in matching place-value columns, carrying if needed.`
          : `${a} - ${b}: subtract the digits in matching place-value columns, borrowing if needed.`,
      ],
      explanation: `${a} ${isAdd ? "+" : "-"} ${b} = ${answer}.`,
    };
  },
};
