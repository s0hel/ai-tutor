import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface SettingItem {
  passage: string;
  correctSetting: string;
  distractors: [string, string, string];
}

const ITEMS: SettingItem[] = [
  {
    passage: "The kids built a sandcastle and splashed in the waves.",
    correctSetting: "the beach",
    distractors: ["a classroom", "a kitchen", "a forest"],
  },
  {
    passage: "The children read books quietly and picked new ones off the shelves.",
    correctSetting: "the library",
    distractors: ["a playground", "a farm", "a swimming pool"],
  },
  {
    passage: "The cows and chickens walked around while the farmer fed them hay.",
    correctSetting: "the farm",
    distractors: ["the city", "the ocean", "a birthday party"],
  },
  {
    passage: "Kids climbed the slide and swung on the swings after lunch.",
    correctSetting: "the playground",
    distractors: ["the hospital", "a grocery store", "the moon"],
  },
  {
    passage: "The waiter brought pizza to the table while the family talked and laughed.",
    correctSetting: "a restaurant",
    distractors: ["a bedroom", "a garden", "a bus"],
  },
];

export const storySetting1: ProblemGenerator = {
  skillSlug: "g1-story-setting",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctSetting },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" Where does this happen?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look for clue words that tell you the place.`,
        `This happens at ${item.correctSetting}.`,
      ],
      explanation: `This story happens at ${item.correctSetting} — that's the setting.`,
    };
  },
};
