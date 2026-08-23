import type { ProblemGenerator } from "../types";
import type { ChoiceRender, GTProblemData } from "../../gifted/visualTypes";
import { CATEGORY_LABELS, CONCEPTS, type ConceptCategory } from "../../gifted/conceptBank";
import { choice } from "../helpers";
import { conceptRender, makeOptions, sampleDistinct } from "./shapeHelpers";

const CATEGORY_COUNTS = new Map<ConceptCategory, number>();
for (const c of CONCEPTS) CATEGORY_COUNTS.set(c.category, (CATEGORY_COUNTS.get(c.category) ?? 0) + 1);
const ELIGIBLE_CATEGORIES = Array.from(CATEGORY_COUNTS.entries())
  .filter(([, count]) => count >= 4)
  .map(([category]) => category);

export const pictureClassification: ProblemGenerator = {
  skillSlug: "gt-picture-classification",
  generate() {
    const category = choice(ELIGIBLE_CATEGORIES);
    const inCategory = CONCEPTS.filter((c) => c.category === category);
    const row = sampleDistinct(inCategory, 3, (c) => c.id);
    const remaining = inCategory.filter((c) => !row.some((r) => r.id === c.id));
    const answer = choice(remaining.length > 0 ? remaining : inCategory);

    const outOfCategory = sampleDistinct(
      CONCEPTS.filter((c) => c.category !== category),
      3,
      (c) => c.id
    );

    const { options, correctId } = makeOptions(conceptRender(answer.id), outOfCategory.map((c) => conceptRender(c.id)));

    const problemData: GTProblemData = {
      prompt: { kind: "row3", items: row.map((c) => conceptRender(c.id)) as [ChoiceRender, ChoiceRender, ChoiceRender] },
      options,
      instruction: "These three pictures belong together. Which picture belongs with them?",
    };

    return {
      problemData,
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: ["Think about what these three pictures have in common.", `They are all ${CATEGORY_LABELS[category]}.`],
      explanation: `${row.map((c) => c.label).join(", ")}, and ${answer.label} are all ${CATEGORY_LABELS[category]}.`,
    };
  },
};
