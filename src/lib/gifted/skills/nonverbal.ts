import type { GTSkill } from "../types";

export const NONVERBAL_SKILLS: GTSkill[] = [
  {
    slug: "gt-figure-matrices",
    subject: "gifted",
    battery: "nonverbal",
    title: "Figure Matrices",
    order: 1,
    generatorId: "gt-figure-matrices",
    conceptBrief: {
      summary:
        "You'll see a 2x2 box of shapes with one missing. Figure out how the top-left shape changes into the top-right shape, then make that SAME change happen to the bottom-left shape to find the missing one.",
      workedExamples: [
        "A small blue circle turns into a big blue circle (it got bigger). So a small red square should turn into a big red square.",
        "A triangle pointing up turns into a triangle pointing sideways (it turned/rotated). The same turn applies to the other shape.",
      ],
      commonMisconceptions: [
        "Picking a shape just because it 'looks like it belongs' instead of checking the exact change.",
        "Only noticing one change when two things changed at once (like color AND size).",
      ],
    },
  },
  {
    slug: "gt-figure-classification",
    subject: "gifted",
    battery: "nonverbal",
    title: "Figure Classification",
    order: 2,
    generatorId: "gt-figure-classification",
    conceptBrief: {
      summary:
        "Three shapes belong together because they share ONE thing in common (same color, same shape type, same fill pattern, or same turn/rotation). Find what they share, then pick the answer choice with that same feature.",
      workedExamples: [
        "A striped circle, a striped square, and a striped triangle all share 'striped' — pick the other striped shape.",
        "Three shapes all turned the same way — pick the answer choice turned that same way.",
      ],
      commonMisconceptions: [
        "Focusing on the shape TYPE when the real match is the color or fill pattern (or vice versa).",
        "Picking the shape that looks most similar overall instead of checking the one specific shared feature.",
      ],
    },
  },
];
