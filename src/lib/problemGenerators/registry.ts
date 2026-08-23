import type { ProblemGenerator } from "./types";
import { mult2x1 } from "./multiplication/mult2x1";
import { mult3x1 } from "./multiplication/mult3x1";
import { mult2x2 } from "./multiplication/mult2x2";
import { multMultiDigit } from "./multiplication/multMultiDigit";
import { multPowersOfTen } from "./multiplication/multPowersOfTen";
import { div1DigitDivisor } from "./division/div1DigitDivisor";
import { div1DigitRemainder } from "./division/div1DigitRemainder";
import { div2DigitDivisor } from "./division/div2DigitDivisor";
import { divRemainderInterpretation } from "./division/divRemainderInterpretation";
import { fractionEquivalent } from "./fractions/fractionEquivalent";
import { fractionCompare } from "./fractions/fractionCompare";
import { fractionAddLike } from "./fractions/fractionAddLike";
import { fractionAddUnlike } from "./fractions/fractionAddUnlike";
import { fractionSimplify } from "./fractions/fractionSimplify";
import { fractionMixedImproper } from "./fractions/fractionMixedImproper";
import { fractionMultiplyWhole } from "./fractions/fractionMultiplyWhole";
import { decimalPlaceValue } from "./decimals/decimalPlaceValue";
import { decimalCompare } from "./decimals/decimalCompare";
import { decimalAddSubtract } from "./decimals/decimalAddSubtract";
import { decimalFractionConvert } from "./decimals/decimalFractionConvert";
import { decimalRound } from "./decimals/decimalRound";
import { decimalMultiplyPowerOfTen } from "./decimals/decimalMultiplyPowerOfTen";
import { areaRectangle } from "./measurementGeometry/areaRectangle";
import { perimeterRectangle } from "./measurementGeometry/perimeterRectangle";
import { classifyShape } from "./measurementGeometry/classifyShape";
import { classifyAngle } from "./measurementGeometry/classifyAngle";
import { unitConversion } from "./measurementGeometry/unitConversion";
import { pictureAnalogies } from "./gifted/pictureAnalogies";
import { sentenceCompletion } from "./gifted/sentenceCompletion";
import { pictureClassification } from "./gifted/pictureClassification";
import { numberAnalogies } from "./gifted/numberAnalogies";
import { numberPuzzles } from "./gifted/numberPuzzles";
import { numberSeries } from "./gifted/numberSeries";
import { figureMatrices } from "./gifted/figureMatrices";
import { figureClassification } from "./gifted/figureClassification";
import { vocabContextClues } from "./reading/vocabContextClues";
import { vocabSynonyms } from "./reading/vocabSynonyms";
import { vocabAntonyms } from "./reading/vocabAntonyms";
import { vocabPrefixesSuffixes } from "./reading/vocabPrefixesSuffixes";
import { compMainIdea } from "./reading/compMainIdea";
import { compSupportingDetails } from "./reading/compSupportingDetails";
import { compSequence } from "./reading/compSequence";
import { compSummarize } from "./reading/compSummarize";
import { infDrawConclusions } from "./reading/infDrawConclusions";
import { infCauseEffect } from "./reading/infCauseEffect";
import { infCompareContrast } from "./reading/infCompareContrast";
import { infPredict } from "./reading/infPredict";
import { craftAuthorsPurpose } from "./reading/craftAuthorsPurpose";
import { craftPointOfView } from "./reading/craftPointOfView";
import { craftFigurativeLanguage } from "./reading/craftFigurativeLanguage";
import { craftTextStructure } from "./reading/craftTextStructure";
import { factOpinion } from "./reading/factOpinion";
import { factTextEvidence } from "./reading/factTextEvidence";
import { factGenre } from "./reading/factGenre";

const GENERATORS: Record<string, ProblemGenerator> = {
  "mult-2digit-1digit": mult2x1,
  "mult-3digit-1digit": mult3x1,
  "mult-2digit-2digit": mult2x2,
  "mult-multidigit": multMultiDigit,
  "mult-by-powers-of-ten": multPowersOfTen,
  "div-1digit-divisor": div1DigitDivisor,
  "div-1digit-remainder": div1DigitRemainder,
  "div-2digit-divisor": div2DigitDivisor,
  "div-remainder-interpretation": divRemainderInterpretation,
  "fraction-equivalent": fractionEquivalent,
  "fraction-compare": fractionCompare,
  "fraction-add-like": fractionAddLike,
  "fraction-add-unlike": fractionAddUnlike,
  "fraction-simplify": fractionSimplify,
  "fraction-mixed-improper": fractionMixedImproper,
  "fraction-multiply-whole": fractionMultiplyWhole,
  "decimal-place-value": decimalPlaceValue,
  "decimal-compare": decimalCompare,
  "decimal-add-subtract": decimalAddSubtract,
  "decimal-fraction-convert": decimalFractionConvert,
  "decimal-round": decimalRound,
  "decimal-multiply-power-of-ten": decimalMultiplyPowerOfTen,
  "geo-area-rectangle": areaRectangle,
  "geo-perimeter-rectangle": perimeterRectangle,
  "geo-classify-shape": classifyShape,
  "geo-classify-angle": classifyAngle,
  "geo-unit-conversion": unitConversion,
  "gt-picture-analogies": pictureAnalogies,
  "gt-sentence-completion": sentenceCompletion,
  "gt-picture-classification": pictureClassification,
  "gt-number-analogies": numberAnalogies,
  "gt-number-puzzles": numberPuzzles,
  "gt-number-series": numberSeries,
  "gt-figure-matrices": figureMatrices,
  "gt-figure-classification": figureClassification,
  "vocab-context-clues": vocabContextClues,
  "vocab-synonyms": vocabSynonyms,
  "vocab-antonyms": vocabAntonyms,
  "vocab-prefixes-suffixes": vocabPrefixesSuffixes,
  "comp-main-idea": compMainIdea,
  "comp-supporting-details": compSupportingDetails,
  "comp-sequence": compSequence,
  "comp-summarize": compSummarize,
  "inf-draw-conclusions": infDrawConclusions,
  "inf-cause-effect": infCauseEffect,
  "inf-compare-contrast": infCompareContrast,
  "inf-predict": infPredict,
  "craft-authors-purpose": craftAuthorsPurpose,
  "craft-point-of-view": craftPointOfView,
  "craft-figurative-language": craftFigurativeLanguage,
  "craft-text-structure": craftTextStructure,
  "fact-opinion": factOpinion,
  "fact-text-evidence": factTextEvidence,
  "fact-genre": factGenre,
};

export function getGenerator(generatorId: string): ProblemGenerator {
  const generator = GENERATORS[generatorId];
  if (!generator) throw new Error(`Unknown problem generator: ${generatorId}`);
  return generator;
}
