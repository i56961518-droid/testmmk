"use client";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createAccount } from "../auth-actions";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  function submit(formData: FormData) {
    setError("");
    if (formData.get("password") !== formData.get("confirm")) {
      return setError("Passwords do not match");
    }
    start(async () => {
      const res = await createAccount(formData);
      if (!res.ok) return setError(res.error);
      await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirect: false });
      router.push("/onboarding"); 
    });
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-16">
      <div className="max-w-md w-full">
        <h1 className="font-poster text-6xl uppercase leading-none mb-4">Create Account</h1>
        <p className="text-ink/60 mb-10 text-lg">Join MMK and start building a brand that is impossible to ignore.</p>
        
        <form action={submit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-1 block">Full Name</label>
            <input name="name" required className="w-full border-2 border-ink p-4 font-medium outline-none focus:bg-yellow/20 transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-1 block">Email Address</label>
            <input name="email" type="email" required className="w-full border-2 border-ink p-4 font-medium outline-none focus:bg-yellow/20 transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-1 block">Password</label>
            <div className="relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className="w-full border-2 border-ink p-4 font-medium outline-none focus:bg-yellow/20 transition-colors pr-12" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink text-sm font-bold">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-1 block">Confirm Password</label>
            <div className="relative">
              <input 
                name="confirm" 
                type={showConfirm ? "text" : "password"} 
                required 
                className="w-full border-2 border-ink p-4 font-medium outline-none focus:bg-yellow/20 transition-colors pr-12" 
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink text-sm font-bold">
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          
          {error && <p className="text-coral font-bold bg-coral/10 p-3 border-2 border-coral">{error}</p>}
          
          <button disabled={pending} className="w-full bg-ink text-paper p-5 font-bold uppercase tracking-widest text-lg hover:bg-magenta transition-colors disabled:opacity-50">
            {pending ? "Creating..." : "Continue"}
          </button>
        </form>
        <p className="mt-8 text-center text-ink/60">Already have an account? <Link href="/login" className="font-bold text-ink underline decoration-2 underline-offset-4 hover:text-magenta">Log in</Link></p>
      </div>
    </div>
  );
}