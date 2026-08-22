import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { consumeInviteForEmail, createFamily, createParent, getParentByGoogleSub } from "@/lib/repo";

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
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (!account || account.provider !== "google" || !user.email) return false;
      const googleSub = account.providerAccountId;
      if (!getParentByGoogleSub(googleSub)) {
        const invite = consumeInviteForEmail(user.email);
        const familyId = invite ? invite.familyId : createFamily().id;
        createParent(familyId, googleSub, user.email, user.name ?? null);
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account?.provider === "google") {
        const parent = getParentByGoogleSub(account.providerAccountId);
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
