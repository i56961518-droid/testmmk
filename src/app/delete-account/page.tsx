"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { confirmDeleteAccount } from "@/app/dashboard/actions";

function DeleteConfirmation() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing security token.");
      return;
    }

    async function processDeletion() {
      const res = await confirmDeleteAccount(token as string);
      if (res.success) {
        setStatus("success");
        setTimeout(() => router.push("/"), 4000);
      } else {
        setStatus("error");
        setMessage(res.error || "Failed to delete account.");
      }
    }
    processDeletion();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-16">
      <div className="max-w-md w-full border-2 border-ink p-8 shadow-[8px_8px_0_#D90368] text-center">
        {status === "loading" && (
          <>
            <h1 className="font-poster text-4xl uppercase mb-4">Verifying...</h1>
            <p className="text-ink/60">Please wait while we securely delete your account.</p>
          </>
        )}
        
        {status === "success" && (
          <>
            <h1 className="font-poster text-4xl uppercase mb-4 text-magenta">Account Deleted</h1>
            <p className="text-ink/60 mb-6">Your account and all associated data have been permanently deleted. Redirecting you to the homepage...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-poster text-4xl uppercase mb-4 text-red-600">Error</h1>
            <p className="text-ink/60 mb-6">{message}</p>
            <Link href="/" className="bg-ink text-paper px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-magenta transition-colors inline-block">Back to Home</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function DeleteAccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>}>
      <DeleteConfirmation />
    </Suspense>
  );
}