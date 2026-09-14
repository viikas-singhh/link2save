import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { YoutubeIcon } from "@/components/Icons";
import { CheckCircle, Zap, Shield, FileVideo, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Video Downloader — Save HD 1080p Videos & Shorts Free",
  description:
    "Free YouTube Video Downloader. Download public YouTube videos and Shorts in Full HD 1080p, 720p MP4 and MP3 audio instantly. Fast, ad-free, and no registration required.",
  keywords: [
    "youtube video downloader",
    "download youtube video 1080p",
    "youtube shorts downloader",
    "save youtube video online",
    "free youtube downloader no ads",
    "youtube mp4 downloader",
  ],
  alternates: {
    canonical: "/youtube-video-downloader",
  },
};

const YOUTUBE_VIDEO_FAQS: FaqItem[] = [
  {
    question: "What resolutions are available for YouTube video downloads?",
    answer:
      "link2save evaluates the best available streams for public YouTube videos, offering 1080p Full HD, 720p HD, and 480p standard resolution in MP4 format with crisp synchronized audio.",
  },
  {
    question: "Can I download YouTube Shorts with this tool?",
    answer:
      "Yes! Simply paste any YouTube Shorts URL (e.g. https://www.youtube.com/shorts/...) into the input box to download the vertical MP4 video instantly.",
  },
  {
    question: "Is this YouTube downloader completely free and without ads?",
    answer:
      "Yes. link2save is 100% free with zero advertisements, popups, or subscriptions. We believe in providing a clean, fast experience.",
  },
  {
    question: "Do I need to install any browser extensions or apps?",
    answer:
      "No. link2save operates entirely inside modern desktop and mobile browsers. No software installation, browser plugins, or user accounts are needed.",
  },
];

export default function YouTubeVideoDownloaderPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: YOUTUBE_VIDEO_FAQS.map((faq) => ({
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
    name: "How to Download YouTube Videos & Shorts in Full HD",
    description: "Step-by-step guide to saving public YouTube videos and Shorts in MP4 format.",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy YouTube Link",
        text: "Open YouTube and copy the link of any video or short.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Paste into link2save",
        text: "Paste the URL into the search box and click Download.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Save 1080p MP4 File",
        text: "Choose MP4 Video and save the file directly to your device.",
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
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-500">
              <YoutubeIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Download Public YouTube Videos & Shorts
              </h2>
              <p className="text-xs text-slate-400">Step-by-step guide for mobile and desktop</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-red-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 1</div>
              <h3 className="text-sm font-semibold text-white">Copy Video Link</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open YouTube on your device, navigate to any public video or Short, and copy the URL from your address bar or the Share button.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 2</div>
              <h3 className="text-sm font-semibold text-white">Paste & Analyze</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paste the URL into link2save, click Download, and select MP4 Video (1080p/720p) or MP3 audio.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 3</div>
              <h3 className="text-sm font-semibold text-white">Direct Save</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click Download. Your browser immediately saves the clean MP4 file to your device with no watermarks.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-red-400">
              <FileVideo className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Lossless Stream Merging</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Modern YouTube videos separate audio and video streams. link2save uses FFmpeg server-side to merge both into standard MP4 files compatible with all media players and mobile gallery apps.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Shield className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">100% Ad-Free & Private</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike legacy downloaders that bombard you with popups, link2save operates entirely over encrypted HTTPS directly in your web browser with zero ads, tracking, or software to install.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 mt-1">Common questions about YouTube video processing</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <FaqAccordion items={YOUTUBE_VIDEO_FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
