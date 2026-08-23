import type { ReadingSkill } from "../types";

export const FACT_OPINION_GENRE_SKILLS: ReadingSkill[] = [
  {
    slug: "fact-opinion",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "fact-opinion-genre",
    title: "Fact vs. opinion",
    order: 1,
    generatorId: "fact-opinion",
    conceptBrief: {
      summary:
        "A fact can be proven true or false. An opinion is what someone thinks, believes, or feels, and can't be proven — watch for opinion clue words like best, worst, should, favorite, and beautiful.",
      workedExamples: [
        "\"The Great Wall of China is over 13,000 miles long\" is a fact — it can be measured and checked.",
        "\"The Great Wall of China is the most amazing structure ever built\" is an opinion — 'most amazing' can't be proven.",
      ],
      commonMisconceptions: [
        "Assuming a statement is a fact just because it sounds confident or is stated firmly.",
        "Missing opinion clue words that signal a judgment rather than a provable statement.",
      ],
    },
  },
  {
    slug: "fact-text-evidence",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "fact-opinion-genre",
    title: "Finding text evidence",
    order: 2,
    generatorId: "fact-text-evidence",
    videoId: "GO97JDR3C7Q",
    videoTitle: "Citing evidence in literary text | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "Text evidence is a specific sentence or detail from the passage that backs up a claim. Finding good evidence means going back to the passage and picking a sentence that directly supports the claim, not just one that's related to the topic.",
      workedExamples: [
        "Claim: 'Sharks are important to ocean ecosystems.' Good evidence from a passage might be: 'Sharks keep fish populations balanced by eating weaker or sick fish.'",
      ],
      commonMisconceptions: [
        "Picking a sentence that's about the same topic but doesn't actually support the specific claim.",
        "Picking an opinion instead of a factual detail as 'evidence.'",
      ],
    },
  },
  {
    slug: "fact-genre",
    subject: "reading",
    gradeBand: "grade4-5",
    strand: "fact-opinion-genre",
    title: "Fiction vs. nonfiction",
    order: 3,
    generatorId: "fact-genre",
    videoId: "YxXfltZZOdI",
    videoTitle: "Reading within and across genres | Reading | Khan Academy",
    conceptBrief: {
      summary:
        "Nonfiction is about real people, places, events, or facts. Fiction is made up, even if it feels realistic — look for clues like invented characters, talking animals, or impossible events versus real facts, dates, and information.",
      workedExamples: [
        "A passage explaining how bees make honey, with real facts about bee biology, is nonfiction.",
        "A passage about a girl who discovers her cat can talk is fiction, since talking cats aren't real.",
      ],
      commonMisconceptions: [
        "Assuming a passage is nonfiction just because it's written in a serious tone.",
        "Assuming a passage is fiction just because it includes a character's name and dialogue — nonfiction can too (like a biography).",
      ],
    },
  },
];
