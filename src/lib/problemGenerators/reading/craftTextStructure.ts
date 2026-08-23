import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

type StructureType = "chronological" | "compare-contrast" | "cause-effect" | "problem-solution";
const ALL_TYPES: StructureType[] = ["chronological", "compare-contrast", "cause-effect", "problem-solution"];

interface StructureItem {
  passage: string;
  correctType: StructureType;
}

const ITEMS: StructureItem[] = [
  {
    passage:
      "Each morning on the farm begins at dawn, when the rooster crows and chores start. By mid-morning, the animals are fed and the fields are checked. In the afternoon, crops are harvested, and by evening, the day winds down with dinner and rest.",
    correctType: "chronological",
  },
  {
    passage:
      "Cats and dogs are both popular pets, but they have very different personalities. Dogs tend to be loyal and crave attention, while cats are often more independent and content spending time alone.",
    correctType: "compare-contrast",
  },
  {
    passage:
      "Years of litter and chemical runoff had polluted the town's river, killing off much of the fish population. Concerned residents organized regular cleanup days and pushed local factories to filter their waste, and within a few years the river's fish population began to recover.",
    correctType: "problem-solution",
  },
  {
    passage:
      "Because the bridge was closed for repairs, thousands of commuters had to find alternate routes to work every day. Traffic on nearby streets increased dramatically, and some people's commute time doubled.",
    correctType: "cause-effect",
  },
  {
    passage:
      "The bakery opens its doors at 6 a.m., when the first loaves come out of the oven. By 8 a.m., the morning rush begins with customers grabbing coffee and pastries. Around noon, the lunch crowd arrives for sandwiches, and by closing time at 6 p.m., the shelves are nearly empty.",
    correctType: "chronological",
  },
  {
    passage:
      "Solar power and wind power are both renewable energy sources, but they work differently. Solar panels convert sunlight directly into electricity, while wind turbines use moving air to spin blades that generate power.",
    correctType: "compare-contrast",
  },
  {
    passage:
      "Overcrowding at the animal shelter meant many pets weren't getting enough attention or exercise. Volunteers started a foster program that placed animals in temporary homes, and within months the shelter's population dropped to a manageable level.",
    correctType: "problem-solution",
  },
  {
    passage:
      "Since the factory increased production without adding safety equipment, the number of workplace injuries rose sharply that year. Several employees had to take extended time off to recover.",
    correctType: "cause-effect",
  },
];

const TYPE_HINT: Record<StructureType, string> = {
  chronological: "organized in time order, describing what happens first, next, and last",
  "compare-contrast": "organized around how two things are alike and different",
  "cause-effect": "organized around why something happened and what resulted from it",
  "problem-solution": "organized around a problem and how it was solved",
};

export const craftTextStructure: ProblemGenerator = {
  skillSlug: "craft-text-structure",
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
        instruction: `Read this passage: "${item.passage}" What text structure does this passage mainly use?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about how the information is organized: by time, by comparison, by cause/effect, or by problem/solution.`,
        `This passage is ${item.correctType} — it's ${TYPE_HINT[item.correctType]}.`,
      ],
      explanation: `This passage uses ${item.correctType} structure, since it's ${TYPE_HINT[item.correctType]}.`,
    };
  },
};
