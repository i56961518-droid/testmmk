"use client";
import { useState, useEffect } from "react";
import { subscribeToNewsletter } from "@/app/contact-actions";

export function NewsletterForm({ userEmail }: { userEmail?: string | null }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState(userEmail || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check local storage or just default to idle
    const isSubbed = localStorage.getItem("mmk_subscribed");
    if (isSubbed === "true") {
      setStatus("success");
      setMessage("Thanks for subscribing!");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData();
    formData.append("email", email);
    
    const res = await subscribeToNewsletter(formData);
    if (res.success) {
      setStatus("success");
      setMessage(res.message || "Thanks for subscribing!");
      localStorage.setItem("mmk_subscribed", "true");
    } else {
      setStatus("error");
      setMessage(res.error || "Error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center h-[58px] border-2 border-magenta bg-magenta/10 px-6">
        <p className="font-bold text-magenta text-sm uppercase tracking-widest">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full md:w-auto">
      <div className="flex border-2 border-paper focus-within:border-magenta transition-colors">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address" 
          className="bg-transparent px-4 py-4 w-full md:w-80 outline-none text-paper placeholder:text-paper/40" 
          required 
        />
        <button disabled={status === "loading"} className="bg-paper text-ink px-6 font-bold uppercase tracking-widest hover:bg-magenta hover:text-paper transition-colors disabled:opacity-50">
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && <p className="text-red-400 text-xs">{message}</p>}
    </form>
  );
}