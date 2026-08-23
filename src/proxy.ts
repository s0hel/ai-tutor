import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  if (req.auth) return NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Sign-in required" }, { status: 401 });
  }

  const signInUrl = new URL("/api/auth/signin", req.nextUrl.origin);
  signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
  return NextResponse.redirect(signInUrl);
});

export const config = {
  matcher: [
    "/",
    "/parent/:path*",
    "/api/parent/:path*",
    "/api/profiles/:path*",
    "/api/skills/:path*",
    "/api/reading-skills/:path*",
    "/api/gt-skills/:path*",
    "/api/chat",
  ],
};
