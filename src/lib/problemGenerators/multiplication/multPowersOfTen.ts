import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const multPowersOfTen: ProblemGenerator = {
  skillSlug: "mult-by-powers-of-ten",
  generate(level) {
    const power = level < 4 ? 10 : level < 8 ? choice([10, 100]) : choice([10, 100, 1000]);
    const a = randInt(2, 999);
    const answer = a * power;
    return {
      problemData: { a, b: power, op: "multiply" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Multiplying by ${power} shifts the digits left. Count the zeros in ${power}.`,
        `${power} has ${String(power).length - 1} zero${String(power).length - 1 === 1 ? "" : "s"} — add that many zeros to the end of ${a}.`,
      ],
      explanation: `${a} × ${power} = ${answer}.`,
    };
  },
};
