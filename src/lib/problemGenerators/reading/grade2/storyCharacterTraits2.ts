import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface TraitItem {
  passage: string;
  correctTrait: string;
  distractors: [string, string, string];
}

const ITEMS: TraitItem[] = [
  {
    passage:
      "When Jake saw a classmate forgot their lunch, he split his sandwich in half and gave a piece away without being asked.",
    correctTrait: "generous",
    distractors: ["selfish", "shy", "grumpy"],
  },
  {
    passage:
      "Even though the dog looked scary, Ana walked right up to it slowly, spoke in a calm voice, and gently checked its collar for a name tag.",
    correctTrait: "brave",
    distractors: ["fearful", "careless", "lazy"],
  },
  {
    passage:
      "At the new museum, Leo asked the tour guide question after question, peeked behind every exhibit sign, and wanted to know how everything worked.",
    correctTrait: "curious",
    distractors: ["bored", "rude", "sleepy"],
  },
  {
    passage:
      "Even after knocking over the block tower three times, Priya took a deep breath and kept rebuilding it until it finally stood tall.",
    correctTrait: "patient",
    distractors: ["impatient", "careless", "unfriendly"],
  },
  {
    passage:
      "Tom noticed a new kid sitting alone at recess, so he walked over, introduced himself, and invited the kid to play tag with his friends.",
    correctTrait: "friendly",
    distractors: ["unkind", "nervous", "quiet"],
  },
];

export const storyCharacterTraits2: ProblemGenerator = {
  skillSlug: "g2-story-characters-traits",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctTrait },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" Which word best describes this character?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about what the character DID, not just how the story feels.`,
        `The character's actions show that they are ${item.correctTrait}.`,
      ],
      explanation: `The character is ${item.correctTrait} — their actions in the passage show this trait.`,
    };
  },
};
