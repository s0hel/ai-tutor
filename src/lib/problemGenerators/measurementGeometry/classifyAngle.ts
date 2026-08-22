import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

function classify(degrees: number): string {
  if (degrees === 90) return "right";
  if (degrees < 90) return "acute";
  return "obtuse";
}

export const classifyAngle: ProblemGenerator = {
  skillSlug: "geo-classify-angle",
  generate() {
    const kind = randInt(0, 2);
    const degrees = kind === 0 ? randInt(10, 89) : kind === 1 ? 90 : randInt(91, 170);
    const answer = classify(degrees);

    return {
      problemData: { degrees },
      answerType: "text",
      correctAnswer: { type: "text", value: answer },
      hintLadder: [
        `An angle less than 90° is acute, exactly 90° is right, and more than 90° is obtuse.`,
        `${degrees}° is ${answer === "right" ? "exactly 90°" : answer === "acute" ? "less than 90°" : "more than 90°"}, so it's ${answer}.`,
      ],
      explanation: `A ${degrees}° angle is ${answer}.`,
    };
  },
};
