import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface ContextClueItem {
  sentence: string;
  word: string;
  correctMeaning: string;
  distractors: [string, string, string];
}

const ITEMS: ContextClueItem[] = [
  {
    sentence: "The puppy was famished, so it gulped down its whole bowl of food in seconds.",
    word: "famished",
    correctMeaning: "very hungry",
    distractors: ["very sleepy", "very messy", "very loud"],
  },
  {
    sentence: "The room was so frigid that everyone put on their coats and mittens.",
    word: "frigid",
    correctMeaning: "very cold",
    distractors: ["very bright", "very crowded", "very quiet"],
  },
  {
    sentence: "Grandpa's old chair was rickety, so we were careful not to lean back too far or it might break.",
    word: "rickety",
    correctMeaning: "shaky and weak",
    distractors: ["brand new", "very comfortable", "painted bright red"],
  },
  {
    sentence: "The hikers were parched after walking for hours in the sun without any water.",
    word: "parched",
    correctMeaning: "very thirsty",
    distractors: ["very tired", "very happy", "very cold"],
  },
  {
    sentence: "The classroom was in chaos, with papers flying and everyone talking at once until the teacher clapped for quiet.",
    word: "chaos",
    correctMeaning: "a messy, confusing scene",
    distractors: ["a peaceful, quiet scene", "a neat, organized scene", "a sad, silent scene"],
  },
];

export const vocabContextClues2: ProblemGenerator = {
  skillSlug: "g2-vocab-context-clues",
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
        instruction: `Read this sentence: "${item.sentence}" What does the word "${item.word}" mean?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look at the other words in the sentence around "${item.word}" — they give clues about what it means.`,
        `In this sentence, "${item.word}" means "${item.correctMeaning}."`,
      ],
      explanation: `"${item.word}" means "${item.correctMeaning}" — you can tell from the other clues in the sentence.`,
    };
  },
};
