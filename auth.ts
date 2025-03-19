import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // ✅ 修正①: CredentialsProvider を正しくインポート
import { PrismaClient } from "@prisma/client"; // ✅ 修正③: PrismaClient を正しくインポート

const prisma = new PrismaClient(); // ✅ 修正③: prisma インスタンスを作成

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string } | undefined) { // ✅ 修正②: 型を明示
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/signin", // ✅ カスタムログインページを指定
  },
};
