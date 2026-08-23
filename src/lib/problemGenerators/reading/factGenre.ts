import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

type Genre = "fiction" | "nonfiction";

interface GenreItem {
  passage: string;
  correctGenre: Genre;
}

const ITEMS: GenreItem[] = [
  {
    passage:
      "Honeybees communicate the location of food to other bees through a movement called the waggle dance, which encodes both distance and direction from the hive.",
    correctGenre: "nonfiction",
  },
  {
    passage:
      "One morning, Lily woke up to find her pet hamster had grown as big as a horse and was now blocking her bedroom door, munching happily on her homework.",
    correctGenre: "fiction",
  },
  {
    passage:
      "The Wright brothers achieved the first powered airplane flight in 1903 in Kitty Hawk, North Carolina, with a flight that lasted just 12 seconds.",
    correctGenre: "nonfiction",
  },
  {
    passage:
      "Deep beneath the old oak tree, a tiny door creaked open, and out marched an army of acorn-sized knights ready to defend their kingdom from a mischievous squirrel.",
    correctGenre: "fiction",
  },
  {
    passage:
      "Mount Everest, located in the Himalayas, stands at 29,032 feet and is the tallest mountain above sea level on Earth. Climbers face extreme cold and low oxygen levels near the summit.",
    correctGenre: "nonfiction",
  },
  {
    passage:
      "The old lighthouse keeper's lantern began to glow blue whenever a storm was coming, a secret only the town's stray cats seemed to understand.",
    correctGenre: "fiction",
  },
  {
    passage:
      "Marie Curie was the first person to win Nobel Prizes in two different scientific fields, physics and chemistry, for her research on radioactivity.",
    correctGenre: "nonfiction",
  },
  {
    passage:
      "When the clock struck midnight, every toy in the shop window came to life, and the wooden soldiers began marching in perfect formation down the aisle.",
    correctGenre: "fiction",
  },
];

export const factGenre: ProblemGenerator = {
  skillSlug: "fact-genre",
  generate() {
    const item = choice(ITEMS);
    const otherGenre: Genre = item.correctGenre === "fiction" ? "nonfiction" : "fiction";
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctGenre },
      [{ kind: "text" as const, value: otherGenre }]
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" Is this passage fiction or nonfiction?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Nonfiction is about real facts, people, or events. Fiction is made up, even if it feels realistic.`,
        `This passage is ${item.correctGenre}.`,
      ],
      explanation: `This passage is ${item.correctGenre}, based on whether it describes real facts or made-up events.`,
    };
  },
};
