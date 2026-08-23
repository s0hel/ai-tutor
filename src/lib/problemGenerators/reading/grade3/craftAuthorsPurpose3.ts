import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type Purpose = "to persuade" | "to inform" | "to entertain";
const ALL_PURPOSES: Purpose[] = ["to persuade", "to inform", "to entertain"];

interface PurposeItem {
  passage: string;
  correctPurpose: Purpose;
}

const ITEMS: PurposeItem[] = [
  {
    passage:
      "Caterpillars eat leaves for weeks before forming a chrysalis. Inside, their bodies slowly change. After about two weeks, a butterfly comes out and flies away.",
    correctPurpose: "to inform",
  },
  {
    passage:
      "Our school should start a recycling program. Recycling keeps trash out of landfills and helps protect the planet — it's an easy change that would make a big difference.",
    correctPurpose: "to persuade",
  },
  {
    passage:
      "Pickles the hamster was sure he could escape his cage, until his big plan ended with him stuck headfirst in an empty tissue box, wiggling his tiny legs in the air.",
    correctPurpose: "to entertain",
  },
  {
    passage:
      "An octopus has three hearts and blue blood. It can also squeeze through any gap bigger than its beak, which is the only hard part of its body.",
    correctPurpose: "to inform",
  },
  {
    passage:
      "Kids should be allowed to bring their own snacks to school. Everyone has different favorite foods, and letting kids choose would make lunchtime better for everyone.",
    correctPurpose: "to persuade",
  },
  {
    passage:
      "The grumpy old cat next door secretly loved to dance in the moonlight every night, spinning in circles until he got so dizzy he tumbled straight into a flowerpot.",
    correctPurpose: "to entertain",
  },
];

export const craftAuthorsPurpose3: ProblemGenerator = {
  skillSlug: "g3-craft-authors-purpose",
  generate() {
    const item = choice(ITEMS);
    const distractorPurposes = ALL_PURPOSES.filter((p) => p !== item.correctPurpose);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctPurpose },
      distractorPurposes.map((p) => ({ kind: "text" as const, value: p }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" What is the author's main purpose for writing this?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about the passage: is it giving facts, arguing a point, or telling a fun story?`,
        `The author's purpose here is: ${item.correctPurpose}`,
      ],
      explanation: `The author's purpose is ${item.correctPurpose}, based on the passage's content and tone.`,
    };
  },
};
