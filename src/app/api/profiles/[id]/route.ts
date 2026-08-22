import { NextRequest, NextResponse } from "next/server";
import { deleteProfile } from "@/lib/repo";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/parentAuth";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Parent authentication required" }, { status: 401 });
  }
  const { id } = await params;
  deleteProfile(Number(id));
  return NextResponse.json({ ok: true });
}
