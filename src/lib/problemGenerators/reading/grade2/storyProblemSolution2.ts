import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type Ask = "problem" | "solution";

interface ProblemSolutionItem {
  passage: string;
  ask: Ask;
  correctAnswer: string;
  distractors: [string, string, string];
}

const ITEMS: ProblemSolutionItem[] = [
  {
    passage:
      "Nina lost her favorite dog at the park. She made signs with her dog's picture and taped them to trees around the neighborhood. The next day, a kind neighbor called and brought the dog home.",
    ask: "solution",
    correctAnswer: "Nina made signs, and a neighbor brought her dog back.",
    distractors: [
      "Nina's dog ran away from home.",
      "Nina got a brand new dog.",
      "Nina stopped looking for her dog.",
    ],
  },
  {
    passage:
      "Carlos couldn't reach the top shelf to get his favorite book. He tried jumping, but it didn't work. Finally, he dragged over a small step stool and climbed up to grab the book.",
    ask: "problem",
    correctAnswer: "Carlos couldn't reach the top shelf to get his book.",
    distractors: [
      "Carlos didn't know how to read the book.",
      "Carlos lost his favorite book.",
      "Carlos's step stool was broken.",
    ],
  },
  {
    passage:
      "The class garden was full of weeds, and the vegetables weren't growing well. The students took turns pulling weeds every morning before class, and soon the vegetables grew big and healthy.",
    ask: "solution",
    correctAnswer: "The students pulled the weeds every morning until the vegetables grew well.",
    distractors: [
      "The students stopped taking care of the garden.",
      "The teacher planted a brand new garden.",
      "The weeds grew even bigger than before.",
    ],
  },
  {
    passage:
      "Zoe's bike had a flat tire the morning of the big race. She didn't want to miss it, so she borrowed her brother's bike and made it to the starting line just in time.",
    ask: "problem",
    correctAnswer: "Zoe's bike had a flat tire the morning of the race.",
    distractors: [
      "Zoe didn't want to race that day.",
      "Zoe's brother lost his bike.",
      "Zoe missed the race completely.",
    ],
  },
  {
    passage:
      "During the picnic, ants kept crawling onto the food on the blanket. The family moved the blanket onto the wooden picnic table instead, and the ants stopped bothering their lunch.",
    ask: "solution",
    correctAnswer: "The family moved the blanket onto the picnic table to keep the ants away.",
    distractors: [
      "The family packed up and went home early.",
      "The family let the ants eat their lunch.",
      "The family sprayed the ants with water.",
    ],
  },
];

export const storyProblemSolution2: ProblemGenerator = {
  skillSlug: "g2-story-problem-solution",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctAnswer },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );
    const askText = item.ask === "problem" ? "the problem in this story" : "how the problem was solved";

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" What is ${askText}?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        item.ask === "problem"
          ? `Look for what's going wrong or what the character is struggling with at the start.`
          : `Look for what the character DID to fix the problem.`,
        `The ${item.ask} is: ${item.correctAnswer}`,
      ],
      explanation:
        item.ask === "problem"
          ? `"${item.correctAnswer}" is the problem — it's what the character needed to fix.`
          : `"${item.correctAnswer}" is the solution — it's how the character fixed the problem.`,
    };
  },
};
