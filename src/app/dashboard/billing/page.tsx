import Link from "next/link";

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-paper font-sans selection:bg-magenta selection:text-white overflow-hidden relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-magenta/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-electric/20 rounded-full blur-[120px] pointer-events-none translate-y-1/3"></div>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-5 md:px-10 max-w-[1600px] mx-auto z-10">
        <Link href="/dashboard" className="font-bold uppercase tracking-widest text-[10px] text-paper/40 hover:text-magenta mb-12 inline-block transition-colors">
          ← Back to Dashboard
        </Link>
        
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-magenta font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-magenta"></span> Investment Options
            </p>
            <h1 className="font-poster text-[15vw] lg:text-[12rem] leading-[0.75] uppercase tracking-tighter mix-blend-difference">
              Upgrade<br/><span className="text-transparent" style={{ WebkitTextStroke: "2px #F4F1EA" }}>Your</span><br/>Output.
            </h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-xl md:text-2xl text-paper/60 leading-relaxed font-medium">
              Consistent, high-end creative work delivered to your dashboard every single month. No hiring, no overhead, just pure results.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="relative max-w-[1600px] mx-auto px-5 md:px-10 pb-32 z-10">
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Starter */}
          <div className="group relative bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="font-poster text-4xl uppercase mb-2 text-paper">Starter</h3>
              <p className="text-paper/40 text-sm mb-12 h-10">Perfect for emerging brands looking for a consistent visual presence.</p>
              <div className="flex items-end gap-2 mb-12 border-b border-white/10 pb-12">
                <span className="text-7xl font-bold tracking-tighter">$150</span>
                <span className="text-lg text-paper/40 font-medium mb-2">/mo</span>
              </div>
              <ul className="space-y-5 mb-12 text-sm font-medium text-paper/70">
                {["10 Social Posts", "2 Custom Campaigns", "Basic Art Direction", "48-Hour Turnaround", "Email Support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-paper" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/contact" className="relative z-10 w-full block py-5 rounded-xl text-center font-bold uppercase tracking-[0.2em] text-xs border border-white/20 hover:bg-paper hover:text-ink transition-all duration-300">
              Choose Starter
            </Link>
          </div>

          {/* Growth (The Highlight) */}
          <div className="group relative bg-magenta rounded-3xl p-10 flex flex-col justify-between transform lg:-translate-y-6 shadow-[0_20px_80px_-20px_rgba(217,3,104,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-poster text-4xl uppercase text-white">Growth</h3>
                <span className="bg-ink text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Popular</span>
              </div>
              <p className="text-white/70 text-sm mb-12 h-10">Our flagship package for scaling brands that need to dominate.</p>
              <div className="flex items-end gap-2 mb-12 border-b border-white/20 pb-12">
                <span className="text-7xl font-bold tracking-tighter text-white">$350</span>
                <span className="text-lg text-white/50 font-medium mb-2">/mo</span>
              </div>
              <ul className="space-y-5 mb-12 text-sm font-bold text-white">
                {["30 Social Posts", "4 Campaigns", "Full AI Visual Pipeline", "Dedicated Designer", "24-Hour Turnaround", "Priority Support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/contact" className="relative z-10 w-full block py-5 rounded-xl text-center font-bold uppercase tracking-[0.2em] text-xs bg-ink text-white hover:bg-white hover:text-magenta transition-all duration-300 shadow-xl">
              Choose Growth
            </Link>
          </div>

          {/* Enterprise */}
          <div className="group relative bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="font-poster text-4xl uppercase mb-2 text-paper">Enterprise</h3>
              <p className="text-paper/40 text-sm mb-12 h-10">For brands needing a full in-house creative team and unlimited output.</p>
              <div className="flex items-end gap-2 mb-12 border-b border-white/10 pb-12">
                <span className="text-7xl font-bold tracking-tighter text-paper">Custom</span>
              </div>
              <ul className="space-y-5 mb-12 text-sm font-medium text-paper/70">
                {["Unlimited Content", "Full Rebrands", "Motion & Video", "Priority 24/7 Support", "Dedicated Account Manager", "Quarterly Strategy Calls"].map((f, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-paper" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/contact" className="relative z-10 w-full block py-5 rounded-xl text-center font-bold uppercase tracking-[0.2em] text-xs border border-white/20 hover:bg-paper hover:text-ink transition-all duration-300">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="relative py-32 px-5 md:px-10 border-t border-white/10 z-10">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-poster text-6xl md:text-8xl uppercase mb-16 text-center text-paper mix-blend-difference">Compare The Value</h2>
          <div className="overflow-x-auto backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-6 font-bold uppercase tracking-widest text-xs text-paper/40">Features</th>
                  <th className="p-6 font-bold uppercase tracking-widest text-sm text-center text-paper">Starter</th>
                  <th className="p-6 font-bold uppercase tracking-widest text-sm text-center text-magenta">Growth</th>
                  <th className="p-6 font-bold uppercase tracking-widest text-sm text-center text-paper">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { name: "Social Posts", s: "10", g: "30", e: "Unlimited" },
                  { name: "Custom Campaigns", s: "2", g: "4", e: "Unlimited" },
                  { name: "AI Visual Pipeline", s: "—", g: "Included", e: "Included" },
                  { name: "Dedicated Designer", s: "—", g: "Included", e: "Included" },
                  { name: "Turnaround Time", s: "48 Hours", g: "24 Hours", e: "Priority" },
                  { name: "Strategy Calls", s: "—", g: "—", e: "Quarterly" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6 font-medium text-paper/80 group-hover:text-white transition-colors">{row.name}</td>
                    <td className="p-6 text-center text-paper/40">{row.s}</td>
                    <td className="p-6 text-center font-bold text-magenta">{row.g}</td>
                    <td className="p-6 text-center text-paper/40">{row.e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}