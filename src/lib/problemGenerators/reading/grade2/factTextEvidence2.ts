import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface EvidenceItem {
  passage: string;
  claim: string;
  correctEvidence: string;
  distractors: [string, string, string];
}

const ITEMS: EvidenceItem[] = [
  {
    passage:
      "The dog hid under the bed and whimpered when the thunder rumbled outside. Its owner sat beside it and spoke in a soft, gentle voice until the storm passed.",
    claim: "The dog was scared of the storm.",
    correctEvidence: "The dog hid under the bed and whimpered when the thunder rumbled.",
    distractors: [
      "Its owner sat beside it and spoke in a soft voice.",
      "The storm passed after a little while.",
      "The owner spoke gently to calm the dog down.",
    ],
  },
  {
    passage:
      "Maya practiced her piano piece every single day after school. By the night of the recital, she played the whole song from memory without a single mistake.",
    claim: "Maya's practice paid off.",
    correctEvidence: "She played the whole song from memory without a single mistake.",
    distractors: [
      "Maya practiced piano after school.",
      "The recital happened at night.",
      "Maya has a piano at home.",
    ],
  },
  {
    passage:
      "The kitten's fur was soaked, and it shivered as it meowed loudly by the back door. As soon as someone let it inside, it curled up next to the warm fireplace.",
    claim: "The kitten was cold.",
    correctEvidence: "The kitten's fur was soaked, and it shivered as it meowed loudly.",
    distractors: [
      "Someone let the kitten inside the house.",
      "The kitten curled up by the fireplace.",
      "The fireplace was warm and cozy.",
    ],
  },
  {
    passage:
      "Even though the puzzle had a thousand tiny pieces, Ravi sorted them by color and worked on it every evening for two weeks until every piece was in place.",
    claim: "Ravi was determined to finish the puzzle.",
    correctEvidence: "He worked on it every evening for two weeks until every piece was in place.",
    distractors: [
      "The puzzle had a thousand tiny pieces.",
      "Ravi sorted the pieces by color.",
      "The puzzle took place in the evening.",
    ],
  },
  {
    passage:
      "The classroom plants near the sunny window grew tall with bright green leaves, while the ones in the dark closet stayed short and pale.",
    claim: "Sunlight helps plants grow better.",
    correctEvidence: "The plants near the sunny window grew tall with bright green leaves.",
    distractors: [
      "The plants in the closet were dark.",
      "The classroom had more than one plant.",
      "The window let in a lot of light.",
    ],
  },
];

export const factTextEvidence2: ProblemGenerator = {
  skillSlug: "g2-fact-text-evidence",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctEvidence },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" Claim: "${item.claim}" Which sentence from the passage best supports this claim?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look back at the passage for the sentence that best proves the claim, not just any true sentence.`,
        `The best evidence is: "${item.correctEvidence}"`,
      ],
      explanation: `"${item.correctEvidence}" best supports the claim "${item.claim}" — it directly shows why the claim is true.`,
    };
  },
};
