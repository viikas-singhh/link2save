import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { InstagramIcon } from "@/components/Icons";
import { Smartphone, ShieldCheck, Lock, Film } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Video Downloader — Save Public IG Videos in Original MP4",
  description:
    "Free Instagram Video Downloader. Download public Instagram videos and feed posts in original MP4 quality. Fast, 100% ad-free, and mobile-friendly with no login needed.",
  keywords: [
    "instagram video downloader",
    "download instagram video mp4",
    "save instagram feed video",
    "instagram video download free",
    "insta video saver no ads",
  ],
  alternates: {
    canonical: "/instagram-video-downloader",
  },
};

const INSTAGRAM_VIDEO_FAQS: FaqItem[] = [
  {
    question: "Can I download videos from private Instagram accounts?",
    answer:
      "No. link2save strictly respects user privacy. Content from private accounts or behind login checkpoints is never accessed or downloaded.",
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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INSTAGRAM_VIDEO_FAQS.map((faq) => ({
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
    name: "How to Download Public Instagram Videos",
    description: "Step-by-step instructions to save any public Instagram video to your smartphone or PC.",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy Instagram Video Link",
        text: "On Instagram, tap the three dots or Share icon on a public post and tap Copy Link.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Paste in link2save",
        text: "Paste the URL into link2save's input box.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Save Original MP4",
        text: "Hit Download to save the video file directly with no watermarks.",
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
                How to Download Public Instagram Videos
              </h2>
              <p className="text-xs text-slate-400">Save public videos in original MP4 quality</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-pink-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 1</div>
              <h3 className="text-sm font-semibold text-white">Copy Instagram Link</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In the Instagram app or website, tap the three dots (&hellip;) or Share icon on a public post and select &ldquo;Copy Link&rdquo;.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 2</div>
              <h3 className="text-sm font-semibold text-white">Paste & Inspect</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paste the URL into link2save. Our backend verifies public availability and renders a preview of the post.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 3</div>
              <h3 className="text-sm font-semibold text-white">Save Directly</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hit Download to retrieve the original high-resolution MP4 stream straight to your phone, tablet, or PC.
              </p>
            </div>
          </div>
        </div>

        {/* Informational features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-pink-400">
              <Smartphone className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Mobile-First Convenience</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed with touch-friendly controls and responsive layouts, link2save lets you paste and download Instagram media with ease without popups or ads.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Lock className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Zero Credentials Needed</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Never enter your Instagram password or cookies on third-party sites. link2save only accesses public endpoints and never asks for your credentials.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Instagram Video FAQ</h2>
            <p className="text-xs text-slate-400 mt-1">Answers to common Instagram video download questions</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <FaqAccordion items={INSTAGRAM_VIDEO_FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
