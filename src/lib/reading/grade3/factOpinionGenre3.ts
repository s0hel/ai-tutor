import type { ReadingSkill } from "../types";

export const FACT_OPINION_GENRE_3_SKILLS: ReadingSkill[] = [
  {
    slug: "g3-fact-opinion",
    subject: "reading",
    gradeBand: "grade3",
    strand: "fact-opinion-genre-3",
    title: "Fact vs. opinion",
    order: 1,
    generatorId: "g3-fact-opinion",
    conceptBrief: {
      summary:
        "A fact can be checked and proven true or false. An opinion is what someone thinks or feels, and it can't be proven — watch for clue words like best, worst, favorite, and should.",
      workedExamples: [
        "\"A giraffe's neck can be six feet long\" is a fact — it can be measured.",
        "\"Giraffes are the coolest animal at the zoo\" is an opinion — 'coolest' can't be proven.",
      ],
      commonMisconceptions: [
        "Thinking a sentence must be a fact just because it sounds confident.",
        "Missing opinion clue words that signal someone's personal judgment.",
      ],
    },
  },
  {
    slug: "g3-fact-genre",
    subject: "reading",
    gradeBand: "grade3",
    strand: "fact-opinion-genre-3",
    title: "Identifying genre",
    order: 2,
    generatorId: "g3-fact-genre",
    videoId: "YxXfltZZOdI",
    videoTitle: "Reading within and across genres | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "Genre is the type or category a piece of writing belongs to, like a fairy tale, a biography, a mystery, or a how-to guide. Each genre has its own clues, like magic and 'once upon a time' for fairy tales, or numbered steps for how-to guides.",
      workedExamples: [
        "A passage about a princess who must break a witch's spell is a fairy tale.",
        "A passage listing the steps to build a birdhouse is a how-to guide.",
        "A passage describing the real childhood of a famous inventor is a biography.",
      ],
      commonMisconceptions: [
        "Mixing up genres that share a few similar features, like a fairy tale and a fable.",
        "Ignoring clear genre clues like numbered steps or 'once upon a time.'",
      ],
    },
  },
  {
    slug: "g3-fact-text-evidence",
    subject: "reading",
    gradeBand: "grade3",
    strand: "fact-opinion-genre-3",
    title: "Using text evidence",
    order: 3,
    generatorId: "g3-fact-text-evidence",
    videoId: "GO97JDR3C7Q",
    videoTitle: "Citing evidence in literary text | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "Text evidence is a specific sentence from the passage that backs up a claim. Good evidence directly supports the claim — not just a sentence that's about the same general topic.",
      workedExamples: [
        "Claim: 'Ants are strong for their size.' Good evidence: 'An ant can carry up to 50 times its own body weight.'",
      ],
      commonMisconceptions: [
        "Picking a sentence that's related to the topic but doesn't actually support the specific claim.",
        "Picking an opinion sentence instead of a fact that supports the claim.",
      ],
    },
  },
];
