"use client";
import { useState } from "react";
import { createProject } from "./actions";

export function NewProjectForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError("");
    const res = await createProject(formData);
    if (res.success) {
      setIsOpen(false);
    } else {
      setError(res.error || "Something went wrong");
    }
    setIsPending(false);
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="group border border-ink/10 bg-paper h-56 flex flex-col items-center justify-center p-8 hover:border-ink/30 hover:shadow-lg transition-all duration-300 rounded-xl"
      >
        <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <span className="text-2xl text-ink/40 group-hover:text-ink">+</span>
        </div>
        <h2 className="font-bold text-sm uppercase tracking-widest text-ink/60 group-hover:text-ink transition-colors">Start New Project</h2>
      </button>
    );
  }

  return (
    <div className="bg-paper border border-ink/10 p-8 w-full md:col-span-2 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8 border-b border-ink/10 pb-4">
        <h2 className="font-poster text-3xl uppercase">New Project</h2>
        <button onClick={() => setIsOpen(false)} className="text-ink/40 hover:text-red-500 font-bold uppercase text-xs tracking-widest transition-colors">Cancel</button>
      </div>
      
      <form action={handleSubmit} className="space-y-6">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2 block">Project Name</label>
          <input name="name" required placeholder="e.g. Summer Campaign 2024" className="w-full bg-[#F9F9F8] border border-ink/10 rounded-md p-4 text-lg outline-none focus:border-ink transition-colors" />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2 block">Project Brief</label>
          <textarea name="brief" required rows={4} placeholder="Tell us about your goals, target audience, and what you need..." className="w-full bg-[#F9F9F8] border border-ink/10 rounded-md p-4 text-lg outline-none focus:border-ink resize-none transition-colors" />
        </div>
        
        {error && <p className="text-red-600 font-bold text-sm bg-red-50 p-3 rounded-md border border-red-200">{error}</p>}
        
        <button disabled={isPending} className="bg-ink text-paper px-8 py-4 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-ink/80 transition-colors disabled:opacity-50 mt-4">
          {isPending ? "Submitting..." : "Submit Brief"}
        </button>
      </form>
    </div>
  );
}