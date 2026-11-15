"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "./actions";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    setStatus("loading");
    const res = await resetPassword(formData);

    if (res.success) {
      setStatus("success");
      setTimeout(() => router.push("/login"), 3000);
    } else {
      setStatus("error");
      setError(res.error || "Something went wrong");
    }
  }

  if (!token) {
    return (
      <div className="text-center">
        <h1 className="font-poster text-5xl uppercase mb-4">Invalid Link</h1>
        <p className="text-ink/60 mb-6">This password reset link is missing a secure token.</p>
        <Link href="/forgot-password" className="bg-ink text-paper px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-magenta transition-colors inline-block">Request New Link</Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <h1 className="font-poster text-5xl uppercase mb-4 text-magenta">Success!</h1>
        <p className="text-ink/60 mb-6 text-lg">Your password has been updated. Redirecting you to login...</p>
        <Link href="/login" className="bg-ink text-paper px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-magenta transition-colors inline-block">Go to Login Now</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-poster text-5xl uppercase mb-4">New Password</h1>
      <p className="text-ink/60 mb-8">Enter a strong new password for your account.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="token" value={token} />
        
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-1 block">New Password</label>
          <div className="relative">
            <input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              required 
              minLength={8}
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
              minLength={8}
              className="w-full border-2 border-ink p-4 font-medium outline-none focus:bg-yellow/20 transition-colors pr-12" 
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink text-sm font-bold">
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && <p className="text-coral font-bold bg-coral/10 p-3 border-2 border-coral">{error}</p>}

        <button disabled={status === "loading"} className="w-full bg-ink text-paper p-5 font-bold uppercase tracking-widest text-lg hover:bg-magenta transition-colors disabled:opacity-50 mt-4">
          {status === "loading" ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-16">
      <div className="max-w-md w-full border-2 border-ink p-8 shadow-[8px_8px_0_#D90368] bg-paper">
        <Suspense fallback={<p className="text-center font-bold">Loading secure form...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}