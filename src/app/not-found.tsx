import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-magenta text-paper flex flex-col items-center justify-center text-center px-5">
      <h1 className="font-poster text-[20vw] leading-none uppercase text-ink">404</h1>
      <p className="text-2xl font-bold mb-8">This page is impossible to find.</p>
      <Link href="/" className="bg-ink text-paper px-8 py-4 font-bold uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors">
        Back to Home
      </Link>
    </div>
  );
}