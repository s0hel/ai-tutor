import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type POV = "first-person" | "third-person";

interface POVItem {
  passage: string;
  correctPOV: POV;
}

const ITEMS: POVItem[] = [
  {
    passage: "I raced down the hill on my bike, laughing the whole way down.",
    correctPOV: "first-person",
  },
  {
    passage: "She raced down the hill on her bike, laughing the whole way down.",
    correctPOV: "third-person",
  },
  {
    passage: "We built a fort out of blankets and pillows and hid inside it all afternoon.",
    correctPOV: "first-person",
  },
  {
    passage: "They built a fort out of blankets and pillows and hid inside it all afternoon.",
    correctPOV: "third-person",
  },
  {
    passage: "I jumped for joy when I saw my name on the winners' list.",
    correctPOV: "first-person",
  },
  {
    passage: "He jumped for joy when he saw his name on the winners' list.",
    correctPOV: "third-person",
  },
  {
    passage: "My knees were shaking as I walked up to the microphone to give my speech.",
    correctPOV: "first-person",
  },
  {
    passage: "Her knees were shaking as she walked up to the microphone to give her speech.",
    correctPOV: "third-person",
  },
];

export const craftPointOfView3: ProblemGenerator = {
  skillSlug: "g3-craft-point-of-view",
  generate() {
    const item = choice(ITEMS);
    const otherPOV: POV = item.correctPOV === "first-person" ? "third-person" : "first-person";
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctPOV },
      [{ kind: "text" as const, value: otherPOV }]
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" Is this written in first-person or third-person point of view?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look at the pronouns used: I/we point to first-person, he/she/they point to third-person.`,
        `This passage is written in ${item.correctPOV} point of view.`,
      ],
      explanation: `This passage is ${item.correctPOV}, based on the pronouns it uses.`,
    };
  },
};
