import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { callTutor, callTeachTurn, presentProblem, presentFeedback } from "@/lib/tutorEngine";
import { evaluateBadges, nextSkillState } from "@/lib/difficulty";
import {
  getProfileForFamily,
  getSkillState,
  logAttempt,
  recentAttempts,
  recordSkillPracticeDay,
  upsertSkillState,
} from "@/lib/repo";
import { getSkill } from "@/lib/skills";
import { getGTSkill } from "@/lib/gifted";
import { describeChoiceRender } from "@/lib/gifted/describeChoice";
import type { GTProblemData } from "@/lib/gifted/visualTypes";
import { getGenerator } from "@/lib/problemGenerators/registry";
import { gradeAnswer } from "@/lib/grading";
import { evaluateMastery } from "@/lib/mastery";
import {
  clearPendingProblem,
  getPendingProblem,
  incrementPendingAttempt,
  savePendingProblem,
} from "@/lib/pendingProblems";
import type { ChatMessage, Profile, Subject, TutorableSkill, TutorTurn } from "@/lib/types";
import type { GeneratedProblem } from "@/lib/problemGenerators/types";

interface DeterministicSkill extends TutorableSkill {
  generatorId: string;
}

/** Extra data the client needs to render a picture-based multiple-choice question — undefined for free-text/numeric problems. */
function presentedProblemFor(problem: GeneratedProblem) {
  if (problem.answerType !== "choice") return undefined;
  const data = problem.problemData as GTProblemData;
  return { answerType: "choice" as const, prompt: data.prompt, options: data.options };
}

