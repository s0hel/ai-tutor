import { NextRequest, NextResponse } from "next/server";
import { createProfile, listProfiles } from "@/lib/repo";
import { AVATARS } from "@/lib/types";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/parentAuth";

export async function GET() {
  return NextResponse.json({ profiles: listProfiles() });
}

export async function POST(req: NextRequest) {
  if (!verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Parent authentication required" }, { status: 401 });
  }
  const body = await req.json();
  const name = String(body.name ?? "").trim().slice(0, 40);
  const age = Number(body.age);
  const avatarKey = AVATARS.includes(body.avatarKey) ? body.avatarKey : AVATARS[0];

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!Number.isInteger(age) || age < 4 || age > 14) {
    return NextResponse.json({ error: "Age must be between 4 and 14" }, { status: 400 });
  }

  const profile = createProfile(name, age, avatarKey);
  return NextResponse.json({ profile }, { status: 201 });
}
