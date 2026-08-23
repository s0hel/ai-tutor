import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const missingAddend: ProblemGenerator = {
  skillSlug: "g1-missing-addend",
  generate(level) {
    const max = level < 5 ? 10 : 20;
    const a = randInt(1, max - 1);
    const total = randInt(a + 1, max);
    const answer = total - a;

    return {
      problemData: { a, total, op: "missing-addend" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `Count up from ${a} until you reach ${total} — how many steps does that take?`,
        `${total} - ${a} = ${answer}.`,
      ],
      explanation: `${a} + ${answer} = ${total}, so the missing number is ${answer}.`,
    };
  },
};
