import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface DetailItem {
  passage: string;
  question: string;
  correctAnswer: string;
  distractors: [string, string, string];
}

const ITEMS: DetailItem[] = [
  {
    passage: "Ben has a small brown dog named Max. Max likes to chase squirrels.",
    question: "What is the dog's name?",
    correctAnswer: "Max",
    distractors: ["Rex", "Buddy", "Spot"],
  },
  {
    passage: "Ella wore a yellow raincoat and blue boots to school today.",
    question: "What color were Ella's boots?",
    correctAnswer: "blue",
    distractors: ["yellow", "red", "green"],
  },
  {
    passage: "The bakery sells warm bread every morning at seven o'clock.",
    question: "What time does the bakery sell bread?",
    correctAnswer: "seven o'clock",
    distractors: ["six o'clock", "noon", "nine o'clock"],
  },
  {
    passage: "Jack found three seashells on the beach and put them in his bucket.",
    question: "How many seashells did Jack find?",
    correctAnswer: "three",
    distractors: ["two", "five", "one"],
  },
  {
    passage: "The library has a big fish tank next to the front door.",
    question: "Where is the fish tank?",
    correctAnswer: "next to the front door",
    distractors: ["in the kitchen", "under a table", "outside the building"],
  },
];

export const compDetails1: ProblemGenerator = {
  skillSlug: "g1-comp-details",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctAnswer },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" ${item.question}`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Go back and read the sentence again carefully to find the detail.`,
        `The story says: ${item.correctAnswer}`,
      ],
      explanation: `${item.question} The story says: ${item.correctAnswer}`,
    };
  },
};
