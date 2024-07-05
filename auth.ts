import NextAuth from "next-auth";

import db from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      console.log("session", session);
      return session;
    },
    async jwt({ token, user, profile }) {
      console.log("jwt", token);
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  ...authConfig,
});
