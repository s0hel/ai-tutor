import type { ProblemGenerator } from "../types";
import { choice, randInt, sampleDistinct } from "../helpers";

const CATEGORY_SETS = [
  ["cats", "dogs", "fish"],
  ["red", "blue", "green"],
  ["pizza", "tacos", "pasta"],
  ["soccer", "basketball", "tennis"],
] as const;

export const readBarGraphs: ProblemGenerator = {
  skillSlug: "g2-read-bar-graphs",
  generate() {
    const categories = choice(CATEGORY_SETS);
    const counts = sampleDistinct(
      Array.from({ length: 10 }, (_, i) => i + 3),
      3,
      (n) => String(n)
    );
    const rows = categories.map((c, i) => `${c}: ${counts[i]}`).join(", ");
    const askAboutIndex = randInt(0, 2);

    return {
      problemData: {
        instruction: `A bar graph shows this data — ${rows}. How many voted for ${categories[askAboutIndex]}?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: counts[askAboutIndex] },
      hintLadder: [
        `Find the bar labeled "${categories[askAboutIndex]}" and read its value.`,
        `The graph shows ${rows}.`,
      ],
      explanation: `${counts[askAboutIndex]} voted for ${categories[askAboutIndex]}.`,
    };
  },
};
