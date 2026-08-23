import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface EvidenceItem {
  passage: string;
  claim: string;
  correctEvidence: string;
  distractors: [string, string, string];
}

const ITEMS: EvidenceItem[] = [
  {
    passage:
      "Sharks play a vital role in ocean ecosystems. They keep fish populations balanced by eating weaker or sick fish, which helps prevent disease from spreading. Some shark species also migrate thousands of miles each year, and many are covered in tooth-like scales called denticles.",
    claim: "Sharks help keep ocean ecosystems healthy.",
    correctEvidence: "They keep fish populations balanced by eating weaker or sick fish.",
    distractors: [
      "Some shark species migrate thousands of miles each year.",
      "Sharks are covered in tooth-like scales called denticles.",
      "Sharks have existed on Earth for millions of years.",
    ],
  },
  {
    passage:
      "Regular exercise benefits both the body and mind. Studies show that people who exercise regularly have lower rates of heart disease. Exercise also releases chemicals in the brain that reduce stress and improve mood. Many gyms also offer group fitness classes on weekends.",
    claim: "Exercise improves mental health.",
    correctEvidence: "Exercise releases chemicals in the brain that reduce stress and improve mood.",
    distractors: [
      "People who exercise regularly have lower rates of heart disease.",
      "Many gyms offer group fitness classes on weekends.",
      "Exercise equipment can be expensive to buy.",
    ],
  },
  {
    passage:
      "Recycling helps protect the environment in several ways. Making products from recycled aluminum uses 95% less energy than making them from raw materials. Recycling also reduces the amount of trash sent to landfills, and many cities now offer curbside recycling pickup.",
    claim: "Recycling saves a significant amount of energy.",
    correctEvidence: "Making products from recycled aluminum uses 95% less energy than making them from raw materials.",
    distractors: [
      "Recycling reduces the amount of trash sent to landfills.",
      "Many cities offer curbside recycling pickup.",
      "Some materials cannot be recycled at all.",
    ],
  },
  {
    passage:
      "Elephants are highly intelligent and social animals. They can recognize themselves in mirrors, a rare ability among animals. Elephants also form deep family bonds, often mourning the loss of a herd member. Adult elephants can weigh over 12,000 pounds.",
    claim: "Elephants show self-awareness.",
    correctEvidence: "They can recognize themselves in mirrors, a rare ability among animals.",
    distractors: [
      "Elephants form deep family bonds within their herd.",
      "Adult elephants can weigh over 12,000 pounds.",
      "Elephants often mourn the loss of a herd member.",
    ],
  },
  {
    passage:
      "Bees are essential to global food production. About one-third of the food humans eat depends on pollination by bees and other insects. Bees also produce honey and beeswax, and a single hive can contain tens of thousands of bees.",
    claim: "Human food supplies depend heavily on bees.",
    correctEvidence: "About one-third of the food humans eat depends on pollination by bees and other insects.",
    distractors: [
      "Bees produce honey and beeswax.",
      "A single hive can contain tens of thousands of bees.",
      "Bees communicate through a movement called the waggle dance.",
    ],
  },
  {
    passage:
      "Public libraries provide valuable resources beyond just books. Many libraries offer free internet access and computer use for people who don't have it at home. They also host free educational programs for children and adults, and some even lend out tools or musical instruments.",
    claim: "Libraries help people who lack access to technology.",
    correctEvidence: "Many libraries offer free internet access and computer use for people who don't have it at home.",
    distractors: [
      "Libraries host free educational programs for children and adults.",
      "Some libraries lend out tools or musical instruments.",
      "Libraries have existed for thousands of years.",
    ],
  },
];

export const factTextEvidence: ProblemGenerator = {
  skillSlug: "fact-text-evidence",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctEvidence },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" Which sentence from the passage best supports this claim: "${item.claim}"?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Go back to the passage and find the sentence that directly backs up the claim, not just one on the same topic.`,
        `The strongest evidence is: "${item.correctEvidence}"`,
      ],
      explanation: `"${item.correctEvidence}" directly supports the claim: "${item.claim}"`,
    };
  },
};
