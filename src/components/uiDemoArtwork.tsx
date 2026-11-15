export function DemoArtwork({ label, index = 0 }: { label: string; index?: number }) {
  const palettes = ["bg-electric", "bg-orange", "bg-lime", "bg-purple"];
  const bg = palettes[index % palettes.length];
  return (
    <div className={`relative flex h-40 items-center justify-center overflow-hidden rounded-xl ${bg}`}>
      <span className="font-poster text-2xl uppercase text-paper">{label}</span>
    </div>
  );
}