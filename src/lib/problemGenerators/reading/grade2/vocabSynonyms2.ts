import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface SynonymItem {
  word: string;
  synonym: string;
  distractors: [string, string, string];
}

const ITEMS: SynonymItem[] = [
  { word: "happy", synonym: "glad", distractors: ["sad", "angry", "sleepy"] },
  { word: "big", synonym: "large", distractors: ["tiny", "narrow", "short"] },
  { word: "small", synonym: "little", distractors: ["huge", "tall", "wide"] },
  { word: "fast", synonym: "quick", distractors: ["slow", "quiet", "heavy"] },
  { word: "pretty", synonym: "beautiful", distractors: ["ugly", "messy", "boring"] },
];

export const vocabSynonyms2: ProblemGenerator = {
  skillSlug: "g2-vocab-synonyms",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.synonym },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Which word is a synonym for "${item.word}" — a word that means almost the same thing?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about what "${item.word}" means, then look for a word close to that same meaning.`,
        `"${item.synonym}" means almost the same thing as "${item.word}."`,
      ],
      explanation: `"${item.synonym}" is a synonym for "${item.word}" — they mean almost the same thing.`,
    };
  },
};
