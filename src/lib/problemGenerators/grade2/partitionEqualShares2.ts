import type { ProblemGenerator } from "../types";
import { choice } from "../helpers";

const ITEMS = ["pie", "sandwich", "candy bar", "pizza"] as const;
const PART_NAMES: Record<number, string> = { 2: "half", 3: "third", 4: "fourth" };

export const partitionEqualShares2: ProblemGenerator = {
  skillSlug: "g2-partition-equal-shares-2",
  generate() {
    const parts = choice([2, 3, 4] as const);
    const item = choice(ITEMS);
    const partName = PART_NAMES[parts];

    return {
      problemData: { instruction: `If a ${item} is cut into ${parts} equal pieces, what is each piece called?` },
      answerType: "text",
      correctAnswer: { type: "text", value: partName, acceptedAliases: parts === 4 ? ["quarter"] : [] },
      hintLadder: [
        `Splitting into 2 equal parts makes halves, 3 makes thirds, and 4 makes fourths.`,
        `${parts} equal pieces means each piece is a "${partName}."`,
      ],
      explanation: `Each of the ${parts} equal pieces is called a "${partName}."`,
    };
  },
};
