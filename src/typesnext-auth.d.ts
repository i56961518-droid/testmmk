import type { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session { user: { id: string; role: "ADMIN" | "CLIENT" } & DefaultSession["user"]; }
  interface User { role: "ADMIN" | "CLIENT"; }
}
declare module "next-auth/jwt" {
  interface JWT { uid?: string; role?: "ADMIN" | "CLIENT"; }
}