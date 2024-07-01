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
      return session;
    },
    async jwt({ token, user, profile }) {
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
