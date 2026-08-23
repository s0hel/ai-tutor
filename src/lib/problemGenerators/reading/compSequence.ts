import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface SequenceItem {
  passage: string;
  question: string;
  correctEvent: string;
  distractors: [string, string, string];
}

const ITEMS: SequenceItem[] = [
  {
    passage:
      "First, the caterpillar spends weeks eating leaves and growing larger. Next, it forms a hard case called a chrysalis around itself. Inside the chrysalis, its body slowly changes shape over about two weeks. Finally, a fully formed butterfly emerges and spreads its wings to dry.",
    question: "What happens right after the caterpillar forms its chrysalis?",
    correctEvent: "Its body slowly changes shape inside the chrysalis.",
    distractors: [
      "The caterpillar spends weeks eating leaves.",
      "A butterfly emerges and spreads its wings.",
      "The caterpillar grows much larger than before.",
    ],
  },
  {
    passage:
      "To bake the bread, Grandpa first mixed flour, water, yeast, and salt into a shaggy dough. Then he kneaded the dough for ten minutes until it was smooth. After that, he let it rise for an hour under a warm towel. Finally, he shaped it into a loaf and baked it until golden brown.",
    question: "What did Grandpa do right after kneading the dough?",
    correctEvent: "He let it rise for an hour under a warm towel.",
    distractors: [
      "He mixed flour, water, yeast, and salt.",
      "He shaped the dough into a loaf.",
      "He baked the bread until golden brown.",
    ],
  },
  {
    passage:
      "The rocket launch began with engineers running a final systems check. Once everything was confirmed safe, the countdown started. At zero, the engines ignited and the rocket lifted off the pad. Minutes later, it separated from its boosters high above the atmosphere.",
    question: "What happened immediately before the engines ignited?",
    correctEvent: "The countdown started.",
    distractors: [
      "Engineers ran a final systems check.",
      "The rocket separated from its boosters.",
      "The rocket reached high above the atmosphere.",
    ],
  },
  {
    passage:
      "During the science fair project, Jamal first researched how plants use sunlight. Next, he planted three identical seeds in different amounts of light. Over three weeks, he measured and recorded each plant's height. Finally, he compared the results and wrote his conclusion.",
    question: "What did Jamal do right after researching how plants use sunlight?",
    correctEvent: "He planted three identical seeds in different amounts of light.",
    distractors: [
      "He wrote his conclusion.",
      "He measured and recorded each plant's height.",
      "He compared the final results.",
    ],
  },
  {
    passage:
      "Building the sandcastle, the kids first dug a wide, flat base and packed the sand down firmly. Then they used buckets to form towers on each corner. After that, they carved windows and doors with a plastic spoon. Last, they decorated the walls with shells they'd collected.",
    question: "What did the kids do right after packing down the base?",
    correctEvent: "They used buckets to form towers on each corner.",
    distractors: [
      "They decorated the walls with shells.",
      "They carved windows and doors.",
      "They dug a wide, flat base.",
    ],
  },
  {
    passage:
      "To get the old bicycle running again, Priya first cleaned off years of rust with a wire brush. Next, she oiled the chain and gears until they moved smoothly. After that, she pumped up both tires. Finally, she took it for a test ride around the block.",
    question: "What did Priya do right after oiling the chain and gears?",
    correctEvent: "She pumped up both tires.",
    distractors: [
      "She cleaned off years of rust.",
      "She took it for a test ride.",
      "She bought a brand new bicycle.",
    ],
  },
];

export const compSequence: ProblemGenerator = {
  skillSlug: "comp-sequence",
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
