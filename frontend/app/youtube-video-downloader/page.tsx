import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import AdSlot from "@/components/AdSlot";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { YoutubeIcon } from "@/components/Icons";
import { CheckCircle, Zap, Shield, FileVideo } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Video Downloader — Fast MP4 HD Downloader",
  description:
    "Download public YouTube videos and Shorts in high-definition 1080p and 720p MP4. Free, secure, and fast with no account required.",
  alternates: {
    canonical: "/youtube-video-downloader",
  },
};

const YOUTUBE_VIDEO_FAQS: FaqItem[] = [
  {
    question: "What resolutions are available for YouTube video downloads?",
    answer:
      "link2save dynamically evaluates the best available streams for public YouTube videos, offering 1080p Full HD, 720p HD, and 480p standard resolution in MP4 format with synchronized audio.",
  },
  {
    question: "Can I download YouTube Shorts with this tool?",
    answer:
      "Yes. Simply paste the YouTube Shorts URL (e.g., https://www.youtube.com/shorts/...) into the input box to download the vertical MP4 video directly.",
  },
  {
    question: "Do I need to install any browser extensions or software?",
    answer:
      "No. link2save operates entirely inside modern desktop and mobile browsers. No software installation, browser plugins, or user accounts are needed.",
  },
  {
    question: "Why does the tool reject private or age-restricted videos?",
    answer:
      "We strictly uphold platform guidelines and user privacy. Only public videos accessible without logging into a Google account can be processed.",
  },
];

export default function YouTubeVideoDownloaderPage() {
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
              <YoutubeIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Download Public YouTube Videos
              </h2>
              <p className="text-xs text-slate-400">Step-by-step guide for desktop and mobile</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">STEP 1</div>
              <h3 className="text-sm font-semibold text-white">Copy Video Link</h3>
              <p className="text-xs text-slate-400">
                Open YouTube on your device, navigate to any public video, and copy the URL from your browser address bar or the &ldquo;Share&rdquo; menu.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">STEP 2</div>
              <h3 className="text-sm font-semibold text-white">Analyze & Select MP4</h3>
              <p className="text-xs text-slate-400">
                Paste the URL into link2save, hit Analyze, and choose &ldquo;MP4 Video&rdquo; to remux optimal video and audio streams.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">STEP 3</div>
              <h3 className="text-sm font-semibold text-white">Save Locally</h3>
              <p className="text-xs text-slate-400">
                Click Download. Your browser will prompt to save the generated MP4 file directly into your downloads folder.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-red-400">
              <FileVideo className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Lossless Audio Remuxing</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Modern YouTube videos stream separate video and audio tracks for efficiency. link2save uses FFmpeg server-side to merge both into standard MP4 files compatible with all media players.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Shield className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">No Software or Malware</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Unlike legacy desktop downloaders that package adware, link2save operates entirely over encrypted HTTPS directly in your web browser with zero client-side scripts to install.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white">YouTube Downloader FAQ</h2>
            <p className="text-xs text-slate-400">Common questions about YouTube video processing</p>
          </div>
          <FaqAccordion items={YOUTUBE_VIDEO_FAQS} />
        </div>
      </section>

      <AdSlot placement="footer" />
    </div>
  );
}
