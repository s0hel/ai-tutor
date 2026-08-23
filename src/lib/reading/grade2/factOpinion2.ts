import type { ReadingSkill } from "../types";

export const FACT_OPINION_2_SKILLS: ReadingSkill[] = [
  {
    slug: "g2-fact-opinion",
    subject: "reading",
    gradeBand: "grade2",
    strand: "fact-opinion-2",
    title: "Fact vs. opinion",
    order: 1,
    generatorId: "g2-fact-opinion",
    conceptBrief: {
      summary:
        "A fact is something that can be proven true. An opinion is what someone thinks or feels, and it can be different from person to person.",
      workedExamples: [
        "\"Dogs have four legs\" is a fact — you can check and prove it.",
        "\"Dogs are the best pets\" is an opinion — it's what someone believes, not something you can prove.",
      ],
      commonMisconceptions: [
        "Thinking a statement is a fact just because it sounds confident.",
        "Mixing up a provable statement with a feeling or judgment.",
      ],
    },
  },
  {
    slug: "g2-fact-genre",
    subject: "reading",
    gradeBand: "grade2",
    strand: "fact-opinion-2",
    title: "Fiction vs. nonfiction",
    order: 2,
    generatorId: "g2-fact-genre",
    videoId: "SV5qoOWONm8",
    videoTitle: "Fiction v. Nonfiction | Reading Comprehension | Khan Academy Kids",
    videoSource: "Khan Academy Kids",
    conceptBrief: {
      summary:
        "Fiction is a made-up story that comes from someone's imagination. Nonfiction is about real people, places, or facts, and it's true.",
      workedExamples: [
        "A story about a dragon who learns to fly and helps a lost fairy find her way home is fiction.",
        "A book explaining how caterpillars turn into butterflies is nonfiction.",
      ],
      commonMisconceptions: [
        "Thinking a story is nonfiction just because it has ordinary details, like a kid going to school.",
        "Thinking a book is fiction just because it has pictures or is short.",
      ],
    },
  },
  {
    slug: "g2-fact-text-evidence",
    subject: "reading",
    gradeBand: "grade2",
    strand: "fact-opinion-2",
    title: "Finding evidence in the text",
    order: 3,
    generatorId: "g2-fact-text-evidence",
    conceptBrief: {
      summary:
        "Text evidence is a sentence from the passage that proves or supports an idea. Good readers point to the exact words in the text instead of just guessing.",
      workedExamples: [
        "Claim: \"The dog was scared.\" Evidence: \"The dog hid under the bed and whimpered.\"",
      ],
      commonMisconceptions: [
        "Picking a sentence that sounds related but doesn't actually support the claim.",
        "Answering with an outside idea instead of a sentence that's actually in the passage.",
      ],
    },
  },
];
