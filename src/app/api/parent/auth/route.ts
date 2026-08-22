import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  isPinConfigured,
  setPin,
  verifyPin,
  verifySessionToken,
} from "@/lib/parentAuth";

export async function GET(req: NextRequest) {
  const authed = verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ configured: isPinConfigured(), authed });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pin = String(body.pin ?? "").trim();
  if (!/^\d{4,8}$/.test(pin)) {
    return NextResponse.json({ error: "PIN must be 4-8 digits" }, { status: 400 });
  }

  const configured = isPinConfigured();

  if (!configured) {
    setPin(pin);
  } else if (!verifyPin(pin)) {
    return NextResponse.json({ error: "Incorrect PIN" }, { status: 401 });
  }

  const session = createSessionToken();
  const res = NextResponse.json({ ok: true, created: !configured });
  res.cookies.set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: session.maxAge,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
