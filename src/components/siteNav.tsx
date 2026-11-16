import Link from "next/link";
import { auth } from "@/auth";
import { MobileMenu } from "./MobileMenu";

export async function Nav() {
  const session = await auth();
  
  return (
    <header className="sticky top-0 z-[999] border-b-2 border-ink bg-[#F4F1EA]">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        <Link href="/" className="font-poster text-4xl tracking-tighter hover:text-magenta transition-colors text-ink">MMK</Link>
        
        <MobileMenu session={session} />

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/services" className="font-bold uppercase tracking-widest text-sm text-ink hover:underline decoration-4 underline-offset-4 decoration-magenta">Services</Link>
          <Link href="/pricing" className="font-bold uppercase tracking-widest text-sm text-ink hover:underline decoration-4 underline-offset-4 decoration-magenta">Pricing</Link>
          <Link href="/portfolio" className="font-bold uppercase tracking-widest text-sm text-ink hover:underline decoration-4 underline-offset-4 decoration-magenta">Work</Link>
          <Link href="/about" className="font-bold uppercase tracking-widest text-sm text-ink hover:underline decoration-4 underline-offset-4 decoration-magenta">About</Link>
          <Link href="/contact" className="font-bold uppercase tracking-widest text-sm text-ink hover:underline decoration-4 underline-offset-4 decoration-magenta">Contact</Link>
          {/* REMOVED THE EMPTY BLOCK HERE */}
        </nav>

        <div className="flex items-center gap-6">
          {session?.user ? (
            <>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="font-bold uppercase tracking-widest text-sm text-magenta hover:underline hidden md:block">Admin</Link>
              )}
              <Link href="/dashboard" className="font-bold uppercase tracking-widest text-sm text-ink hover:underline decoration-4 underline-offset-4 decoration-magenta hidden md:block">Dashboard</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="font-bold uppercase tracking-widest text-sm text-ink hover:text-magenta hidden md:block">Log in</Link>
              <Link href="/register" className="bg-ink text-paper border-2 border-ink px-6 py-2 font-bold text-sm uppercase hover:bg-magenta transition-colors hidden md:block">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}