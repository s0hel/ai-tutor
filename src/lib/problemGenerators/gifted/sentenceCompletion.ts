import type { ProblemGenerator } from "../types";
import type { GTProblemData } from "../../gifted/visualTypes";
import { CONCEPTS, RIDDLES } from "../../gifted/conceptBank";
import { choice } from "../helpers";
import { conceptRender, makeOptions, sampleDistinct } from "./shapeHelpers";

export const sentenceCompletion: ProblemGenerator = {
  skillSlug: "gt-sentence-completion",
  generate() {
    const riddle = choice(RIDDLES);
    const matching = CONCEPTS.filter((c) => c.tags.includes(riddle.tag));
    const answer = choice(matching);

    const sameCategoryPool = CONCEPTS.filter((c) => c.id !== answer.id && !c.tags.includes(riddle.tag) && c.category === answer.category);
    const fallbackPool = CONCEPTS.filter((c) => c.id !== answer.id && !c.tags.includes(riddle.tag));
    const distractorSource = sameCategoryPool.length >= 3 ? sameCategoryPool : fallbackPool;
    const distractors = sampleDistinct(distractorSource, 3, (c) => c.id, [answer.id]);

    const { options, correctId } = makeOptions(conceptRender(answer.id), distractors.map((c) => conceptRender(c.id)));

    const problemData: GTProblemData = {
      prompt: { kind: "none" },
      options,
      instruction: riddle.question,
    };

    return {
      problemData,
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [`Listen to the question again: "${riddle.question}"`, `The answer is the ${answer.label}.`],
      explanation: `The ${answer.label} is the answer because it fits: "${riddle.question}"`,
    };
  },
};
