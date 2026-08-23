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
      "Every morning, Mia waters her little tomato plant and checks it for new leaves. She writes down how tall it grows each week in a notebook. After many weeks, her plant was covered in bright red tomatoes.",
    correctIdea: "Mia took care of her plant every day and watched it grow.",
    distractors: [
      "Mia only likes to eat tomatoes.",
      "Plants grow taller in a notebook.",
      "Mia's plant grew overnight.",
    ],
  },
  {
    passage:
      "On Saturday, a group of kids met at the park to pick up trash. They filled three big bags with bottles and wrappers. When they finished, the park looked clean and everyone felt proud.",
    correctIdea: "A group of kids worked together to clean up the park.",
    distractors: [
      "The kids only picked up bottles, not wrappers.",
      "The park was already clean before they arrived.",
      "The kids met at the park to play games.",
    ],
  },
  {
    passage:
      "Ben was nervous about his first day at a new school. He worried he wouldn't make any friends. But at lunch, a boy named Theo invited him to sit at his table, and soon they were laughing together.",
    correctIdea: "Ben was nervous about his new school, but he made a friend.",
    distractors: [
      "Ben decided not to go to his new school.",
      "Theo was also new to the school.",
      "Ben ate lunch alone every day.",
    ],
  },
  {
    passage:
      "Ants work together to build their homes underground. Some ants dig tunnels, some carry food, and others protect the group from danger. Each ant has a job that helps the whole colony survive.",
    correctIdea: "Ants work together, each with their own job, to help their colony survive.",
    distractors: [
      "Every ant in a colony does the exact same job.",
      "Ants build their homes above ground in trees.",
      "Only one ant works while the others rest.",
    ],
  },
  {
    passage:
      "The library added a cozy reading corner with soft pillows and colorful rugs. Kids can now sit there and read their favorite books after school. Since it opened, more students have been visiting the library.",
    correctIdea: "A new cozy reading corner made more kids want to visit the library.",
    distractors: [
      "The library removed all of its books.",
      "The reading corner is only for teachers.",
      "Kids stopped visiting the library after school.",
    ],
  },
];

export const compMainIdea2: ProblemGenerator = {
  skillSlug: "g2-comp-main-idea",
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
        `Think about what the WHOLE passage is mostly about, not just one small detail from it.`,
        `The passage is mainly about: ${item.correctIdea}`,
      ],
      explanation: `The main idea is: "${item.correctIdea}" — it captures what the whole passage is about, not just a single detail.`,
    };
  },
};
