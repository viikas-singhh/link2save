import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { Music, Headphones, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube to MP3 Converter — Free High-Quality 320/192 kbps Audio",
  description:
    "Free YouTube to MP3 Converter. Extract high-bitrate MP3 audio from public YouTube videos, podcasts, and music. Fast, clean, 100% ad-free with zero popups or accounts.",
  keywords: [
    "youtube to mp3",
    "youtube mp3 converter",
    "convert youtube to mp3 free",
    "youtube audio downloader",
    "youtube to mp3 320kbps",
    "free youtube audio converter no ads",
  ],
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
    question: "Is there any charge or subscription fee?",
    answer:
      "No! link2save is completely free forever. We have removed all ads and trackers to provide a clean and seamless experience.",
  },
  {
    question: "Does the MP3 file contain title and creator info?",
    answer:
      "Yes, metadata including the original title and author is sanitized and retained to help keep your local offline music library organized.",
  },
];

export default function YouTubeToMp3Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: YOUTUBE_MP3_FAQS.map((faq) => ({
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
    name: "How to Convert YouTube Videos to High Quality MP3 Audio",
    description: "Step-by-step instructions to convert any public YouTube video to an MP3 audio file.",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy YouTube Video Link",
        text: "Copy the web link of any lecture, podcast, or music on YouTube.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Paste in link2save",
        text: "Paste the URL into link2save's input field.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Select MP3 Audio & Download",
        text: "Select MP3 Audio and click Download to save the audio file directly.",
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
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
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
            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 1</div>
              <h3 className="text-sm font-semibold text-white">Select Media</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Find any speech, lecture, soundtrack, or podcast on YouTube and copy its link.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 2</div>
              <h3 className="text-sm font-semibold text-white">Choose MP3 Audio</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paste the URL into link2save and pick the MP3 Audio option.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 3</div>
              <h3 className="text-sm font-semibold text-white">Direct Download</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                FFmpeg strips video tracks and encodes pristine MP3 audio directly streamed to your device.
              </p>
            </div>
          </div>
        </div>

        {/* Informational audio features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Headphones className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Pristine Acoustic Encoding</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We extract source Opus and AAC audio streams from YouTube at their maximum available sampling rates, re-encoding them with high fidelity into standard MP3 files playable on any smartphone, car stereo, or desktop player.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-red-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Zero Ads & 100% Free</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Traditional YouTube-to-MP3 sites redirect visitors to sketchy notification scams and ad traps. link2save uses a modern, clean architecture with zero fake download popups.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 mt-1">Audio quality, devices, and format details</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <FaqAccordion items={YOUTUBE_MP3_FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
