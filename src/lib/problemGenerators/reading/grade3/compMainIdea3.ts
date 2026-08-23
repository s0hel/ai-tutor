import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface MainIdeaItem {
  passage: string;
  correctIdea: string;
  distractors: [string, string, string];
}

const ITEMS: MainIdeaItem[] = [
  {
    passage:
      "Every morning, Leo feeds his dog, fills its water bowl, and takes it for a walk before school. On weekends, he brushes its fur and gives it a bath. Leo's dog is always happy to see him.",
    correctIdea: "Leo takes good care of his dog every day.",
    distractors: [
      "Leo's dog does not like taking baths.",
      "Dogs need to be walked twice a day.",
      "Leo only feeds his dog on weekends.",
    ],
  },
  {
    passage:
      "A group of students planted a garden behind their school. They dug small holes, planted seeds, and watered them each week. A few months later, the garden was full of tomatoes, carrots, and sunflowers.",
    correctIdea: "Students grew a garden at their school by planting and caring for it.",
    distractors: [
      "The garden only grew sunflowers.",
      "The students planted the garden in one day.",
      "The school garden failed to grow anything.",
    ],
  },
  {
    passage:
      "Beavers build dams out of sticks, mud, and rocks to block streams and create ponds. The ponds give beavers a safe place to build their homes, called lodges, away from land animals that might hunt them.",
    correctIdea: "Beavers build dams to make ponds where they can live safely.",
    distractors: [
      "Beavers only build dams in the winter.",
      "Beavers live in trees instead of ponds.",
      "Beavers cannot swim in the ponds they build.",
    ],
  },
  {
    passage:
      "Firefighters train for months learning how to put out fires, rescue people, and drive their big trucks safely. They also practice climbing ladders and using heavy equipment so they're ready for emergencies.",
    correctIdea: "Firefighters train hard so they're prepared to handle emergencies.",
    distractors: [
      "Firefighters only train for one week.",
      "Firefighters never use ladders on the job.",
      "Firefighters do not need to know how to drive trucks.",
    ],
  },
  {
    passage:
      "The class visited an apple orchard, where they learned how apples grow on trees and got to pick their own. Afterward, they watched a worker press apples into fresh juice and each got to taste some.",
    correctIdea: "The class had a fun and educational trip to an apple orchard.",
    distractors: [
      "The class only learned about oranges.",
      "The students were not allowed to pick apples.",
      "The trip lasted an entire week.",
    ],
  },
  {
    passage:
      "Squirrels spend the fall collecting nuts and seeds and burying them in many different spots. When winter comes and food is hard to find, they dig up the buried food to survive the cold months.",
    correctIdea: "Squirrels store food in the fall so they have enough to eat in winter.",
    distractors: [
      "Squirrels sleep through the entire winter.",
      "Squirrels only eat food they find in winter.",
      "Squirrels bury their food in just one spot.",
    ],
  },
];

export const compMainIdea3: ProblemGenerator = {
  skillSlug: "g3-comp-main-idea",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctIdea },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" What is the main idea of this passage?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about what the WHOLE passage is mostly about, not just one detail from it.`,
        `The passage is mainly about: ${item.correctIdea}`,
      ],
      explanation: `The main idea is: "${item.correctIdea}" — it covers what the whole passage is about, not just one detail.`,
    };
  },
};
