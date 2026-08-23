import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface ConclusionItem {
  passage: string;
  correctConclusion: string;
  distractors: [string, string, string];
}

const ITEMS: ConclusionItem[] = [
  {
    passage:
      "Maria packed an umbrella, rain boots, and a raincoat before heading out the door. She checked the sky twice and grabbed her hood before stepping outside.",
    correctConclusion: "Maria expects it to rain soon.",
    distractors: [
      "Maria is going to the beach.",
      "Maria forgot her jacket at home.",
      "Maria doesn't like going outside.",
    ],
  },
  {
    passage:
      "Every light in the house was off, and the car wasn't in the driveway. Mail had piled up by the front door, and the newspaper from three days ago still sat on the porch.",
    correctConclusion: "No one has been home for a few days.",
    distractors: [
      "The family just moved into the house.",
      "Someone is asleep inside the house.",
      "The mail carrier stopped delivering mail.",
    ],
  },
  {
    passage:
      "The dog's tail wagged furiously, and it ran in circles around its owner, letting out excited little barks. It kept glancing at the leash hanging by the door.",
    correctConclusion: "The dog wants to go for a walk.",
    distractors: [
      "The dog is frightened of its owner.",
      "The dog just woke up from a nap.",
      "The dog wants to eat dinner.",
    ],
  },
  {
    passage:
      "Ben's hands were covered in flour, and the kitchen smelled like cinnamon and warm sugar. A recipe book lay open on the counter, and a timer beeped from the oven.",
    correctConclusion: "Ben is baking something in the kitchen.",
    distractors: [
      "Ben just finished cleaning the kitchen.",
      "Ben is repairing the oven.",
      "Ben is grocery shopping.",
    ],
  },
  {
    passage:
      "The stadium crowd suddenly erupted into cheers, throwing their hands in the air. Confetti cannons fired from the corners, and players hugged each other on the field.",
    correctConclusion: "The home team just won the game.",
    distractors: [
      "The game was just cancelled.",
      "A player got injured on the field.",
      "The stadium is closing for the night.",
    ],
  },
  {
    passage:
      "The classroom was unusually quiet, with heads bent over papers and pencils moving quickly. A clock ticked at the front, and the teacher paced silently between the rows without speaking.",
    correctConclusion: "The class is taking a test.",
    distractors: [
      "The students are watching a movie.",
      "The teacher is out of the room.",
      "It's the last day of school.",
    ],
  },
];

export const infDrawConclusions: ProblemGenerator = {
  skillSlug: "inf-draw-conclusions",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctConclusion },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" What can you conclude from this passage?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look at the specific clues in the passage — what do they add up to, even though it isn't stated directly?`,
        `The clues point to this conclusion: "${item.correctConclusion}"`,
      ],
      explanation: `The clues in the passage support the conclusion: "${item.correctConclusion}"`,
    };
  },
};
