import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import AdSlot from "@/components/AdSlot";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { InstagramIcon } from "@/components/Icons";
import { Smartphone, ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Video Downloader — Save Public Instagram Videos (MP4)",
  description:
    "Download public Instagram videos and feed posts in original MP4 quality. Fast, free, and mobile-friendly with no login or credentials needed.",
  alternates: {
    canonical: "/instagram-video-downloader",
  },
};

const INSTAGRAM_VIDEO_FAQS: FaqItem[] = [
  {
    question: "Can I download videos from private Instagram accounts?",
    answer:
      "No. link2save strictly respects user privacy and platform security. Content from private accounts or behind login checkpoints is never accessed or downloaded.",
  },
  {
    question: "Do I need an Instagram account or login to use this tool?",
    answer:
      "No account or authentication is required. You do not need to log in or share any credentials to download public media.",
  },
  {
    question: "Does link2save add watermarks to downloaded videos?",
    answer:
      "No. The video is saved in its original published MP4 quality without any watermarks, logos, or re-compression artifacts.",
  },
  {
    question: "Where are videos saved on my smartphone?",
    answer:
      "On iOS devices, downloaded videos can be saved to your Files app or Camera Roll via Safari downloads. On Android devices, videos are stored in your device Downloads folder or Gallery.",
  },
];

export default function InstagramVideoDownloaderPage() {
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
              <InstagramIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Download Public Instagram Videos
              </h2>
              <p className="text-xs text-slate-400">Save public videos in original MP4 quality</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-pink-500 font-mono text-sm font-bold">01</div>
              <h3 className="text-sm font-semibold text-white">Copy Instagram Link</h3>
              <p className="text-xs text-slate-400">
                In the Instagram app or website, tap the three dots (&hellip;) or Share icon on a public post and select &ldquo;Copy Link&rdquo;.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-pink-500 font-mono text-sm font-bold">02</div>
              <h3 className="text-sm font-semibold text-white">Paste & Inspect</h3>
              <p className="text-xs text-slate-400">
                Paste the URL into link2save. Our backend verifies public availability and renders a preview of the post.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-pink-500 font-mono text-sm font-bold">03</div>
              <h3 className="text-sm font-semibold text-white">Save Directly</h3>
              <p className="text-xs text-slate-400">
                Hit Download to retrieve the original high-resolution MP4 stream straight to your phone, tablet, or PC.
              </p>
            </div>
          </div>
        </div>

        {/* Informational features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-pink-400">
              <Smartphone className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Mobile-First Convenience</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Designed with touch-friendly controls and responsive layouts, link2save lets you paste and download Instagram media in one hand without clumsy popups or interstitial traps.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Lock className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Zero Login Credential Risks</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Never enter your Instagram password or cookies on third-party sites. link2save only accesses public endpoints and never asks for your credentials.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white">Instagram Video FAQ</h2>
            <p className="text-xs text-slate-400">Answers to common Instagram video download questions</p>
          </div>
          <FaqAccordion items={INSTAGRAM_VIDEO_FAQS} />
        </div>
      </section>

      <AdSlot placement="footer" />
    </div>
  );
}
