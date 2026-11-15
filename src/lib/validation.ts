import { z } from "zod";
export const emailSchema = z.string().email("Enter a valid email address");
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(200);
export const nameSchema = z.string().min(2, "Name is too short").max(80);
export function firstError(err: z.ZodError): string {
  return err.issues[0]?.message ?? "Invalid input";
}