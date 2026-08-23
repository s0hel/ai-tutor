import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type Ask = "cause" | "effect";

interface CauseEffectItem {
  passage: string;
  ask: Ask;
  correctAnswer: string;
  distractors: [string, string, string];
}

const ITEMS: CauseEffectItem[] = [
  {
    passage: "It rained all afternoon, so the soccer game was canceled.",
    ask: "effect",
    correctAnswer: "The soccer game was canceled.",
    distractors: ["The sun came out.", "The players practiced extra hard.", "The field was watered by hand."],
  },
  {
    passage: "Ben forgot his umbrella, so he got soaked walking home in the rain.",
    ask: "cause",
    correctAnswer: "Ben forgot his umbrella.",
    distractors: ["Ben walked home slowly.", "Ben's shoes were new.", "Ben stayed inside all day."],
  },
  {
    passage: "The dog barked loudly because a stranger knocked on the front door.",
    ask: "cause",
    correctAnswer: "A stranger knocked on the front door.",
    distractors: ["The dog was hungry.", "The dog wanted to go outside.", "The mail carrier waved from the street."],
  },
  {
    passage: "Emma studied hard for a whole week, so she got the highest score on her spelling test.",
    ask: "effect",
    correctAnswer: "Emma got the highest score on her spelling test.",
    distractors: ["Emma forgot about the test.", "Emma's teacher canceled the test.", "Emma stayed home sick that day."],
  },
  {
    passage: "The ice cream melted quickly because it was left outside on a hot, sunny day.",
    ask: "cause",
    correctAnswer: "It was left outside on a hot, sunny day.",
    distractors: ["It was put in the freezer.", "It was a cloudy, cold day.", "It was inside a cooler with ice packs."],
  },
];

export const compCauseEffect2: ProblemGenerator = {
  skillSlug: "g2-comp-cause-effect",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctAnswer },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );
    const askText = item.ask === "cause" ? "caused this to happen" : "happened because of this";

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" What ${askText}?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        item.ask === "cause"
          ? `Look for the reason WHY something happened — it's often right before the word "so."`
          : `Look for what happened AS A RESULT — it's often right after the word "so."`,
        `The ${item.ask} is: ${item.correctAnswer}`,
      ],
      explanation:
        item.ask === "cause"
          ? `"${item.correctAnswer}" is the cause — it's the reason the other thing happened.`
          : `"${item.correctAnswer}" is the effect — it's what happened as a result.`,
    };
  },
};
