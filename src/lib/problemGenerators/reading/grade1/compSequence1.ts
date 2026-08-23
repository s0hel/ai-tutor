import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface SequenceItem {
  passage: string;
  question: string;
  correctAnswer: string;
  distractors: [string, string, string];
}

const ITEMS: SequenceItem[] = [
  {
    passage: "First, Mia woke up. Next, she ate eggs. Last, she went to school.",
    question: "What did Mia do first?",
    correctAnswer: "She woke up.",
    distractors: ["She ate eggs.", "She went to school.", "She took a nap."],
  },
  {
    passage: "First, Dad mixed the batter. Next, he poured it in the pan. Last, he baked the cake.",
    question: "What did Dad do last?",
    correctAnswer: "He baked the cake.",
    distractors: ["He mixed the batter.", "He poured the batter in the pan.", "He ate the cake."],
  },
  {
    passage: "First, Leo put on his shoes. Next, he grabbed his ball. Last, he ran outside.",
    question: "What did Leo do next, after putting on his shoes?",
    correctAnswer: "He grabbed his ball.",
    distractors: ["He ran outside.", "He put on his shoes.", "He took a bath."],
  },
  {
    passage: "First, the seed was planted. Next, it got water and sun. Last, a flower bloomed.",
    question: "What happened first?",
    correctAnswer: "The seed was planted.",
    distractors: ["A flower bloomed.", "It got water and sun.", "The seed was eaten."],
  },
  {
    passage: "First, Kim brushed her teeth. Next, she put on her pajamas. Last, she went to bed.",
    question: "What did Kim do last?",
    correctAnswer: "She went to bed.",
    distractors: ["She brushed her teeth.", "She put on her pajamas.", "She ate breakfast."],
  },
];

export const compSequence1: ProblemGenerator = {
  skillSlug: "g1-comp-sequence",
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
        `Look for the words first, next, and last in the story.`,
        `The answer is: ${item.correctAnswer}`,
      ],
      explanation: `${item.question} ${item.correctAnswer}`,
    };
  },
};
