import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const ITEM_NOUNS = ["stickers", "cookies", "toy cars", "balloons", "crayons", "marbles"] as const;
const NAMES = ["Sam", "Mia", "Leo", "Ava", "Ben", "Zoe"] as const;

export const additionWordProblems: ProblemGenerator = {
  skillSlug: "g1-addition-word-problems",
  generate(level) {
    const isAdd = Math.random() < 0.5;
    const item = choice(ITEM_NOUNS);
    const name = choice(NAMES);
    const max = level < 5 ? 10 : 20;

    if (isAdd) {
      const start = randInt(2, max - 3);
      const more = randInt(1, max - start);
      const answer = start + more;
      return {
        problemData: { name, item, start, change: more, scenario: "gets-more" },
        answerType: "integer",
        correctAnswer: { type: "integer", value: answer },
        hintLadder: [
          `${name} starts with ${start} ${item} and gets ${more} more — do you add or subtract?`,
          `${start} + ${more} = ${answer}.`,
        ],
        explanation: `${name} has ${start} + ${more} = ${answer} ${item}.`,
      };
    }

    const start = randInt(4, max);
    const given = randInt(1, start - 1);
    const answer = start - given;
    return {
      problemData: { name, item, start, change: given, scenario: "gives-away" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `${name} starts with ${start} ${item} and gives away ${given} — do you add or subtract?`,
        `${start} - ${given} = ${answer}.`,
      ],
      explanation: `${name} has ${start} - ${given} = ${answer} ${item} left.`,
    };
  },
};
