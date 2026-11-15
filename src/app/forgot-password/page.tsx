"use client";
import { useState } from "react";
import Link from "next/link";
import { sendResetEmail } from "./actions";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const res = await sendResetEmail(formData);
    
    if (res.success) {
      setStatus("sent");
    } else {
      setStatus("error");
      setError(res.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-16">
      <div className="max-w-md w-full border-2 border-ink p-8 shadow-[8px_8px_0_#D90368]">
        <h1 className="font-poster text-5xl uppercase mb-4">Reset Password</h1>
        
        {status === "sent" ? (
          <div>
            <p className="text-lg mb-6">If an account exists, we have sent a password reset link to your email. Please check your inbox.</p>
            <Link href="/login" className="bg-ink text-paper px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-magenta transition-colors inline-block">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-ink/60 mb-6">Enter your email and we'll send you a secure link to reset your password.</p>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-2 block">Email Address</label>
              <input name="email" type="email" required className="w-full bg-transparent border-b-2 border-ink/30 py-3 text-lg outline-none focus:border-magenta" />
            </div>
            
            {status === "error" && <p className="text-red-600 font-bold text-sm bg-red-100 p-2">{error}</p>}
            
            <button disabled={status === "sending"} className="w-full bg-ink text-paper py-4 font-bold uppercase tracking-widest text-sm hover:bg-magenta transition-colors disabled:opacity-50">
              {status === "sending" ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}