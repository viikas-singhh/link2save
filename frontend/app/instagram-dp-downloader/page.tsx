import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { UserCircle, Sparkles, ShieldCheck, Eye, Download, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram DP Downloader — Download Full HD Profile Pictures Online Free",
  description:
    "Free Instagram DP Downloader. View and download full size, high-definition Instagram profile pictures (DP) in original 1080p JPG. Enter any @username to save instantly.",
  keywords: [
    "instagram dp downloader",
    "download instagram profile picture",
    "insta dp viewer",
    "instagram pfp download hd",
    "view full size instagram profile picture",
    "instagram dp download free",
    "insta dp zoom",
  ],
  alternates: {
    canonical: "/instagram-dp-downloader",
  },
  openGraph: {
    title: "Instagram DP Downloader — Download Profile Picture in Full HD 1080p",
    description:
      "Save any public Instagram profile picture in maximum HD resolution. Enter any handle or profile URL.",
    url: "https://link2save.com/instagram-dp-downloader",
  },
};

const INSTAGRAM_DP_FAQS: FaqItem[] = [
  {
    question: "Can I download an Instagram DP by just typing the username?",
    answer:
      "Yes! You can enter either the complete profile link (e.g., https://www.instagram.com/cristiano/) or simply type @username into the input box.",
  },
  {
    question: "What resolution does the DP downloader deliver?",
    answer:
      "link2save fetches the original, uncompressed source profile picture served by Instagram's CDN, ensuring you get the sharpest and highest resolution available (up to 1080x1080).",
  },
  {
    question: "Can I view and download profile pictures of private accounts?",
    answer:
      "Yes! Even on private Instagram accounts, profile pictures are public on Instagram's network. You can view and save the DP of both public and private accounts.",
  },
  {
    question: "Will the user know that I downloaded their profile picture?",
    answer:
      "No. Instagram does not notify creators or users when their public profile picture is viewed or downloaded.",
  },
  {
    question: "Is this Instagram DP downloader free and ad-free?",
    answer:
      "Yes, link2save is 100% free with no advertisements, popups, or required account sign-ups.",
  },
];

export default function InstagramDpDownloaderPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INSTAGRAM_DP_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Download Instagram Profile Picture (DP) in Full HD",
    description: "Step-by-step instructions to view and download any Instagram profile picture in original HD quality.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Instagram Username or URL",
        text: "Type @username (e.g. @cristiano) or paste their profile URL into the search box.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Click Download",
        text: "Click Download to inspect the full-resolution preview avatar.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Save HD Image",
        text: "Click Download HD Image to save the high-resolution JPG directly to your device.",
        position: 3,
      },
    ],
  };

  return (
    <div className="py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Downloader Hero */}
      <DownloaderHero />

      {/* Guide Content */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
              <UserCircle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Download Instagram Profile Pictures in Full HD
              </h2>
              <p className="text-xs text-slate-400">Zoom in and save any profile picture in original high resolution</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 1</div>
              <h3 className="text-sm font-semibold text-white">Enter @Username</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Type any Instagram username (e.g. @cristiano) or paste their full profile URL into the search box above.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-pink-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 2</div>
              <h3 className="text-sm font-semibold text-white">Preview Full Size</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hit Download to retrieve the original full-size image and preview the high-definition avatar.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 3</div>
              <h3 className="text-sm font-semibold text-white">Save High-Res JPG</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Save the crisp JPG file straight to your phone gallery, tablet, or desktop folder.
              </p>
            </div>
          </div>
        </div>

        {/* Informational features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-purple-400">
              <Eye className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Zoom & Full Resolution</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Instagram only displays small circular thumbnails in the app. link2save connects directly to CDN distribution nodes to deliver the uncropped, original full-resolution profile photo.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">100% Anonymous & Free</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No login, no account tracking, and no notifications sent to the user. Fast, completely private, and free of annoying ads or popups.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Instagram DP Downloader FAQ</h2>
            <p className="text-xs text-slate-400 mt-1">Frequently asked questions about Instagram profile pictures</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <FaqAccordion items={INSTAGRAM_DP_FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
