import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const multDivRelationship: ProblemGenerator = {
  skillSlug: "g3-mult-div-relationship",
  generate() {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const product = a * b;
    const askFor = choice(["a", "b"] as const);
    const divisor = askFor === "a" ? b : a;
    const answer = askFor === "a" ? a : b;

    return {
      problemData: {
        instruction: `You know that ${a} × ${b} = ${product}. Using that fact, what is ${product} ÷ ${divisor}?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Every multiplication fact gives you two related division facts.`,
        `Since ${a} × ${b} = ${product}, dividing ${product} by ${divisor} gives ${answer}.`,
      ],
      explanation: `${product} ÷ ${divisor} = ${answer}.`,
    };
  },
};
