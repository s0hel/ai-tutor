import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const PLACES = [
  { name: "tenths", index: 0 },
  { name: "hundredths", index: 1 },
  { name: "thousandths", index: 2 },
] as const;

export const decimalPlaceValue: ProblemGenerator = {
  skillSlug: "decimal-place-value",
  generate(level) {
    const digitCount = level < 5 ? 2 : 3;
    const digits = Array.from({ length: digitCount }, () => randInt(0, 9));
    const whole = randInt(0, 9);
    const decimalString = `${whole}.${digits.join("")}`;
    const place = choice(PLACES.slice(0, digitCount));
    const answerDigit = digits[place.index];

    return {
      problemData: { decimal: decimalString, place: place.name },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answerDigit },
      hintLadder: [
        `After the decimal point, digits go tenths, then hundredths, then thousandths.`,
        `Counting from the decimal point: the ${place.name} digit in ${decimalString} is ${answerDigit}.`,
      ],
      explanation: `In ${decimalString}, the digit in the ${place.name} place is ${answerDigit}.`,
    };
  },
};
