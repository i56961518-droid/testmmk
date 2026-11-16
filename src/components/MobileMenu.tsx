"use client";
import { useState } from "react";
import Link from "next/link";

export function MobileMenu({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-ink z-50 relative font-bold uppercase tracking-widest text-sm">
        {isOpen ? "Close" : "Menu"}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-deep text-paper z-40 flex flex-col justify-center items-center gap-6 px-10 overflow-y-auto">
          <Link href="/services" onClick={() => setIsOpen(false)} className="font-poster text-4xl uppercase hover:text-magenta transition-colors">Services</Link>
          <Link href="/portfolio" onClick={() => setIsOpen(false)} className="font-poster text-4xl uppercase hover:text-magenta transition-colors">Work</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="font-poster text-4xl uppercase hover:text-magenta transition-colors">About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="font-poster text-4xl uppercase hover:text-magenta transition-colors">Contact</Link>
          
          {session?.user && (
             <Link href="/dashboard/billing" onClick={() => setIsOpen(false)} className="font-poster text-4xl uppercase hover:text-magenta transition-colors">Billing</Link>
          )}
          
          <div className="w-16 h-1 bg-paper/20 my-4"></div>

          {session?.user ? (
            <>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" onClick={() => setIsOpen(false)} className="bg-yellow text-ink px-8 py-3 font-bold uppercase tracking-widest text-sm w-full text-center">Admin Panel</Link>
              )}
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="bg-paper text-ink px-8 py-3 font-bold uppercase tracking-widest text-sm w-full text-center">Dashboard</Link>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)} className="border-2 border-paper text-paper px-8 py-3 font-bold uppercase tracking-widest text-sm w-full text-center">Log In</Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="bg-magenta text-paper px-8 py-3 font-bold uppercase tracking-widest text-sm w-full text-center">Register</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}