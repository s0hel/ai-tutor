import type { ReadingSkill } from "../types";

export const COMPREHENSION_SKILLS: ReadingSkill[] = [
  {
    slug: "comp-main-idea",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "comprehension",
    title: "Finding the main idea",
    order: 1,
    generatorId: "comp-main-idea",
    videoId: "4swFGRhQoMI",
    videoTitle: "What is a main idea? | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "The main idea is what a passage is mostly about — the big point the author is making. It's usually broader than any single detail, but not so broad that it could describe a totally different passage.",
      workedExamples: [
        "A passage describing how bees collect nectar, make honey, and pollinate flowers is mainly about how bees help plants and make food.",
        "A passage about a kid practicing free throws every day until she makes the team is mainly about the value of practice and persistence.",
      ],
      commonMisconceptions: [
        "Picking a detail from the passage instead of the overall point it supports.",
        "Picking an idea that's too broad or unrelated to what the passage actually says.",
      ],
    },
  },
  {
    slug: "comp-supporting-details",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "comprehension",
    title: "Identifying supporting details",
    order: 2,
    generatorId: "comp-supporting-details",
    videoId: "lGJw0QS1Y9w",
    videoTitle: "Supporting a main idea with key details | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "Supporting details are the specific facts, examples, or pieces of evidence in a passage that back up its main idea. Finding the right detail means going back to what the passage actually said, not what you assume.",
      workedExamples: [
        "If the main idea is 'volcanoes can be dangerous', a supporting detail might be 'lava can destroy entire towns.'",
      ],
      commonMisconceptions: [
        "Answering with something true in general instead of something the passage specifically stated.",
        "Mixing up a supporting detail with the main idea itself.",
      ],
    },
  },
  {
    slug: "comp-sequence",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "comprehension",
    title: "Sequencing events",
    order: 3,
    generatorId: "comp-sequence",
    conceptBrief: {
      summary:
        "Sequencing means figuring out the order events happen in a passage. Look for time-order clue words like first, next, then, after, and finally, and pay attention to what logically has to happen before something else.",
      workedExamples: [
        "\"First she gathered the ingredients, then mixed the batter, and finally baked the cake.\" The order is: gather, mix, bake.",
      ],
      commonMisconceptions: [
        "Assuming events happened in the order they're mentioned even when the passage describes a flashback or reordering.",
        "Missing sequence clue words that signal the true order.",
      ],
    },
  },
  {
    slug: "comp-summarize",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "comprehension",
    title: "Summarizing a passage",
    order: 4,
    generatorId: "comp-summarize",
    videoId: "SmnR4AZ-XM8",
    videoTitle: "Summarizing stories | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "A good summary captures the most important points of a passage in far fewer words, without adding opinions or leaving out anything essential. It's different from just repeating one small detail.",
      workedExamples: [
        "A passage about a class trip to a science museum where students saw a planetarium show and did a chemistry experiment can be summarized as: 'A class visited a science museum and enjoyed a planetarium show and a chemistry experiment.'",
      ],
      commonMisconceptions: [
        "Summarizing with just one detail instead of the passage's overall content.",
        "Adding information or opinions that weren't actually in the passage.",
      ],
    },
  },
];
