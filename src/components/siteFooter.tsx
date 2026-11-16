import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";
import { auth } from "@/auth";

export async function Footer() {
  const session = await auth();

  return (
    <footer className="bg-ink text-paper pt-20 pb-10">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        
        {/* Newsletter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-paper/20 pb-16 mb-16 gap-8">
          <div>
            <h3 className="font-poster text-5xl uppercase">Stay Inspired.</h3>
            <p className="text-paper/60 mt-2 text-lg">Join our newsletter for AI-generated design tips and agency updates daily.</p>
          </div>
          
          {/* Pass the logged in user's email to pre-fill the form */}
          <NewsletterForm userEmail={session?.user?.email} />
          
        </div>

        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-poster text-[8rem] leading-none tracking-tighter text-magenta">MMK</p>
            <p className="mt-4 max-w-xs text-paper/60">
              We make brands impossible to ignore. Designed by humans. Produced by AI.
            </p>
          </div>
          
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper/40">Site</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-magenta transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-magenta transition-colors">Work</Link></li>
              <li><Link href="/about" className="hover:text-magenta transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-magenta transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper/40">Social</p>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-magenta transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-magenta transition-colors">TikTok</a></li>
              <li><a href="#" className="hover:text-magenta transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-magenta transition-colors">Twitter / X</a></li>
            </ul>
          </div>
          
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper/40">Legal</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-magenta transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-magenta transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookies" className="hover:text-magenta transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-paper/20 pt-8 text-xs text-paper/40 md:flex-row">
          <p>© {new Date().getFullYear()} MMK Agency. All rights reserved.</p>
          <p>Built for the future of marketing.</p>
        </div>
      </div>
    </footer>
  );
}