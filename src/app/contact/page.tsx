"use client";
import { useState } from "react";
import { sendContactEmail } from "../contact-actions";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("sending");
    setErrorMessage("");
    const res = await sendContactEmail(formData);
    
    if (res.success) {
      setStatus("sent");
    } else {
      setStatus("error");
      setErrorMessage(res.error || "Something went wrong.");
    }
  }

  return (
    <div className="bg-sand text-ink min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-royal text-paper px-5 py-24 md:px-10 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop" 
            alt="Contact Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sand"></div>
        </div>
        <div className="max-w-[1600px] mx-auto relative z-10">
          <h1 className="font-poster text-[15vw] md:text-[10rem] uppercase leading-[0.8] mb-6">
            Let's<br/><span className="text-magenta">Talk.</span>
          </h1>
          <p className="text-2xl md:text-3xl font-medium max-w-2xl text-paper/90">
            Tell us about your business and what you need. We'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 grid lg:grid-cols-2 gap-16">
        
        {/* Left Side - Info */}
        <div className="flex flex-col justify-center">
          <h2 className="font-poster text-5xl uppercase mb-8">Ready to start?</h2>
          <p className="text-xl text-ink/70 mb-12 leading-relaxed">
            Whether you need a full rebrand, a massive social media campaign, or just a few high-end AI visuals, our team is ready to produce work that makes you impossible to ignore.
          </p>
          
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-2">Email us directly</p>
              <a href="mailto:mmkaimarketingagency@gmail.com" className="text-2xl md:text-3xl font-bold underline decoration-4 decoration-magenta underline-offset-8 hover:text-magenta transition-colors break-all">
                mmkaimarketingagency@gmail.com
              </a>
            </div>
            
            <div className="pt-8 border-t-2 border-ink/10 mt-8">
               <p className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-2">Our Process</p>
               <ul className="space-y-4 text-lg font-medium text-ink/80">
                 <li className="flex items-center gap-3"><span className="text-magenta text-2xl">→</span> You send us your brief.</li>
                 <li className="flex items-center gap-3"><span className="text-magenta text-2xl">→</span> We reply with a creative strategy.</li>
                 <li className="flex items-center gap-3"><span className="text-magenta text-2xl">→</span> We produce and deliver.</li>
               </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-paper border-2 border-ink p-8 md:p-12 shadow-[12px_12px_0_#1E3A8A]">
          {status === "sent" ? (
             <div className="h-full flex flex-col justify-center items-center text-center py-20">
                <h2 className="font-poster text-6xl uppercase mb-6 text-magenta">Message Sent!</h2>
                <p className="text-xl font-medium text-ink/80">Thank you. We have received your inquiry and will get back to you within 24 hours.</p>
             </div>
          ) : (
            <form action={handleSubmit} className="space-y-8">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-2 block">Full Name</label>
                <input name="name" type="text" required className="w-full bg-transparent border-b-2 border-ink/30 py-3 text-xl outline-none focus:border-magenta transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-2 block">Email Address</label>
                <input name="email" type="email" required className="w-full bg-transparent border-b-2 border-ink/30 py-3 text-xl outline-none focus:border-magenta transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-ink/60 mb-2 block">Project Details</label>
                <textarea name="message" required placeholder="Tell us about your goals, timeline, and budget..." rows={5} className="w-full bg-transparent border-b-2 border-ink/30 py-3 text-xl outline-none focus:border-magenta resize-none transition-colors" />
              </div>
              
              <button disabled={status === "sending"} className="w-full bg-deep text-paper px-10 py-5 font-bold uppercase tracking-widest text-lg hover:bg-magenta transition-colors disabled:opacity-50 mt-4">
                {status === "sending" ? "Sending..." : "Send Inquiry"}
              </button>
              
              {status === "error" && <p className="text-red-600 font-bold mt-4 bg-red-100 p-3 border border-red-300">{errorMessage}</p>}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}