import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const CONVERSIONS = [
  { from: "feet", to: "inches", factor: 12 },
  { from: "yards", to: "feet", factor: 3 },
  { from: "meters", to: "centimeters", factor: 100 },
  { from: "kilograms", to: "grams", factor: 1000 },
  { from: "liters", to: "milliliters", factor: 1000 },
] as const;

export const unitConversion: ProblemGenerator = {
  skillSlug: "geo-unit-conversion",
  generate(level) {
    const pool = level < 5 ? CONVERSIONS.slice(0, 2) : CONVERSIONS;
    const conv = choice(pool);
    const amount = randInt(2, level < 5 ? 10 : 25);
    const answer = amount * conv.factor;

    return {
      problemData: { amount, from: conv.from, to: conv.to, factor: conv.factor },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `There are ${conv.factor} ${conv.to} in every 1 ${conv.from.replace(/s$/, "")}.`,
        `${amount} × ${conv.factor} = ${answer}.`,
      ],
      explanation: `${amount} ${conv.from} = ${amount} × ${conv.factor} = ${answer} ${conv.to}.`,
    };
  },
};
