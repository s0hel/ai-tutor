import type { ReadingSkill } from "../types";

export const COMPREHENSION_2_SKILLS: ReadingSkill[] = [
  {
    slug: "g2-comp-main-idea",
    subject: "reading",
    gradeBand: "grade2",
    strand: "comprehension-2",
    title: "Finding the main idea",
    order: 1,
    generatorId: "g2-comp-main-idea",
    videoId: "4swFGRhQoMI",
    videoTitle: "What is a main idea? | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "The main idea is what a passage is mostly about. It's the big point, not just one small detail from the passage.",
      workedExamples: [
        "A passage about a girl who waters her plant every day and watches it grow is mainly about taking care of a plant.",
        "A passage about kids cleaning up trash at the park is mainly about helping keep a place clean.",
      ],
      commonMisconceptions: [
        "Picking one small detail instead of what the whole passage is about.",
        "Picking an idea that isn't really talked about in the passage.",
      ],
    },
  },
  {
    slug: "g2-comp-sequence",
    subject: "reading",
    gradeBand: "grade2",
    strand: "comprehension-2",
    title: "Putting events in order",
    order: 2,
    generatorId: "g2-comp-sequence",
    conceptBrief: {
      summary:
        "Sequencing means figuring out what happens first, next, and last in a passage. Words like first, then, next, and finally can help you tell the order.",
      workedExamples: [
        "\"First, Sam brushed his teeth. Then he put on his shoes. Finally, he grabbed his backpack.\" Sam brushed his teeth first, put on shoes next, and grabbed his backpack last.",
      ],
      commonMisconceptions: [
        "Mixing up the order of events instead of checking the order words in the passage.",
        "Guessing the order instead of rereading what actually happened first.",
      ],
    },
  },
  {
    slug: "g2-comp-cause-effect",
    subject: "reading",
    gradeBand: "grade2",
    strand: "comprehension-2",
    title: "Cause and effect",
    order: 3,
    generatorId: "g2-comp-cause-effect",
    videoId: "TiORG0pHskE",
    videoTitle: "What language shows cause and effect? | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "A cause is why something happens. An effect is what happens because of the cause. Words like because, so, and that's why can point you to the cause or effect.",
      workedExamples: [
        "\"It rained all day, so the game was canceled.\" The cause is the rain; the effect is the canceled game.",
        "\"Ben forgot his umbrella, so he got soaked walking home.\" The cause is forgetting the umbrella; the effect is getting soaked.",
      ],
      commonMisconceptions: [
        "Mixing up the cause and the effect.",
        "Picking something that happened but isn't actually connected to the event asked about.",
      ],
    },
  },
];
