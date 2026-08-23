import type { GradeBand, ReadingStrand, ReadingSkill } from "./types";
import { VOCABULARY_SKILLS } from "./skills/vocabulary";
import { COMPREHENSION_SKILLS } from "./skills/comprehension";
import { INFERENCE_ANALYSIS_SKILLS } from "./skills/inferenceAnalysis";
import { AUTHORS_CRAFT_SKILLS } from "./skills/authorsCraft";
import { FACT_OPINION_GENRE_SKILLS } from "./skills/factOpinionGenre";
import { PHONICS_SIGHT_WORDS_SKILLS } from "./grade1/phonicsSightWords";
import { VOCABULARY_1_SKILLS } from "./grade1/vocabulary1";
import { COMPREHENSION_1_SKILLS } from "./grade1/comprehension1";
import { STORY_ELEMENTS_1_SKILLS } from "./grade1/storyElements1";
import { VOCABULARY_2_SKILLS } from "./grade2/vocabulary2";
import { COMPREHENSION_2_SKILLS } from "./grade2/comprehension2";
import { STORY_ELEMENTS_2_SKILLS } from "./grade2/storyElements2";
import { FACT_OPINION_2_SKILLS } from "./grade2/factOpinion2";
import { VOCABULARY_3_SKILLS } from "./grade3/vocabulary3";
import { COMPREHENSION_3_SKILLS } from "./grade3/comprehension3";
import { INFERENCE_3_SKILLS } from "./grade3/inference3";
import { AUTHORS_CRAFT_3_SKILLS } from "./grade3/authorsCraft3";
import { FACT_OPINION_GENRE_3_SKILLS } from "./grade3/factOpinionGenre3";

export type { ReadingStrand, ReadingSkill, GradeBand, ConceptBrief } from "./types";

export const GRADE_BAND_META: Record<GradeBand, { label: string; order: number }> = {
  grade1: { label: "Grade 1", order: 1 },
  grade2: { label: "Grade 2", order: 2 },
  grade3: { label: "Grade 3", order: 3 },
  "grade4-5": { label: "Grade 4-5", order: 4 },
};

export const READING_STRAND_META: Record<ReadingStrand, { label: string; emoji: string; order: number }> = {
  // grade4-5
  vocabulary: { label: "Vocabulary", emoji: "📖", order: 1 },
  comprehension: { label: "Comprehension", emoji: "🔍", order: 2 },
  "inference-analysis": { label: "Inference & Analysis", emoji: "🧩", order: 3 },
  "authors-craft": { label: "Author's Craft", emoji: "✍️", order: 4 },
  "fact-opinion-genre": { label: "Fact, Opinion & Genre", emoji: "⚖️", order: 5 },
  // grade1
  "phonics-sight-words": { label: "Phonics & Sight Words", emoji: "🔤", order: 1 },
  "vocabulary-1": { label: "Vocabulary", emoji: "📖", order: 2 },
  "comprehension-1": { label: "Comprehension", emoji: "🔍", order: 3 },
  "story-elements-1": { label: "Story Elements", emoji: "🎭", order: 4 },
  // grade2
  "vocabulary-2": { label: "Vocabulary", emoji: "📖", order: 1 },
  "comprehension-2": { label: "Comprehension", emoji: "🔍", order: 2 },
  "story-elements-2": { label: "Story Elements", emoji: "🎭", order: 3 },
  "fact-opinion-2": { label: "Fact & Opinion", emoji: "⚖️", order: 4 },
  // grade3
  "vocabulary-3": { label: "Vocabulary", emoji: "📖", order: 1 },
  "comprehension-3": { label: "Comprehension", emoji: "🔍", order: 2 },
  "inference-3": { label: "Inference", emoji: "🧩", order: 3 },
  "authors-craft-3": { label: "Author's Craft", emoji: "✍️", order: 4 },
  "fact-opinion-genre-3": { label: "Fact, Opinion & Genre", emoji: "⚖️", order: 5 },
};

export const READING_SKILLS: ReadingSkill[] = [
  ...VOCABULARY_SKILLS,
  ...COMPREHENSION_SKILLS,
  ...INFERENCE_ANALYSIS_SKILLS,
  ...AUTHORS_CRAFT_SKILLS,
  ...FACT_OPINION_GENRE_SKILLS,
  ...PHONICS_SIGHT_WORDS_SKILLS,
  ...VOCABULARY_1_SKILLS,
  ...COMPREHENSION_1_SKILLS,
  ...STORY_ELEMENTS_1_SKILLS,
  ...VOCABULARY_2_SKILLS,
  ...COMPREHENSION_2_SKILLS,
  ...STORY_ELEMENTS_2_SKILLS,
  ...FACT_OPINION_2_SKILLS,
  ...VOCABULARY_3_SKILLS,
  ...COMPREHENSION_3_SKILLS,
  ...INFERENCE_3_SKILLS,
  ...AUTHORS_CRAFT_3_SKILLS,
  ...FACT_OPINION_GENRE_3_SKILLS,
];

export function getReadingSkill(slug: string): ReadingSkill | undefined {
  return READING_SKILLS.find((s) => s.slug === slug);
}

export function defaultGradeBandForAge(age: number): GradeBand {
  if (age <= 6) return "grade1";
  if (age === 7) return "grade2";
  if (age === 8) return "grade3";
  return "grade4-5";
}

export function listReadingByStrand(gradeBand: GradeBand): { strand: ReadingStrand; skills: ReadingSkill[] }[] {
  const skillsInBand = READING_SKILLS.filter((s) => s.gradeBand === gradeBand);
  const strands = Array.from(new Set(skillsInBand.map((s) => s.strand)));
  return strands
    .sort((a, b) => READING_STRAND_META[a].order - READING_STRAND_META[b].order)
    .map((strand) => ({
      strand,
      skills: skillsInBand.filter((s) => s.strand === strand).sort((a, b) => a.order - b.order),
    }));
}
