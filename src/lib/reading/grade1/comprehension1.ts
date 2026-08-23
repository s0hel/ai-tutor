import type { ReadingSkill } from "../types";

export const COMPREHENSION_1_SKILLS: ReadingSkill[] = [
  {
    slug: "g1-comp-main-idea",
    subject: "reading",
    gradeBand: "grade1",
    strand: "comprehension-1",
    title: "What is this story about?",
    order: 1,
    generatorId: "g1-comp-main-idea",
    conceptBrief: {
      summary:
        "A short story is mostly about one main thing. Reading the whole story and thinking about what it is mostly about helps you find that main idea.",
      workedExamples: [
        "\"Sam has a red ball. He kicks it in the park. Sam has fun.\" — this story is mostly about Sam playing with his ball.",
      ],
      commonMisconceptions: [
        "Picking just one small detail instead of thinking about the whole story.",
        "Picking an idea that isn't in the story at all.",
      ],
    },
  },
  {
    slug: "g1-comp-sequence",
    subject: "reading",
    gradeBand: "grade1",
    strand: "comprehension-1",
    title: "First, next, last",
    order: 2,
    generatorId: "g1-comp-sequence",
    conceptBrief: {
      summary:
        "Stories often happen in order. Words like first, next, and last help you tell what happened at the start, in the middle, and at the end.",
      workedExamples: [
        "\"First, Mia woke up. Next, she ate eggs. Last, she went to school.\" — the first thing that happened was Mia waking up.",
      ],
      commonMisconceptions: [
        "Mixing up what happened first with what happened last.",
        "Picking something that was not in the story at all.",
      ],
    },
  },
  {
    slug: "g1-comp-details",
    subject: "reading",
    gradeBand: "grade1",
    strand: "comprehension-1",
    title: "Remembering story details",
    order: 3,
    generatorId: "g1-comp-details",
    videoId: "sfx4K2LUbSs",
    videoTitle: "The Key Details of a Story | Reading Comprehension | Khan Academy Kids",
    videoSource: "Khan Academy Kids",
    conceptBrief: {
      summary:
        "A detail is one small piece of information a story tells us. Finding the right detail means going back to what the story actually said.",
      workedExamples: [
        "\"Ben has a small brown dog named Max.\" — a detail from this sentence is that the dog's name is Max.",
      ],
      commonMisconceptions: [
        "Picking something that sounds true but was never actually said in the story.",
        "Mixing up details from different parts of the story.",
      ],
    },
  },
];
