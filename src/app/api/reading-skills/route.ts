import { NextRequest, NextResponse } from "next/server";
import { listReadingByStrand, READING_STRAND_META, GRADE_BAND_META, type GradeBand } from "@/lib/reading";

export async function GET(req: NextRequest) {
  const requestedGradeBand = req.nextUrl.searchParams.get("gradeBand") as GradeBand | null;
  if (requestedGradeBand && !GRADE_BAND_META[requestedGradeBand]) {
    return NextResponse.json({ error: "Unknown gradeBand" }, { status: 400 });
  }
  // No gradeBand filter: merge every band's strands, so slug lookups (e.g. the learn page's
  // skill-title fetch) can find a skill regardless of which grade it belongs to.
  const gradeBands = requestedGradeBand ? [requestedGradeBand] : (Object.keys(GRADE_BAND_META) as GradeBand[]);
  const strands = gradeBands.flatMap((band) => listReadingByStrand(band));
  return NextResponse.json({ strands, strandMeta: READING_STRAND_META });
}
