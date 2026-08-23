import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type Relation = "synonym" | "antonym";

interface SynAntItem {
  word: string;
  relation: Relation;
  match: string;
  distractors: [string, string, string];
}

const ITEMS: SynAntItem[] = [
  {
    word: "happy",
    relation: "synonym",
    match: "cheerful",
    distractors: ["angry", "tired", "confused"],
  },
  {
    word: "big",
    relation: "antonym",
    match: "small",
    distractors: ["huge", "wide", "tall"],
  },
  {
    word: "fast",
    relation: "synonym",
    match: "quick",
    distractors: ["slow", "loud", "heavy"],
  },
  {
    word: "clean",
    relation: "antonym",
    match: "dirty",
    distractors: ["shiny", "fresh", "neat"],
  },
  {
    word: "brave",
    relation: "synonym",
    match: "courageous",
    distractors: ["scared", "shy", "lazy"],
  },
  {
    word: "loud",
    relation: "antonym",
    match: "quiet",
    distractors: ["noisy", "booming", "cheerful"],
  },
];

export const vocabSynonymsAntonyms3: ProblemGenerator = {
  skillSlug: "g3-vocab-synonyms-antonyms",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.match },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    const relationWord = item.relation === "synonym" ? "almost the same thing as" : "the opposite of";

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Which word is a${item.relation === "antonym" ? "n" : ""} ${item.relation} for "${item.word}" — a word that means ${relationWord} "${item.word}"?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about what "${item.word}" means, then decide if you need a word that means ${relationWord} it.`,
        `"${item.match}" means ${relationWord} "${item.word}."`,
      ],
      explanation: `"${item.match}" is a${item.relation === "antonym" ? "n" : ""} ${item.relation} for "${item.word}" — it means ${relationWord} "${item.word}."`,
    };
  },
};
