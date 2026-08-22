import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const decimalMultiplyPowerOfTen: ProblemGenerator = {
  skillSlug: "decimal-multiply-power-of-ten",
  generate(level) {
    const power = choice(level < 5 ? [10] : [10, 100]);
    const whole = randInt(0, 9);
    const decimals = randInt(1, 99);
    const decimalText = `${whole}.${String(decimals).padStart(2, "0")}`;
    const decimalValue = Number(decimalText);
    const answer = Number((decimalValue * power).toFixed(2));

    return {
      problemData: { a: decimalValue, b: power, op: "multiply" },
      answerType: "decimal",
      correctAnswer: { type: "decimal", value: answer },
      hintLadder: [
        `Multiplying by ${power} moves the decimal point to the right.`,
        `${power} has ${String(power).length - 1} zero${String(power).length - 1 === 1 ? "" : "s"} — move the decimal point that many places right in ${decimalText}.`,
      ],
      explanation: `${decimalText} × ${power} = ${answer}.`,
    };
  },
};
