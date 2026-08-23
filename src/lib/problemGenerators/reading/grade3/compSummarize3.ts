import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface SummarizeItem {
  passage: string;
  correctSummary: string;
  distractors: [string, string, string];
}

const ITEMS: SummarizeItem[] = [
  {
    passage:
      "Mia's class went on a trip to the zoo. They saw lions napping in the sun, watched monkeys swing between branches, and fed some goats at the petting area. Everyone agreed it was a fun day.",
    correctSummary: "Mia's class had a fun day at the zoo, seeing lions, monkeys, and goats.",
    distractors: [
      "Mia's class stayed at school all day instead of going to the zoo.",
      "The lions at the zoo were awake and running around.",
      "The class was not allowed to feed any animals.",
    ],
  },
  {
    passage:
      "Before bed, Noah brushes his teeth, puts on his pajamas, and reads a chapter of his favorite book. His mom then turns off the light and says goodnight.",
    correctSummary: "Noah follows a bedtime routine of brushing his teeth, changing, and reading before sleep.",
    distractors: [
      "Noah reads his book in the morning instead of at night.",
      "Noah's mom reads the book to him every night.",
      "Noah skips brushing his teeth before bed.",
    ],
  },
  {
    passage:
      "A caterpillar spends weeks eating leaves and growing bigger. Then it forms a hard shell called a chrysalis around itself. Inside, its body slowly changes, and after about two weeks, a butterfly comes out.",
    correctSummary: "A caterpillar eats, forms a chrysalis, and changes into a butterfly over a few weeks.",
    distractors: [
      "A caterpillar turns into a butterfly overnight.",
      "A caterpillar becomes a butterfly without forming a chrysalis.",
      "A butterfly turns back into a caterpillar after a few weeks.",
    ],
  },
  {
    passage:
      "Rosa wanted to earn money for a new bike, so she started walking her neighbor's dog every afternoon. After two months of saving her earnings, she finally had enough money to buy it.",
    correctSummary: "Rosa saved money from walking a dog until she could afford a new bike.",
    distractors: [
      "Rosa's neighbor bought her the bike as a gift.",
      "Rosa earned the money in just one afternoon.",
      "Rosa decided not to buy the bike after saving up.",
    ],
  },
  {
    passage:
      "Ants work together to carry food back to their colony, with each ant able to lift many times its own weight. They leave a scent trail so other ants can follow the same path to the food.",
    correctSummary: "Ants work as a team, using scent trails, to carry food back to their colony.",
    distractors: [
      "Ants always work alone when finding food.",
      "Ants cannot lift more than their own body weight.",
      "Ants do not use any trail to find their way back.",
    ],
  },
  {
    passage:
      "The town built a new playground with slides, swings, and a climbing wall. Kids from the whole neighborhood come after school to play, and parents often meet there to chat while watching their children.",
    correctSummary: "A new neighborhood playground has become a popular spot for kids and parents.",
    distractors: [
      "The new playground has no swings or slides.",
      "Only adults are allowed to use the new playground.",
      "The playground was built but nobody visits it.",
    ],
  },
];

export const compSummarize3: ProblemGenerator = {
  skillSlug: "g3-comp-summarize",
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
      explanation: `"${item.correctSummary}" best summarizes the passage without adding anything false.`,
    };
  },
};
