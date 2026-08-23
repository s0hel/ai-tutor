import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface PredictItem {
  passage: string;
  correctPrediction: string;
  distractors: [string, string, string];
}

const ITEMS: PredictItem[] = [
  {
    passage:
      "The storm clouds grew darker and the wind picked up sharply as the campers hurried to zip up their tent and gather loose gear.",
    correctPrediction: "It is about to start raining or storming.",
    distractors: [
      "The sun is about to come out.",
      "The campers are about to go swimming.",
      "The wind is about to completely stop.",
    ],
  },
  {
    passage:
      "Jamal had studied every night for two weeks, reviewed his notes one last time on the bus, and felt his stomach flip nervously as the teacher passed out the test.",
    correctPrediction: "Jamal is about to take an important test.",
    distractors: [
      "Jamal is about to go on summer vacation.",
      "Jamal is about to give a presentation on animals.",
      "Jamal is about to go to sleep.",
    ],
  },
  {
    passage:
      "The seedling had grown two inches taller in a week, its leaves reaching eagerly toward the sunny window where it had been placed.",
    correctPrediction: "The seedling will likely keep growing if it continues getting sunlight and water.",
    distractors: [
      "The seedling will wilt immediately without any reason.",
      "The seedling will turn into a fully grown tree overnight.",
      "The seedling will stop needing sunlight from now on.",
    ],
  },
  {
    passage:
      "The chef tasted the sauce, wrinkled her nose, and reached for the salt and a pinch of sugar, stirring carefully before tasting again.",
    correctPrediction: "The chef is adjusting the sauce's flavor because something tasted off.",
    distractors: [
      "The chef is about to throw the sauce away.",
      "The chef has finished cooking for the day.",
      "The chef is about to serve the sauce as-is.",
    ],
  },
  {
    passage:
      "The runners lined up at the starting blocks, shaking out their arms and legs, as the crowd in the stands grew quiet and the starter raised the flag.",
    correctPrediction: "The race is about to begin.",
    distractors: [
      "The race has just finished.",
      "The runners are about to leave the stadium.",
      "The event has been cancelled.",
    ],
  },
  {
    passage:
      "The battery icon on Elena's phone flashed red, and she frantically searched her bag for a charger while her screen dimmed to save power.",
    correctPrediction: "Elena's phone is about to turn off if she doesn't find a charger soon.",
    distractors: [
      "Elena's phone battery is completely full.",
      "Elena is about to buy a brand new phone.",
      "Elena's phone will charge itself automatically.",
    ],
  },
];

export const infPredict: ProblemGenerator = {
  skillSlug: "inf-predict",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctPrediction },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" What will most likely happen next?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look at the clues given — what do they logically lead to next?`,
        `The most sensible prediction is: "${item.correctPrediction}"`,
      ],
      explanation: `"${item.correctPrediction}" is the prediction that best fits the clues in the passage.`,
    };
  },
};
