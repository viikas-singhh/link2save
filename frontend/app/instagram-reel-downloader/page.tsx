import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { Film, Sparkles, ShieldCheck, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Reel Downloader — Save HD Reels Without Watermark",
  description:
    "Free Instagram Reel Downloader. Save public Instagram Reels in HD MP4 with original audio and zero watermark. Fast, clean, 100% ad-free on iOS, Android, and PC.",
  keywords: [
    "instagram reel downloader",
    "download instagram reel no watermark",
    "instagram reels video save online",
    "free insta reel download",
    "download ig reels hd",
  ],
  alternates: {
    canonical: "/instagram-reel-downloader",
  },
};

const INSTAGRAM_REEL_FAQS: FaqItem[] = [
  {
    question: "Can I download public Reels with their original background audio?",
    answer:
      "Yes! The downloaded MP4 contains the full synchronized audio track as published on Instagram without compression.",
  },
  {
    question: "Are there any watermarks added to downloaded Reels?",
    answer:
      "No. link2save never adds watermarks, logos, or overlays to your downloaded videos.",
  },
  {
    question: "Is this Instagram Reel downloader completely free and ad-free?",
    answer:
      "Yes. link2save is 100% free with no annoying advertisements or popups. Just paste the link and download.",
  },
  {
    question: "Why do some Reels fail to analyze?",
    answer:
      "If a creator deletes the Reel, changes their account to private, or sets regional restrictions, the content cannot be fetched anonymously.",
  },
];

export default function InstagramReelDownloaderPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INSTAGRAM_REEL_FAQS.map((faq) => ({
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
    name: "How to Download Instagram Reels in Full HD Without Watermark",
    description: "Step-by-step instructions to save any public Instagram Reel directly to your phone or computer.",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy Reel Link",
        text: "Open the Instagram app, tap Share on any Reel, and click Copy Link.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Paste in link2save",
        text: "Paste the URL into link2save's search field.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Download Clean MP4",
        text: "Click Download to save the original vertical HD video to your gallery.",
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
            <div className="p-2.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-500">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Download Public Instagram Reels
              </h2>
              <p className="text-xs text-slate-400">Save trending short-form videos in full 9:16 HD with audio</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-pink-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 1</div>
              <h3 className="text-sm font-semibold text-white">Find Public Reel</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                While watching any public Reel on Instagram, tap the Share icon and click &ldquo;Copy link&rdquo;.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 2</div>
              <h3 className="text-sm font-semibold text-white">Paste URL</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paste the link into link2save. Our backend immediately verifies accessibility and extracts the video stream.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 3</div>
              <h3 className="text-sm font-semibold text-white">Save Watermark-Free</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Download the MP4 file instantly to your device for smooth offline viewing with zero watermarks.
              </p>
            </div>
          </div>
        </div>

        {/* Informational features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-pink-400">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Original Audio & Visuals</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We preserve crisp 1080x1920 vertical video dimensions and full stereophonic audio tracks so your favorite tutorials and comedy clips look identical to their online version.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">100% Free & No Ads</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Enjoy a sleek glassmorphic interface built from the ground up for speed. No deceptive &ldquo;Download Now&rdquo; malware banners or suspicious popups.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Instagram Reels FAQ</h2>
            <p className="text-xs text-slate-400 mt-1">Everything you need to know about downloading Reels</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <FaqAccordion items={INSTAGRAM_REEL_FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
