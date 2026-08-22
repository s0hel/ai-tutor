import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {
  consumeInviteForEmail,
  createFamily,
  createParent,
  getParentByEmail,
  getParentByGoogleSub,
} from "@/lib/repo";

// Local-only bypass so the app can be exercised without completing a real Google OAuth
// consent flow. Gated on NODE_ENV so it can never be reached from a production build/deploy —
// do not weaken this check or add a way to configure the bypass email at runtime.
const isDev = process.env.NODE_ENV !== "production";
const DEV_LOGIN_EMAIL = "hotmonkeys@gmail.com";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    ...(isDev
      ? [
          Credentials({
            id: "dev-login",
            name: "Dev Login (local only)",
            credentials: {},
            async authorize() {
              const parent = await getParentByEmail(DEV_LOGIN_EMAIL);
              if (!parent) return null;
              return { id: String(parent.id), email: parent.email, name: parent.name };
            },
          }),
        ]
      : []),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "dev-login") return true;
      if (!account || account.provider !== "google" || !user.email) return false;
      const googleSub = account.providerAccountId;
      if (!(await getParentByGoogleSub(googleSub))) {
        const invite = await consumeInviteForEmail(user.email);
        const familyId = invite ? invite.familyId : (await createFamily()).id;
        await createParent(familyId, googleSub, user.email, user.name ?? null);
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account?.provider === "google") {
        const parent = await getParentByGoogleSub(account.providerAccountId);
        if (parent) {
          token.familyId = parent.familyId;
          token.parentId = parent.id;
        }
      }
      if (account?.provider === "dev-login" && user?.email) {
        const parent = await getParentByEmail(user.email);
        if (parent) {
          token.familyId = parent.familyId;
          token.parentId = parent.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.familyId && token.parentId) {
        session.user.familyId = token.familyId;
        session.user.parentId = token.parentId;
      }
      return session;
    },
  },
});
