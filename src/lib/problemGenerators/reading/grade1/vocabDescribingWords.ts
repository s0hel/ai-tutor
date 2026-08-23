import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface DescribingWordItem {
  thing: string;
  descriptor: string;
  distractors: [string, string, string];
}

const ITEMS: DescribingWordItem[] = [
  { thing: "an elephant", descriptor: "huge", distractors: ["tiny", "quiet", "sour"] },
  { thing: "ice", descriptor: "cold", distractors: ["loud", "soft", "sweet"] },
  { thing: "a lemon", descriptor: "sour", distractors: ["fluffy", "heavy", "quiet"] },
  { thing: "a feather", descriptor: "light", distractors: ["hot", "loud", "sour"] },
  { thing: "a turtle", descriptor: "slow", distractors: ["tiny", "sweet", "cold"] },
];

export const vocabDescribingWords: ProblemGenerator = {
  skillSlug: "g1-vocab-describing-words",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.descriptor },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Which word best describes ${item.thing}?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Picture ${item.thing} in your mind. What is it really like?`,
        `"${item.descriptor}" best describes ${item.thing}.`,
      ],
      explanation: `"${item.descriptor}" best describes ${item.thing}.`,
    };
  },
};
