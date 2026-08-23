import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

type Purpose = "to persuade" | "to inform" | "to entertain";
const ALL_PURPOSES: Purpose[] = ["to persuade", "to inform", "to entertain"];

interface PurposeItem {
  passage: string;
  correctPurpose: Purpose;
}

const ITEMS: PurposeItem[] = [
  {
    passage:
      "Volcanoes form when magma pushes up through cracks in the Earth's crust. There are over 1,500 potentially active volcanoes worldwide, and scientists monitor them using seismographs to detect warning signs before an eruption.",
    correctPurpose: "to inform",
  },
  {
    passage:
      "Every student deserves at least thirty minutes of recess a day. Physical activity improves focus, reduces stress, and helps kids build social skills — our school should bring back the extra recess period it cut last year.",
    correctPurpose: "to persuade",
  },
  {
    passage:
      "Waddles the penguin was convinced he was the fastest bird in the zoo, until the day a flamingo challenged him to a race across the pond — and Waddles belly-flopped straight into the water to everyone's laughter.",
    correctPurpose: "to entertain",
  },
  {
    passage:
      "The human heart beats about 100,000 times a day, pumping roughly 2,000 gallons of blood through the body. It has four chambers that work together to keep blood flowing in the right direction.",
    correctPurpose: "to inform",
  },
  {
    passage:
      "Plastic bags take hundreds of years to break down and often end up harming ocean wildlife. Cities should ban single-use plastic bags and encourage reusable ones instead — the switch is easy and it protects our planet.",
    correctPurpose: "to persuade",
  },
  {
    passage:
      "The old scarecrow secretly came alive every night after the farmer went to bed, sneaking into the barn to steal snacks and dance with the chickens until sunrise, when he'd freeze back into place just in time.",
    correctPurpose: "to entertain",
  },
];

export const craftAuthorsPurpose: ProblemGenerator = {
  skillSlug: "craft-authors-purpose",
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
        `Think about the content and tone: is it giving facts, arguing a position, or telling an enjoyable story?`,
        `The author's purpose here is: ${item.correctPurpose}`,
      ],
      explanation: `The author's purpose is ${item.correctPurpose}, based on the passage's content and tone.`,
    };
  },
};
