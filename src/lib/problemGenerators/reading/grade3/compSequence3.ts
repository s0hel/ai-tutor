import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface SequenceItem {
  passage: string;
  question: string;
  correctEvent: string;
  distractors: [string, string, string];
}

const ITEMS: SequenceItem[] = [
  {
    passage:
      "First, Mia planted the seeds in a small pot. Next, she watered them every day. Then she set the pot on a sunny windowsill. Finally, tiny green sprouts popped up out of the soil.",
    question: "What did Mia do right after planting the seeds?",
    correctEvent: "She watered them every day.",
    distractors: [
      "Tiny green sprouts popped up.",
      "She set the pot on a sunny windowsill.",
      "She bought a new pot for the seeds.",
    ],
  },
  {
    passage:
      "To make a sandwich, Jake first laid out two slices of bread. Next, he spread peanut butter on one slice. Then he added a layer of jelly. Finally, he pressed the two slices together.",
    question: "What did Jake do right after spreading the peanut butter?",
    correctEvent: "He added a layer of jelly.",
    distractors: [
      "He laid out two slices of bread.",
      "He pressed the two slices together.",
      "He cut the sandwich in half.",
    ],
  },
  {
    passage:
      "The school day started with everyone lining up outside. Then the class walked in and hung up their coats. After that, they sat down for morning circle time. Finally, they started their math lesson.",
    question: "What happened right before morning circle time?",
    correctEvent: "The class hung up their coats.",
    distractors: [
      "Everyone lined up outside.",
      "The class started their math lesson.",
      "The class went outside for recess.",
    ],
  },
  {
    passage:
      "Building a snowman, the kids first rolled a big ball of snow for the bottom. Next, they stacked a medium ball on top. Then they added a small ball for the head. Finally, they added a carrot nose and buttons.",
    question: "What did the kids do right after stacking the medium ball?",
    correctEvent: "They added a small ball for the head.",
    distractors: [
      "They rolled a big ball of snow.",
      "They added a carrot nose and buttons.",
      "They went inside to warm up.",
    ],
  },
  {
    passage:
      "For the science project, Ben first picked a topic about plants. Next, he gathered soil, seeds, and a cup. Then he planted the seeds and watered them. Finally, he wrote down what he saw each day.",
    question: "What did Ben do right after gathering his materials?",
    correctEvent: "He planted the seeds and watered them.",
    distractors: [
      "He picked a topic about plants.",
      "He wrote down what he saw each day.",
      "He bought a new notebook.",
    ],
  },
  {
    passage:
      "To wash the car, Dad first sprayed it with the hose. Next, he scrubbed it with soap and a sponge. Then he rinsed off all the soap. Finally, he dried it with a towel until it shined.",
    question: "What did Dad do right after scrubbing the car with soap?",
    correctEvent: "He rinsed off all the soap.",
    distractors: [
      "He sprayed the car with the hose.",
      "He dried the car with a towel.",
      "He parked the car in the garage.",
    ],
  },
];

export const compSequence3: ProblemGenerator = {
  skillSlug: "g3-comp-sequence",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctEvent },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" ${item.question}`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look for time-order clue words like first, next, then, after, and finally.`,
        `The event that comes right after is: "${item.correctEvent}"`,
      ],
      explanation: `"${item.correctEvent}" is the event that happens at that point in the sequence.`,
    };
  },
};
