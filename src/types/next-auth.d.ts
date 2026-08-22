import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      familyId: number;
      parentId: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    familyId?: number;
    parentId?: number;
  }
}

// next-auth's own callback types resolve JWT from @auth/core/jwt directly
// (next-auth/jwt just re-exports it), so augmenting only the former misses it.
declare module "@auth/core/jwt" {
  interface JWT {
    familyId?: number;
    parentId?: number;
  }
}
