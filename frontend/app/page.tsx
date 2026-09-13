import DownloaderHero from "@/components/DownloaderHero";
import AdSlot from "@/components/AdSlot";
import FaqAccordion from "@/components/FaqAccordion";
import { DEFAULT_FAQS } from "@/lib/faqs";
import { YoutubeIcon, InstagramIcon } from "@/components/Icons";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Download,
  Sliders,
  FileCheck,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DEFAULT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Downloader Hero Section */}
      <DownloaderHero />

      {/* AdSlot: hero-bottom */}
      <AdSlot placement="hero-bottom" />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 border-t border-slate-800/80">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-400">
              SIMPLE & FAST WORKFLOW
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">How link2save Works</p>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Get your desired media in three effortless steps without installing extensions or software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0D1527]/60 p-6 backdrop-blur-sm relative group hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-red-500">01</span>
                <div className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300">
                  <FileCheck className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Paste Public URL</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Copy the link of any public YouTube video or Instagram Reel and paste it into the search box.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0D1527]/60 p-6 backdrop-blur-sm relative group hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-red-500">02</span>
                <div className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300">
                  <Sliders className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Select Your Format</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Inspect media duration and title, then choose between Full HD MP4 video or lightweight MP3 audio.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0D1527]/60 p-6 backdrop-blur-sm relative group hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-red-500">03</span>
                <div className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300">
                  <Download className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Download Immediately</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Your file is processed in a secure sandbox and saved directly to your device. Zero cloud retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section id="platforms" className="py-16 px-4 sm:px-6 bg-[#040810]/60 border-t border-slate-800/80">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-400">
              OPTIMIZED ENCODERS
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">Supported Platforms & Media</p>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Dedicated extractors tuned specifically for maximum fidelity and download speeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* YouTube Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/80 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-500">
                    <YoutubeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">YouTube Downloader</h3>
                    <p className="text-xs text-slate-400">Standard Videos &bull; Shorts</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Extract high quality video up to 1080p with merged audio, or convert any public music or podcast to high-bitrate MP3 audio.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800/80 text-slate-300">
                    MP4 Video (1080p/720p)
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800/80 text-slate-300">
                    MP3 Audio (192 kbps)
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800/80 text-slate-300">
                    YouTube Shorts
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  href="/youtube-video-downloader"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition"
                >
                  <span>Explore YouTube Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/youtube-to-mp3"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  <span>Audio Tool</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/80 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-500">
                    <InstagramIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Instagram Downloader</h3>
                    <p className="text-xs text-slate-400">Reels &bull; Public Posts</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Download public Reels and videos in original MP4 format. Works flawlessly on mobile with zero watermarks added.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800/80 text-slate-300">
                    Public Reels (MP4)
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800/80 text-slate-300">
                    Feed Videos
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800/80 text-slate-300">
                    Public Posts
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  href="/instagram-reel-downloader"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-pink-400 hover:text-pink-300 transition"
                >
                  <span>Reel Downloader</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/instagram-video-downloader"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  <span>Video Tool</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AdSlot: between-sections */}
      <AdSlot placement="between-sections" />

      {/* Core Advantages / Technical Features */}
      <section className="py-16 px-4 sm:px-6 border-t border-slate-800/80">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2 p-4">
              <div className="flex items-center gap-2 text-red-400">
                <Zap className="h-5 w-5" />
                <h4 className="text-sm font-bold uppercase font-mono">Stream Processing</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Parallel format merging via FFmpeg ensures files are ready and streaming within seconds.
              </p>
            </div>

            <div className="space-y-2 p-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
                <h4 className="text-sm font-bold uppercase font-mono">Privacy First</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Ephemeral processing sandboxes immediately purge all media files upon download completion.
              </p>
            </div>

            <div className="space-y-2 p-4">
              <div className="flex items-center gap-2 text-blue-400">
                <Sparkles className="h-5 w-5" />
                <h4 className="text-sm font-bold uppercase font-mono">Responsive & Clean</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Zero deceptive popups or misleading download buttons. Designed to work on phones, tablets, and desktops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 bg-[#040810]/80 border-t border-slate-800/80">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-400">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">Got Questions? We Have Answers</p>
            <p className="text-sm text-slate-400">
              Everything you need to know about link2save and supported media downloads.
            </p>
          </div>

          <FaqAccordion items={DEFAULT_FAQS} />
        </div>
      </section>

      {/* AdSlot: footer */}
      <AdSlot placement="footer" />
    </>
  );
}
