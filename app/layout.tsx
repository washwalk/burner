import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wodah Burner",
  description: "Zero-knowledge, end-to-end encrypted secret sharing.",
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
      </body>
    </html>
  );
}