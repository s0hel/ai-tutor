import { NextRequest, NextResponse } from "next/server";
import { getSkillBoard } from "@/lib/skillBoard";
import { STRAND_META } from "@/lib/skills";
import { getProfile } from "@/lib/repo";

export async function GET(req: NextRequest) {
  const profileId = Number(req.nextUrl.searchParams.get("profileId"));
  const profile = getProfile(profileId);
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  return NextResponse.json({ board: getSkillBoard(profileId), strandMeta: STRAND_META });
}
