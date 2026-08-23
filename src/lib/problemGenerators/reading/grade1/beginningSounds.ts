import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface BeginningSoundItem {
  word: string;
  soundLetter: string;
  distractors: [string, string, string];
}

const ITEMS: BeginningSoundItem[] = [
  { word: "sun", soundLetter: "s", distractors: ["m", "t", "p"] },
  { word: "ball", soundLetter: "b", distractors: ["d", "f", "r"] },
  { word: "cat", soundLetter: "c", distractors: ["h", "n", "w"] },
  { word: "dog", soundLetter: "d", distractors: ["g", "l", "v"] },
  { word: "fish", soundLetter: "f", distractors: ["j", "k", "z"] },
];

export const beginningSounds: ProblemGenerator = {
  skillSlug: "g1-beginning-sounds",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.soundLetter },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Say the word "${item.word}" out loud. What sound does it start with?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Say "${item.word}" slowly and listen to the very first sound.`,
        `"${item.word}" starts with the "${item.soundLetter}" sound.`,
      ],
      explanation: `"${item.word}" starts with the "${item.soundLetter}" sound.`,
    };
  },
};
