import Link from "next/link";
import { auth } from "@/auth";
import { MobileMenu } from "./MobileMenu";

export async function Nav() {
  const session = await auth();
  
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        <Link href="/" className="font-poster text-4xl tracking-tighter hover:text-magenta transition-colors">MMK</Link>
        
        <MobileMenu />

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/services" className="font-bold uppercase tracking-widest text-sm hover:underline decoration-4 underline-offset-4 decoration-magenta">Services</Link>
          <Link href="/portfolio" className="font-bold uppercase tracking-widest text-sm hover:underline decoration-4 underline-offset-4 decoration-magenta">Work</Link>
          <Link href="/about" className="font-bold uppercase tracking-widest text-sm hover:underline decoration-4 underline-offset-4 decoration-magenta">About</Link>
          <Link href="/contact" className="font-bold uppercase tracking-widest text-sm hover:underline decoration-4 underline-offset-4 decoration-magenta">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              {/* If they are an admin, show a yellow Admin button */}
              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="bg-yellow text-ink border-2 border-ink px-6 py-2 font-bold text-sm uppercase hover:bg-deep hover:text-paper transition-colors">
                  Admin Panel
                </Link>
              )}
              <Link href="/dashboard" className="bg-ink text-paper border-2 border-ink px-6 py-2 font-bold text-sm uppercase hover:bg-magenta transition-colors">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="font-bold uppercase tracking-widest text-sm hover:text-magenta hidden sm:block">
                Log in
              </Link>
              <Link href="/register" className="bg-ink text-paper border-2 border-ink px-6 py-2 font-bold text-sm uppercase hover:bg-magenta transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}