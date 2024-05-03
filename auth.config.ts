import type { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authenticateUser } from "@/lib/actions/user.actions";

const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await authenticateUser(
          credentials as AuthenticateUserParams
        );
        console.log("res :>> ", res);

        const user = res.data;

        if (res.status && user) {
          return {
            id: user._id,
            email: user.email,
            name: user.name,
            photo: user.photo,
          } as User;
        } else {
          throw new Error(res.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
} satisfies AuthOptions;

export default authOptions;
