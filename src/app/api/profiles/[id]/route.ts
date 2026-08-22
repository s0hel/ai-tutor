import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteProfile } from "@/lib/repo";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign-in required" }, { status: 401 });

  const { id } = await params;
  deleteProfile(Number(id), session.user.familyId);
  return NextResponse.json({ ok: true });
}
