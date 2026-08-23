import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const OBJECT_PAIRS = [
  ["pencil", "crayon"],
  ["shoelace", "ribbon"],
  ["toy car", "school bus"],
  ["worm", "snake"],
  ["straw", "broomstick"],
] as const;

export const compareLength: ProblemGenerator = {
  skillSlug: "g1-compare-length",
  generate() {
    const [objA, objB] = choice(OBJECT_PAIRS);
    const lenA = randInt(3, 20);
    let lenB = randInt(3, 20);
    while (lenA === lenB) lenB = randInt(3, 20);
    const longer = lenA > lenB ? objA : objB;

    return {
      problemData: { objA, lenA, objB, lenB },
      answerType: "text",
      correctAnswer: { type: "text", value: longer },
      hintLadder: [
        `Compare the two lengths given — which number is bigger?`,
        `${lenA > lenB ? lenA : lenB} units is more than ${lenA > lenB ? lenB : lenA} units.`,
      ],
      explanation: `The ${longer} is longer.`,
    };
  },
};
