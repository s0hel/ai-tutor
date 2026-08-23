import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface NamingWordItem {
  riddle: string;
  answer: string;
  distractors: [string, string, string];
}

const ITEMS: NamingWordItem[] = [
  { riddle: "This animal says moo and gives milk.", answer: "cow", distractors: ["duck", "horse", "sheep"] },
  { riddle: "You wear these on your feet to go outside.", answer: "shoes", distractors: ["hat", "gloves", "socks"] },
  { riddle: "This yellow fruit is curved and easy to peel.", answer: "banana", distractors: ["apple", "grape", "orange"] },
  { riddle: "You sleep in this at night.", answer: "bed", distractors: ["chair", "table", "sink"] },
  { riddle: "This is in the sky and gives us light in the day.", answer: "sun", distractors: ["moon", "star", "cloud"] },
];

export const vocabNamingWords: ProblemGenerator = {
  skillSlug: "g1-vocab-naming-words",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.answer },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `${item.riddle} What is it?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about each clue in the sentence and what it tells you.`,
        `The answer is "${item.answer}."`,
      ],
      explanation: `"${item.answer}" fits the clues: ${item.riddle}`,
    };
  },
};
