/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import { SmoothScroll } from "@/components/core/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { AssessmentFloat } from "@/components/sections/AssessmentFloat";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareRoute Health | Your Patient Guide in India",
  description:
    "CareRoute Health helps international patients access trusted, affordable medical treatment in India with patient-first guidance, transparent estimates, and complete coordination."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          {children}
          <AssessmentFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
