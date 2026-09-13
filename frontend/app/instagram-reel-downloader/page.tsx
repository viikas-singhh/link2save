import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import AdSlot from "@/components/AdSlot";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { Film, Sparkles, Smartphone, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Reel Downloader — Download Public Instagram Reels in HD",
  description:
    "Download public Instagram Reels with high-definition audio and video in MP4. Fast, free, watermark-free, and mobile-friendly.",
  alternates: {
    canonical: "/instagram-reel-downloader",
  },
};

const INSTAGRAM_REEL_FAQS: FaqItem[] = [
  {
    question: "Can I download public Reels with their original background audio?",
    answer:
      "Yes. The downloaded MP4 contains the full synchronized audio track as published on Instagram.",
  },
  {
    question: "Is there a limit on how many Reels I can save?",
    answer:
      "No. link2save does not enforce strict user quotas for regular personal use, though our server maintains sliding-window rate protection against abusive automated bots.",
  },
  {
    question: "Why do some Reels fail to analyze?",
    answer:
      "If a creator changes their account to private, deletes the Reel, or applies geographic/age restrictions, Instagram makes the media inaccessible to public extractors.",
  },
  {
    question: "Does the downloader compress or alter video resolution?",
    answer:
      "No. link2save retrieves the highest bit-rate source MP4 file directly from public CDN distribution points without downscaling.",
  },
];

export default function InstagramReelDownloaderPage() {
  return (
    <div className="py-8">
      {/* Downloader Hero */}
      <DownloaderHero />

      <AdSlot placement="hero-bottom" />

      {/* Guide Content */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/70 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-500">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Download Public Instagram Reels
              </h2>
              <p className="text-xs text-slate-400">Save trending short-form videos in full 9:16 HD</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-pink-500 font-mono text-sm font-bold">01</div>
              <h3 className="text-sm font-semibold text-white">Find Public Reel</h3>
              <p className="text-xs text-slate-400">
                While watching any public Reel on Instagram, tap the Share icon and click &ldquo;Copy link&rdquo;.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-pink-500 font-mono text-sm font-bold">02</div>
              <h3 className="text-sm font-semibold text-white">Paste URL</h3>
              <p className="text-xs text-slate-400">
                Paste the link into link2save. Our backend immediately verifies accessibility and extracts the media stream.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-pink-500 font-mono text-sm font-bold">03</div>
              <h3 className="text-sm font-semibold text-white">Save Watermark-Free</h3>
              <p className="text-xs text-slate-400">
                Download the MP4 file instantly to your device for smooth offline viewing or archival.
              </p>
            </div>
          </div>
        </div>

        {/* Informational features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-pink-400">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Original Audio & Visuals</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We preserve crisp 1080x1920 vertical video dimensions and full stereophonic audio tracks so your favorite tutorials and comedy clips look identical to their online version.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Clean, Non-Intrusive Interface</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Enjoy a sleek cyber aesthetic built from the ground up for speed. No fake &ldquo;Download Now&rdquo; malware banners or suspicious popups.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white">Instagram Reels FAQ</h2>
            <p className="text-xs text-slate-400">Everything you need to know about downloading Reels</p>
          </div>
          <FaqAccordion items={INSTAGRAM_REEL_FAQS} />
        </div>
      </section>

      <AdSlot placement="footer" />
    </div>
  );
}
