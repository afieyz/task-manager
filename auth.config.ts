import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnTasks = nextUrl.pathname.startsWith("/tasks");

      if (isOnTasks) {
        if (isLoggedIn) return true;

        return false;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;