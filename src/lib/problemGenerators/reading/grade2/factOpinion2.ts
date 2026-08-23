import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type Ask = "fact" | "opinion";

interface FactOpinionItem {
  ask: Ask;
  correctStatement: string;
  distractors: [string, string, string];
}

const ITEMS: FactOpinionItem[] = [
  {
    ask: "fact",
    correctStatement: "Dogs have four legs.",
    distractors: [
      "Dogs are the best pets in the world.",
      "Dogs are cuter than cats.",
      "Dogs are more fun than any other animal.",
    ],
  },
  {
    ask: "opinion",
    correctStatement: "Pizza tastes better than tacos.",
    distractors: [
      "A week has seven days.",
      "The Earth orbits the Sun.",
      "Elephants are the largest land animals.",
    ],
  },
  {
    ask: "fact",
    correctStatement: "A week has seven days.",
    distractors: [
      "Summer is the most fun season of the year.",
      "Mondays are the worst day of the week.",
      "Weekends should be longer than weekdays.",
    ],
  },
  {
    ask: "opinion",
    correctStatement: "Reading is more boring than watching TV.",
    distractors: [
      "Elephants are the largest land animals.",
      "The Earth orbits the Sun.",
      "A triangle has three sides.",
    ],
  },
  {
    ask: "fact",
    correctStatement: "A triangle has three sides.",
    distractors: [
      "Math is harder than reading.",
      "Triangles are the prettiest shape.",
      "Everyone should like math class.",
    ],
  },
];

export const factOpinion2: ProblemGenerator = {
  skillSlug: "g2-fact-opinion",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctStatement },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );
    const askText = item.ask === "fact" ? "a FACT — something that can be proven true" : "an OPINION — something someone thinks or feels";

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Which of these sentences is ${askText}?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        item.ask === "fact"
          ? `A fact can be checked and proven true. Look for the sentence that isn't just someone's feeling.`
          : `An opinion is what someone thinks or feels. Look for the sentence that isn't something you could prove.`,
        `"${item.correctStatement}" is the ${item.ask}.`,
      ],
      explanation:
        item.ask === "fact"
          ? `"${item.correctStatement}" is a fact — it can be proven true. The others are opinions, since they're just what someone thinks or feels.`
          : `"${item.correctStatement}" is an opinion — it's what someone thinks or feels. The others are facts, since they can be proven true.`,
    };
  },
};
