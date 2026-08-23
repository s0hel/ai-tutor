import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

type POV = "first-person" | "third-person";

interface POVItem {
  passage: string;
  correctPOV: POV;
}

const ITEMS: POVItem[] = [
  {
    passage: "I ran as fast as I could to catch the bus, my backpack bouncing wildly against my shoulders.",
    correctPOV: "first-person",
  },
  {
    passage: "She ran as fast as she could to catch the bus, her backpack bouncing wildly against her shoulders.",
    correctPOV: "third-person",
  },
  {
    passage: "We spent the whole afternoon building a treehouse, arguing over whose idea it was to add a rope ladder.",
    correctPOV: "first-person",
  },
  {
    passage: "They spent the whole afternoon building a treehouse, arguing over whose idea it was to add a rope ladder.",
    correctPOV: "third-person",
  },
  {
    passage: "I couldn't believe my eyes when I opened the box and saw the puppy staring back up at me.",
    correctPOV: "first-person",
  },
  {
    passage: "He couldn't believe his eyes when he opened the box and saw the puppy staring back up at him.",
    correctPOV: "third-person",
  },
  {
    passage: "My hands were shaking as I stepped onto the stage, but the moment the music started, my nerves disappeared.",
    correctPOV: "first-person",
  },
  {
    passage: "Her hands were shaking as she stepped onto the stage, but the moment the music started, her nerves disappeared.",
    correctPOV: "third-person",
  },
];

export const craftPointOfView: ProblemGenerator = {
  skillSlug: "craft-point-of-view",
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
