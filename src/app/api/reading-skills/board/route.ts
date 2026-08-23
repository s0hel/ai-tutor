import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getReadingBoard } from "@/lib/reading/readingBoard";
import { READING_STRAND_META, GRADE_BAND_META, defaultGradeBandForAge, type GradeBand } from "@/lib/reading";
import { getProfileForFamily } from "@/lib/repo";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });

  const profileId = Number(req.nextUrl.searchParams.get("profileId"));
  const profile = await getProfileForFamily(profileId, session.user.familyId);
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const requestedGradeBand = req.nextUrl.searchParams.get("gradeBand") as GradeBand | null;
  const gradeBand: GradeBand =
    requestedGradeBand && GRADE_BAND_META[requestedGradeBand] ? requestedGradeBand : defaultGradeBandForAge(profile.age);

  return NextResponse.json({
    board: await getReadingBoard(profileId, gradeBand),
    strandMeta: READING_STRAND_META,
    gradeBand,
    gradeBandMeta: GRADE_BAND_META,
  });
}
