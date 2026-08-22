import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

function randomDecimal(digitCount: number): { value: number; text: string } {
  const whole = randInt(0, 9);
  const digits = Array.from({ length: digitCount }, () => randInt(0, 9)).join("");
  const text = `${whole}.${digits}`;
  return { value: Number(text), text };
}

export const decimalCompare: ProblemGenerator = {
  skillSlug: "decimal-compare",
  generate(level) {
    const digitCount = level < 5 ? 2 : 3;
    const a = randomDecimal(digitCount);
    let b = randomDecimal(digitCount);
    while (a.value === b.value) b = randomDecimal(digitCount);
    const aIsBigger = a.value > b.value;
    const answerText = aIsBigger ? a.text : b.text;

    return {
      problemData: { a: a.text, b: b.text },
      answerType: "text",
      correctAnswer: { type: "text", value: answerText },
      hintLadder: [
        `Line up the decimal points and compare digit by digit, starting from the left.`,
        `Compare the whole number parts first, then the tenths, then the hundredths, until you find a difference.`,
      ],
      explanation: `${answerText} is bigger.`,
    };
  },
};
