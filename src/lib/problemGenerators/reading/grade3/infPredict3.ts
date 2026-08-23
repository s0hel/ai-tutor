import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface PredictItem {
  passage: string;
  correctPrediction: string;
  distractors: [string, string, string];
}

const ITEMS: PredictItem[] = [
  {
    passage:
      "Dark clouds rolled in and thunder rumbled in the distance as the kids raced to gather their beach towels.",
    correctPrediction: "It is about to start raining or storming.",
    distractors: [
      "The sun is about to come out fully.",
      "The kids are about to go swimming.",
      "The beach is about to close for the season.",
    ],
  },
  {
    passage:
      "Lucy had practiced her lines every night for two weeks, and now she stood backstage, peeking out at the crowded seats through the curtain.",
    correctPrediction: "Lucy is about to perform in a play.",
    distractors: [
      "Lucy is about to go on summer vacation.",
      "Lucy is about to start her homework.",
      "Lucy is about to go to sleep.",
    ],
  },
  {
    passage:
      "The little sprout had grown two inches taller this week, stretching its leaves toward the sunny window where it sat.",
    correctPrediction: "The sprout will likely keep growing with more sunlight and water.",
    distractors: [
      "The sprout will shrink back into a seed.",
      "The sprout will turn into a full tree overnight.",
      "The sprout will stop needing water from now on.",
    ],
  },
  {
    passage:
      "The chef tasted the soup, made a face, and reached for more salt, stirring it in before tasting it again.",
    correctPrediction: "The chef is fixing the soup's flavor because something tasted off.",
    distractors: [
      "The chef is about to throw the soup away.",
      "The chef has finished cooking for the day.",
      "The chef is about to serve the soup as-is.",
    ],
  },
  {
    passage:
      "The runners lined up at the starting line, bouncing on their toes, as the crowd grew quiet and the whistle was raised.",
    correctPrediction: "The race is about to begin.",
    distractors: [
      "The race has already finished.",
      "The runners are about to leave the track.",
      "The race has been cancelled.",
    ],
  },
  {
    passage:
      "The battery light on the flashlight started blinking, and it grew dimmer with each passing minute in the dark cave.",
    correctPrediction: "The flashlight is about to go out if the battery isn't replaced.",
    distractors: [
      "The flashlight's battery is completely full.",
      "The flashlight is about to get brighter.",
      "The cave is about to become sunny.",
    ],
  },
];

export const infPredict3: ProblemGenerator = {
  skillSlug: "g3-inf-predict",
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
