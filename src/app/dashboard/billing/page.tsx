import Link from "next/link";

export default function BillingPage() {
  const plans = [
    { name: "Starter", price: "$150", period: "/mo", desc: "Perfect for emerging brands.", features: ["10 Social Posts", "2 Custom Campaigns", "Basic Art Direction", "48-Hour Turnaround"], color: "bg-paper text-ink" },
    { name: "Growth", price: "$350", period: "/mo", desc: "Our most popular agency package.", features: ["30 Social Posts", "4 Campaigns", "Full AI Visual Pipeline", "Dedicated Designer", "24-Hour Turnaround"], color: "bg-deep text-paper", highlight: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "For scaling brands needing it all.", features: ["Unlimited Content", "Full Rebrands", "Motion & Video", "Priority 24/7 Support", "Dedicated Account Manager"], color: "bg-paper text-ink" },
  ];

  return (
    <div className="min-h-screen bg-sand">
      <div className="max-w-[1600px] mx-auto px-5 py-24 md:px-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="font-poster text-6xl md:text-8xl uppercase leading-[0.8] mb-6">Upgrade Your<br/><span className="text-magenta">Output.</span></h1>
          <p className="text-xl text-ink/60">Consistent, high-end creative work delivered to your dashboard every single month. No hiring, no overhead, just results.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative border-2 border-ink p-10 flex flex-col justify-between ${plan.color} ${plan.highlight ? "md:-translate-y-4 shadow-[12px_12px_0_#D90368]" : "shadow-[8px_8px_0_#1A0B2E]"}`}>
              {plan.highlight && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-magenta text-paper text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</span>}
              
              <div>
                <h3 className="font-poster text-4xl uppercase mb-2">{plan.name}</h3>
                <p className="opacity-70 mb-6">{plan.desc}</p>
                <div className="flex items-end gap-1 mb-8 border-b border-current pb-8">
                  <span className="text-6xl font-bold">{plan.price}</span>
                  <span className="text-xl opacity-60 mb-2">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <svg className={`w-5 h-5 ${plan.highlight ? "text-magenta" : "text-ink"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/contact" className={`w-full py-4 text-center font-bold uppercase tracking-widest transition-colors ${plan.highlight ? "bg-magenta text-paper hover:bg-paper hover:text-ink" : "bg-ink text-paper hover:bg-magenta"}`}>
                {plan.price === "Custom" ? "Contact Sales" : "Upgrade Now"}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/dashboard" className="font-bold uppercase tracking-widest text-sm text-ink/50 hover:text-magenta underline decoration-2 underline-offset-4">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}