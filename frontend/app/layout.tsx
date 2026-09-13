import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#060B14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://link2save.com"),
  title: {
    default: "link2save — Fast & Secure Public Media Downloader",
    template: "%s | link2save",
  },
  description:
    "Free, high-speed public media downloader for YouTube and Instagram. Save HD MP4 videos and MP3 audio instantly with zero intrusive ads or logins.",
  keywords: [
    "media downloader",
    "youtube video downloader",
    "youtube to mp3",
    "instagram reel downloader",
    "instagram video downloader",
    "public media extractor",
    "link2save",
  ],
  authors: [{ name: "link2save Engineering Team" }],
  openGraph: {
    title: "link2save — Fast & Secure Public Media Downloader",
    description:
      "Save public YouTube videos and Instagram Reels in HD MP4 or MP3 audio. Clean, fast, mobile-friendly.",
    url: "https://link2save.com",
    siteName: "link2save",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "link2save — Fast & Secure Public Media Downloader",
    description:
      "Save public YouTube videos and Instagram Reels in HD MP4 or MP3 audio.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://link2save.com/#website",
        url: "https://link2save.com",
        name: "link2save",
        description: "Public Media Downloader for YouTube and Instagram",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://link2save.com/?url={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "link2save",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "All (Web Browser)",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#060B14] text-slate-100 font-sans cyber-grid selection:bg-red-700 selection:text-white">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
