import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createInvite, listInvitesForFamily } from "@/lib/repo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });
  return NextResponse.json({ invites: await listInvitesForFamily(session.user.familyId) });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });

  const body = await req.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const invite = await createInvite(session.user.familyId, email, session.user.parentId);
  return NextResponse.json({ invite }, { status: 201 });
}
