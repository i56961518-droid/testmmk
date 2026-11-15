"use client";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  function submit(formData: FormData) {
    setError("");
    start(async () => {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    });
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-16">
      <div className="max-w-md w-full">
        <h1 className="font-poster text-6xl uppercase leading-none mb-4">Welcome Back</h1>
        <p className="text-ink/60 mb-10 text-lg">Log in to manage your projects and view your deliverables.</p>
        
        <form action={submit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-1 block">Email Address</label>
            <input name="email" type="email" required className="w-full border-2 border-ink p-4 font-medium outline-none focus:bg-yellow/20 transition-colors" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-widest text-ink/60 block">Password</label>
              {/* FIXED TEXT HERE */}
              <Link href="/forgot-password" className="text-xs font-bold text-magenta hover:underline">Forgot Password?</Link>
            </div>
            <div className="relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className="w-full border-2 border-ink p-4 font-medium outline-none focus:bg-yellow/20 transition-colors pr-12" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink text-sm font-bold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          
          {error && <p className="text-coral font-bold bg-coral/10 p-3 border-2 border-coral">{error}</p>}
          
          <button disabled={pending} className="w-full bg-ink text-paper p-5 font-bold uppercase tracking-widest text-lg hover:bg-magenta transition-colors disabled:opacity-50">
            {pending ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="mt-8 text-center text-ink/60">Don't have an account? <Link href="/register" className="font-bold text-ink underline decoration-2 underline-offset-4 hover:text-magenta">Register</Link></p>
      </div>
    </div>
  );
}