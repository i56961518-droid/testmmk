"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleFinish = () => {
    // In a real app, you would save all these answers to the database here.
    router.push("/dashboard"); 
  };

  // STEP 1: ROLE
  const roles = [
    { title: "Founder / CEO", desc: "I run the business and need top-tier branding.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#D90368]" },
    { title: "Marketing Lead", desc: "I manage campaigns and need consistent content.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#1E3A8A]" },
    { title: "Creator", desc: "I am building a personal brand and audience.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#C6FF3D]" },
  ];

  // STEP 2: GOAL
  const goals = [
    { title: "Build Awareness", desc: "Make my brand impossible to ignore.", img: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#E36414]" },
    { title: "Increase Sales", desc: "Drive conversions with high-end visuals.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#7B2BFF]" },
    { title: "Launch Product", desc: "Create a massive splash for a new release.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#1E3A8A]" },
    { title: "Rebrand", desc: "Refresh my identity for the modern era.", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#D90368]" },
  ];

  // STEP 3: BUDGET
  const budgets = [
    { title: "Starter", desc: "Under $1,000 / month", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#C6FF3D]" },
    { title: "Growth", desc: "$1,000 - $5,000 / month", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#1E3A8A]" },
    { title: "Enterprise", desc: "$5,000+ / month", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#D90368]" },
    { title: "Not Sure Yet", desc: "I need help scoping it.", img: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#E36414]" },
  ];

  // STEP 4: TIMELINE
  const timelines = [
    { title: "ASAP", desc: "I need this yesterday.", img: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#D90368]" },
    { title: "Next 1-2 Months", desc: "Planning ahead for a launch.", img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#7B2BFF]" },
    { title: "Just Exploring", desc: "No rush, just gathering ideas.", img: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=600&auto=format&fit=crop", color: "shadow-[8px_8px_0_#E36414]" },
  ];

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans">
      {/* Top Bar */}
      <div className="p-6 flex justify-between items-center border-b-2 border-ink bg-white">
        <div className="font-poster text-3xl tracking-tighter text-ink">MMK</div>
        <div className="text-sm font-bold tracking-widest uppercase text-ink/50">Step {step} of 4</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-5 md:p-10">
        
        {/* STEP 1: Role */}
        {step === 1 && (
          <div className="max-w-[1200px] w-full text-center">
            <h1 className="font-poster text-5xl md:text-7xl uppercase mb-4 text-ink">What best describes you?</h1>
            <p className="text-xl text-ink/60 mb-12">We use this to personalize your creative direction.</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {roles.map((option) => (
                <button
                  key={option.title}
                  onClick={() => setStep(2)}
                  className={`group bg-white border-2 border-ink overflow-hidden text-left hover:-translate-y-2 transition-all duration-300 ${option.color} hover:shadow-none`}
                >
                  <div className="h-48 overflow-hidden border-b-2 border-ink">
                    <img src={option.img} alt={option.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-2xl text-ink mb-2">{option.title}</h3>
                    <p className="text-ink/60">{option.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Goal */}
        {step === 2 && (
          <div className="max-w-[1200px] w-full text-center">
            <h1 className="font-poster text-5xl md:text-7xl uppercase mb-4 text-ink">What is your main goal?</h1>
            <p className="text-xl text-ink/60 mb-12">Select the primary objective for this project.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {goals.map((option) => (
                <button
                  key={option.title}
                  onClick={() => setStep(3)}
                  className={`group bg-white border-2 border-ink overflow-hidden text-left hover:-translate-y-2 transition-all duration-300 ${option.color} hover:shadow-none`}
                >
                  <div className="h-32 overflow-hidden border-b-2 border-ink">
                    <img src={option.img} alt={option.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-ink mb-1">{option.title}</h3>
                    <p className="text-ink/60 text-sm leading-snug">{option.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-12 text-sm font-bold uppercase tracking-widest underline decoration-2 underline-offset-4 text-ink/50 hover:text-ink">Go Back</button>
          </div>
        )}

        {/* STEP 3: Budget */}
        {step === 3 && (
          <div className="max-w-[1200px] w-full text-center">
            <h1 className="font-poster text-5xl md:text-7xl uppercase mb-4 text-ink">What is your budget?</h1>
            <p className="text-xl text-ink/60 mb-12">This helps us tailor the scope of your project.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {budgets.map((option) => (
                <button
                  key={option.title}
                  onClick={() => setStep(4)}
                  className={`group bg-white border-2 border-ink overflow-hidden text-left hover:-translate-y-2 transition-all duration-300 ${option.color} hover:shadow-none`}
                >
                  <div className="h-32 overflow-hidden border-b-2 border-ink">
                    <img src={option.img} alt={option.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-ink mb-1">{option.title}</h3>
                    <p className="text-ink/60 text-sm leading-snug">{option.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="mt-12 text-sm font-bold uppercase tracking-widest underline decoration-2 underline-offset-4 text-ink/50 hover:text-ink">Go Back</button>
          </div>
        )}

        {/* STEP 4: Timeline */}
        {step === 4 && (
          <div className="max-w-[1200px] w-full text-center">
            <h1 className="font-poster text-5xl md:text-7xl uppercase mb-4 text-ink">How soon do you need this?</h1>
            <p className="text-xl text-ink/60 mb-12">We'll prioritize your project based on your timeline.</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {timelines.map((option) => (
                <button
                  key={option.title}
                  onClick={handleFinish}
                  className={`group bg-white border-2 border-ink overflow-hidden text-left hover:-translate-y-2 transition-all duration-300 ${option.color} hover:shadow-none`}
                >
                  <div className="h-48 overflow-hidden border-b-2 border-ink">
                    <img src={option.img} alt={option.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-2xl text-ink mb-2">{option.title}</h3>
                    <p className="text-ink/60">{option.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(3)} className="mt-12 text-sm font-bold uppercase tracking-widest underline decoration-2 underline-offset-4 text-ink/50 hover:text-ink">Go Back</button>
          </div>
        )}

      </div>
    </div>
  );
}