"use client";
import { useState } from "react";

const projects = [
  // CHANGED IMAGE 1 TO A BRIGHT, BEAUTIFUL AESTHETIC IMAGE
  { id: 1, title: "Neon Atelier", category: "Branding", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Pulse Athletics", category: "Social Media", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Bloom Skincare", category: "Campaign", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Harmonic Audio", category: "Branding", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "Solaris Festival", category: "Campaign", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "Forma Studio", category: "Social Media", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop" },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Branding", "Social Media", "Campaign"];
  
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="bg-sand min-h-screen px-5 py-24 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="font-poster text-[15vw] md:text-[10rem] leading-[0.8] uppercase mb-12 text-deep">The Work</h1>
        
        <div className="flex flex-wrap gap-4 mb-16 border-b-2 border-ink/10 pb-8">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 font-bold uppercase tracking-widest text-sm border-2 transition-colors ${filter === cat ? "bg-magenta text-paper border-magenta" : "border-ink/20 text-ink/60 hover:border-ink hover:text-ink"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative cursor-pointer overflow-hidden border-2 border-ink bg-deep aspect-square">
              <img src={project.img} alt={project.title} className="object-cover w-full h-full group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-deep/90 to-transparent">
                <span className="text-magenta font-bold uppercase tracking-widest text-sm mb-2">{project.category}</span>
                <h2 className="text-paper font-poster text-4xl uppercase">{project.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}