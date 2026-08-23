import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface ConclusionItem {
  passage: string;
  correctConclusion: string;
  distractors: [string, string, string];
}

const ITEMS: ConclusionItem[] = [
  {
    passage:
      "Sam grabbed his mitt, his bat, and his cleats, then ran out the door as soon as he heard his dad honk the horn.",
    correctConclusion: "Sam is heading to a baseball game or practice.",
    distractors: [
      "Sam is going to bed for the night.",
      "Sam is going grocery shopping with his dad.",
      "Sam forgot he had plans today.",
    ],
  },
  {
    passage:
      "The kitchen table was covered in balloons, streamers, and a big cake with candles. Everyone kept peeking out the window, waiting for a car to pull into the driveway.",
    correctConclusion: "The family is throwing a surprise party.",
    distractors: [
      "The family just finished cleaning the kitchen.",
      "Nobody in the family likes cake.",
      "The family is packing to move to a new house.",
    ],
  },
  {
    passage:
      "Every book on the shelf was stacked neatly by color, and not a single toy was out of place on the floor.",
    correctConclusion: "Someone in the room likes to keep things very organized.",
    distractors: [
      "The room has never been cleaned.",
      "The books are all about the same topic.",
      "Someone just moved into the room.",
    ],
  },
  {
    passage:
      "The dog barked and scratched at the door, then ran in circles by its leash whenever anyone stood up from the couch.",
    correctConclusion: "The dog wants to go outside for a walk.",
    distractors: [
      "The dog wants to take a nap.",
      "The dog is afraid of the leash.",
      "The dog wants to eat its dinner.",
    ],
  },
  {
    passage:
      "Ella's hands were covered in paint, and her art table was scattered with brushes, cups of water, and colorful paper.",
    correctConclusion: "Ella has been working on an art project.",
    distractors: [
      "Ella just finished cleaning her art table.",
      "Ella was cooking dinner in the kitchen.",
      "Ella is about to take a bath.",
    ],
  },
  {
    passage:
      "The crowd in the gym jumped to their feet, cheering loudly, as confetti fell and the players hugged each other at center court.",
    correctConclusion: "The home team just won an important game.",
    distractors: [
      "The game was just cancelled.",
      "A player got hurt during the game.",
      "The gym is closing for the night.",
    ],
  },
];

export const infDrawConclusions3: ProblemGenerator = {
  skillSlug: "g3-inf-draw-conclusions",
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
