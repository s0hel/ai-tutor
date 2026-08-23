import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface ContextItem {
  sentence: string;
  word: string;
  correctMeaning: string;
  distractors: [string, string, string];
}

const ITEMS: ContextItem[] = [
  {
    sentence: "The soup was scalding, so Ana blew on it before taking a bite.",
    word: "scalding",
    correctMeaning: "very hot",
    distractors: ["very cold", "very sweet", "very salty"],
  },
  {
    sentence: "The puppy was exhausted after playing all day and fell asleep instantly.",
    word: "exhausted",
    correctMeaning: "very tired",
    distractors: ["very hungry", "very excited", "very scared"],
  },
  {
    sentence: "The tiny kitten looked timid, hiding behind the couch whenever a stranger walked in.",
    word: "timid",
    correctMeaning: "shy or afraid",
    distractors: ["loud and playful", "very hungry", "extremely fast"],
  },
  {
    sentence: "The old bike was rusty, with orange flakes covering the handlebars and wheels.",
    word: "rusty",
    correctMeaning: "covered in rust from age",
    distractors: ["shiny and new", "painted bright colors", "missing its wheels"],
  },
  {
    sentence: "Grandma's cookies smelled delicious, filling the whole kitchen with a sweet, warm scent.",
    word: "delicious",
    correctMeaning: "tasting or smelling really good",
    distractors: ["tasting really bad", "smelling like nothing", "feeling very cold"],
  },
  {
    sentence: "The classroom was silent while everyone worked quietly on their spelling test.",
    word: "silent",
    correctMeaning: "completely quiet",
    distractors: ["very loud", "very messy", "very crowded"],
  },
];

export const vocabContextClues3: ProblemGenerator = {
  skillSlug: "g3-vocab-context-clues",
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
        instruction: `Read this sentence: "${item.sentence}" What does the word "${item.word}" most likely mean?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look at the other words in the sentence around "${item.word}" for clues about its meaning.`,
        `The sentence describes: ${item.sentence.replace(item.word, "___")} — that clue points to "${item.correctMeaning}."`,
      ],
      explanation: `"${item.word}" means "${item.correctMeaning}" based on the clues in the sentence.`,
    };
  },
};
