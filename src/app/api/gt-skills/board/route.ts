import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getGTBoard } from "@/lib/gifted/gtBoard";
import { BATTERY_META } from "@/lib/gifted";
import { getProfileForFamily } from "@/lib/repo";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });

  const profileId = Number(req.nextUrl.searchParams.get("profileId"));
  const profile = await getProfileForFamily(profileId, session.user.familyId);
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  return NextResponse.json({ board: await getGTBoard(profileId), batteryMeta: BATTERY_META });
}
