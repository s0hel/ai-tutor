import { NextRequest, NextResponse } from "next/server";
import { callTutor } from "@/lib/tutorEngine";
import { evaluateBadges, nextSkillState } from "@/lib/difficulty";
import { getProfile, getSkillState, logAttempt, recentAttempts, upsertSkillState } from "@/lib/repo";
import type { ChatMessage, Subject } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const profileId = Number(body.profileId);
  const subject = body.subject as Subject;
  const history = (body.history ?? []) as ChatMessage[];

  const profile = getProfile(profileId);
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  if (subject !== "math" && subject !== "reading") {
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

  const topic = priorTurnMessage?.turn?.topic ?? "getting-started";
  const state = getSkillState(profileId, subject, topic);
  const recent = recentAttempts(profileId, subject, 8);

  let turn;
  try {
    turn = await callTutor(profile, subject, history, state, recent);
  } catch (err) {
    console.error("Tutor call failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const badgesEarned: { key: string; label: string }[] = [];

  if (isKidAnswering && priorTurnMessage?.turn) {
    logAttempt({
      profileId,
      subject,
      topic,
      prompt: priorTurnMessage.turn.displayText,
      kidResponse: lastMessage.text,
      correct: turn.isCorrectAnswer === null ? null : turn.isCorrectAnswer ? 1 : 0,
    });

    const updated = nextSkillState(state, turn.isCorrectAnswer);
    const leveledUp = Math.floor(updated.level) > Math.floor(state.level);
    upsertSkillState(updated);
    badgesEarned.push(...evaluateBadges(profileId, subject, updated, leveledUp));
  }

  if (turn.topic !== topic) {
    upsertSkillState(getSkillState(profileId, subject, turn.topic));
  }

  return NextResponse.json({ turn, badgesEarned });
}
