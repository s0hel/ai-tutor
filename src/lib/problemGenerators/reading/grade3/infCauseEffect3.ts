import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface CauseEffectItem {
  passage: string;
  question: string;
  correctAnswer: string;
  distractors: [string, string, string];
}

const ITEMS: CauseEffectItem[] = [
  {
    passage: "Because it snowed all night, school was cancelled the next day.",
    question: "What was the effect of the snow?",
    correctAnswer: "School was cancelled.",
    distractors: [
      "It stopped snowing early in the morning.",
      "The kids had to go to school anyway.",
      "The buses were washed and cleaned.",
    ],
  },
  {
    passage: "Ben forgot his umbrella, so he got completely soaked walking home in the rain.",
    question: "What caused Ben to get soaked?",
    correctAnswer: "He forgot his umbrella.",
    distractors: [
      "It was a sunny day outside.",
      "Ben walked home very slowly on purpose.",
      "Ben's mom picked him up in the car.",
    ],
  },
  {
    passage: "The team practiced every single day after school, so they won the championship game.",
    question: "What was the effect of the team practicing every day?",
    correctAnswer: "They won the championship game.",
    distractors: [
      "The team decided to stop playing.",
      "The coach cancelled all future practices.",
      "The team lost the championship game.",
    ],
  },
  {
    passage: "Because the library was quiet, Mia was able to finish her whole book in one afternoon.",
    question: "What caused Mia to finish her book quickly?",
    correctAnswer: "The library was quiet.",
    distractors: [
      "The book was very short.",
      "Mia already knew the story.",
      "The library was closing early.",
    ],
  },
  {
    passage: "Since the road was blocked for construction, the bus had to take a longer route to school.",
    question: "What was the effect of the road being blocked?",
    correctAnswer: "The bus had to take a longer route.",
    distractors: [
      "The construction finished early.",
      "The bus arrived at school early.",
      "The road was completely repaired.",
    ],
  },
  {
    passage: "Because Tom watered his plant every day and gave it plenty of sunlight, it grew tall and healthy.",
    question: "What caused Tom's plant to grow tall and healthy?",
    correctAnswer: "He watered it every day and gave it plenty of sunlight.",
    distractors: [
      "He kept the plant in a dark closet.",
      "He forgot to water it for weeks.",
      "He moved the plant outside in winter.",
    ],
  },
];

export const infCauseEffect3: ProblemGenerator = {
  skillSlug: "g3-inf-cause-effect",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctAnswer },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" ${item.question}`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look for clue words like because, so, or since to find the cause-and-effect link.`,
        `The answer is: "${item.correctAnswer}"`,
      ],
      explanation: `"${item.correctAnswer}" is correct based on the cause-and-effect relationship in the passage.`,
    };
  },
};
