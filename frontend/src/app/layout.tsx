import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Callinte | Uçtan Uca Yapay Zeka İletişim Platformu",
  description: "Oteller ve işletmeler için tasarlanmış; telefon, WhatsApp ve web kanallarını tek merkezden yöneten otonom yapay zeka platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} ${robotoMono.variable} min-h-screen flex flex-col antialiased bg-white text-slate-900 selection:bg-blue-500/30 selection:text-blue-900 overflow-x-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
