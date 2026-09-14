import DownloaderHero from "@/components/DownloaderHero";
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
  UserCircle,
  Film,
  Music,
  CheckCircle,
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

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Download Public YouTube Videos, Instagram Reels & Profile DP",
    description: "Save public YouTube videos, shorts, Instagram reels, profile pictures, and posts in Full HD with link2save.",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy Link or Username",
        text: "Copy the link of any public YouTube video, Instagram Reel, Post, or enter an Instagram @username.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Paste and Analyze",
        text: "Paste the URL into link2save's input field and click Download.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Select Format & Save",
        text: "Select your desired output format (MP4 Video, MP3 Audio, or HD Photo) and save directly to your device.",
        position: 3,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Downloader Hero Section */}
      <DownloaderHero />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 border-t border-white/10 relative">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>3-Step Quick Process</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">How link2save Works</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Save any public YouTube video, Instagram Reel, or full HD profile picture in three simple steps without installations or logins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="glass-card rounded-2xl p-6 relative group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-red-500">01</span>
                <div className="p-2.5 rounded-xl bg-white/5 text-slate-200 border border-white/10">
                  <FileCheck className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Paste Link or Handle</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Copy the link of any public YouTube video or Instagram Reel/Post, or type an Instagram @username to get their full resolution DP.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-2xl p-6 relative group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-rose-500">02</span>
                <div className="p-2.5 rounded-xl bg-white/5 text-slate-200 border border-white/10">
                  <Sliders className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Choose Output Format</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Inspect media title and duration, then pick between Full HD 1080p MP4 Video, crystal-clear MP3 Audio, or original HD Photo.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-2xl p-6 relative group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-emerald-500">03</span>
                <div className="p-2.5 rounded-xl bg-white/5 text-slate-200 border border-white/10">
                  <Download className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Instant Direct Download</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The file streams straight to your device at maximum network speeds. 100% free forever with zero ads or tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms & Dedicated Tools Section */}
      <section id="platforms" className="py-16 px-4 sm:px-6 border-t border-white/10 relative">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-400">
              OPTIMIZED ENGINES
            </h2>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Supported Media & Download Tools</p>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Dedicated extractors tuned specifically for maximum fidelity, rapid downloads, and zero watermarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* YouTube Card */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-500 shadow-md">
                    <YoutubeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">YouTube Downloader</h3>
                    <p className="text-xs text-slate-400">Videos &bull; Shorts &bull; Audio</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Extract high-definition video up to 1080p Full HD with merged audio, or convert any public music or podcast to high-bitrate 192kbps MP3.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    MP4 Video (1080p)
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    MP3 Audio
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    Shorts
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/youtube-video-downloader"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition"
                >
                  <span>Video Tool</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/youtube-to-mp3"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  <span>MP3 Tool</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Instagram Reels & Video Card */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-pink-950/60 border border-pink-500/40 text-pink-500 shadow-md">
                    <Film className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Instagram Reels</h3>
                    <p className="text-xs text-slate-400">Reels &bull; Feed Videos</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Save Instagram Reels in original MP4 quality with no added watermarks. Fast conversion with instant mobile playback compatibility.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    Reels (MP4)
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    Zero Watermark
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    High Bitrate
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/instagram-reel-downloader"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-pink-400 hover:text-pink-300 transition"
                >
                  <span>Reels Tool</span>
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

            {/* Instagram DP & Posts Card */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-400 shadow-md">
                    <UserCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Insta DP & Posts</h3>
                    <p className="text-xs text-slate-400">Full HD DP &bull; Photos &bull; Stories</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Download any public Instagram profile picture in Full HD 1080p resolution by simply entering @username, plus save feed photos and stories.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    Full HD DP (JPG)
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    Post Photos
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    Stories
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/instagram-dp-downloader"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
                >
                  <span>DP Downloader</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/instagram-post-downloader"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  <span>Post Tool</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/10 relative">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-red-400">
                <Zap className="h-5 w-5" />
                <h4 className="text-sm font-bold uppercase font-mono tracking-wider">Fast Stream Engine</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Powered by yt-dlp and FFmpeg parallel remuxing, your media starts downloading in seconds without queuing.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
                <h4 className="text-sm font-bold uppercase font-mono tracking-wider">Zero Logs & Ad-Free</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                100% free with no intrusive ads, deceptive popups, or cloud retention. All files are deleted immediately after download.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400">
                <Sparkles className="h-5 w-5" />
                <h4 className="text-sm font-bold uppercase font-mono tracking-wider">Glassmorphic UI</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                State-of-the-art frosted glass aesthetic designed for maximum ease of use on mobile phones, tablets, and desktops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 border-t border-white/10 relative">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-400">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Everything You Need to Know</p>
            <p className="text-sm text-slate-400">
              Clear answers about link2save, YouTube, Instagram Reels, DP, and audio downloads.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <FaqAccordion items={DEFAULT_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
