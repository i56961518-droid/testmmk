"use client";
import { useState } from "react";
import Link from "next/link";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-ink z-50 relative font-bold uppercase">
        {isOpen ? "Close" : "Menu"}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-deep text-paper z-40 flex flex-col justify-center items-center gap-8">
          <Link href="/services" onClick={() => setIsOpen(false)} className="font-poster text-5xl uppercase hover:text-magenta">Services</Link>
          <Link href="/portfolio" onClick={() => setIsOpen(false)} className="font-poster text-5xl uppercase hover:text-magenta">Work</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="font-poster text-5xl uppercase hover:text-magenta">About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="font-poster text-5xl uppercase hover:text-magenta">Contact</Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="mt-8 bg-magenta px-8 py-4 font-bold uppercase tracking-widest text-sm">Log In</Link>
        </div>
      )}
    </div>
  );
}