async function handleDeterministicSubject(params: {
  subject: Subject;
  getSkillFn: (slug: string) => DeterministicSkill | undefined;
  profile: Profile;
  profileId: number;
  skillSlug: string | undefined;
  startPractice: boolean;
  history: ChatMessage[];
  priorTurnMessage: ChatMessage | undefined;
  lastMessage: ChatMessage | undefined;
}): Promise<NextResponse> {
  const { subject, getSkillFn, profile, profileId, skillSlug, startPractice, history, priorTurnMessage, lastMessage } = params;

  if (!skillSlug) return NextResponse.json({ error: `skillSlug is required for ${subject}` }, { status: 400 });
  const skill = getSkillFn(skillSlug);
  if (!skill) return NextResponse.json({ error: "Unknown skill" }, { status: 404 });

  let state = await getSkillState(profileId, subject, skill.slug);
  let phase: "teach" | "practice" = state.teachCompletedAt ? "practice" : "teach";

  if (phase === "teach" && !startPractice) {
    const turn = await callTeachTurn(profile, skill, history);
    return NextResponse.json({ turns: [turn], phase: "teach", badgesEarned: [] });
  }

  if (phase === "teach" && startPractice) {
    state = {
      ...state,
      teachCompletedAt: new Date().toISOString(),
      status: state.status === "not_started" ? "practicing" : state.status,
    };
    await upsertSkillState(state);
    phase = "practice";
  }

  // phase === "practice" from here on
  const pending = await getPendingProblem(profileId, subject, skill.slug);
  const badgesEarned: { key: string; label: string }[] = [];

  if (pending && lastMessage?.role === "kid") {
    const attemptCount = pending.attemptCount + 1;
    const grade = gradeAnswer(lastMessage.text, pending.correctAnswer);

    const kidAnswerDescription =
      pending.answerType === "choice" && pending.correctAnswer.type === "choice"
        ? (() => {
            const data = pending.problemData as GTProblemData;
            const selected = data.options.find((o) => o.id === lastMessage.text.trim());
            return selected ? describeChoiceRender(selected.render) : lastMessage.text;
          })()
        : lastMessage.text;

    await logAttempt({
      profileId,
      subject,
      topic: skill.slug,
      prompt: priorTurnMessage?.turn?.displayText ?? "",
      kidResponse: kidAnswerDescription,
      correct: grade.correct ? 1 : 0,
    });
    await recordSkillPracticeDay(profileId, subject, skill.slug);

    const previousState = state;
    const updated = nextSkillState(state, grade.correct);
    const masteryPatch = await evaluateMastery(profileId, skill, updated);
    const finalState = {
      ...updated,
      status: masteryPatch.status,
      masteredAt: masteryPatch.masteredAt,
      lastReviewedAt: new Date().toISOString(),
    };
    await upsertSkillState(finalState);
    const leveledUp = Math.floor(finalState.level) > Math.floor(previousState.level);
    badgesEarned.push(...(await evaluateBadges(profileId, subject, finalState, leveledUp)));

    const isFinalReveal = !grade.correct && attemptCount >= 3;
    const hint = !grade.correct && !isFinalReveal ? pending.hintLadder[attemptCount - 1] : null;
    const explanation = grade.correct || isFinalReveal ? pending.explanation : null;

    if (!grade.correct) await incrementPendingAttempt(profileId, subject, skill.slug);

    const feedback = await presentFeedback({
      profile,
      skill,
      kidRawAnswer: kidAnswerDescription,
      correct: grade.correct,
      attemptCount,
      hint,
      explanation,
      isFinalReveal,
    });

    const feedbackTurn: TutorTurn = {
      spokenText: feedback.spokenText,
      displayText: feedback.displayText,
      activityType: feedback.activityType,
      topic: skill.slug,
      difficulty: finalState.level,
      isCorrectAnswer: grade.correct,
    };

    const turns: TutorTurn[] = [feedbackTurn];
    let presentedProblem: ReturnType<typeof presentedProblemFor>;

    if (grade.correct || isFinalReveal) {
      await clearPendingProblem(profileId, subject, skill.slug);
      const nextProblem = getGenerator(skill.generatorId).generate(finalState.level);
      await savePendingProblem(profileId, subject, skill.slug, nextProblem);
      const presented = await presentProblem({ profile, skill, problem: nextProblem });
      presentedProblem = presentedProblemFor(nextProblem);
      turns.push({
        spokenText: presented.spokenText,
        displayText: presented.displayText,
        activityType: "question",
        topic: skill.slug,
        difficulty: finalState.level,
        isCorrectAnswer: null,
      });
    }

    const masteryJustHappened = masteryPatch.status === "mastered" && previousState.status !== "mastered";
    return NextResponse.json({
      turns,
      phase: "practice",
      badgesEarned,
      masteredSkill: masteryJustHappened ? skill.slug : null,
      presentedProblem,
    });
  }

  // No pending problem yet, or reloading without a new kid answer: (re-)present a problem
  const problem = pending ?? getGenerator(skill.generatorId).generate(state.level);
  if (!pending) await savePendingProblem(profileId, subject, skill.slug, problem);
  const presented = await presentProblem({ profile, skill, problem });
  const turn: TutorTurn = {
    spokenText: presented.spokenText,
    displayText: presented.displayText,
    activityType: "question",
    topic: skill.slug,
    difficulty: state.level,
    isCorrectAnswer: null,
  };
  return NextResponse.json({
    turns: [turn],
    phase: "practice",
    badgesEarned: [],
    presentedProblem: presentedProblemFor(problem),
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });

  const body = await req.json();
  const profileId = Number(body.profileId);
  const subject = body.subject as Subject;
  const history = (body.history ?? []) as ChatMessage[];
  const skillSlug = body.skillSlug as string | undefined;
  const startPractice = !!body.startPractice;

  const profile = await getProfileForFamily(profileId, session.user.familyId);
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  if (subject !== "math" && subject !== "reading" && subject !== "gifted") {
    return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
  }

  let priorTurnMessage: ChatMessage | undefined;
  for (let i = history.length - 2; i >= 0; i--) {
    if (history[i].role === "tutor" && history[i].turn) {
      priorTurnMessage = history[i];
      break;
    }
  }
  const lastMessage = history[history.length - 1];
  const isKidAnswering = lastMessage?.role === "kid" && !!priorTurnMessage;

  try {
    if (subject === "reading") {
      const topic = priorTurnMessage?.turn?.topic ?? "getting-started";
      const state = await getSkillState(profileId, "reading", topic);
      const recent = await recentAttempts(profileId, "reading", 8);

      const turn = await callTutor(profile, "reading", history, state, recent);

      const badgesEarned: { key: string; label: string }[] = [];

      if (isKidAnswering && priorTurnMessage?.turn) {
        await logAttempt({
          profileId,
          subject: "reading",
          topic,
          prompt: priorTurnMessage.turn.displayText,
          kidResponse: lastMessage.text,
          correct: turn.isCorrectAnswer === null ? null : turn.isCorrectAnswer ? 1 : 0,
        });

        const updated = nextSkillState(state, turn.isCorrectAnswer);
        const leveledUp = Math.floor(updated.level) > Math.floor(state.level);
        await upsertSkillState(updated);
        badgesEarned.push(...(await evaluateBadges(profileId, "reading", updated, leveledUp)));
      }

      if (turn.topic !== topic) {
        await upsertSkillState(await getSkillState(profileId, "reading", turn.topic));
      }

      return NextResponse.json({ turns: [turn], phase: "freeform", badgesEarned });
    }

    if (subject === "gifted") {
      return await handleDeterministicSubject({
        subject,
        getSkillFn: getGTSkill,
        profile,
        profileId,
        skillSlug,
        startPractice,
        history,
        priorTurnMessage,
        lastMessage,
      });
    }

    // subject === "math": fixed skill, teach-then-practice, deterministic grading
    return await handleDeterministicSubject({
      subject,
      getSkillFn: getSkill,
      profile,
      profileId,
      skillSlug,
      startPractice,
      history,
      priorTurnMessage,
      lastMessage,
    });
  } catch (err) {
    console.error("Tutor call failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
