import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface MainIdeaItem {
  passage: string;
  correctIdea: string;
  distractors: [string, string, string];
}

const ITEMS: MainIdeaItem[] = [
  {
    passage: "Sam has a red ball. He kicks it in the park. Sam has fun.",
    correctIdea: "Sam plays with his ball and has fun.",
    distractors: ["Sam lost his ball.", "Sam does not like the park.", "Sam is sleeping at home."],
  },
  {
    passage: "Mom bakes cookies. The kitchen smells sweet. Everyone wants one.",
    correctIdea: "Mom bakes yummy cookies that everyone wants.",
    distractors: ["Mom is cleaning the kitchen.", "The cookies taste bad.", "No one is home."],
  },
  {
    passage: "Ana waters the plant every day. The plant grows tall. Ana is proud.",
    correctIdea: "Ana takes care of her plant and it grows.",
    distractors: ["Ana forgets about her plant.", "The plant dies.", "Ana plants a tree in the yard."],
  },
  {
    passage: "The puppy runs after the ball. It wags its tail. The puppy is happy.",
    correctIdea: "A puppy has fun playing with a ball.",
    distractors: ["The puppy is sleeping.", "The puppy is scared of the ball.", "The puppy runs away from home."],
  },
  {
    passage: "Ben packs his bag. He puts in his lunch and books. Ben is ready for school.",
    correctIdea: "Ben gets ready to go to school.",
    distractors: ["Ben is going to the beach.", "Ben forgets his lunch.", "Ben stays home all day."],
  },
];

export const compMainIdea1: ProblemGenerator = {
  skillSlug: "g1-comp-main-idea",
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
        instruction: `Read this: "${item.passage}" What is this mostly about?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about what the WHOLE story is about, not just one small part.`,
        `This story is mostly about: ${item.correctIdea}`,
      ],
      explanation: `This story is mostly about: "${item.correctIdea}"`,
    };
  },
};
