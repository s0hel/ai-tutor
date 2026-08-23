import type { ProblemGenerator } from "../types";
import type { GTProblemData } from "../../gifted/visualTypes";
import { CONCEPTS, RELATIONS, type RelationName, getConcept } from "../../gifted/conceptBank";
import { choice } from "../helpers";
import { conceptRender, makeOptions, sampleDistinct, shuffle } from "./shapeHelpers";

const ALL_RELATIONS: RelationName[] = ["babyOf", "livesIn", "usedFor", "opposite", "partOf"];

export const pictureAnalogies: ProblemGenerator = {
  skillSlug: "gt-picture-analogies",
  generate(level) {
    const pool = level < 5 ? ALL_RELATIONS.filter((r) => r === "babyOf" || r === "livesIn" || r === "usedFor") : ALL_RELATIONS;
    const relation = choice(pool);
    const pairs = shuffle(RELATIONS[relation]);
    const [a, b] = pairs[0];
    const [c, d] = pairs[1 % pairs.length] ?? pairs[0];

    const distractorConcepts = sampleDistinct(CONCEPTS, 3, (cn) => cn.id, [a, b, c, d]);
    const { options, correctId } = makeOptions(conceptRender(d), distractorConcepts.map((cn) => conceptRender(cn.id)));

    const labelA = getConcept(a).label;
    const labelB = getConcept(b).label;
    const labelC = getConcept(c).label;
    const labelD = getConcept(d).label;

    const problemData: GTProblemData = {
      prompt: { kind: "analogy", a: conceptRender(a), b: conceptRender(b), c: conceptRender(c) },
      options,
      instruction: `${labelA} is to ${labelB} as ${labelC} is to which picture?`,
    };

    return {
      problemData,
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [`Think about how ${labelA} and ${labelB} go together.`, `${labelC} goes with ${labelD} the same way.`],
      explanation: `${labelA} goes with ${labelB}, and ${labelC} goes with ${labelD} in the same way.`,
    };
  },
};
