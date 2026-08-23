import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface AntonymItem {
  word: string;
  antonym: string;
  distractors: [string, string, string];
}

const ITEMS: AntonymItem[] = [
  { word: "ancient", antonym: "modern", distractors: ["historic", "faded", "hidden"] },
  { word: "generous", antonym: "stingy", distractors: ["friendly", "wealthy", "cheerful"] },
  { word: "arrive", antonym: "depart", distractors: ["wander", "wait", "return"] },
  { word: "transparent", antonym: "opaque", distractors: ["colorful", "fragile", "smooth"] },
  { word: "victory", antonym: "defeat", distractors: ["celebration", "attempt", "struggle"] },
  { word: "expand", antonym: "shrink", distractors: ["repair", "combine", "balance"] },
  { word: "cautious", antonym: "reckless", distractors: ["curious", "quiet", "patient"] },
  { word: "abundant", antonym: "scarce", distractors: ["expensive", "delicious", "hidden"] },
  { word: "genuine", antonym: "fake", distractors: ["expensive", "rare", "old"] },
  { word: "permit", antonym: "forbid", distractors: ["request", "suggest", "delay"] },
];

export const vocabAntonyms: ProblemGenerator = {
  skillSlug: "vocab-antonyms",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.antonym },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Which word is an antonym for "${item.word}" — a word that means the opposite?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about what "${item.word}" means, then look for its exact opposite.`,
        `"${item.antonym}" means the opposite of "${item.word}."`,
      ],
      explanation: `"${item.antonym}" is an antonym for "${item.word}" — they mean the opposite.`,
    };
  },
};
