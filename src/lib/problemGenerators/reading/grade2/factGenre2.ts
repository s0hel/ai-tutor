import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type Ask = "fiction" | "nonfiction";

interface GenreItem {
  ask: Ask;
  correctDescription: string;
  distractors: [string, string, string];
}

const ITEMS: GenreItem[] = [
  {
    ask: "fiction",
    correctDescription: "A dragon learns to fly and helps a lost fairy find her way home.",
    distractors: [
      "A book explains how caterpillars turn into butterflies.",
      "An article describes how bees make honey.",
      "A page tells the true story of the first trip to the Moon.",
    ],
  },
  {
    ask: "nonfiction",
    correctDescription: "A book explains how caterpillars change into butterflies over several weeks.",
    distractors: [
      "A talking rabbit learns a magic spell to fly to the Moon.",
      "A girl discovers a hidden door that leads to a candy kingdom.",
      "A friendly dragon teaches a village of mice how to swim.",
    ],
  },
  {
    ask: "fiction",
    correctDescription: "A girl discovers a hidden door in her closet that leads to a candy kingdom.",
    distractors: [
      "A page explains the water cycle, from rain to rivers to oceans.",
      "An article describes how volcanoes form and erupt.",
      "A book lists facts about different kinds of sharks.",
    ],
  },
  {
    ask: "nonfiction",
    correctDescription: "An article describes how volcanoes form and why they erupt.",
    distractors: [
      "A wizard turns a pumpkin into a flying carriage.",
      "A talking dog solves mysteries with his best human friend.",
      "A robot travels back in time to meet dinosaurs.",
    ],
  },
  {
    ask: "fiction",
    correctDescription: "A robot travels back in time and becomes friends with a group of dinosaurs.",
    distractors: [
      "A book lists facts about different kinds of sharks and where they live.",
      "An article explains how plants use sunlight to make food.",
      "A page describes the life cycle of a frog, from egg to adult.",
    ],
  },
];

export const factGenre2: ProblemGenerator = {
  skillSlug: "g2-fact-genre",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctDescription },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );
    const askText =
      item.ask === "fiction" ? "FICTION — a made-up story" : "NONFICTION — true, real information";

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Which of these is ${askText}?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        item.ask === "fiction"
          ? `Fiction comes from someone's imagination — look for something that couldn't really happen.`
          : `Nonfiction is about real facts — look for something that is actually true.`,
        `"${item.correctDescription}" is ${item.ask}.`,
      ],
      explanation:
        item.ask === "fiction"
          ? `"${item.correctDescription}" is fiction — it's a made-up story that couldn't really happen. The others are nonfiction, since they describe real, true information.`
          : `"${item.correctDescription}" is nonfiction — it describes real, true information. The others are fiction, since they're made-up stories.`,
    };
  },
};
