import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid profile email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access token and other data to the token
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId; 
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session
      if (token) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.id as string;  
        session.error = undefined;
      }
      // console.log("Session:", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },
};

export default NextAuth(authOptions);