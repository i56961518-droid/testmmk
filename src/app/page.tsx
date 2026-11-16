import { Hero } from "../components/siteHero";
import { Marquee } from "../components/siteMarquee";
import { Testimonials } from "../components/Testimonials";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      
      <section className="bg-paper px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-ink pb-6">
            <h2 className="font-poster text-6xl md:text-8xl leading-none uppercase">What we do</h2>
            <Link href="/services" className="text-lg font-bold underline decoration-4 underline-offset-8 hover:text-magenta mt-4 md:mt-0">View all services</Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Social Media", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop" },
              { title: "Brand Identity", img: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=800&auto=format&fit=crop" },
              { title: "AI Visuals", img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop" }
            ].map((service, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden mb-6 relative bg-ink border-2 border-ink">
                  <img src={service.img} alt={service.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-ink/60 text-sm">Editorial-grade content designed to stop the scroll.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-royal text-paper px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-poster text-[12vw] md:text-[8rem] leading-none uppercase mb-16 text-right text-transparent" style={{ WebkitTextStroke: "2px #F4F1EA" }}>Selected Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-yellow relative overflow-hidden group border-2 border-paper">
               {/* FIXED SYNTAX ERROR AND BROKEN IMAGE */}
               <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop" alt="Work 1" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[4/5] bg-magenta relative overflow-hidden group md:translate-y-12 border-2 border-paper">
               {/* FIXED BROKEN IMAGE */}
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" alt="Work 2" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div className="text-center mt-24">
             <Link href="/portfolio" className="inline-block border-2 border-paper px-10 py-5 font-bold uppercase tracking-widest hover:bg-paper hover:text-royal transition-colors">
                View Full Portfolio
             </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-ink text-paper px-5 py-40 md:px-10 text-center">
         <h2 className="font-poster text-[12vw] leading-[0.8] uppercase">Ready to<br/><span className="text-magenta">scale?</span></h2>
         <Link href="/contact" className="inline-block mt-16 bg-paper text-ink px-12 py-6 font-bold uppercase tracking-widest text-xl hover:bg-yellow transition-colors hover:-translate-y-2">
            Start Your Project
         </Link>
      </section>
    </>
  );
}