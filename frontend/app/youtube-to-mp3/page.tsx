import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import AdSlot from "@/components/AdSlot";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { Music, Radio, ShieldCheck, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube to MP3 Converter — Fast Public Audio Extractor",
  description:
    "Extract high-bitrate 192 kbps MP3 audio from public YouTube videos, podcasts, and speeches. Fast, secure, and clean with zero spam.",
  alternates: {
    canonical: "/youtube-to-mp3",
  },
};

const YOUTUBE_MP3_FAQS: FaqItem[] = [
  {
    question: "What audio bitrate is produced by the MP3 converter?",
    answer:
      "link2save converts the source audio stream into high-quality 192 kbps MP3 format using FFmpeg, providing an ideal balance between acoustic clarity and compact file size.",
  },
  {
    question: "Can I extract audio on an iPhone or Android phone?",
    answer:
      "Yes. The converter is fully compatible with mobile Safari, Chrome, and Firefox. The resulting MP3 file can be saved directly to your device Files app or Music player.",
  },
  {
    question: "Is there a duration limit for audio conversion?",
    answer:
      "To ensure fair performance and prevent server timeouts, videos up to standard podcast and album lengths (within reasonable file size thresholds) are supported.",
  },
  {
    question: "Does the MP3 file contain album art or metadata?",
    answer:
      "Yes, metadata including the original title and author is sanitized and retained to help keep your local offline music library organized.",
  },
];

export default function YouTubeToMp3Page() {
  return (
    <div className="py-8">
      {/* Downloader Hero */}
      <DownloaderHero />

      <AdSlot placement="hero-bottom" />

      {/* Guide Content */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/70 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-500">
              <Music className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Convert Public YouTube Videos to MP3
              </h2>
              <p className="text-xs text-slate-400">
                Extract high-fidelity audio tracks for offline study and listening
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">01</div>
              <h3 className="text-sm font-semibold text-white">Select Media</h3>
              <p className="text-xs text-slate-400">
                Find a public speech, lecture, soundtrack, or podcast on YouTube and copy its web link.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">02</div>
              <h3 className="text-sm font-semibold text-white">Choose MP3 Audio</h3>
              <p className="text-xs text-slate-400">
                Paste the URL into link2save and select the &ldquo;MP3 Audio (192 kbps)&rdquo; format option.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">03</div>
              <h3 className="text-sm font-semibold text-white">Direct Download</h3>
              <p className="text-xs text-slate-400">
                FFmpeg strips video tracks and encodes pristine MP3 audio directly streamed to your device.
              </p>
            </div>
          </div>
        </div>

        {/* Informational audio features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-red-400">
              <Headphones className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Pristine Acoustic Encoding</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We extract source Opus and AAC audio streams from YouTube at their maximum available sampling rates, re-encoding them with high fidelity into standard MP3 files playable on any device.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Clean & Adware-Free</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Traditional YouTube-to-MP3 sites redirect visitors to sketchy notification scams. link2save uses a modern, cyber-secure architecture with zero fake download popups.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white">YouTube to MP3 FAQ</h2>
            <p className="text-xs text-slate-400">Audio quality, devices, and format details</p>
          </div>
          <FaqAccordion items={YOUTUBE_MP3_FAQS} />
        </div>
      </section>

      <AdSlot placement="footer" />
    </div>
  );
}
