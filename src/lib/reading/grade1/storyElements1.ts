import type { ReadingSkill } from "../types";

export const STORY_ELEMENTS_1_SKILLS: ReadingSkill[] = [
  {
    slug: "g1-story-characters",
    subject: "reading",
    gradeBand: "grade1",
    strand: "story-elements-1",
    title: "Who is in the story?",
    order: 1,
    generatorId: "g1-story-characters",
    conceptBrief: {
      summary:
        "A character is a person or animal in a story. Most short stories are about one main character doing something.",
      workedExamples: [
        "\"Tom the cat climbed a tree. He looked at the birds.\" — the character in this story is Tom the cat.",
      ],
      commonMisconceptions: [
        "Picking something in the story that isn't a person or animal, like a place or thing.",
        "Picking a character who isn't actually mentioned in the story.",
      ],
    },
  },
  {
    slug: "g1-story-setting",
    subject: "reading",
    gradeBand: "grade1",
    strand: "story-elements-1",
    title: "Where does the story happen?",
    order: 2,
    generatorId: "g1-story-setting",
    conceptBrief: {
      summary:
        "The setting is where a story takes place, like a park, a house, or the beach. Looking for place words in the story helps you find the setting.",
      workedExamples: [
        "\"The kids built a sandcastle by the waves.\" — the setting is the beach.",
      ],
      commonMisconceptions: [
        "Picking a character's name instead of a place.",
        "Picking a place that was never mentioned in the story.",
      ],
    },
  },
  {
    slug: "g1-story-feelings",
    subject: "reading",
    gradeBand: "grade1",
    strand: "story-elements-1",
    title: "How do characters feel?",
    order: 3,
    generatorId: "g1-story-feelings",
    conceptBrief: {
      summary:
        "Characters have feelings, and their actions or words can show how they feel, even when the story doesn't say the feeling word directly.",
      workedExamples: [
        "\"Lily smiled and clapped when she saw her puppy.\" — Lily feels happy.",
      ],
      commonMisconceptions: [
        "Picking a feeling that doesn't match what the character actually did or said.",
        "Ignoring the clues in the character's actions and just guessing.",
      ],
    },
  },
];
