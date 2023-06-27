import NextAuth, { DefaultSession, DefaultUser, User } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: string;
    } & DefaultSession["user"];
    accessToken: string;
  }
  interface User extends DefaultUser {
    accessToken: string;
  }
}
