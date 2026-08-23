import type { ReadingStrand, ReadingSkill } from "./types";
import { VOCABULARY_SKILLS } from "./skills/vocabulary";
import { COMPREHENSION_SKILLS } from "./skills/comprehension";
import { INFERENCE_ANALYSIS_SKILLS } from "./skills/inferenceAnalysis";
import { AUTHORS_CRAFT_SKILLS } from "./skills/authorsCraft";
import { FACT_OPINION_GENRE_SKILLS } from "./skills/factOpinionGenre";

export type { ReadingStrand, ReadingSkill, ConceptBrief } from "./types";

export const READING_STRAND_META: Record<ReadingStrand, { label: string; emoji: string; order: number }> = {
  vocabulary: { label: "Vocabulary", emoji: "📖", order: 1 },
  comprehension: { label: "Comprehension", emoji: "🔍", order: 2 },
  "inference-analysis": { label: "Inference & Analysis", emoji: "🧩", order: 3 },
  "authors-craft": { label: "Author's Craft", emoji: "✍️", order: 4 },
  "fact-opinion-genre": { label: "Fact, Opinion & Genre", emoji: "⚖️", order: 5 },
};

export const READING_SKILLS: ReadingSkill[] = [
  ...VOCABULARY_SKILLS,
  ...COMPREHENSION_SKILLS,
  ...INFERENCE_ANALYSIS_SKILLS,
  ...AUTHORS_CRAFT_SKILLS,
  ...FACT_OPINION_GENRE_SKILLS,
];

export function getReadingSkill(slug: string): ReadingSkill | undefined {
  return READING_SKILLS.find((s) => s.slug === slug);
}

export function listReadingByStrand(): { strand: ReadingStrand; skills: ReadingSkill[] }[] {
  const strands = Object.keys(READING_STRAND_META) as ReadingStrand[];
  return strands
    .sort((a, b) => READING_STRAND_META[a].order - READING_STRAND_META[b].order)
    .map((strand) => ({
      strand,
      skills: READING_SKILLS.filter((s) => s.strand === strand).sort((a, b) => a.order - b.order),
    }));
}
