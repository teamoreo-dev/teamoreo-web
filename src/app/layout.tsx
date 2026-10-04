import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Team Oreo | Technology, Data & Business Consultancy",
    template: "%s | Team Oreo",
  },
  description:
    "Team Oreo helps organisations solve business challenges through technology, data, AI and practical consultancy.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Team Oreo | Technology, Data & Business Consultancy",
    description:
      "Practical technology, data and consultancy for organisations ready to move forward.",
    url: "/",
    siteName: "Team Oreo",
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} scroll-smooth`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
