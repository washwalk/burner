import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Wodah Burner | End-to-End Encrypted Secret Sharing",
  description: "Share sensitive passwords and snippets with zero-knowledge, client-side encryption.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-[#0a0a0a] text-neutral-200 flex flex-col selection:bg-emerald-500/30`}>
        <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}