"use client";
import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex items-center h-[58px] border-2 border-magenta bg-magenta/10 px-6">
        <p className="font-bold text-magenta text-sm uppercase tracking-widest">Thanks for subscribing!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full md:w-auto border-2 border-paper focus-within:border-magenta transition-colors">
      <input type="email" placeholder="Your email address" className="bg-transparent px-4 py-4 w-full md:w-80 outline-none text-paper placeholder:text-paper/40" required />
      <button className="bg-paper text-ink px-6 font-bold uppercase tracking-widest hover:bg-magenta hover:text-paper transition-colors">Subscribe</button>
    </form>
  );
}