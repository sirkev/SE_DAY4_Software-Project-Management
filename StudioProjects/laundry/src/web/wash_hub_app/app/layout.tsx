import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wash Hub - Your Trusted Cleaning Services Marketplace",
  description: "Connect with verified cleaning service providers in your area. Join the beta waitlist or list your cleaning business today.",
  keywords: ["cleaning services", "laundry", "house cleaning", "marketplace", "Kenya"],
  openGraph: {
    title: "Wash Hub - Your Trusted Cleaning Services Marketplace",
    description: "Connect with verified cleaning service providers in your area.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
