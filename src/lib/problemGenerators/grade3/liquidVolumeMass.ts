import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const UNIT_SETS = [
  { unit: "liters", noun: "water" },
  { unit: "kilograms", noun: "rice" },
  { unit: "grams", noun: "flour" },
  { unit: "milliliters", noun: "juice" },
] as const;

export const liquidVolumeMass: ProblemGenerator = {
  skillSlug: "g3-liquid-volume-mass",
  generate() {
    const isAdd = Math.random() < 0.5;
    const { unit, noun } = choice(UNIT_SETS);
    const a = randInt(10, 80);
    const b = isAdd ? randInt(5, 40) : randInt(5, a - 5);
    const answer = isAdd ? a + b : a - b;

    return {
      problemData: {
        instruction: isAdd
          ? `A container has ${a} ${unit} of ${noun}. Another container has ${b} ${unit} of ${noun}. What is the total, in ${unit}?`
          : `A container has ${a} ${unit} of ${noun}. ${b} ${unit} ${b === 1 ? "is" : "are"} used up. How many ${unit} are left?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        isAdd ? `Add the two amounts together.` : `Subtract the used amount from the starting amount.`,
        isAdd ? `${a} + ${b} = ${answer}.` : `${a} - ${b} = ${answer}.`,
      ],
      explanation: isAdd ? `${a} + ${b} = ${answer} ${unit}.` : `${a} - ${b} = ${answer} ${unit}.`,
    };
  },
};
