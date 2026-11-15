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
        className="border-2 border-dashed border-ink/20 h-56 flex flex-col items-center justify-center p-8 hover:border-magenta hover:bg-magenta/5 transition-all group"
      >
        <span className="text-4xl text-ink/20 group-hover:text-magenta transition-colors mb-2">+</span>
        <h2 className="font-bold text-sm uppercase tracking-widest text-ink/60 group-hover:text-magenta transition-colors">Start New Project</h2>
      </button>
    );
  }

  return (
    <div className="bg-paper border-2 border-ink p-8 w-full md:col-span-2 shadow-xl">
      <div className="flex justify-between items-center mb-8 border-b border-ink/10 pb-4">
        <h2 className="font-poster text-3xl uppercase">New Project</h2>
        <button onClick={() => setIsOpen(false)} className="text-ink/40 hover:text-magenta font-bold uppercase text-xs tracking-widest">Cancel</button>
      </div>
      
      <form action={handleSubmit} className="space-y-6">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2 block">Project Name</label>
          <input name="name" required placeholder="e.g. Summer Campaign 2024" className="w-full bg-transparent border-b border-ink/20 py-3 text-lg outline-none focus:border-magenta transition-colors" />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2 block">Project Brief</label>
          <textarea name="brief" required rows={4} placeholder="Tell us about your goals, target audience, and what you need..." className="w-full bg-transparent border-b border-ink/20 py-3 text-lg outline-none focus:border-magenta resize-none transition-colors" />
        </div>
        
        {error && <p className="text-red-600 font-bold text-sm">{error}</p>}
        
        <button disabled={isPending} className="bg-deep text-paper px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-magenta transition-colors disabled:opacity-50 mt-4">
          {isPending ? "Submitting..." : "Submit Brief"}
        </button>
      </form>
    </div>
  );
}