import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface AntonymItem {
  word: string;
  antonym: string;
  distractors: [string, string, string];
}

const ITEMS: AntonymItem[] = [
  { word: "hot", antonym: "cold", distractors: ["warm", "wet", "loud"] },
  { word: "fast", antonym: "slow", distractors: ["quick", "quiet", "tall"] },
  { word: "up", antonym: "down", distractors: ["left", "near", "over"] },
  { word: "happy", antonym: "sad", distractors: ["silly", "tired", "brave"] },
  { word: "full", antonym: "empty", distractors: ["heavy", "clean", "open"] },
];

export const vocabAntonyms2: ProblemGenerator = {
  skillSlug: "g2-vocab-antonyms",
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
        `Think about what "${item.word}" means, then look for a word that means the opposite.`,
        `"${item.antonym}" is the opposite of "${item.word}."`,
      ],
      explanation: `"${item.antonym}" is an antonym for "${item.word}" — they mean the opposite of each other.`,
    };
  },
};
