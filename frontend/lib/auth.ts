import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

type BackendLoginResponse = {
  access_token: string;
  token_type: string;
  user?: {
    id: string;
    email: string;
    full_name?: string | null;
    onboarding_completed?: boolean;
  };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "flowplan-local-development-secret",
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        if (password.length > 72 || new TextEncoder().encode(password).length > 72) {
          return null;
        }

        const formData = new URLSearchParams();
        formData.set("username", email);
        formData.set("password", password);

        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
          cache: "no-store",
        });

        if (!response.ok) {
          return null;
        }

        const data = (await response.json()) as BackendLoginResponse;
        const user = data.user;

        return {
          id: user?.id ?? email,
          email: user?.email ?? email,
          name: user?.full_name ?? email.split("@")[0],
          accessToken: data.access_token,
          onboardingCompleted: user?.onboarding_completed ?? false,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.onboardingCompleted = user.onboardingCompleted;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.onboardingCompleted = token.onboardingCompleted;
      return session;
    },
  },
};
