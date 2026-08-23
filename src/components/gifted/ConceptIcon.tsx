import { getConcept } from "@/lib/gifted/conceptBank";

export default function ConceptIcon({ conceptId, size = 56 }: { conceptId: string; size?: number }) {
  const concept = getConcept(conceptId);
  return (
    <div className="flex flex-col items-center gap-1">
      <span style={{ fontSize: size * 0.6, lineHeight: 1 }}>{concept.emoji}</span>
      <span className="text-xs font-medium text-kip-ink/70">{concept.label}</span>
    </div>
  );
}
