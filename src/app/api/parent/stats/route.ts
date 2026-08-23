import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  allAttempts,
  currentDailyStreak,
  getProfileForFamily,
  listBadges,
  listSkillStates,
} from "@/lib/repo";
import { getSkillBoard } from "@/lib/skillBoard";
import { STRAND_META } from "@/lib/skills";
import { getGTBoard } from "@/lib/gifted/gtBoard";
import { BATTERY_META } from "@/lib/gifted";
import { getReadingBoard } from "@/lib/reading/readingBoard";
import { READING_STRAND_META } from "@/lib/reading";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });

  const profileId = Number(req.nextUrl.searchParams.get("profileId"));
  const profile = await getProfileForFamily(profileId, session.user.familyId);
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const attempts = await allAttempts(profileId);
  const skillStates = await listSkillStates(profileId);
  const badges = await listBadges(profileId);
  const dailyStreak = await currentDailyStreak(profileId);

  const bySubject = (subject: "math" | "reading" | "gifted") => {
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
    math: { ...bySubject("math"), board: await getSkillBoard(profileId) },
    reading: { ...bySubject("reading"), board: await getReadingBoard(profileId) },
    gifted: { ...bySubject("gifted"), board: await getGTBoard(profileId) },
    recentAttempts: attempts.slice(0, 30),
    strandMeta: STRAND_META,
    readingStrandMeta: READING_STRAND_META,
    batteryMeta: BATTERY_META,
  });
}
