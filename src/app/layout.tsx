import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regenovate — Regenerate. Innovate. Transform.",
  description:
    "Regenovate transforms businesses and systems through regenerative innovation — creating sustainable, resilient solutions that benefit people and planet.",
  keywords: [
    "regenerative innovation",
    "sustainability",
    "circular economy",
    "business transformation",
    "climate positive",
    "regenovate",
  ],
  openGraph: {
    title: "Regenovate — Regenerate. Innovate. Transform.",
    description:
      "Transforming businesses and systems through regenerative innovation — sustainable, resilient solutions for people and planet.",
    url: "https://www.regenovate.co",
    siteName: "Regenovate",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regenovate — Regenerate. Innovate. Transform.",
    description:
      "Transforming businesses and systems through regenerative innovation.",
  },
  metadataBase: new URL("https://www.regenovate.co"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
