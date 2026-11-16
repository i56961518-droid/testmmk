const items = ["Social", "Campaigns", "Identity", "AI Visuals", "Short-form", "Advertising", "Strategy"];

export function Marquee() {
  return (
    <div className="relative border-y-2 border-ink bg-ink py-4 text-paper overflow-hidden">
      {/* Injecting the CSS directly ensures it always works */}
      <style>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          animation: scroll-marquee 25s linear infinite;
        }
      `}</style>
      
      <div className="flex w-max marquee-content gap-10 whitespace-nowrap font-poster text-3xl uppercase tracking-tight">
        {/* Duplicating items to ensure seamless looping */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item} <span className="text-magenta text-xl">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}