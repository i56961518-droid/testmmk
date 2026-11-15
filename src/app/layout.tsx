import type { Metadata } from "next";
import { Nav } from "../components/siteNav";
import { Footer } from "../components/siteFooter";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "MMK | AI Marketing Agency",
    template: "%s | MMK"
  },
  description: "Premium marketing content. Designed by humans. Produced at the speed of AI.",
  openGraph: {
    title: "MMK | AI Marketing Agency",
    description: "We make brands impossible to ignore.",
    url: "https://mmk-agency.com",
    siteName: "MMK",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MMK | AI Marketing Agency",
    description: "We make brands impossible to ignore.",
  }
};export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}