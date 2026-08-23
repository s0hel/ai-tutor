import type { ReadingSkill } from "../types";

export const INFERENCE_ANALYSIS_SKILLS: ReadingSkill[] = [
  {
    slug: "inf-draw-conclusions",
    subject: "reading",
    strand: "inference-analysis",
    title: "Drawing conclusions",
    order: 1,
    generatorId: "inf-draw-conclusions",
    conceptBrief: {
      summary:
        "Drawing a conclusion means using clues in the passage plus what you already know to figure out something the author didn't say directly — but it has to be backed up by the text, not just a guess.",
      workedExamples: [
        "\"Maria packed an umbrella, boots, and a raincoat before heading out.\" You can conclude she expects rain, even though the passage never says the word 'rain.'",
      ],
      commonMisconceptions: [
        "Making a conclusion that isn't actually supported by details in the passage.",
        "Confusing a conclusion with something the passage stated outright.",
      ],
    },
  },
  {
    slug: "inf-cause-effect",
    subject: "reading",
    strand: "inference-analysis",
    title: "Cause and effect",
    order: 2,
    generatorId: "inf-cause-effect",
    conceptBrief: {
      summary:
        "A cause is why something happens; an effect is what happens as a result. Passages often signal these with words like because, so, as a result, and therefore.",
      workedExamples: [
        "\"Because the road was icy, the bus arrived late.\" Cause: icy road. Effect: bus arrived late.",
      ],
      commonMisconceptions: [
        "Mixing up which event is the cause and which is the effect.",
        "Assuming two events happening close together must be cause and effect when the passage doesn't say so.",
      ],
    },
  },
  {
    slug: "inf-compare-contrast",
    subject: "reading",
    strand: "inference-analysis",
    title: "Comparing and contrasting",
    order: 3,
    generatorId: "inf-compare-contrast",
    conceptBrief: {
      summary:
        "Comparing looks at how two things are alike; contrasting looks at how they're different. Passages often use words like both, similarly, but, however, and while to signal these relationships.",
      workedExamples: [
        "\"Both the fox and the wolf are wild canines, but the fox is much smaller.\" Similarity: both are wild canines. Difference: size.",
      ],
      commonMisconceptions: [
        "Only noticing similarities or only noticing differences instead of tracking both.",
        "Answering with a fact about just one of the two things instead of an actual comparison.",
      ],
    },
  },
  {
    slug: "inf-predict",
    subject: "reading",
    strand: "inference-analysis",
    title: "Making predictions",
    order: 4,
    generatorId: "inf-predict",
    conceptBrief: {
      summary:
        "Predicting means using clues from the passage to make a sensible guess about what will happen next — a good prediction fits logically with everything the passage has already told you.",
      workedExamples: [
        "\"The storm clouds grew darker and the wind picked up as the campers hurried to pack their tent.\" A reasonable prediction: it's about to rain and the campers want to be ready.",
      ],
      commonMisconceptions: [
        "Predicting something that contradicts details already given in the passage.",
        "Confusing a prediction (about the future) with a conclusion (about something already true).",
      ],
    },
  },
];
