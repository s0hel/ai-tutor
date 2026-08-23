import type { ChoiceOption } from "@/lib/gifted/visualTypes";
import ShapeIcon from "./ShapeIcon";
import ConceptIcon from "./ConceptIcon";

export default function ChoiceGrid({
  options,
  onSelect,
  disabled,
  selectedId,
  selectedCorrect,
}: {
  options: ChoiceOption[];
  onSelect: (id: string) => void;
  disabled?: boolean;
  selectedId?: string | null;
  /** Whether the currently selected option was graded correct — null while ungraded. */
  selectedCorrect?: boolean | null;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {options.map((opt) => {
        const isSelected = selectedId === opt.id;
        const stateClass = !isSelected
          ? "ring-2 ring-transparent hover:ring-kip-orange/30"
          : selectedCorrect === true
            ? "ring-4 ring-kip-green bg-kip-green/10"
            : selectedCorrect === false
              ? "ring-4 ring-kip-red bg-kip-red/10"
              : "ring-4 ring-kip-orange";
        return (
          <button
            key={opt.id}
            disabled={disabled}
            onClick={() => onSelect(opt.id)}
            className={`flex flex-col items-center justify-center gap-1 rounded-2xl bg-white p-4 shadow-sm transition disabled:opacity-70 ${stateClass}`}
          >
            {opt.render.kind === "shape" && <ShapeIcon spec={opt.render.shape} />}
            {opt.render.kind === "concept" && <ConceptIcon conceptId={opt.render.concept.conceptId} />}
            {opt.render.kind === "number" && <span className="font-display text-3xl font-bold text-kip-ink">{opt.render.value}</span>}
          </button>
        );
      })}
    </div>
  );
}
