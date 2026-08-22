import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createProfile, listProfiles } from "@/lib/repo";
import { AVATARS } from "@/lib/types";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });
  return NextResponse.json({ profiles: listProfiles(session.user.familyId) });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });

  const body = await req.json();
  const name = String(body.name ?? "").trim().slice(0, 40);
  const age = Number(body.age);
  const avatarKey = AVATARS.includes(body.avatarKey) ? body.avatarKey : AVATARS[0];

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!Number.isInteger(age) || age < 4 || age > 14) {
    return NextResponse.json({ error: "Age must be between 4 and 14" }, { status: 400 });
  }

  const profile = createProfile(session.user.familyId, name, age, avatarKey);
  return NextResponse.json({ profile }, { status: 201 });
}
