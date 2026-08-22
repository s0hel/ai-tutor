import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSkillBoard } from "@/lib/skillBoard";
import { STRAND_META } from "@/lib/skills";
import { getProfileForFamily } from "@/lib/repo";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });

  const profileId = Number(req.nextUrl.searchParams.get("profileId"));
  const profile = getProfileForFamily(profileId, session.user.familyId);
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  return NextResponse.json({ board: getSkillBoard(profileId), strandMeta: STRAND_META });
}
