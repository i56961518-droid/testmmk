export function Testimonials() {
  const reviews = [
    { quote: "MMK completely changed the way our brand looks. We went from posting once a week to dominating our niche. The AI visuals are insane.", name: "Luka R.", company: "CEO, Bloom Skincare" },
    { quote: "I was paying a traditional agency triple the price for half the quality. MMK delivered 40 assets in 3 days. Absolute game changer.", name: "Andrej M.", company: "Founder, Pulse Athletics" },
    { quote: "Their art direction is unmatched. They understand typography, color, and culture. It feels like having an in-house creative team.", name: "Lidija M.", company: "CMO, Solaris" },
  ];

  return (
    <section className="bg-magenta text-paper py-24 px-5 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="font-poster text-6xl md:text-8xl uppercase mb-16 text-center">Client Love</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-deep p-8 border-2 border-ink flex flex-col justify-between">
              <p className="text-xl font-medium leading-relaxed mb-8">"{r.quote}"</p>
              <div>
                <p className="font-bold text-lg">{r.name}</p>
                <p className="text-paper/50 text-sm uppercase tracking-widest">{r.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}