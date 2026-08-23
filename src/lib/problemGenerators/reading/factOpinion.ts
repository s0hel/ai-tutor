import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

type Label = "fact" | "opinion";

interface FactOpinionItem {
  sentence: string;
  correctLabel: Label;
}

const ITEMS: FactOpinionItem[] = [
  { sentence: "The Great Wall of China is over 13,000 miles long.", correctLabel: "fact" },
  { sentence: "The Great Wall of China is the most amazing structure ever built.", correctLabel: "opinion" },
  { sentence: "Water boils at 100 degrees Celsius at sea level.", correctLabel: "fact" },
  { sentence: "Summer is the best season of the year.", correctLabel: "opinion" },
  { sentence: "The Amazon rainforest produces about 20% of the world's oxygen.", correctLabel: "fact" },
  { sentence: "Chocolate ice cream tastes better than vanilla.", correctLabel: "opinion" },
  { sentence: "Sharks have existed on Earth for over 400 million years.", correctLabel: "fact" },
  { sentence: "Dogs make better pets than cats.", correctLabel: "opinion" },
  { sentence: "The human body has 206 bones as an adult.", correctLabel: "fact" },
  { sentence: "Reading books is more fun than watching movies.", correctLabel: "opinion" },
  { sentence: "Mount Everest is the tallest mountain above sea level on Earth.", correctLabel: "fact" },
  { sentence: "Soccer is the most exciting sport to watch.", correctLabel: "opinion" },
];

export const factOpinion: ProblemGenerator = {
  skillSlug: "fact-opinion",
  generate() {
    const item = choice(ITEMS);
    const otherLabel: Label = item.correctLabel === "fact" ? "opinion" : "fact";
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctLabel },
      [{ kind: "text" as const, value: otherLabel }]
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Is this sentence a fact or an opinion: "${item.sentence}"?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `A fact can be proven true or false. An opinion is what someone thinks or feels, and can't be proven.`,
        `This sentence is a${item.correctLabel === "opinion" ? "n" : ""} ${item.correctLabel}.`,
      ],
      explanation: `This sentence is a${item.correctLabel === "opinion" ? "n" : ""} ${item.correctLabel}.`,
    };
  },
};
