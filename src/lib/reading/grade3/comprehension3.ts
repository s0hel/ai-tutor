import type { ReadingSkill } from "../types";

export const COMPREHENSION_3_SKILLS: ReadingSkill[] = [
  {
    slug: "g3-comp-main-idea",
    subject: "reading",
    gradeBand: "grade3",
    strand: "comprehension-3",
    title: "Main idea and details",
    order: 1,
    generatorId: "g3-comp-main-idea",
    videoId: "0w5-r_5uD1U",
    videoTitle: "Finding two or more main ideas in informational text | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "The main idea is what a passage is mostly about. The details are the smaller facts and examples that support it. A good main idea covers the whole passage, not just one detail from it.",
      workedExamples: [
        "A passage about a boy who feeds and walks his dog every morning before school is mainly about taking good care of a pet.",
        "A passage about kids planting a garden at their school is mainly about growing a school garden together.",
      ],
      commonMisconceptions: [
        "Picking one small detail instead of the idea that covers the whole passage.",
        "Choosing an idea so broad it could describe almost any passage.",
      ],
    },
  },
  {
    slug: "g3-comp-summarize",
    subject: "reading",
    gradeBand: "grade3",
    strand: "comprehension-3",
    title: "Summarizing",
    order: 2,
    generatorId: "g3-comp-summarize",
    videoId: "as7xe8UQEr4",
    videoTitle: "Summarizing nonfiction | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "A summary tells the most important parts of a passage in just a few words, without adding anything the passage didn't say. It's shorter than the passage but still covers the main points.",
      workedExamples: [
        "A passage about a class trip to the zoo, where students saw lions and fed goats, can be summarized as: 'A class visited the zoo and saw lions and fed goats.'",
      ],
      commonMisconceptions: [
        "Summarizing with just one small detail instead of the whole passage.",
        "Adding ideas or opinions that the passage never actually mentioned.",
      ],
    },
  },
  {
    slug: "g3-comp-sequence",
    subject: "reading",
    gradeBand: "grade3",
    strand: "comprehension-3",
    title: "Sequence of events",
    order: 3,
    generatorId: "g3-comp-sequence",
    conceptBrief: {
      summary:
        "Sequencing means figuring out what happens first, next, and last in a passage. Clue words like first, next, then, after, and finally help show the order events happen in.",
      workedExamples: [
        "\"First, Mia watered the seeds. Next, she waited a week. Finally, tiny green sprouts popped up.\" The order is: water, wait, sprouts appear.",
      ],
      commonMisconceptions: [
        "Guessing the order instead of checking the passage's order words.",
        "Mixing up which event happened before another.",
      ],
    },
  },
];
