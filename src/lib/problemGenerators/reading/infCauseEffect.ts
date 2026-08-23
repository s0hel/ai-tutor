import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface CauseEffectItem {
  passage: string;
  question: string;
  correctAnswer: string;
  distractors: [string, string, string];
}

const ITEMS: CauseEffectItem[] = [
  {
    passage: "Because the road was covered in ice overnight, the school bus arrived twenty minutes late that morning.",
    question: "What was the effect of the icy road?",
    correctAnswer: "The school bus arrived twenty minutes late.",
    distractors: [
      "The road froze overnight.",
      "School was cancelled for the day.",
      "The bus driver took a different route.",
    ],
  },
  {
    passage: "The crops failed after months without rain, so many farmers in the region lost most of their income that year.",
    question: "What caused the farmers to lose most of their income?",
    correctAnswer: "The crops failed due to months without rain.",
    distractors: [
      "The farmers sold their land.",
      "A new tax was placed on crops.",
      "The farmers planted the wrong seeds.",
    ],
  },
  {
    passage: "Since the factory dumped waste into the river for years, the fish population in that area nearly disappeared.",
    question: "What was the effect of the factory dumping waste into the river?",
    correctAnswer: "The fish population in the area nearly disappeared.",
    distractors: [
      "The factory was forced to shut down immediately.",
      "The river changed course.",
      "New fish species moved into the river.",
    ],
  },
  {
    passage: "Because she studied a little bit every night instead of cramming, Priya felt calm and confident on test day.",
    question: "What caused Priya to feel calm and confident on test day?",
    correctAnswer: "She studied a little bit every night instead of cramming.",
    distractors: [
      "The test was easier than expected.",
      "Her teacher gave her extra time.",
      "She had taken the test before.",
    ],
  },
  {
    passage: "The bridge was closed for repairs, so commuters had to take a longer route through downtown every morning.",
    question: "What was the effect of the bridge being closed?",
    correctAnswer: "Commuters had to take a longer route through downtown.",
    distractors: [
      "The bridge collapsed completely.",
      "Downtown traffic disappeared.",
      "The repairs were cancelled.",
    ],
  },
  {
    passage: "Because the invasive plant species spread quickly and had no natural predators, it choked out native plants across the whole valley.",
    question: "What caused the native plants to be choked out across the valley?",
    correctAnswer: "An invasive plant species spread quickly with no natural predators.",
    distractors: [
      "A drought killed the native plants first.",
      "Farmers cleared the valley for crops.",
      "The valley's soil became too rocky.",
    ],
  },
];

export const infCauseEffect: ProblemGenerator = {
  skillSlug: "inf-cause-effect",
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
        `Look for clue words like because, so, or as a result to find the cause-and-effect link.`,
        `The answer is: "${item.correctAnswer}"`,
      ],
      explanation: `"${item.correctAnswer}" is correct based on the cause-and-effect relationship in the passage.`,
    };
  },
};
