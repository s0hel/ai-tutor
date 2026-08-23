import type { ReadingSkill } from "../types";

export const PHONICS_SIGHT_WORDS_SKILLS: ReadingSkill[] = [
  {
    slug: "g1-beginning-sounds",
    subject: "reading",
    gradeBand: "grade1",
    strand: "phonics-sight-words",
    title: "Beginning sounds",
    order: 1,
    generatorId: "g1-beginning-sounds",
    videoId: "0MF9QOCrddQ",
    videoTitle: "The Letter A | Letters and Letter Sounds | Learn Phonics with Khan Academy Kids",
    videoSource: "Khan Academy Kids",
    conceptBrief: {
      summary:
        "Every word starts with a sound. Saying a word slowly and listening to the very first sound helps you figure out which letter it starts with.",
      workedExamples: [
        "\"Sun\" starts with the /s/ sound, like snake.",
        "\"Ball\" starts with the /b/ sound, like bear.",
      ],
      commonMisconceptions: [
        "Listening to a sound in the middle or end of the word instead of the very first sound.",
        "Mixing up letters that look similar, like b and d, instead of listening to the sound.",
      ],
    },
  },
  {
    slug: "g1-sight-words",
    subject: "reading",
    gradeBand: "grade1",
    strand: "phonics-sight-words",
    title: "Common sight words",
    order: 2,
    generatorId: "g1-sight-words",
    videoId: "O6i-l1MywkQ",
    videoTitle: "The Word 'All' | Sight Words | Learn to Read with Khan Academy Kids",
    videoSource: "Khan Academy Kids",
    conceptBrief: {
      summary:
        "Sight words are words like the, and, said, and was that show up all the time in books. Good readers learn to recognize them right away, without sounding them out.",
      workedExamples: [
        "\"The dog ran.\" — the word \"the\" shows up before nouns all the time.",
        "\"She said hello.\" — \"said\" is a sight word used whenever someone talks.",
      ],
      commonMisconceptions: [
        "Trying to sound out every letter of a sight word instead of just recognizing it.",
        "Mixing up sight words that look a little alike, like was and saw.",
      ],
    },
  },
  {
    slug: "g1-rhyming-words",
    subject: "reading",
    gradeBand: "grade1",
    strand: "phonics-sight-words",
    title: "Rhyming words",
    order: 3,
    generatorId: "g1-rhyming-words",
    conceptBrief: {
      summary:
        "Rhyming words end with the same sound, even if they start differently. Listening to the ending sound of a word helps you find words that rhyme with it.",
      workedExamples: [
        "\"Cat\" and \"hat\" rhyme because they both end with the /at/ sound.",
        "\"Frog\" and \"dog\" rhyme because they both end with the /og/ sound.",
      ],
      commonMisconceptions: [
        "Picking a word that starts the same instead of one that ends the same.",
        "Picking a word that means something similar instead of one that sounds similar.",
      ],
    },
  },
];
