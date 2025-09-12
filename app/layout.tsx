import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/navbar";
import { Toaster, ToastProvider } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://claims-dashboard.vercel.app"),
  title: {
    default: "Claims Dashboard - Professional Claims Management",
    template: "%s | Claims Dashboard",
  },
  description:
    "A sophisticated, production-ready claims management dashboard built with Next.js 14, featuring real-time analytics, investigation tools, and comprehensive reporting.",
  keywords: [
    "claims",
    "insurance",
    "dashboard",
    "analytics",
    "investigation",
    "reporting",
  ],
  authors: [{ name: "Claims Dashboard Team" }],
  creator: "Claims Dashboard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://claims-dashboard.vercel.app",
    siteName: "Claims Dashboard",
    title: "Claims Dashboard - Professional Claims Management",
    description:
      "A sophisticated, production-ready claims management dashboard with real-time analytics and investigation tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Claims Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claims Dashboard - Professional Claims Management",
    description:
      "A sophisticated, production-ready claims management dashboard with real-time analytics and investigation tools.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <Providers>
          <ToastProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
