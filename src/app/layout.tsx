import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Dorsa, Fascinate } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "800"] // Added 800 for the extra bold logo
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"]
});

const dorsa = Dorsa({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dorsa",
});

const fascinate = Fascinate({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fascinate",
});

import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/ui/PageTransition";
import Socials from "@/components/layout/Socials";

export const metadata: Metadata = {
  title: "Subham | Portfolio",
  description: "A computer science student passionate about designing elegant, high-performance web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} ${dorsa.variable} ${fascinate.variable} antialiased`}
      >
        <ScrollToTop />
        <CustomCursor />
        <Navigation />
        <SmoothScroll>
          <PageTransition>
            {children}
            <Socials />
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
