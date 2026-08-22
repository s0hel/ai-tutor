import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const div1DigitRemainder: ProblemGenerator = {
  skillSlug: "div-1digit-remainder",
  generate(level) {
    const divisor = randInt(2, level < 5 ? 6 : 9);
    const quotient = randInt(level < 5 ? 10 : 40, level < 5 ? 49 : 199);
    const remainder = randInt(1, divisor - 1);
    const dividend = divisor * quotient + remainder;
    const answerText = `${quotient} r ${remainder}`;
    return {
      problemData: { a: dividend, b: divisor, op: "divide-with-remainder" },
      answerType: "text",
      correctAnswer: {
        type: "text",
        value: answerText,
        acceptedAliases: [`${quotient}r${remainder}`, `${quotient} remainder ${remainder}`],
      },
      hintLadder: [
        `${divisor} won't divide ${dividend} evenly. Find the largest multiple of ${divisor} that's still less than ${dividend}.`,
        `${divisor} × ${quotient} = ${divisor * quotient}, which leaves ${remainder} left over. Answer like "${answerText}".`,
      ],
      explanation: `${dividend} ÷ ${divisor} = ${answerText} (since ${divisor} × ${quotient} = ${divisor * quotient}, with ${remainder} left over).`,
    };
  },
};
