const items = ["Social", "Campaigns", "Identity", "AI Visuals", "Short-form"];
export function Marquee() {
  return (
    <div className="border-y-2 border-ink bg-ink py-3 text-paper overflow-hidden">
      <div className="flex w-max animate-marquee gap-10 font-poster text-2xl uppercase">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i}>{item} <span className="text-pink">●</span></span>
        ))}
      </div>
    </div>
  );
}