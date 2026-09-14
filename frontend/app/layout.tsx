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
    default: "link2save — Free Online Video Downloader | YouTube & Instagram Downloader",
    template: "%s | link2save",
  },
  description:
    "Free, high-speed public media downloader for YouTube and Instagram. Download Full HD 1080p videos, YouTube Shorts, MP3 audio, Instagram Reels, Profile DP, and posts with zero ads or logins.",
  keywords: [
    "youtube video downloader",
    "youtube to mp3 converter",
    "youtube shorts downloader",
    "instagram reel downloader",
    "instagram dp downloader",
    "download instagram profile picture",
    "instagram post downloader",
    "instagram story downloader",
    "free video downloader no ads",
    "link2save",
  ],
  authors: [{ name: "link2save Team" }],
  openGraph: {
    title: "link2save — Free Online Video Downloader | YouTube & Instagram Downloader",
    description:
      "Save public YouTube videos, Shorts, Instagram Reels, and Full HD DP in high definition MP4 or MP3 audio. Clean, fast, 100% ad-free.",
    url: "https://link2save.com",
    siteName: "link2save",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "link2save — Free Online Video Downloader | YouTube & Instagram Downloader",
    description:
      "Save public YouTube videos, Shorts, Instagram Reels, and Full HD DP in high definition MP4 or MP3 audio.",
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
        description: "Free Public Media Downloader for YouTube and Instagram",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://link2save.com/?url={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "link2save Downloader",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "All (Web Browser, iOS, Android, Windows, Mac)",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "14820",
          bestRating: "5",
          worstRating: "1",
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
