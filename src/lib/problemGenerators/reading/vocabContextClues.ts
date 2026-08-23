import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface ContextItem {
  sentence: string;
  word: string;
  correctMeaning: string;
  distractors: [string, string, string];
}

const ITEMS: ContextItem[] = [
  {
    sentence: "The ancient castle was dilapidated, with crumbling walls and a caved-in roof.",
    word: "dilapidated",
    correctMeaning: "run-down and falling apart",
    distractors: ["brand new and shiny", "painted bright colors", "surrounded by a moat"],
  },
  {
    sentence: "She was ecstatic when she won first place, jumping and cheering with joy.",
    word: "ecstatic",
    correctMeaning: "extremely happy",
    distractors: ["very tired", "slightly confused", "a little embarrassed"],
  },
  {
    sentence: "The stubborn mule refused to budge no matter how hard they pulled on its rope.",
    word: "budge",
    correctMeaning: "move even a little",
    distractors: ["eat any food", "make a sound", "fall asleep"],
  },
  {
    sentence: "After the marathon, his legs felt so fatigued that he could barely climb the stairs.",
    word: "fatigued",
    correctMeaning: "extremely tired",
    distractors: ["extremely proud", "very hungry", "full of energy"],
  },
  {
    sentence: "The detective was skeptical of the suspect's story, since the details kept changing.",
    word: "skeptical",
    correctMeaning: "doubtful or unconvinced",
    distractors: ["fully convinced", "very impressed", "completely unaware"],
  },
  {
    sentence: "The lecture was so tedious that several students started to doze off.",
    word: "tedious",
    correctMeaning: "boring and long",
    distractors: ["exciting and short", "loud and confusing", "difficult to hear"],
  },
  {
    sentence: "Because the negotiators refused to compromise, the meeting ended without an agreement.",
    word: "compromise",
    correctMeaning: "each side give up something to reach an agreement",
    distractors: ["shout louder than the other side", "leave the meeting early", "agree with everything said"],
  },
  {
    sentence: "The coach was known for his candid feedback, telling players exactly what he thought.",
    word: "candid",
    correctMeaning: "honest and direct",
    distractors: ["quiet and shy", "confusing and vague", "harsh and cruel"],
  },
];

export const vocabContextClues: ProblemGenerator = {
  skillSlug: "vocab-context-clues",
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
        `The sentence describes: ${item.sentence.replace(item.word, "___")} — that context points to "${item.correctMeaning}."`,
      ],
      explanation: `"${item.word}" means "${item.correctMeaning}" based on the clues in the sentence.`,
    };
  },
};
