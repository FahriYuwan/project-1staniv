import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ─── Metadata ───────────────────────────────────────────────────────────────
   SEO & share card for the anniversary website.
   Keep the title vague so it feels like a surprise for Anggi.
──────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Happy 1st Anniversary 🤍",
  description: "A little something I made for you.",
  // Prevent search engines from indexing this private page
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#faf5ed",
};

/* ─── Root Layout ────────────────────────────────────────────────────────────
   - Fonts are loaded via @import in globals.css (Dancing Script, Playfair
     Display, Lato) to keep this file clean.
   - The `suppressHydrationWarning` on <html> avoids noise from browser
     extensions that touch the DOM before React hydrates.
──────────────────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
