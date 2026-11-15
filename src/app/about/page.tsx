import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-sand min-h-screen">
      
      {/* Hero with faded background */}
      <section className="relative bg-deep text-paper px-5 py-32 md:px-10 md:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" alt="About bg" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep/50 to-sand"></div>
        </div>
        <div className="max-w-[1600px] mx-auto relative z-10">
          <h1 className="font-poster text-[15vw] md:text-[12rem] leading-[0.8] uppercase mb-12 text-magenta">
            We are<br/><span className="text-paper">MMK.</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12 text-xl md:text-2xl leading-relaxed font-medium text-paper">
            <p>We are a creative studio operating at the intersection of human design and artificial intelligence. We believe that AI should amplify creativity, not replace it.</p>
            <p className="text-paper/70">Our mission is to give brands the visual firepower of a high-end agency, but with the speed and scalability of modern technology. No fluff. Just work that makes you impossible to ignore.</p>
          </div>
        </div>
      </section>

      {/* Editorial Image & Text Rows */}
      <section className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 space-y-32">
        
        {/* Row 1 */}
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 aspect-[4/3] bg-ink overflow-hidden border-2 border-ink">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" alt="Creative process" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="md:col-span-5 md:pl-10">
            <h2 className="font-poster text-5xl md:text-6xl uppercase mb-6 text-ink">Creative First</h2>
            <p className="text-xl text-ink/70 leading-relaxed">Technology is just the tool. The idea is what stops the scroll. We spend our time obsessing over typography, art direction, and composition so your brand stands out in a crowded feed.</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 md:pr-10 order-2 md:order-1">
            <h2 className="font-poster text-5xl md:text-6xl uppercase mb-6 text-magenta">Speed & Scale</h2>
            <p className="text-xl text-ink/70 leading-relaxed">We deliver agency-quality work at the speed of a software product. By integrating AI into our production pipeline, we can produce 50 assets in the time it takes a traditional agency to make 5.</p>
          </div>
          <div className="md:col-span-7 aspect-[4/3] bg-ink overflow-hidden border-2 border-ink order-1 md:order-2">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" alt="AI Pipeline" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 aspect-[4/3] bg-ink overflow-hidden border-2 border-ink">
            <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200&auto=format&fit=crop" alt="Unique Design" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="md:col-span-5 md:pl-10">
            <h2 className="font-poster text-5xl md:text-6xl uppercase mb-6 text-burnt">No Templates</h2>
            <p className="text-xl text-ink/70 leading-relaxed">Every brand has a unique voice. We don't use drag-and-drop templates or recycled layouts. We design specifically for your business, your audience, and your goals.</p>
          </div>
        </div>

      </section>

      <section className="bg-magenta text-paper py-24 text-center px-5">
        <h2 className="font-poster text-6xl md:text-8xl uppercase leading-none mb-8">Ready to work?</h2>
        <Link href="/contact" className="inline-block bg-ink text-paper px-10 py-5 font-bold uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors">
          Start your project
        </Link>
      </section>

    </div>
  );
}