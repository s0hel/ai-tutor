import type { Skill } from "../types";

export const MEASUREMENT_DATA_SKILLS: Skill[] = [
  {
    slug: "g1-compare-length",
    subject: "math",
    gradeBand: "grade1",
    strand: "measurement-data",
    title: "Comparing length",
    order: 1,
    generatorId: "g1-compare-length",
    videoId: "o-D-8B_5ibU",
    videoTitle: "Comparing lengths | Measurement and data | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "You can compare the length of two objects directly by lining them up at one end and seeing which one sticks out further — that one is longer.",
      workedExamples: ["A pencil that's 6 inches long is shorter than a ruler that's 12 inches long."],
      commonMisconceptions: [
        "Comparing objects without lining up their starting points, which gives a misleading result.",
        "Assuming the object that looks bigger overall is always longer, without focusing on length specifically.",
      ],
    },
  },
  {
    slug: "g1-tell-time-hour",
    subject: "math",
    gradeBand: "grade1",
    strand: "measurement-data",
    title: "Telling time to the hour and half-hour",
    order: 2,
    generatorId: "g1-tell-time-hour",
    conceptBrief: {
      summary:
        "On an analog clock, the short hand shows the hour and the long hand shows the minutes. When the long hand points straight up (12), it's exactly on the hour. When it points straight down (6), it's half past the hour.",
      workedExamples: ["Short hand on 3, long hand on 12: it's 3:00.", "Short hand between 3 and 4, long hand on 6: it's 3:30."],
      commonMisconceptions: [
        "Mixing up the hour hand and minute hand.",
        "Reading the hour hand as if it should point exactly at a number even for half-past times (it points between two numbers).",
      ],
    },
  },
  {
    slug: "g1-read-tally-charts",
    subject: "math",
    gradeBand: "grade1",
    strand: "measurement-data",
    title: "Reading tally charts and picture graphs",
    order: 3,
    generatorId: "g1-read-tally-charts",
    conceptBrief: {
      summary:
        "Tally charts and picture graphs show how many of each thing there are. Each tally mark or picture stands for one (or sometimes more) — count them up to answer questions about the data.",
      workedExamples: ["If the chart shows 4 tally marks next to 'apples,' that means 4 apples were counted."],
      commonMisconceptions: [
        "Miscounting tally marks, especially the group-of-five bundles (four marks plus one diagonal line through them).",
        "Confusing which row/category a question is asking about.",
      ],
    },
  },
];
