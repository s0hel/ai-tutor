import { getConcept } from "./conceptBank";
import type { ChoiceRender } from "./visualTypes";

/** Human-readable description of a tapped answer tile, for feedback prompts — e.g. "the striped blue triangle" or "puppy". */
export function describeChoiceRender(render: ChoiceRender): string {
  switch (render.kind) {
    case "concept":
      return getConcept(render.concept.conceptId).label;
    case "number":
      return String(render.value);
    case "shape": {
      const s = render.shape;
      const parts = [s.fill !== "solid" ? s.fill : "", s.color, s.shape].filter(Boolean);
      return parts.join(" ") + " shape";
    }
  }
}
