import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

type Ask = "first" | "last";

interface SequenceItem {
  passage: string;
  ask: Ask;
  correctEvent: string;
  distractors: [string, string, string];
}

const ITEMS: SequenceItem[] = [
  {
    passage:
      "First, Sam brushed his teeth. Then he put on his shoes. Next, he grabbed his backpack. Finally, he ran outside to catch the bus.",
    ask: "first",
    correctEvent: "Sam brushed his teeth.",
    distractors: ["Sam put on his shoes.", "Sam grabbed his backpack.", "Sam ran outside to catch the bus."],
  },
  {
    passage:
      "Lily mixed the flour and sugar in a bowl. Then she cracked two eggs and stirred everything together. Next, she poured the batter into a pan. Finally, she baked it in the oven until it turned golden brown.",
    ask: "last",
    correctEvent: "Lily baked the batter in the oven until it turned golden brown.",
    distractors: [
      "Lily mixed the flour and sugar in a bowl.",
      "Lily cracked two eggs and stirred them in.",
      "Lily poured the batter into a pan.",
    ],
  },
  {
    passage:
      "The caterpillar first hatched from a tiny egg. Then it ate leaves and grew bigger and bigger. Next, it formed a hard shell called a chrysalis. Finally, it came out as a butterfly with colorful wings.",
    ask: "first",
    correctEvent: "The caterpillar hatched from a tiny egg.",
    distractors: [
      "The caterpillar ate leaves and grew bigger.",
      "The caterpillar formed a hard shell called a chrysalis.",
      "The caterpillar came out as a butterfly.",
    ],
  },
  {
    passage:
      "Dad parked the car at the campsite. Then the family set up the tent together. Next, they gathered sticks and built a small campfire. Finally, they roasted marshmallows and told stories under the stars.",
    ask: "last",
    correctEvent: "The family roasted marshmallows and told stories under the stars.",
    distractors: [
      "Dad parked the car at the campsite.",
      "The family set up the tent together.",
      "The family gathered sticks and built a campfire.",
    ],
  },
  {
    passage:
      "Maya watered the seed every day. Then a tiny green sprout popped out of the soil. Next, the sprout grew leaves and got taller. Finally, a bright yellow flower bloomed at the top.",
    ask: "first",
    correctEvent: "Maya watered the seed every day.",
    distractors: [
      "A tiny green sprout popped out of the soil.",
      "The sprout grew leaves and got taller.",
      "A bright yellow flower bloomed at the top.",
    ],
  },
];

export const compSequence2: ProblemGenerator = {
  skillSlug: "g2-comp-sequence",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctEvent },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );
    const askText = item.ask === "first" ? "happened first" : "happened last";

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" What ${askText} in this passage?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look for order words like "first," "then," "next," and "finally" — they tell you the order events happened in.`,
        `The event that ${askText} is: ${item.correctEvent}`,
      ],
      explanation: `"${item.correctEvent}" is what ${askText} — the order words in the passage show the order the events happened in.`,
    };
  },
};
