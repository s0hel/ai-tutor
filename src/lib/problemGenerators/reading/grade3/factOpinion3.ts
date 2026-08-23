import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type Label = "fact" | "opinion";

interface FactOpinionItem {
  sentence: string;
  correctLabel: Label;
}

const ITEMS: FactOpinionItem[] = [
  { sentence: "A giraffe's neck can be six feet long.", correctLabel: "fact" },
  { sentence: "Giraffes are the coolest animal at the zoo.", correctLabel: "opinion" },
  { sentence: "Ice melts when it gets warm.", correctLabel: "fact" },
  { sentence: "Winter is the best season of the year.", correctLabel: "opinion" },
  { sentence: "A week has seven days.", correctLabel: "fact" },
  { sentence: "Pizza is the tastiest food in the world.", correctLabel: "opinion" },
  { sentence: "Spiders have eight legs.", correctLabel: "fact" },
  { sentence: "Cats make better pets than dogs.", correctLabel: "opinion" },
  { sentence: "The Earth orbits the sun.", correctLabel: "fact" },
  { sentence: "Reading is more fun than watching TV.", correctLabel: "opinion" },
];

export const factOpinion3: ProblemGenerator = {
  skillSlug: "g3-fact-opinion",
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
