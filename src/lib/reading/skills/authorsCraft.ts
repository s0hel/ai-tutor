import type { ReadingSkill } from "../types";

export const AUTHORS_CRAFT_SKILLS: ReadingSkill[] = [
  {
    slug: "craft-authors-purpose",
    subject: "reading",
    strand: "authors-craft",
    title: "Author's purpose",
    order: 1,
    generatorId: "craft-authors-purpose",
    conceptBrief: {
      summary:
        "Authors write for different reasons: to persuade (convince you of something), to inform (teach you facts), or to entertain (tell an enjoyable story). Look at the content and tone to figure out which one fits.",
      workedExamples: [
        "A passage giving step-by-step facts about how volcanoes form is written to inform.",
        "A passage arguing kids should get more recess time is written to persuade.",
        "A funny story about a dog who thinks he's a cat is written to entertain.",
      ],
      commonMisconceptions: [
        "Assuming any passage with facts is automatically 'to inform' even when it's actually arguing a position.",
        "Confusing 'to entertain' with 'to persuade' when a story also teaches a lesson.",
      ],
    },
  },
  {
    slug: "craft-point-of-view",
    subject: "reading",
    strand: "authors-craft",
    title: "Point of view",
    order: 2,
    generatorId: "craft-point-of-view",
    conceptBrief: {
      summary:
        "Point of view is who's telling the story. First-person uses 'I' and 'we' — the narrator is a character in the story. Third-person uses 'he,' 'she,' or names — the narrator is outside the story looking in.",
      workedExamples: [
        "\"I ran as fast as I could to catch the bus.\" — first-person.",
        "\"She ran as fast as she could to catch the bus.\" — third-person.",
      ],
      commonMisconceptions: [
        "Assuming a story is first-person just because it names a main character early on.",
        "Missing pronoun clues (I/we vs. he/she/they) that reveal the actual point of view.",
      ],
    },
  },
  {
    slug: "craft-figurative-language",
    subject: "reading",
    strand: "authors-craft",
    title: "Figurative language",
    order: 3,
    generatorId: "craft-figurative-language",
    conceptBrief: {
      summary:
        "Figurative language doesn't mean exactly what it says word-for-word. A simile compares two things using 'like' or 'as' (brave as a lion). A metaphor says one thing IS another (time is money). An idiom is a phrase with a meaning different from its literal words (it's raining cats and dogs).",
      workedExamples: [
        "\"Her smile was as bright as the sun\" is a simile.",
        "\"The classroom was a zoo\" is a metaphor.",
        "\"Break a leg\" is an idiom meaning good luck.",
      ],
      commonMisconceptions: [
        "Taking figurative language literally instead of recognizing the comparison or hidden meaning.",
        "Mixing up similes (using like/as) with metaphors (no like/as).",
      ],
    },
  },
  {
    slug: "craft-text-structure",
    subject: "reading",
    strand: "authors-craft",
    title: "Text structure",
    order: 4,
    generatorId: "craft-text-structure",
    conceptBrief: {
      summary:
        "Authors organize information in different patterns: chronological (events in time order), compare-contrast (how things are alike/different), cause-effect (why something happened), and problem-solution (a problem and how it's fixed).",
      workedExamples: [
        "A passage describing what happens each morning at a farm, hour by hour, uses chronological structure.",
        "A passage explaining that litter harmed a river, so the town organized a cleanup, uses problem-solution structure.",
      ],
      commonMisconceptions: [
        "Confusing cause-effect structure with problem-solution structure when a passage has elements of both.",
        "Assuming any passage with dates or times is chronological even when it's really comparing two time periods.",
      ],
    },
  },
];
