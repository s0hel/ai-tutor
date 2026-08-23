import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface SummarizeItem {
  passage: string;
  correctSummary: string;
  distractors: [string, string, string];
}

const ITEMS: SummarizeItem[] = [
  {
    passage:
      "Every autumn, monarch butterflies travel up to 3,000 miles from Canada and the northern United States to warmer forests in Mexico. No single butterfly makes the whole round trip — it takes several generations, with each new generation continuing the journey their ancestors started.",
    correctSummary:
      "Monarch butterflies migrate thousands of miles to Mexico each autumn, with the journey completed across several generations.",
    distractors: [
      "Monarch butterflies only live in Mexico.",
      "A single monarch butterfly can fly 3,000 miles without stopping.",
      "Monarch butterflies migrate to Canada every winter.",
    ],
  },
  {
    passage:
      "When a town's only bridge collapsed after a flood, residents had to drive an extra hour to reach the nearest hospital or grocery store. Local volunteers organized carpools and a temporary ferry service until repairs were finished six months later.",
    correctSummary:
      "After a flood destroyed a town's bridge, residents organized carpools and a ferry until it was repaired months later.",
    distractors: [
      "The town never repaired its bridge after the flood.",
      "The flood was caused by the bridge collapsing.",
      "Residents moved to a new town after the flood.",
    ],
  },
  {
    passage:
      "Before smartphones, people relied on paper maps and printed directions to find their way while traveling. Getting lost was common, and many drivers kept a stack of maps in their glove compartment just in case. GPS technology changed navigation almost overnight.",
    correctSummary: "GPS technology quickly replaced paper maps as the main way people navigated while traveling.",
    distractors: [
      "Paper maps are still the most popular way to navigate today.",
      "GPS technology was invented before paper maps.",
      "Drivers never got lost before smartphones existed.",
    ],
  },
  {
    passage:
      "A group of students noticed their school was throwing away large amounts of recyclable paper and plastic. They started a recycling club, placed bins in every classroom, and partnered with a local company to collect the materials weekly. Within a year, the school's trash output dropped by nearly a third.",
    correctSummary:
      "Students started a school recycling program that significantly reduced the amount of trash the school produced.",
    distractors: [
      "The school stopped using paper and plastic entirely.",
      "A local company started the recycling club on its own.",
      "The school's trash output stayed the same after one year.",
    ],
  },
  {
    passage:
      "Coral reefs cover less than 1% of the ocean floor but support around a quarter of all marine species. Warming ocean temperatures cause coral bleaching, where corals lose the colorful algae they depend on for food, often leading to their death if conditions don't improve.",
    correctSummary:
      "Coral reefs support huge amounts of marine life but are threatened by warming waters that cause deadly bleaching.",
    distractors: [
      "Coral reefs cover most of the ocean floor.",
      "Coral bleaching makes corals more colorful and healthy.",
      "Warming ocean temperatures have no effect on coral reefs.",
    ],
  },
  {
    passage:
      "When the town library's funding was cut, staff worried they'd have to close entirely. Instead, they held used book sales, hosted paid community events, and recruited volunteers to keep the doors open. Two years later, the library was busier than ever.",
    correctSummary:
      "Facing a funding cut, library staff found creative ways to stay open, and the library ended up thriving.",
    distractors: [
      "The library closed permanently after losing its funding.",
      "The town government restored the library's full funding immediately.",
      "The library stopped hosting community events to save money.",
    ],
  },
];

export const compSummarize: ProblemGenerator = {
  skillSlug: "comp-summarize",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctSummary },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" Which sentence best summarizes the passage?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `A good summary covers the whole passage briefly, without adding anything that wasn't said.`,
        `The best summary is: "${item.correctSummary}"`,
      ],
      explanation: `"${item.correctSummary}" best summarizes the passage's key points without adding false information.`,
    };
  },
};
