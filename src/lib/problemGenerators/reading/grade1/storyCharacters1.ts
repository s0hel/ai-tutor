import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface CharacterItem {
  passage: string;
  correctCharacter: string;
  distractors: [string, string, string];
}

const ITEMS: CharacterItem[] = [
  {
    passage: "Tom the cat climbed a tree. He looked at the birds.",
    correctCharacter: "Tom the cat",
    distractors: ["a dog", "a bird", "a mouse"],
  },
  {
    passage: "Every morning, Lucy feeds her rabbit and gives it fresh carrots.",
    correctCharacter: "Lucy",
    distractors: ["a rabbit's mother", "a farmer", "Lucy's teacher"],
  },
  {
    passage: "The little duck swam across the pond and quacked at the frogs.",
    correctCharacter: "the little duck",
    distractors: ["a frog", "a fish", "a swan"],
  },
  {
    passage: "Grandpa told Jamie a funny story before bedtime.",
    correctCharacter: "Grandpa",
    distractors: ["Jamie's teacher", "Jamie's dog", "a neighbor"],
  },
  {
    passage: "Milo the mouse hid a piece of cheese under his bed.",
    correctCharacter: "Milo the mouse",
    distractors: ["a cat", "a bird", "a rabbit"],
  },
];

export const storyCharacters1: ProblemGenerator = {
  skillSlug: "g1-story-characters",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctCharacter },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" Who is this story about?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look for the person or animal that is doing things in the story.`,
        `The story is about ${item.correctCharacter}.`,
      ],
      explanation: `The story is about ${item.correctCharacter} — that's the character.`,
    };
  },
};
