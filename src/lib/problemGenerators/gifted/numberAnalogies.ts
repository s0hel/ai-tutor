import type { ProblemGenerator } from "../types";
import type { GTProblemData } from "../../gifted/visualTypes";
import { choice, randInt } from "../helpers";
import { makeOptions, numberRender, sampleDistinct } from "./shapeHelpers";

type Op = "+" | "-" | "×2" | "÷2";

const EVENS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

function apply(op: Op, x: number, n: number): number {
  switch (op) {
    case "+":
      return x + n;
    case "-":
      return x - n;
    case "×2":
      return x * 2;
    case "÷2":
      return x / 2;
  }
}

function pickOperand(op: Op, n: number): number {
  if (op === "-") return randInt(n + 1, n + 10);
  if (op === "÷2") return choice(EVENS);
  return randInt(1, 10);
}

export const numberAnalogies: ProblemGenerator = {
  skillSlug: "gt-number-analogies",
  generate(level) {
    const opPool: Op[] = level < 5 ? ["+", "-"] : level < 8 ? ["+", "-", "×2"] : ["+", "-", "×2", "÷2"];
    const op = choice(opPool);
    const n = level < 5 ? randInt(1, 5) : randInt(2, 9);
    const describe = op === "+" ? `add ${n}` : op === "-" ? `subtract ${n}` : op === "×2" ? "double it" : "cut it in half";

    const a = pickOperand(op, n);
    const b = apply(op, a, n);
    const c = pickOperand(op, n);
    const answer = apply(op, c, n);

    const distractorPool = [answer + 1, Math.max(0, answer - 1), answer + 2, Math.max(0, answer - 2)].filter((v) => v !== answer);
    const distractors = sampleDistinct(distractorPool, 3, (v) => String(v), [String(answer)]);
    let guard = 0;
    while (distractors.length < 3 && guard < 50) {
      guard++;
      const v = Math.max(0, answer + randInt(-6, 6));
      if (v !== answer && !distractors.includes(v)) distractors.push(v);
    }

    const { options, correctId } = makeOptions(numberRender(answer), distractors.map(numberRender));

    const problemData: GTProblemData = {
      prompt: { kind: "analogy", a: numberRender(a), b: numberRender(b), c: numberRender(c) },
      options,
      instruction: "The first two numbers go together in a pattern. Which number completes the second pair the same way?",
    };

    return {
      problemData,
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [`Figure out what happens to ${a} to get ${b}.`, `The rule is: ${describe}. Do the same to ${c}.`],
      explanation: `${a} becomes ${b} when you ${describe}. Doing the same to ${c} gives ${answer}.`,
    };
  },
};
