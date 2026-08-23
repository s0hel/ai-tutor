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
import { beginningSounds } from "./reading/grade1/beginningSounds";
import { sightWords } from "./reading/grade1/sightWords";
import { rhymingWords } from "./reading/grade1/rhymingWords";
import { vocabNamingWords } from "./reading/grade1/vocabNamingWords";
import { vocabOpposites } from "./reading/grade1/vocabOpposites";
import { vocabDescribingWords } from "./reading/grade1/vocabDescribingWords";
import { compMainIdea1 } from "./reading/grade1/compMainIdea1";
import { compSequence1 } from "./reading/grade1/compSequence1";
import { compDetails1 } from "./reading/grade1/compDetails1";
import { storyCharacters1 } from "./reading/grade1/storyCharacters1";
import { storySetting1 } from "./reading/grade1/storySetting1";
import { storyFeelings1 } from "./reading/grade1/storyFeelings1";
import { vocabContextClues2 } from "./reading/grade2/vocabContextClues2";
import { vocabSynonyms2 } from "./reading/grade2/vocabSynonyms2";
import { vocabAntonyms2 } from "./reading/grade2/vocabAntonyms2";
import { compMainIdea2 } from "./reading/grade2/compMainIdea2";
import { compSequence2 } from "./reading/grade2/compSequence2";
import { compCauseEffect2 } from "./reading/grade2/compCauseEffect2";
import { storyCharacterTraits2 } from "./reading/grade2/storyCharacterTraits2";
import { storyProblemSolution2 } from "./reading/grade2/storyProblemSolution2";
import { storySettingDetails2 } from "./reading/grade2/storySettingDetails2";
import { factOpinion2 } from "./reading/grade2/factOpinion2";
import { factGenre2 } from "./reading/grade2/factGenre2";
import { factTextEvidence2 } from "./reading/grade2/factTextEvidence2";
import { vocabContextClues3 } from "./reading/grade3/vocabContextClues3";
import { vocabSynonymsAntonyms3 } from "./reading/grade3/vocabSynonymsAntonyms3";
import { vocabPrefixesSuffixes3 } from "./reading/grade3/vocabPrefixesSuffixes3";
import { compMainIdea3 } from "./reading/grade3/compMainIdea3";
import { compSummarize3 } from "./reading/grade3/compSummarize3";
import { compSequence3 } from "./reading/grade3/compSequence3";
import { infDrawConclusions3 } from "./reading/grade3/infDrawConclusions3";
import { infCauseEffect3 } from "./reading/grade3/infCauseEffect3";
import { infPredict3 } from "./reading/grade3/infPredict3";
import { craftAuthorsPurpose3 } from "./reading/grade3/craftAuthorsPurpose3";
import { craftPointOfView3 } from "./reading/grade3/craftPointOfView3";
import { craftFigurativeLanguage3 } from "./reading/grade3/craftFigurativeLanguage3";
import { factOpinion3 } from "./reading/grade3/factOpinion3";
import { factGenre3 } from "./reading/grade3/factGenre3";
import { factTextEvidence3 } from "./reading/grade3/factTextEvidence3";
import { countingTo20 } from "./grade1/countingTo20";
import { countingTo120 } from "./grade1/countingTo120";
import { skipCounting } from "./grade1/skipCounting";
import { beforeAfterBetween } from "./grade1/beforeAfterBetween";
import { comparingNumbers } from "./grade1/comparingNumbers";
import { addWithin10 } from "./grade1/addWithin10";
import { addWithin20 } from "./grade1/addWithin20";
import { subtractWithin20 } from "./grade1/subtractWithin20";
import { additionWordProblems } from "./grade1/additionWordProblems";
import { missingAddend } from "./grade1/missingAddend";
import { tensAndOnes } from "./grade1/tensAndOnes";
import { placeValueCompare } from "./grade1/placeValueCompare";
import { addSubtractTens } from "./grade1/addSubtractTens";
import { identify2dShapes } from "./grade1/identify2dShapes";
import { identify3dShapes } from "./grade1/identify3dShapes";
import { partitionShapes } from "./grade1/partitionShapes";
import { compareLength } from "./grade1/compareLength";
import { tellTimeHour } from "./grade1/tellTimeHour";
import { readTallyCharts } from "./grade1/readTallyCharts";
import { add2DigitRegrouping } from "./grade2/add2DigitRegrouping";
import { subtract2DigitRegrouping } from "./grade2/subtract2DigitRegrouping";
import { addSubtractWordProblems2 } from "./grade2/addSubtractWordProblems2";
import { add3DigitNoRegroup } from "./grade2/add3DigitNoRegroup";
import { hundredsTensOnes } from "./grade2/hundredsTensOnes";
import { expandedForm } from "./grade2/expandedForm";
import { compare3DigitNumbers } from "./grade2/compare3DigitNumbers";
import { skipCounting100s } from "./grade2/skipCounting100s";
import { measureLengthUnits } from "./grade2/measureLengthUnits";
import { tellTime5min } from "./grade2/tellTime5min";
import { countingMoney } from "./grade2/countingMoney";
import { readBarGraphs } from "./grade2/readBarGraphs";
import { shapeAttributes } from "./grade2/shapeAttributes";
import { partitionEqualShares2 } from "./grade2/partitionEqualShares2";
import { partitionRowsColumns } from "./grade2/partitionRowsColumns";
import { oddEvenNumbers } from "./grade2/oddEvenNumbers";
import { equalGroups } from "./grade2/equalGroups";
import { arraysRepeatedAddition } from "./grade2/arraysRepeatedAddition";
import { multFacts } from "./grade3/multFacts";
import { multBy10 } from "./grade3/multBy10";
import { multWordProblems3 } from "./grade3/multWordProblems3";
import { multProperties } from "./grade3/multProperties";
import { divFacts } from "./grade3/divFacts";
import { divWordProblems3 } from "./grade3/divWordProblems3";
import { multDivRelationship } from "./grade3/multDivRelationship";
import { unitFractions } from "./grade3/unitFractions";
import { fractionsNumberLine } from "./grade3/fractionsNumberLine";
import { equivalentFractions3 } from "./grade3/equivalentFractions3";
import { compareFractions3 } from "./grade3/compareFractions3";
import { elapsedTime } from "./grade3/elapsedTime";
import { areaCountingSquares } from "./grade3/areaCountingSquares";
import { areaMultiplySides } from "./grade3/areaMultiplySides";
import { perimeter3 } from "./grade3/perimeter3";
import { liquidVolumeMass } from "./grade3/liquidVolumeMass";
import { scaledPictureGraphs } from "./grade3/scaledPictureGraphs";
import { classifyQuadrilaterals } from "./grade3/classifyQuadrilaterals";
import { partitionShapesFractions3 } from "./grade3/partitionShapesFractions3";

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
  "g1-beginning-sounds": beginningSounds,
  "g1-sight-words": sightWords,
  "g1-rhyming-words": rhymingWords,
  "g1-vocab-naming-words": vocabNamingWords,
  "g1-vocab-opposites": vocabOpposites,
  "g1-vocab-describing-words": vocabDescribingWords,
  "g1-comp-main-idea": compMainIdea1,
  "g1-comp-sequence": compSequence1,
  "g1-comp-details": compDetails1,
  "g1-story-characters": storyCharacters1,
  "g1-story-setting": storySetting1,
  "g1-story-feelings": storyFeelings1,
  "g2-vocab-context-clues": vocabContextClues2,
  "g2-vocab-synonyms": vocabSynonyms2,
  "g2-vocab-antonyms": vocabAntonyms2,
  "g2-comp-main-idea": compMainIdea2,
  "g2-comp-sequence": compSequence2,
  "g2-comp-cause-effect": compCauseEffect2,
  "g2-story-characters-traits": storyCharacterTraits2,
  "g2-story-problem-solution": storyProblemSolution2,
  "g2-story-setting-details": storySettingDetails2,
  "g2-fact-opinion": factOpinion2,
  "g2-fact-genre": factGenre2,
  "g2-fact-text-evidence": factTextEvidence2,
  "g3-vocab-context-clues": vocabContextClues3,
  "g3-vocab-synonyms-antonyms": vocabSynonymsAntonyms3,
  "g3-vocab-prefixes-suffixes": vocabPrefixesSuffixes3,
  "g3-comp-main-idea": compMainIdea3,
  "g3-comp-summarize": compSummarize3,
  "g3-comp-sequence": compSequence3,
  "g3-inf-draw-conclusions": infDrawConclusions3,
  "g3-inf-cause-effect": infCauseEffect3,
  "g3-inf-predict": infPredict3,
  "g3-craft-authors-purpose": craftAuthorsPurpose3,
  "g3-craft-point-of-view": craftPointOfView3,
  "g3-craft-figurative-language": craftFigurativeLanguage3,
  "g3-fact-opinion": factOpinion3,
  "g3-fact-genre": factGenre3,
  "g3-fact-text-evidence": factTextEvidence3,
  "g1-counting-to-20": countingTo20,
  "g1-counting-to-120": countingTo120,
  "g1-skip-counting": skipCounting,
  "g1-before-after-between": beforeAfterBetween,
  "g1-comparing-numbers": comparingNumbers,
  "g1-add-within-10": addWithin10,
  "g1-add-within-20": addWithin20,
  "g1-subtract-within-20": subtractWithin20,
  "g1-addition-word-problems": additionWordProblems,
  "g1-missing-addend": missingAddend,
  "g1-tens-and-ones": tensAndOnes,
  "g1-place-value-compare": placeValueCompare,
  "g1-add-subtract-tens": addSubtractTens,
  "g1-identify-2d-shapes": identify2dShapes,
  "g1-identify-3d-shapes": identify3dShapes,
  "g1-partition-shapes": partitionShapes,
  "g1-compare-length": compareLength,
  "g1-tell-time-hour": tellTimeHour,
  "g1-read-tally-charts": readTallyCharts,
  "g2-add-2digit-regrouping": add2DigitRegrouping,
  "g2-subtract-2digit-regrouping": subtract2DigitRegrouping,
  "g2-add-subtract-word-problems-2": addSubtractWordProblems2,
  "g2-add-3digit-no-regroup": add3DigitNoRegroup,
  "g2-hundreds-tens-ones": hundredsTensOnes,
  "g2-expanded-form": expandedForm,
  "g2-compare-3digit-numbers": compare3DigitNumbers,
  "g2-skip-counting-100s": skipCounting100s,
  "g2-measure-length-units": measureLengthUnits,
  "g2-tell-time-5min": tellTime5min,
  "g2-counting-money": countingMoney,
  "g2-read-bar-graphs": readBarGraphs,
  "g2-shape-attributes": shapeAttributes,
  "g2-partition-equal-shares-2": partitionEqualShares2,
  "g2-partition-rows-columns": partitionRowsColumns,
  "g2-odd-even-numbers": oddEvenNumbers,
  "g2-equal-groups": equalGroups,
  "g2-arrays-repeated-addition": arraysRepeatedAddition,
  "g3-mult-facts": multFacts,
  "g3-mult-by-10": multBy10,
  "g3-mult-word-problems-3": multWordProblems3,
  "g3-mult-properties": multProperties,
  "g3-div-facts": divFacts,
  "g3-div-word-problems-3": divWordProblems3,
  "g3-mult-div-relationship": multDivRelationship,
  "g3-unit-fractions": unitFractions,
  "g3-fractions-number-line": fractionsNumberLine,
  "g3-equivalent-fractions-3": equivalentFractions3,
  "g3-compare-fractions-3": compareFractions3,
  "g3-elapsed-time": elapsedTime,
  "g3-area-counting-squares": areaCountingSquares,
  "g3-area-multiply-sides": areaMultiplySides,
  "g3-perimeter-3": perimeter3,
  "g3-liquid-volume-mass": liquidVolumeMass,
  "g3-scaled-picture-graphs": scaledPictureGraphs,
  "g3-classify-quadrilaterals": classifyQuadrilaterals,
  "g3-partition-shapes-fractions-3": partitionShapesFractions3,
};

export function getGenerator(generatorId: string): ProblemGenerator {
  const generator = GENERATORS[generatorId];
  if (!generator) throw new Error(`Unknown problem generator: ${generatorId}`);
  return generator;
}
