import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/parentAuth";
import {
  allAttempts,
  currentDailyStreak,
  getProfile,
  listBadges,
  listSkillStates,
} from "@/lib/repo";
import { getSkillBoard } from "@/lib/skillBoard";
import { STRAND_META } from "@/lib/skills";

export async function GET(req: NextRequest) {
  if (!verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Parent authentication required" }, { status: 401 });
  }

  const profileId = Number(req.nextUrl.searchParams.get("profileId"));
  const profile = getProfile(profileId);
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const attempts = allAttempts(profileId);
  const skillStates = listSkillStates(profileId);
  const badges = listBadges(profileId);
  const dailyStreak = currentDailyStreak(profileId);

  const bySubject = (subject: "math" | "reading") => {
    const subjectAttempts = attempts.filter((a) => a.subject === subject && a.correct !== null);
    const correct = subjectAttempts.filter((a) => a.correct === 1).length;
    const total = subjectAttempts.length;
    return {
      total,
      correct,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : null,
      topics: skillStates.filter((s) => s.subject === subject),
    };
  };

  return NextResponse.json({
    profile,
    dailyStreak,
    badges,
    math: { ...bySubject("math"), board: getSkillBoard(profileId) },
    reading: bySubject("reading"),
    recentAttempts: attempts.slice(0, 30),
    strandMeta: STRAND_META,
  });
}
