import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface SettingItem {
  passage: string;
  correctSetting: string;
  distractors: [string, string, string];
}

const ITEMS: SettingItem[] = [
  {
    passage:
      "The waves crashed as kids built sandcastles and splashed in the shallow water. Seagulls circled overhead, hoping to snatch a snack from someone's picnic basket.",
    correctSetting: "at the beach",
    distractors: ["in a snowy forest", "inside a classroom", "on top of a mountain"],
  },
  {
    passage:
      "Snow covered the yard as the family strung colorful lights on a tall pine tree inside the living room. Mugs of hot cocoa sat steaming on the table.",
    correctSetting: "at home in winter",
    distractors: ["at a summer pool party", "in a hot desert", "on a sunny beach"],
  },
  {
    passage:
      "Rows of tall bookshelves stretched to the ceiling, and a librarian quietly stamped a due date into a returned book while kids whispered at a nearby table.",
    correctSetting: "in a library",
    distractors: ["at a busy farmers market", "in a swimming pool", "at a loud concert"],
  },
  {
    passage:
      "Monkeys swung between vines high above the hikers, while colorful parrots called out from the thick green leaves surrounding the muddy trail.",
    correctSetting: "in a jungle",
    distractors: ["in a shopping mall", "at an ice rink", "in a school gym"],
  },
  {
    passage:
      "The astronaut floated past the control panel, checking dials as the glowing blue Earth spun slowly outside the round window.",
    correctSetting: "in outer space",
    distractors: ["at a birthday party", "in a garden", "at a grocery store"],
  },
];

export const storySettingDetails2: ProblemGenerator = {
  skillSlug: "g2-story-setting-details",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctSetting },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" Where does this story most likely take place?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look for clue words about a place — things you'd only see or hear in a certain kind of spot.`,
        `The clues point to this setting: ${item.correctSetting}`,
      ],
      explanation: `This story takes place ${item.correctSetting} — the details in the passage are clues that point to this setting.`,
    };
  },
};
