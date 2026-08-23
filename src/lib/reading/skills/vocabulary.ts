import type { ReadingSkill } from "../types";

export const VOCABULARY_SKILLS: ReadingSkill[] = [
  {
    slug: "vocab-context-clues",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "vocabulary",
    title: "Using context clues",
    order: 1,
    generatorId: "vocab-context-clues",
    videoId: "CiNggzdWkIo",
    videoTitle: "Using context clues to figure out new words | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "When you hit a word you don't know, look at the words and sentences around it — the 'context' — for hints about what it means. Sometimes the sentence even gives an example or explains the word directly.",
      workedExamples: [
        "\"The ancient castle was dilapidated, with crumbling walls and a caved-in roof.\" The words 'crumbling' and 'caved-in' are clues that dilapidated means run-down or falling apart.",
        "\"She was ecstatic when she won first place, jumping and cheering with joy.\" The clues 'jumping and cheering with joy' show that ecstatic means extremely happy.",
      ],
      commonMisconceptions: [
        "Guessing a word's meaning from how it sounds instead of from the surrounding sentence.",
        "Ignoring nearby clue words that directly explain or restate the unfamiliar word.",
      ],
    },
  },
  {
    slug: "vocab-synonyms",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "vocabulary",
    title: "Finding synonyms",
    order: 2,
    generatorId: "vocab-synonyms",
    conceptBrief: {
      summary: "A synonym is a word that means almost the same thing as another word.",
      workedExamples: ["A synonym for happy is joyful.", "A synonym for tiny is minuscule."],
      commonMisconceptions: [
        "Picking a word that's merely related in topic rather than actually similar in meaning.",
        "Confusing a synonym with an antonym (opposite).",
      ],
    },
  },
  {
    slug: "vocab-antonyms",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "vocabulary",
    title: "Finding antonyms",
    order: 3,
    generatorId: "vocab-antonyms",
    conceptBrief: {
      summary: "An antonym is a word that means the opposite of another word.",
      workedExamples: ["An antonym for ancient is modern.", "An antonym for generous is stingy."],
      commonMisconceptions: [
        "Picking a word that's simply different rather than truly opposite in meaning.",
        "Confusing an antonym with a synonym (similar meaning).",
      ],
    },
  },
  {
    slug: "vocab-prefixes-suffixes",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "vocabulary",
    title: "Prefixes and suffixes",
    order: 4,
    generatorId: "vocab-prefixes-suffixes",
    videoId: "NcrsPIv6NdI",
    videoTitle: "Using word parts to determine meaning | Reading | 5th Grade | Khan Academy",
    conceptBrief: {
      summary:
        "A prefix is added to the front of a word and a suffix to the end — each changes the word's meaning in a predictable way. Knowing common ones (un-, re-, pre-, -ful, -less, -able) helps you figure out unfamiliar words.",
      workedExamples: [
        "un- means 'not', so unhappy means not happy.",
        "-less means 'without', so fearless means without fear.",
        "re- means 'again', so rewrite means to write again.",
      ],
      commonMisconceptions: [
        "Assuming every word that starts with a common prefix letter pattern actually uses that prefix (e.g. 'uncle' doesn't mean 'not cle').",
        "Mixing up similar-looking prefixes/suffixes with different meanings (un- vs. re-).",
      ],
    },
  },
];
