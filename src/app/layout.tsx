import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "@/components/ClientShell";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Regenovate — We Invest in Businesses Like Yours",
    template: "%s | Regenovate",
  },
  description:
    "Regenovate invests, partners and acquires businesses to transform and scale them using our proven Business Transformation Programme. Protecting your team and securing your legacy.",
  keywords: [
    "business transformation",
    "business acquisition",
    "cloud technology",
    "regenovate",
    "business growth",
    "exit strategy",
    "ERP",
    "business legacy",
  ],
  openGraph: {
    title: "Regenovate — We Invest in Businesses Like Yours",
    description:
      "We invest, partner or acquire businesses to transform and scale them — protecting your most valuable asset, your dedicated team.",
    url: "https://www.regenovate.co",
    siteName: "Regenovate",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regenovate — We Invest in Businesses Like Yours",
    description:
      "Business transformation through acquisition, cloud technology and proven growth strategies.",
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
      <body className="antialiased">
        <ClientShell>
          <Navbar />
          {children}
          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}
