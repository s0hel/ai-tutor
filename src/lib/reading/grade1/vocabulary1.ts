import type { ReadingSkill } from "../types";

export const VOCABULARY_1_SKILLS: ReadingSkill[] = [
  {
    slug: "g1-vocab-naming-words",
    subject: "reading",
    gradeBand: "grade1",
    strand: "vocabulary-1",
    title: "Naming everyday things",
    order: 1,
    generatorId: "g1-vocab-naming-words",
    conceptBrief: {
      summary:
        "Naming words tell us what something is called. A short description or riddle can give clues that point to the right naming word.",
      workedExamples: [
        "\"This animal says moo and gives milk.\" — that's a cow.",
        "\"You sit on this at the table to eat.\" — that's a chair.",
      ],
      commonMisconceptions: [
        "Picking a word that is related but not actually what the clues describe.",
        "Rushing past a clue word instead of thinking about what it points to.",
      ],
    },
  },
  {
    slug: "g1-vocab-opposites",
    subject: "reading",
    gradeBand: "grade1",
    strand: "vocabulary-1",
    title: "Opposites",
    order: 2,
    generatorId: "g1-vocab-opposites",
    conceptBrief: {
      summary:
        "Opposites are words that mean the total reverse of each other, like big and small, or hot and cold.",
      workedExamples: [
        "The opposite of \"up\" is \"down.\"",
        "The opposite of \"fast\" is \"slow.\"",
      ],
      commonMisconceptions: [
        "Picking a word that means almost the same thing instead of the opposite.",
        "Picking a word that is unrelated instead of the true opposite.",
      ],
    },
  },
  {
    slug: "g1-vocab-describing-words",
    subject: "reading",
    gradeBand: "grade1",
    strand: "vocabulary-1",
    title: "Describing words",
    order: 3,
    generatorId: "g1-vocab-describing-words",
    conceptBrief: {
      summary:
        "Describing words tell us more about a thing, like its size, color, or how it feels. Picking the best describing word means thinking about what fits that thing best.",
      workedExamples: [
        "A good describing word for an elephant is \"huge.\"",
        "A good describing word for ice is \"cold.\"",
      ],
      commonMisconceptions: [
        "Picking a word that describes a totally different kind of thing.",
        "Picking a naming word instead of a word that describes.",
      ],
    },
  },
];
