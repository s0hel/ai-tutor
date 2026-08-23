import type { GTSkill } from "../types";

export const VERBAL_SKILLS: GTSkill[] = [
  {
    slug: "gt-picture-analogies",
    subject: "gifted",
    battery: "verbal",
    title: "Picture Analogies",
    order: 1,
    generatorId: "gt-picture-analogies",
    conceptBrief: {
      summary:
        "You'll see two pictures that go together, then a third picture. Figure out HOW the first two go together, then find a picture that goes with the third one the same way.",
      workedExamples: [
        "Dog is to puppy as cat is to kitten — a puppy is a baby dog, and a kitten is a baby cat. Same kind of pairing.",
        "Bird is to nest as dog is to doghouse — a bird lives in a nest, and a dog lives in a doghouse.",
      ],
      commonMisconceptions: [
        "Picking a picture just because it 'looks similar' instead of checking the actual relationship (baby of, lives in, used for, opposite, part of).",
        "Forgetting to check the relationship in the SAME direction for both pairs.",
      ],
    },
  },
  {
    slug: "gt-sentence-completion",
    subject: "gifted",
    battery: "verbal",
    title: "Sentence Completion",
    order: 2,
    generatorId: "gt-sentence-completion",
    conceptBrief: {
      summary:
        "Listen carefully to the whole question, then pick the picture that best answers it. Think about every picture before choosing.",
      workedExamples: [
        '"Which one flies in the sky?" — a bird flies, so pick the bird, not the fish or the cow.',
        '"Which one is a baby animal?" — a puppy is a baby animal, so pick the puppy over the grown-up dog.',
      ],
      commonMisconceptions: [
        "Picking the first picture that seems related instead of the one that actually answers the question.",
        "Not listening to the whole question before choosing.",
      ],
    },
  },
  {
    slug: "gt-picture-classification",
    subject: "gifted",
    battery: "verbal",
    title: "Picture Classification",
    order: 3,
    generatorId: "gt-picture-classification",
    conceptBrief: {
      summary:
        "Three pictures belong to the same group. Figure out what they have in common, then pick another picture from the answer choices that belongs in that same group.",
      workedExamples: [
        "Dog, cat, and rabbit are all pets you could have at home — a hammer doesn't belong, but a puppy does.",
        "Apple, banana, and carrot are all foods — a chair doesn't belong, but bread does.",
      ],
      commonMisconceptions: [
        "Picking a picture that matches just ONE of the three, instead of the group's real shared idea.",
        "Choosing based on color or shape instead of what the pictures actually are.",
      ],
    },
  },
];
