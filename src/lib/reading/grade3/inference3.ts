import type { ReadingSkill } from "../types";

export const INFERENCE_3_SKILLS: ReadingSkill[] = [
  {
    slug: "g3-inf-draw-conclusions",
    subject: "reading",
    gradeBand: "grade3",
    strand: "inference-3",
    title: "Drawing conclusions",
    order: 1,
    generatorId: "g3-inf-draw-conclusions",
    conceptBrief: {
      summary:
        "Drawing a conclusion means using clues in a passage plus what you already know to figure out something the passage doesn't say directly. Your conclusion has to make sense with what the passage actually tells you.",
      workedExamples: [
        "\"Sam grabbed his mitt, his bat, and his cleats before running out the door.\" You can conclude Sam is heading to a baseball game, even though the passage never says the word 'baseball.'",
      ],
      commonMisconceptions: [
        "Making a conclusion that isn't really backed up by the clues in the passage.",
        "Confusing a conclusion with something the passage already stated outright.",
      ],
    },
  },
  {
    slug: "g3-inf-cause-effect",
    subject: "reading",
    gradeBand: "grade3",
    strand: "inference-3",
    title: "Cause and effect",
    order: 2,
    generatorId: "g3-inf-cause-effect",
    videoId: "TiORG0pHskE",
    videoTitle: "What language shows cause and effect? | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "A cause is why something happens. An effect is what happens because of that cause. Words like because, so, and as a result often point to the cause-and-effect link in a passage.",
      workedExamples: [
        "\"Because it snowed all night, school was cancelled the next day.\" Cause: it snowed all night. Effect: school was cancelled.",
      ],
      commonMisconceptions: [
        "Mixing up which event is the cause and which is the effect.",
        "Thinking two events near each other must be cause and effect even when the passage doesn't say so.",
      ],
    },
  },
  {
    slug: "g3-inf-predict",
    subject: "reading",
    gradeBand: "grade3",
    strand: "inference-3",
    title: "Making predictions",
    order: 3,
    generatorId: "g3-inf-predict",
    videoId: "Fu2gUTrd4Ow",
    videoTitle: "How to make inferences | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "Predicting means using the clues in a passage to make a sensible guess about what happens next. A good prediction fits with everything the passage has already told you.",
      workedExamples: [
        "\"Dark clouds rolled in and thunder rumbled in the distance as the kids raced to gather their beach towels.\" A reasonable prediction: a storm is about to start, so the kids are packing up.",
      ],
      commonMisconceptions: [
        "Predicting something that goes against details already given in the passage.",
        "Mixing up a prediction (about what happens next) with a conclusion (about something already true).",
      ],
    },
  },
];
