import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

type FigureType = "simile" | "metaphor" | "idiom" | "personification";
const ALL_TYPES: FigureType[] = ["simile", "metaphor", "idiom", "personification"];

interface FigureItem {
  sentence: string;
  correctType: FigureType;
}

const ITEMS: FigureItem[] = [
  { sentence: "Her smile was as bright as the sun.", correctType: "simile" },
  { sentence: "The classroom was a zoo during the fire drill.", correctType: "metaphor" },
  { sentence: "Good luck on your test — break a leg!", correctType: "idiom" },
  { sentence: "The wind whispered secrets through the trees.", correctType: "personification" },
  { sentence: "He was as brave as a lion when he stood up to the bully.", correctType: "simile" },
  { sentence: "Time is money, so don't waste it.", correctType: "metaphor" },
  { sentence: "It's raining cats and dogs outside.", correctType: "idiom" },
  { sentence: "The old house groaned and creaked as if it were complaining about the storm.", correctType: "personification" },
  { sentence: "The stars looked like diamonds scattered across the night sky.", correctType: "simile" },
  { sentence: "My little brother is a tornado when he's excited.", correctType: "metaphor" },
  { sentence: "I need to hit the books before my exam tomorrow.", correctType: "idiom" },
  { sentence: "The old car sighed and sputtered to a stop.", correctType: "personification" },
];

const TYPE_HINT: Record<FigureType, string> = {
  simile: "compares two things using 'like' or 'as'",
  metaphor: "says one thing IS another, without using 'like' or 'as'",
  idiom: "is a phrase whose meaning is different from its literal words",
  personification: "gives human qualities to something that isn't human",
};

export const craftFigurativeLanguage: ProblemGenerator = {
  skillSlug: "craft-figurative-language",
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
        `Think about HOW the sentence makes its comparison or point — literally, or in a figurative way?`,
        `A ${item.correctType} ${TYPE_HINT[item.correctType]}.`,
      ],
      explanation: `This sentence is a ${item.correctType}, since it ${TYPE_HINT[item.correctType]}.`,
    };
  },
};
