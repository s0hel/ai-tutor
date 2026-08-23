import type { Skill } from "../types";

export const ADDITION_SUBTRACTION_SKILLS: Skill[] = [
  {
    slug: "g1-add-within-10",
    subject: "math",
    gradeBand: "grade1",
    strand: "addition-subtraction",
    title: "Adding within 10",
    order: 1,
    generatorId: "g1-add-within-10",
    videoId: "kpEJwpemL2Q",
    videoTitle: "Addition and subtraction within 10 | Basic addition and subtraction | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "Adding means putting two groups together to find the total. Counting on from the bigger number (instead of starting over from 1) is a fast way to add small numbers.",
      workedExamples: ["3 + 4: start at 4, count on 3 more: 5, 6, 7. So 3 + 4 = 7."],
      commonMisconceptions: [
        "Recounting both groups from scratch instead of counting on from the larger number.",
        "Losing track while counting on and landing one number off.",
      ],
    },
  },
  {
    slug: "g1-add-within-20",
    subject: "math",
    gradeBand: "grade1",
    strand: "addition-subtraction",
    title: "Adding within 20",
    order: 2,
    generatorId: "g1-add-within-20",
    videoId: "9FC0WT186aY",
    videoTitle: "Adding to 10 | Basic addition and subtraction | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "'Making a ten' is a helpful strategy: break apart one number to make the other number into a 10, then add what's left. Tens are easy to add to.",
      workedExamples: ["9 + 5: take 1 from 5 to make 9 into 10. 10 + 4 = 14. So 9 + 5 = 14."],
      commonMisconceptions: [
        "Not breaking apart the second number correctly when making a ten.",
        "Forgetting to add back the leftover part after making a ten.",
      ],
    },
  },
  {
    slug: "g1-subtract-within-20",
    subject: "math",
    gradeBand: "grade1",
    strand: "addition-subtraction",
    title: "Subtracting within 20",
    order: 3,
    generatorId: "g1-subtract-within-20",
    videoId: "9McJ3GobPaY",
    videoTitle: "Subtracting 14 - 6 | Addition and subtraction within 20 | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "Subtracting means taking away or finding the difference between two numbers. Counting back, or thinking 'what do I add to get there', both work well for subtraction within 20.",
      workedExamples: ["12 - 5: count back 5 from 12: 11, 10, 9, 8, 7. So 12 - 5 = 7."],
      commonMisconceptions: [
        "Counting back the wrong number of steps.",
        "Mixing up which number to start counting back from.",
      ],
    },
  },
  {
    slug: "g1-addition-word-problems",
    subject: "math",
    gradeBand: "grade1",
    strand: "addition-subtraction",
    title: "Addition and subtraction word problems",
    order: 4,
    generatorId: "g1-addition-word-problems",
    videoId: "SfgD7Sm08ns",
    videoTitle: "Exercising gorillas | Addition and subtraction within 20 | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "Word problems describe a real situation with numbers hidden in the story. Figure out whether things are being put together (add) or taken away/compared (subtract), then solve.",
      workedExamples: [
        "Sam has 6 stickers. He gets 3 more. How many does he have now? 6 + 3 = 9.",
        "Sam has 9 stickers. He gives away 3. How many are left? 9 - 3 = 6.",
      ],
      commonMisconceptions: [
        "Adding when the story actually describes taking away, or vice versa.",
        "Using the wrong numbers from the story.",
      ],
    },
  },
  {
    slug: "g1-missing-addend",
    subject: "math",
    gradeBand: "grade1",
    strand: "addition-subtraction",
    title: "Finding the missing number",
    order: 5,
    generatorId: "g1-missing-addend",
    videoId: "zTK6XUF0HAs",
    videoTitle: "Missing numbers in addition and subtraction | 2nd grade | Khan Academy",
    conceptBrief: {
      summary:
        "In an equation like 5 + ? = 12, the missing number is whatever needs to be added to 5 to reach 12. You can find it by counting up from 5 to 12, or by subtracting: 12 - 5.",
      workedExamples: ["5 + ? = 12: count up from 5 to 12 (7 steps), or compute 12 - 5 = 7. The missing number is 7."],
      commonMisconceptions: [
        "Adding the two known numbers together instead of finding the difference.",
        "Miscounting the steps between the two numbers.",
      ],
    },
  },
];
