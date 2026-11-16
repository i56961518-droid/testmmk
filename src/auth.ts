import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;
        
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user || !user.passwordHash) return null;
        
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;
        
        return { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          role: user.role as "ADMIN" | "CLIENT" // <--- FIX IS HERE
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { token.uid = user.id; token.role = user.role; }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.role = token.role as "ADMIN" | "CLIENT";
      }
      return session;
    },
  },
});