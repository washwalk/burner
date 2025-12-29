import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wodah Burner | End-to-End Encrypted Secret Sharing",
  description: "Share sensitive passwords and snippets with zero-knowledge, client-side encryption. Links self-destruct after being read.",
  keywords: ["secure link", "self-destructing message", "share password safely", "encrypted pastebin", "zero-knowledge sharing"],
  openGraph: {
    title: "Wodah Burner",
    description: "Secure, ephemeral link sharing.",
    url: "https://burner.wodah.com",
    siteName: "Wodah",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wodah Burner",
    description: "Zero-knowledge encrypted secret sharing.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col">
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Wodah Burner",
              "operatingSystem": "All",
              "applicationCategory": "SecurityApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Zero-knowledge encrypted secret sharing tool."
            })
          }}
        />
      </body>
    </html>
  );
}