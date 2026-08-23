import type { ReadingSkill } from "../types";

export const VOCABULARY_3_SKILLS: ReadingSkill[] = [
  {
    slug: "g3-vocab-context-clues",
    subject: "reading",
    gradeBand: "grade3",
    strand: "vocabulary-3",
    title: "Context clues",
    order: 1,
    generatorId: "g3-vocab-context-clues",
    videoId: "CiNggzdWkIo",
    videoTitle: "Using context clues to figure out new words | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "When you find a word you don't know, look at the words and sentences around it. Those nearby clues can help you figure out what the word probably means.",
      workedExamples: [
        "\"The soup was scalding, so Ana blew on it before taking a bite.\" The clue 'blew on it' shows scalding means very hot.",
        "\"The puppy was exhausted after playing all day and fell asleep instantly.\" The clue 'fell asleep instantly' shows exhausted means very tired.",
      ],
      commonMisconceptions: [
        "Guessing a word's meaning without checking the clues around it in the sentence.",
        "Picking a meaning that doesn't actually match what the rest of the sentence describes.",
      ],
    },
  },
  {
    slug: "g3-vocab-synonyms-antonyms",
    subject: "reading",
    gradeBand: "grade3",
    strand: "vocabulary-3",
    title: "Synonyms and antonyms",
    order: 2,
    generatorId: "g3-vocab-synonyms-antonyms",
    conceptBrief: {
      summary:
        "A synonym is a word that means almost the same thing as another word. An antonym is a word that means the opposite. Reading the question carefully tells you which one is being asked for.",
      workedExamples: [
        "\"Happy\" and \"cheerful\" are synonyms — they mean almost the same thing.",
        "\"Hot\" and \"cold\" are antonyms — they mean the opposite.",
      ],
      commonMisconceptions: [
        "Mixing up synonym questions with antonym questions and picking the wrong kind of word.",
        "Picking a word that just sounds similar instead of one that actually matches in meaning.",
      ],
    },
  },
  {
    slug: "g3-vocab-prefixes-suffixes",
    subject: "reading",
    gradeBand: "grade3",
    strand: "vocabulary-3",
    title: "Prefixes and suffixes",
    order: 3,
    generatorId: "g3-vocab-prefixes-suffixes",
    videoId: "WYSnf6qy4WA",
    videoTitle: "What are affixes? | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "A prefix is added to the front of a word, and a suffix is added to the end. Each one changes the word's meaning in a predictable way. Knowing common ones like un-, re-, pre-, -ful, -less, and -able helps you figure out new words.",
      workedExamples: [
        "un- means 'not', so unsafe means not safe.",
        "-ful means 'full of', so joyful means full of joy.",
        "re- means 'again', so retell means to tell again.",
      ],
      commonMisconceptions: [
        "Thinking every word that starts with the same letters has that prefix (like 'under' doesn't mean 'not der').",
        "Mixing up prefixes and suffixes that look a little alike, like un- and -less.",
      ],
    },
  },
];
