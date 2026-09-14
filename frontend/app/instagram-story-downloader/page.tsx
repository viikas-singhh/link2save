import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { History, Sparkles, ShieldCheck, Download, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Story Downloader — Save Stories & Highlights Online Free",
  description:
    "Free Instagram Story Downloader. Save Instagram stories and highlights in high-definition MP4 video or JPG photo. 100% anonymous, free, and ad-free.",
  keywords: [
    "instagram story downloader",
    "save instagram stories",
    "download insta stories anonymously",
    "instagram story saver online",
    "download instagram highlights",
  ],
  alternates: {
    canonical: "/instagram-story-downloader",
  },
  openGraph: {
    title: "Instagram Story Downloader — Save Stories Online",
    description:
      "Save Instagram stories and highlights in HD quality. Free, fast, and completely anonymous.",
    url: "https://link2save.com/instagram-story-downloader",
  },
};

const INSTAGRAM_STORY_FAQS: FaqItem[] = [
  {
    question: "Can I download Instagram Stories anonymously?",
    answer:
      "Yes! When downloading stories through link2save, your personal Instagram account is never connected or revealed to the creator.",
  },
  {
    question: "How long can a Story be downloaded?",
    answer:
      "Instagram Stories are available for 24 hours from the time they are published. Story Highlights remain available as long as the user keeps them on their profile.",
  },
  {
    question: "Why do some Stories require an active session?",
    answer:
      "Instagram enforces strict login checks on stories to prevent mass automated scraping. For self-hosted instances on Render, setting your INSTAGRAM_SESSIONID allows authenticated story extraction.",
  },
  {
    question: "Is this Instagram story downloader free and ad-free?",
    answer:
      "Yes. link2save is 100% free with no advertisements, malware banners, or fees.",
  },
];

export default function InstagramStoryDownloaderPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INSTAGRAM_STORY_FAQS.map((faq) => ({
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
    name: "How to Save Instagram Stories Online",
    description: "Step-by-step instructions to save any public Instagram story or highlight.",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy Story Link",
        text: "Open the Instagram story, tap Share, and select Copy Link.",
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
        name: "Download Story",
        text: "Click Download to save the story video or photo directly to your device.",
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
            <div className="p-2.5 rounded-xl bg-orange-950/60 border border-orange-500/30 text-orange-400">
              <History className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Save Instagram Stories Online
              </h2>
              <p className="text-xs text-slate-400">Save stories and highlights anonymously before they disappear</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 1</div>
              <h3 className="text-sm font-semibold text-white">Copy Story Link</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open Instagram, tap the three dots or Share icon on the story you want to save, and copy the link.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 2</div>
              <h3 className="text-sm font-semibold text-white">Paste URL</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paste the story URL into link2save and click Download to analyze the media.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 3</div>
              <h3 className="text-sm font-semibold text-white">Save Media</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Download the MP4 video or JPG photo file directly to your smartphone or computer.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-orange-400">
              <EyeOff className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">100% Anonymous Viewing</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your identity is completely private. You won&apos;t appear in the creator&apos;s story viewers list when you save stories through link2save.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Clean & Ad-Free</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No invasive ads, redirects, or spam. Enjoy a clean and reliable downloader designed with user privacy in mind.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Instagram Story Downloader FAQ</h2>
            <p className="text-xs text-slate-400 mt-1">Frequently asked questions about story downloads</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <FaqAccordion items={INSTAGRAM_STORY_FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
