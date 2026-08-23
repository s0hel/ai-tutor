import type { ProblemGenerator } from "../types";
import type { GTProblemData } from "../../gifted/visualTypes";
import { randInt } from "../helpers";
import { makeOptions, numberRender, randomShape, sampleDistinct, shapeRender } from "./shapeHelpers";

export const numberPuzzles: ProblemGenerator = {
  skillSlug: "gt-number-puzzles",
  generate(level) {
    const base = randomShape({ size: "sm", fill: "solid" });
    const b = randInt(1, level < 5 ? 5 : 9);
    const c = randInt(1, level < 5 ? 5 : 9);
    const a = b + c;

    const distractorPool = [c + 1, Math.max(1, c - 1), c + 2, a, b].filter((v) => v !== c && v > 0);
    const distractors = sampleDistinct(distractorPool, 3, (v) => String(v), [String(c)]);
    let guard = 0;
    while (distractors.length < 3 && guard < 50) {
      guard++;
      const v = randInt(1, a + 5);
      if (v !== c && !distractors.includes(v)) distractors.push(v);
    }

    const { options, correctId } = makeOptions(numberRender(c), distractors.map(numberRender));

    const problemData: GTProblemData = {
      prompt: {
        kind: "balance",
        left: [shapeRender({ ...base, count: a })],
        right: [shapeRender({ ...base, count: b }), null],
      },
      options,
      instruction: "Both sides of the scale balance. How many more shapes are needed on the right side?",
    };

    return {
      problemData,
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [`Count how many shapes are on the left side: ${a}.`, `The right side already has ${b}, so it needs ${a} take away ${b} more.`],
      explanation: `${a} equals ${b} plus ${c}, so ${c} more shapes are needed on the right side.`,
    };
  },
};
