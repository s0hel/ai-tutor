import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface AffixItem {
  word: string;
  affix: string;
  isPrefix: boolean;
  affixMeaning: string;
  correctMeaning: string;
  distractors: [string, string, string];
}

const ITEMS: AffixItem[] = [
  {
    word: "unsafe",
    affix: "un-",
    isPrefix: true,
    affixMeaning: "not",
    correctMeaning: "not safe",
    distractors: ["very safe", "safe again", "able to be safe"],
  },
  {
    word: "joyful",
    affix: "-ful",
    isPrefix: false,
    affixMeaning: "full of",
    correctMeaning: "full of joy",
    distractors: ["without joy", "joy again", "before joy"],
  },
  {
    word: "retell",
    affix: "re-",
    isPrefix: true,
    affixMeaning: "again",
    correctMeaning: "to tell again",
    distractors: ["to tell quietly", "not able to tell", "to tell first"],
  },
  {
    word: "helpless",
    affix: "-less",
    isPrefix: false,
    affixMeaning: "without",
    correctMeaning: "without help",
    distractors: ["full of help", "able to help", "help again"],
  },
  {
    word: "preheat",
    affix: "pre-",
    isPrefix: true,
    affixMeaning: "before",
    correctMeaning: "to heat before",
    distractors: ["to heat again", "not able to heat", "to heat afterward"],
  },
  {
    word: "breakable",
    affix: "-able",
    isPrefix: false,
    affixMeaning: "able to be",
    correctMeaning: "able to be broken",
    distractors: ["already broken", "not able to break", "broken again"],
  },
];

export const vocabPrefixesSuffixes3: ProblemGenerator = {
  skillSlug: "g3-vocab-prefixes-suffixes",
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
        instruction: `The word "${item.word}" has the ${item.isPrefix ? "prefix" : "suffix"} "${item.affix}", which means "${item.affixMeaning}." What does "${item.word}" mean?`,
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
