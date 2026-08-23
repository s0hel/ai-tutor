import type { ChoiceRender, VisualSpec } from "@/lib/gifted/visualTypes";
import ShapeIcon from "./ShapeIcon";
import ConceptIcon from "./ConceptIcon";

function RenderTile({ render }: { render: ChoiceRender | null }) {
  if (!render) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-kip-purple/30 text-2xl font-bold text-kip-purple/50">
        ?
      </div>
    );
  }
  switch (render.kind) {
    case "shape":
      return <ShapeIcon spec={render.shape} />;
    case "concept":
      return <ConceptIcon conceptId={render.concept.conceptId} />;
    case "number":
      return <span className="font-display text-3xl font-bold text-kip-ink">{render.value}</span>;
  }
}

function Tile({ render, keyProp }: { render: ChoiceRender | null; keyProp: string | number }) {
  return (
    <div key={keyProp} className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
      <RenderTile render={render} />
    </div>
  );
}

export default function VisualPrompt({ spec }: { spec: VisualSpec }) {
  switch (spec.kind) {
    case "none":
      return null;
    case "matrix2x2":
      return (
        <div className="grid w-fit grid-cols-2 gap-2 rounded-2xl bg-kip-cream p-3">
          {spec.cells.map((c, i) => (
            <Tile key={i} keyProp={i} render={c} />
          ))}
        </div>
      );
    case "row3":
      return (
        <div className="flex w-fit gap-2 rounded-2xl bg-kip-cream p-3">
          {spec.items.map((c, i) => (
            <Tile key={i} keyProp={i} render={c} />
          ))}
        </div>
      );
    case "analogy":
      return (
        <div className="flex w-fit flex-wrap items-center gap-3 rounded-2xl bg-kip-cream p-3">
          <Tile keyProp="a" render={spec.a} />
          <span className="text-xl font-bold text-kip-ink/40">:</span>
          <Tile keyProp="b" render={spec.b} />
          <span className="text-xl font-bold text-kip-ink/40">::</span>
          <Tile keyProp="c" render={spec.c} />
          <span className="text-xl font-bold text-kip-ink/40">:</span>
          <Tile keyProp="d" render={null} />
        </div>
      );
    case "sequence":
      return (
        <div className="flex w-fit flex-wrap gap-2 rounded-2xl bg-kip-cream p-3">
          {spec.items.map((c, i) => (
            <Tile key={i} keyProp={i} render={c} />
          ))}
        </div>
      );
    case "balance":
      return (
        <div className="flex w-fit flex-wrap items-center gap-3 rounded-2xl bg-kip-cream p-3">
          <div className="flex flex-wrap gap-1">
            {spec.left.map((c, i) => (
              <Tile key={`l${i}`} keyProp={`l${i}`} render={c} />
            ))}
          </div>
          <span className="text-2xl">⚖️</span>
          <div className="flex flex-wrap gap-1">
            {spec.right.map((c, i) => (
              <Tile key={`r${i}`} keyProp={`r${i}`} render={c} />
            ))}
          </div>
        </div>
      );
  }
}
