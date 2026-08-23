import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface AffixItem {
  word: string;
  affix: string;
  affixMeaning: string;
  correctMeaning: string;
  distractors: [string, string, string];
}

const ITEMS: AffixItem[] = [
  {
    word: "unhappy",
    affix: "un-",
    affixMeaning: "not",
    correctMeaning: "not happy",
    distractors: ["extremely happy", "happy again", "able to be happy"],
  },
  {
    word: "rewrite",
    affix: "re-",
    affixMeaning: "again",
    correctMeaning: "to write again",
    distractors: ["not able to write", "to write badly", "before writing"],
  },
  {
    word: "fearless",
    affix: "-less",
    affixMeaning: "without",
    correctMeaning: "without fear",
    distractors: ["full of fear", "able to cause fear", "fear again"],
  },
  {
    word: "preview",
    affix: "pre-",
    affixMeaning: "before",
    correctMeaning: "to view before",
    distractors: ["to view again", "not able to view", "to view afterward"],
  },
  {
    word: "washable",
    affix: "-able",
    affixMeaning: "able to be",
    correctMeaning: "able to be washed",
    distractors: ["washed already", "not able to be washed", "washed again"],
  },
  {
    word: "disagree",
    affix: "dis-",
    affixMeaning: "not / opposite of",
    correctMeaning: "to not agree",
    distractors: ["to agree strongly", "to agree again", "able to agree"],
  },
  {
    word: "misunderstand",
    affix: "mis-",
    affixMeaning: "wrongly",
    correctMeaning: "to understand wrongly",
    distractors: ["to understand perfectly", "to understand again", "not able to understand"],
  },
  {
    word: "colorful",
    affix: "-ful",
    affixMeaning: "full of",
    correctMeaning: "full of color",
    distractors: ["without color", "able to have color", "before adding color"],
  },
];

export const vocabPrefixesSuffixes: ProblemGenerator = {
  skillSlug: "vocab-prefixes-suffixes",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctMeaning },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `The word "${item.word}" has the ${item.affix.includes("-") && item.affix.endsWith("-") ? "prefix" : "suffix"} "${item.affix}", which means "${item.affixMeaning}." What does "${item.word}" mean?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `The ${item.affix} in "${item.word}" means "${item.affixMeaning}."`,
        `Combine "${item.affixMeaning}" with the base word to get the meaning.`,
      ],
      explanation: `"${item.word}" means "${item.correctMeaning}," since "${item.affix}" means "${item.affixMeaning}."`,
    };
  },
};
