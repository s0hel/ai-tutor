import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface SightWordItem {
  sentence: string;
  missingWord: string;
  distractors: [string, string, string];
}

const ITEMS: SightWordItem[] = [
  { sentence: "___ dog can run fast.", missingWord: "The", distractors: ["Was", "Said", "Have"] },
  { sentence: "I like cats ___ dogs.", missingWord: "and", distractors: ["said", "was", "the"] },
  { sentence: "She ___ hello to me.", missingWord: "said", distractors: ["and", "have", "the"] },
  { sentence: "He ___ happy this morning.", missingWord: "was", distractors: ["said", "and", "have"] },
  { sentence: "I ___ a new book.", missingWord: "have", distractors: ["was", "the", "said"] },
];

export const sightWords: ProblemGenerator = {
  skillSlug: "g1-sight-words",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.missingWord },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Which word goes in the blank? "${item.sentence}"`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Read the sentence and think about which word sounds right in the blank.`,
        `The word "${item.missingWord}" goes in the blank.`,
      ],
      explanation: `"${item.missingWord}" is the word that fits: "${item.sentence.replace("___", item.missingWord)}"`,
    };
  },
};
