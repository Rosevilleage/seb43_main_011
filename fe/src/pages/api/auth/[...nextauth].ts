// pages/api/auth/[...nextauth].ts
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import axios from "axios";
import Credentials from "next-auth/providers/credentials";

const nextauthUrl = process.env.NEXTAUTH_URL;

export default NextAuth({
  providers: [
    Credentials({
      // 이메일과 패스워드 입력 필드 설정
      id: "email-credential",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // 사용자 인증 로직
      authorize: async (credentials) => {
        try {
          if (credentials && nextauthUrl) {
            const email = credentials.email;
            const password = credentials.password;

            const response = await axios.post(nextauthUrl, { email, password });
            const token = response.headers["authorization"];
            axios.defaults.headers.common["Authorization"] = token;
            // 로그인 성공 시 사용자 정보 반환
            const userData = {
              id: 1,
              accessToken: token,
            };
            if (response && userData) {
              return Promise.resolve(userData as any);
            }

            // 로그인 실패 시 null 반환
          } else return Promise.resolve(null);
        } catch (error) {
          // 에러 처리
          return Promise.resolve(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = `${token}`;

      return session;
    },
  },
});
