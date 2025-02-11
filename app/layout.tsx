import { fontSans } from "@/lib/fonts";
import { absoluteUrl, cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@/components/analytics";
import { PHProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";

import "@/styles/globals.css";
import "@/styles/mdx.css";

import type { Viewport } from "next";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Artifact UI",
  description:
    "Beautiful UI components and templates to make your landing page look stunning.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    type: "website",
    title: "Artifact UI",
    description: "Beautiful UI components and templates to make your landing page look stunning.",
    images: [{ url: "/logo.svg", width: 1200, height: 630, alt: "Artifact UI Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artifact UI",
    description: "Beautiful UI components and templates to make your landing page look stunning.",
    images: ["/logo.svg"],
  },
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden scroll-smooth bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <PHProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider>
              {children}
              <Toaster />
              <Analytics />
            </TooltipProvider>
          </ThemeProvider>
        </PHProvider>
      </body>
    </html>
  );
}
