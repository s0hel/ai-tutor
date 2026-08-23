import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const ITEM_NOUNS = ["pencils", "stickers", "baseball cards", "marbles", "buttons", "beads"] as const;
const CLASSES = ["Ms. Lopez's class", "Mr. Chen's class", "the art club", "the school library"] as const;

export const addSubtractWordProblems2: ProblemGenerator = {
  skillSlug: "g2-add-subtract-word-problems-2",
  generate() {
    const isAdd = Math.random() < 0.5;
    const item = choice(ITEM_NOUNS);
    const owner = choice(CLASSES);

    if (isAdd) {
      const start = randInt(15, 60);
      const more = randInt(5, 99 - start);
      const answer = start + more;
      return {
        problemData: { owner, item, start, change: more, scenario: "gets-more" },
        answerType: "integer",
        correctAnswer: { type: "integer", value: answer },
        hintLadder: [`${owner} starts with ${start} ${item} and gets ${more} more — do you add or subtract?`, `${start} + ${more} = ${answer}.`],
        explanation: `${owner} has ${start} + ${more} = ${answer} ${item}.`,
      };
    }

    const start = randInt(40, 99);
    const given = randInt(5, start - 10);
    const answer = start - given;
    return {
      problemData: { owner, item, start, change: given, scenario: "gives-away" },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [`${owner} starts with ${start} ${item} and gives away ${given} — do you add or subtract?`, `${start} - ${given} = ${answer}.`],
      explanation: `${owner} has ${start} - ${given} = ${answer} ${item} left.`,
    };
  },
};
