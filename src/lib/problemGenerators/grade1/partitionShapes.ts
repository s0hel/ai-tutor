import type { ProblemGenerator } from "../types";
import { choice } from "../helpers";

const ITEMS = ["pizza", "sandwich", "candy bar", "granola bar"] as const;

export const partitionShapes: ProblemGenerator = {
  skillSlug: "g1-partition-shapes",
  generate() {
    const parts = choice([2, 4] as const);
    const item = choice(ITEMS);
    const partName = parts === 2 ? "half" : "fourth";

    return {
      problemData: {
        instruction: `If a ${item} is cut into ${parts} equal pieces, what is each piece called?`,
      },
      answerType: "text",
      correctAnswer: { type: "text", value: partName, acceptedAliases: parts === 4 ? ["quarter"] : [] },
      hintLadder: [
        `A shape split into 2 equal parts makes halves. Split into 4 equal parts makes fourths.`,
        `${parts} equal pieces means each piece is called a "${partName}."`,
      ],
      explanation: `Each of the ${parts} equal pieces is called a "${partName}."`,
    };
  },
};
