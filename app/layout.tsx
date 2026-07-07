import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

/**
 * Production typography target: Gotham (Figma verified).
 * Licensed Gotham webfont files are not yet available.
 * Interim fallback is applied via --font-family-primary in globals.css.
 * When Gotham files are procured, update --font-family-primary only — no component restructure required.
 *
 * Noto Sans is loaded for the Figma-verified Title/title-2 heading token.
 */
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: {
    default: "Velarro Estate",
    template: "%s | Velarro Estate",
  },
  description:
    "Velarro Estate — curated cigars, house goods, and membership experiences.",
  metadataBase: new URL("https://velarroestate.com"),
  applicationName: "Velarro Estate",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

