import type { ProblemGenerator } from "../types";
import type { GTProblemData } from "../../gifted/visualTypes";
import { choice, randInt } from "../helpers";
import { makeOptions, numberRender, sampleDistinct } from "./shapeHelpers";

interface Built {
  seq: number[];
  next: number;
  describe: string;
}

function buildArithmetic(level: number): Built {
  const step = level < 5 ? randInt(1, 3) : randInt(2, 9);
  const start = randInt(1, 10);
  const seq = [0, 1, 2, 3].map((i) => start + i * step);
  return { seq, next: start + 4 * step, describe: `add ${step} each time` };
}

function buildAlternating(): Built {
  const a = randInt(1, 6);
  const b = randInt(1, 6);
  const start = randInt(1, 10);
  const seq = [start, start + a, start + a + b, start + a + b + a];
  return { seq, next: seq[3] + b, describe: `add ${a}, then add ${b}, and repeat` };
}

function buildMultiplicative(): Built {
  const start = randInt(1, 4);
  const seq = [start, start * 2, start * 4, start * 8];
  return { seq, next: start * 16, describe: "multiply by 2 each time" };
}

export const numberSeries: ProblemGenerator = {
  skillSlug: "gt-number-series",
  generate(level) {
    const builder =
      level < 5 ? buildArithmetic : level < 8 ? choice([buildArithmetic, buildMultiplicative]) : choice([buildAlternating, buildMultiplicative]);
    const { seq, next, describe } = builder(level);

    const distractorPool = [next + randInt(1, 3), Math.max(1, next - randInt(1, 3)), next + randInt(4, 8), Math.max(1, next - randInt(4, 8))].filter(
      (v) => v !== next && v > 0
    );
    const distractors = sampleDistinct(distractorPool, 3, (v) => String(v), [String(next)]);
    let guard = 0;
    while (distractors.length < 3 && guard < 50) {
      guard++;
      const v = next + randInt(-10, 10);
      if (v !== next && v > 0 && !distractors.includes(v)) distractors.push(v);
    }

    const { options, correctId } = makeOptions(numberRender(next), distractors.map(numberRender));

    const problemData: GTProblemData = {
      prompt: { kind: "sequence", items: [...seq.map(numberRender), null] },
      options,
      instruction: "What number comes next in the pattern?",
    };

    return {
      problemData,
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: ["Look at how the numbers change from one to the next.", `The pattern is: ${describe}.`],
      explanation: `The pattern is ${describe}, so the next number is ${next}.`,
    };
  },
};
