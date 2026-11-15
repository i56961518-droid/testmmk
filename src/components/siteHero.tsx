import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-deep text-paper px-5 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      {/* Faded Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
          alt="Abstract Background" 
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        {/* Gradient fade to next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep/50 to-sand"></div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="mb-6 inline-block border-2 border-paper bg-transparent px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] -rotate-2 text-paper">
              AI-Powered Creative Studio
            </p>
            <h1 className="font-poster text-[12vw] lg:text-[9rem] leading-[0.85] uppercase text-paper">
              We make<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #F4F1EA" }}>brands</span><br/>
              impossible<br/>
              to ignore.
            </h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-xl font-medium leading-snug mb-8 max-w-sm text-paper/80">
              Premium marketing content. Designed by humans. Produced at the speed of AI.
            </p>
            <div className="flex flex-col gap-3">
               <Link href="/contact" className="bg-magenta text-paper text-center px-6 py-4 font-bold uppercase tracking-widest text-sm hover:bg-paper hover:text-ink transition-colors">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}