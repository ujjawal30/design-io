import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authenticateUser } from "@/lib/actions/user.actions";

const handler = NextAuth({
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
            _id: user._id,
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
    async signIn({ user, account, profile, email, credentials }) {
      console.log("&&&&&&&&&&&&&&&&&& SignIn &&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log("email :>> ", email);
      console.log("user :>> ", user);
      console.log("account :>> ", account);
      console.log("profile :>> ", profile);
      console.log("creden :>> ", credentials);
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },

    async jwt({ token, user, account, profile }) {
      console.log("###################### JWT #####################");
      console.log("token :>> ", token);
      console.log("user :>> ", user);
      console.log("account :>> ", account);
      console.log("profile :>> ", profile);
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile?.id;
      }
      return token;
    },

    async session({ session, token, user }) {
      console.log("******************* Session **********************");
      console.log("session :>> ", session);
      console.log("token from session :>> ", token);
      console.log("user from session :>> ", user);
      // Send properties to the client
      return session;
    },
  },
});

export { handler as GET, handler as POST };
