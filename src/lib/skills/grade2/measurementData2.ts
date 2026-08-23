import type { Skill } from "../types";

export const MEASUREMENT_DATA_2_SKILLS: Skill[] = [
  {
    slug: "g2-measure-length-units",
    subject: "math",
    gradeBand: "grade2",
    strand: "measurement-data-2",
    title: "Measuring length in standard units",
    order: 1,
    generatorId: "g2-measure-length-units",
    videoId: "muC7HMIEYDU",
    videoTitle: "Measuring lengths 2 | Measurement and data | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "Length can be measured in standard units like inches or centimeters using a ruler. Line up one end of the object with the 0 mark and read the number at the other end.",
      workedExamples: ["A crayon that lines up with the 4-inch mark on a ruler is 4 inches long."],
      commonMisconceptions: [
        "Starting the measurement from the edge of the ruler instead of the 0 mark.",
        "Reading the wrong number when the object doesn't end exactly on a mark.",
      ],
    },
  },
  {
    slug: "g2-tell-time-5min",
    subject: "math",
    gradeBand: "grade2",
    strand: "measurement-data-2",
    title: "Telling time to the nearest 5 minutes",
    order: 2,
    generatorId: "g2-tell-time-5min",
    conceptBrief: {
      summary:
        "Each small mark around a clock face stands for 1 minute, and each number stands for 5 minutes. Count by 5s around the clock to read the minute hand.",
      workedExamples: ["If the minute hand points at the 4, that's 4 × 5 = 20 minutes past the hour."],
      commonMisconceptions: [
        "Reading the minute hand's number directly instead of multiplying by 5.",
        "Mixing up the hour hand and minute hand.",
      ],
    },
  },
  {
    slug: "g2-counting-money",
    subject: "math",
    gradeBand: "grade2",
    strand: "measurement-data-2",
    title: "Counting coins and bills",
    order: 3,
    generatorId: "g2-counting-money",
    videoId: "pJ8KwRztfF0",
    videoTitle: "Counting American coins | Measurement and data | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "Add up the value of each coin or bill to find the total amount of money. It helps to count the largest values first, then add the smaller ones.",
      workedExamples: ["2 quarters + 1 dime = 50¢ + 10¢ = 60¢."],
      commonMisconceptions: [
        "Counting the number of coins instead of their total value (e.g. thinking 3 coins always means 3 cents).",
        "Mixing up the values of similar-looking coins.",
      ],
    },
  },
  {
    slug: "g2-read-bar-graphs",
    subject: "math",
    gradeBand: "grade2",
    strand: "measurement-data-2",
    title: "Reading bar graphs",
    order: 4,
    generatorId: "g2-read-bar-graphs",
    videoId: "uftnBXB98l8",
    videoTitle: "Interpreting bar graphs (colors) | Math | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "A bar graph uses bars of different heights or lengths to show amounts. Match the bar to its label, then read the number it lines up with.",
      workedExamples: ["If the 'apples' bar reaches up to 7 on the graph, that means 7 apples were counted."],
      commonMisconceptions: [
        "Reading the wrong bar because of misreading its label.",
        "Misreading the value where the bar ends against the scale.",
      ],
    },
  },
];
