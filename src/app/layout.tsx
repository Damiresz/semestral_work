// Import necessary dependencies
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure Inter font with Latin subset
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Define metadata for SEO optimization
export const metadata: Metadata = {
  title: "Semestral Work",
  description: "Modern web application",
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply Inter font and antialiasing to body */}
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
