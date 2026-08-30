import type { Metadata } from "next";
import { Inter, Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Anand Kumar | Software Developer & AI Builder",
  description: "Portfolio of Anand Kumar, B.Tech CSE student specializing in AI systems, React Native mobile apps, and intelligent EV routing like NAVi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceMono.variable} ${bebasNeue.variable} antialiased font-sans bg-[#03050a] text-[#B8C0CC] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
