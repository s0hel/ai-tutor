import type { ProblemGenerator } from "../types";
import { choice, randInt, sampleDistinct } from "../helpers";

const CATEGORY_SETS = [
  ["apples", "bananas", "grapes"],
  ["cats", "dogs", "birds"],
  ["red cars", "blue cars", "green cars"],
  ["soccer", "basketball", "swimming"],
] as const;

export const readTallyCharts: ProblemGenerator = {
  skillSlug: "g1-read-tally-charts",
  generate() {
    const categories = choice(CATEGORY_SETS);
    const counts = sampleDistinct(
      Array.from({ length: 9 }, (_, i) => i + 2),
      3,
      (n) => String(n)
    );
    const rows = categories.map((c, i) => `${c}: ${counts[i]}`).join(", ");
    const askAboutIndex = randInt(0, 2);

    return {
      problemData: {
        instruction: `Here's what a class counted — ${rows}. How many kids picked ${categories[askAboutIndex]}?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: counts[askAboutIndex] },
      hintLadder: [
        `Look at the count listed just for "${categories[askAboutIndex]}."`,
        `The chart shows ${rows}.`,
      ],
      explanation: `${counts[askAboutIndex]} kids picked ${categories[askAboutIndex]}.`,
    };
  },
};
