import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface RhymeItem {
  word: string;
  rhyme: string;
  distractors: [string, string, string];
}

const ITEMS: RhymeItem[] = [
  { word: "cat", rhyme: "hat", distractors: ["dog", "cup", "run"] },
  { word: "frog", rhyme: "dog", distractors: ["cat", "sun", "pig"] },
  { word: "star", rhyme: "car", distractors: ["moon", "tree", "fish"] },
  { word: "bee", rhyme: "tree", distractors: ["ant", "sun", "cup"] },
  { word: "bug", rhyme: "rug", distractors: ["hen", "top", "sock"] },
];

export const rhymingWords: ProblemGenerator = {
  skillSlug: "g1-rhyming-words",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.rhyme },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Which word rhymes with "${item.word}"?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Listen to the ending sound of "${item.word}" and find a word that ends the same way.`,
        `"${item.rhyme}" rhymes with "${item.word}."`,
      ],
      explanation: `"${item.rhyme}" rhymes with "${item.word}" — they both end with the same sound.`,
    };
  },
};
