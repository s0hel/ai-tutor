import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface FeelingItem {
  passage: string;
  correctFeeling: string;
  distractors: [string, string, string];
}

const ITEMS: FeelingItem[] = [
  {
    passage: "Lily smiled and clapped when she saw her puppy.",
    correctFeeling: "happy",
    distractors: ["angry", "sleepy", "scared"],
  },
  {
    passage: "Sam's eyes filled with tears when his balloon flew away.",
    correctFeeling: "sad",
    distractors: ["excited", "proud", "silly"],
  },
  {
    passage: "Ravi jumped back and covered his eyes when the dog barked loudly.",
    correctFeeling: "scared",
    distractors: ["happy", "bored", "calm"],
  },
  {
    passage: "Noah stomped his feet and crossed his arms when his tower fell down.",
    correctFeeling: "angry",
    distractors: ["sleepy", "joyful", "surprised"],
  },
  {
    passage: "Zoe yawned and rubbed her eyes as she lay down on her pillow.",
    correctFeeling: "sleepy",
    distractors: ["excited", "angry", "worried"],
  },
];

export const storyFeelings1: ProblemGenerator = {
  skillSlug: "g1-story-feelings",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctFeeling },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" How does the character feel?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about what the character did or said. What does that tell you about how they feel?`,
        `The character feels ${item.correctFeeling}.`,
      ],
      explanation: `The character feels ${item.correctFeeling} — you can tell from what they did.`,
    };
  },
};
