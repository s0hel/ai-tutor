import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface SynonymItem {
  word: string;
  synonym: string;
  distractors: [string, string, string];
}

const ITEMS: SynonymItem[] = [
  { word: "happy", synonym: "joyful", distractors: ["furious", "exhausted", "confused"] },
  { word: "tiny", synonym: "minuscule", distractors: ["enormous", "ordinary", "distant"] },
  { word: "brave", synonym: "courageous", distractors: ["timid", "clumsy", "forgetful"] },
  { word: "quick", synonym: "swift", distractors: ["sluggish", "quiet", "heavy"] },
  { word: "angry", synonym: "furious", distractors: ["delighted", "sleepy", "curious"] },
  { word: "smart", synonym: "intelligent", distractors: ["foolish", "clumsy", "lazy"] },
  { word: "gloomy", synonym: "dreary", distractors: ["cheerful", "bright", "loud"] },
  { word: "huge", synonym: "gigantic", distractors: ["miniature", "average", "narrow"] },
  { word: "kind", synonym: "compassionate", distractors: ["cruel", "silent", "nervous"] },
  { word: "exhausted", synonym: "weary", distractors: ["energetic", "cheerful", "curious"] },
];

export const vocabSynonyms: ProblemGenerator = {
  skillSlug: "vocab-synonyms",
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
