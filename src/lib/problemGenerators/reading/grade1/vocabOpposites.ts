import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface OppositeItem {
  word: string;
  opposite: string;
  distractors: [string, string, string];
}

const ITEMS: OppositeItem[] = [
  { word: "big", opposite: "small", distractors: ["fast", "happy", "loud"] },
  { word: "hot", opposite: "cold", distractors: ["wet", "soft", "tall"] },
  { word: "up", opposite: "down", distractors: ["near", "left", "big"] },
  { word: "fast", opposite: "slow", distractors: ["short", "quiet", "cold"] },
  { word: "day", opposite: "night", distractors: ["rain", "warm", "week"] },
];

export const vocabOpposites: ProblemGenerator = {
  skillSlug: "g1-vocab-opposites",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.opposite },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Which word is the opposite of "${item.word}"?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about what "${item.word}" means, then think of a word that means the total reverse.`,
        `"${item.opposite}" is the opposite of "${item.word}."`,
      ],
      explanation: `"${item.opposite}" is the opposite of "${item.word}."`,
    };
  },
};
