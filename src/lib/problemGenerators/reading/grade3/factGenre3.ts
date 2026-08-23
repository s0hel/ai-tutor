import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type Genre = "fairy tale" | "biography" | "mystery" | "how-to guide";
const ALL_GENRES: Genre[] = ["fairy tale", "biography", "mystery", "how-to guide"];

interface GenreItem {
  description: string;
  correctGenre: Genre;
}

const ITEMS: GenreItem[] = [
  {
    description:
      "A princess must find a way to break a witch's spell before the last petal falls from a magic rose.",
    correctGenre: "fairy tale",
  },
  {
    description:
      "This tells the real story of a scientist's childhood, her years of hard work, and the famous discovery she made as an adult.",
    correctGenre: "biography",
  },
  {
    description:
      "A valuable painting vanishes from the museum overnight, and a detective must gather clues to figure out who took it.",
    correctGenre: "mystery",
  },
  {
    description:
      "Follow these five simple steps to fold a paper airplane that can fly across the room.",
    correctGenre: "how-to guide",
  },
  {
    description:
      "A poor woodcutter's son outsmarts a giant and climbs down a magic beanstalk with a bag of gold.",
    correctGenre: "fairy tale",
  },
  {
    description:
      "This describes the real life of a famous inventor, from his first experiments as a boy to the machines he built as a grown man.",
    correctGenre: "biography",
  },
  {
    description:
      "Muddy footprints lead from the broken window to the garden shed, and only one person in the house has boots that size.",
    correctGenre: "mystery",
  },
  {
    description:
      "First gather flour, sugar, and eggs. Next, mix them together. Then pour the batter into a pan and bake for twenty minutes.",
    correctGenre: "how-to guide",
  },
];

export const factGenre3: ProblemGenerator = {
  skillSlug: "g3-fact-genre",
  generate() {
    const item = choice(ITEMS);
    const distractorGenres = ALL_GENRES.filter((g) => g !== item.correctGenre);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctGenre },
      distractorGenres.map((g) => ({ kind: "text" as const, value: g }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this description: "${item.description}" Which genre does this passage belong to?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about the clues: is it a made-up magical story, a real person's life, a puzzle to solve, or a set of steps?`,
        `This description matches the genre: ${item.correctGenre}`,
      ],
      explanation: `This passage is a ${item.correctGenre}, based on the clues in the description.`,
    };
  },
};
