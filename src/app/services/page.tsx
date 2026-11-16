import Link from "next/link";

export default function ServicesPage() {
  const services = [
    { 
      title: "Social Media Marketing", 
      desc: "Full-funnel content systems for Instagram, TikTok, and beyond. We design posts, carousels, and stories that demand attention.", 
      img: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=1200&auto=format&fit=crop", 
      color: "bg-deep text-paper" 
    },
    { 
      title: "Brand Identity", 
      desc: "Logos, type systems, and the visual rules that hold them together. We build identities that look like they belong in a museum.", 
      img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop", 
      color: "bg-sand text-ink" 
    },
    { 
      title: "AI Visuals", 
      desc: "Original imagery and art direction produced with AI, finished by humans. Impossible visuals, delivered at the speed of software.", 
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop", 
      color: "bg-burnt text-paper" 
    },
    { 
      title: "Campaigns", 
      desc: "Multi-touch campaigns with a single, coherent art direction. From billboards to Instagram ads, we make sure you dominate.", 
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop", 
      color: "bg-royal text-paper" 
    }
  ];

  return (
    <div className="bg-sand min-h-screen">
      {/* Hero with unique background */}
      <section className="relative bg-royal text-paper px-5 py-32 md:px-10 md:py-48 flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000&auto=format&fit=crop" 
            alt="Services bg" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sand"></div>
        </div>
        <h1 className="font-poster text-[15vw] md:text-[10rem] uppercase leading-[0.8] relative z-10 text-paper">Our<br/>Services</h1>
      </section>

      {/* Alternating Image/Text Layout */}
      <section className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 space-y-32">
        {services.map((s, i) => (
          <div key={s.title} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className={`aspect-[4/3] overflow-hidden border-2 border-ink group ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
               <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className={`p-8 md:p-16 border-2 border-ink ${s.color} ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
               <h2 className="font-poster text-5xl md:text-7xl uppercase leading-none mb-6">{s.title}</h2>
               <p className="text-xl md:text-2xl leading-relaxed mb-8">{s.desc}</p>
               <Link href="/contact" className="inline-block border-b-4 border-current pb-1 font-bold uppercase tracking-widest text-sm hover:text-magenta transition-colors">
                 Request this service
               </Link>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="bg-paper text-ink py-24 px-5 md:px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-poster text-5xl uppercase mb-12 text-center">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How fast is the turnaround?", a: "Our AI pipeline allows us to deliver standard social media content within 48-72 hours." },
              { q: "Do I own the final designs?", a: "Yes, once the project is paid in full, you own 100% of the intellectual property." },
              { q: "Can I request revisions?", a: "Absolutely. Every package includes at least two rounds of revisions to ensure you love the final result." }
            ].map((faq, i) => (
              <details key={i} className="border-2 border-ink bg-sand group">
                <summary className="font-bold text-lg p-6 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-magenta group-open:rotate-45 transition-transform text-2xl">+</span>
                </summary>
                <div className="p-6 pt-0 text-ink/70 text-lg border-t-2 border-ink/10 mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}