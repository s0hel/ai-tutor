import type { ReadingSkill } from "../types";

export const VOCABULARY_2_SKILLS: ReadingSkill[] = [
  {
    slug: "g2-vocab-context-clues",
    subject: "reading",
    gradeBand: "grade2",
    strand: "vocabulary-2",
    title: "Using clues to figure out words",
    order: 1,
    generatorId: "g2-vocab-context-clues",
    videoId: "CiNggzdWkIo",
    videoTitle: "Using context clues to figure out new words | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "When you find a word you don't know, look at the other words and sentences around it. Those nearby clues can help you guess what the new word means.",
      workedExamples: [
        "\"The puppy was famished, so it gulped down its whole bowl of food in seconds.\" The clue \"gulped down its whole bowl\" tells you famished means very hungry.",
        "\"The room was so frigid that everyone put on their coats and mittens.\" The clue \"coats and mittens\" tells you frigid means very cold.",
      ],
      commonMisconceptions: [
        "Guessing a meaning that ignores the clues in the sentence.",
        "Skipping the unknown word instead of using nearby clues to figure it out.",
      ],
    },
  },
  {
    slug: "g2-vocab-synonyms",
    subject: "reading",
    gradeBand: "grade2",
    strand: "vocabulary-2",
    title: "Synonyms",
    order: 2,
    generatorId: "g2-vocab-synonyms",
    conceptBrief: {
      summary:
        "A synonym is a word that means almost the same thing as another word. Knowing synonyms helps you understand a sentence even if one word is new to you.",
      workedExamples: [
        "\"Happy\" and \"glad\" are synonyms — they both mean feeling good.",
        "\"Big\" and \"large\" are synonyms — they both mean great in size.",
      ],
      commonMisconceptions: [
        "Picking a word that means the opposite instead of almost the same thing.",
        "Picking a word that just sounds similar instead of one that means the same thing.",
      ],
    },
  },
  {
    slug: "g2-vocab-antonyms",
    subject: "reading",
    gradeBand: "grade2",
    strand: "vocabulary-2",
    title: "Antonyms",
    order: 3,
    generatorId: "g2-vocab-antonyms",
    conceptBrief: {
      summary:
        "An antonym is a word that means the opposite of another word. Learning antonyms helps you understand words by thinking about what they are NOT.",
      workedExamples: [
        "\"Hot\" and \"cold\" are antonyms — they are opposites.",
        "\"Fast\" and \"slow\" are antonyms — they are opposites.",
      ],
      commonMisconceptions: [
        "Picking a word that means the same thing instead of the opposite.",
        "Picking a word that is unrelated instead of a true opposite.",
      ],
    },
  },
];
