import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type FigureType = "simile" | "metaphor";
const ALL_TYPES: FigureType[] = ["simile", "metaphor"];

interface FigureItem {
  sentence: string;
  correctType: FigureType;
}

const ITEMS: FigureItem[] = [
  { sentence: "The snow was as soft as a pillow.", correctType: "simile" },
  { sentence: "The playground was a beehive of activity.", correctType: "metaphor" },
  { sentence: "He ran like a cheetah across the field.", correctType: "simile" },
  { sentence: "My little brother is a tornado when he's excited.", correctType: "metaphor" },
  { sentence: "The stars looked like tiny diamonds in the sky.", correctType: "simile" },
  { sentence: "The classroom was a zoo during the fire drill.", correctType: "metaphor" },
  { sentence: "Her laugh was as loud as a fire truck siren.", correctType: "simile" },
  { sentence: "Homework is a mountain I have to climb every night.", correctType: "metaphor" },
];

const TYPE_HINT: Record<FigureType, string> = {
  simile: "compares two things using 'like' or 'as'",
  metaphor: "says one thing IS another, without using 'like' or 'as'",
};

export const craftFigurativeLanguage3: ProblemGenerator = {
  skillSlug: "g3-craft-figurative-language",
  generate() {
    const item = choice(ITEMS);
    const distractorTypes = ALL_TYPES.filter((t) => t !== item.correctType);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctType },
      distractorTypes.map((t) => ({ kind: "text" as const, value: t }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `What type of figurative language is used in this sentence: "${item.sentence}"?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about HOW the sentence compares things: does it use the word 'like' or 'as'?`,
        `A ${item.correctType} ${TYPE_HINT[item.correctType]}.`,
      ],
      explanation: `This sentence is a ${item.correctType}, since it ${TYPE_HINT[item.correctType]}.`,
    };
  },
};
