import type { Metadata } from "next";
import DownloaderHero from "@/components/DownloaderHero";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/faqs";
import { Image as ImageIcon, Sparkles, ShieldCheck, Download, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Post Downloader — Save Photos, Videos & Carousels HD",
  description:
    "Free Instagram Post Downloader. Download public Instagram photos, videos, and carousel posts in original Full HD quality. 100% free with no ads, watermarks, or sign-ups.",
  keywords: [
    "instagram post downloader",
    "download instagram photos",
    "save instagram carousel",
    "insta photo download hd",
    "instagram picture saver free",
    "download instagram feed post",
  ],
  alternates: {
    canonical: "/instagram-post-downloader",
  },
  openGraph: {
    title: "Instagram Post Downloader — Save Photos & Videos in HD",
    description:
      "Save public Instagram feed photos and carousel posts in original Full HD. Free, fast, and no watermark.",
    url: "https://link2save.com/instagram-post-downloader",
  },
};

const INSTAGRAM_POST_FAQS: FaqItem[] = [
  {
    question: "Can I download high-resolution photos from Instagram posts?",
    answer:
      "Yes! link2save extracts the original high-resolution image file directly from public CDN distribution points without downscaling.",
  },
  {
    question: "How do I download carousel posts with multiple images or videos?",
    answer:
      "Simply paste the post URL into link2save. Our backend inspects the post and allows you to download the featured media in its original quality.",
  },
  {
    question: "Are downloaded photos compressed?",
    answer:
      "No. The images are delivered in original JPG/PNG format exactly as uploaded by the creator, with no added compression.",
  },
  {
    question: "Is this Instagram post downloader completely free with no ads?",
    answer:
      "Yes. link2save is 100% free with no advertisements, popups, or subscriptions required.",
  },
];

export default function InstagramPostDownloaderPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INSTAGRAM_POST_FAQS.map((faq) => ({
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
    name: "How to Download Public Instagram Photos & Posts",
    description: "Step-by-step instructions to save any public Instagram post or photo in high definition.",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy Instagram Post Link",
        text: "Tap the three dots or Share button on any public Instagram post and choose Copy Link.",
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
        name: "Save HD Photo",
        text: "Select HD Photo or MP4 Video and click Download to save directly.",
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
            <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-400">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Download Public Instagram Photos & Posts
              </h2>
              <p className="text-xs text-slate-400">Save feed photos and media in original resolution</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 1</div>
              <h3 className="text-sm font-semibold text-white">Copy Post Link</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open Instagram, locate any public post or photo, and tap Share to copy the link.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-pink-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 2</div>
              <h3 className="text-sm font-semibold text-white">Paste URL</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paste the link into link2save. Our system automatically inspects the media and prepares the download.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">STEP 3</div>
              <h3 className="text-sm font-semibold text-white">Save High-Res Image</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click Download to save the original JPG file directly to your gallery or files.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <Layers className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Original Dimensions</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We extract high-resolution photos up to 1080p width without compression or watermarks, keeping the colors, clarity, and detail vibrant.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Zero Ads & Free</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No intrusive ads, no spam popups, and no sign-ups required. Enjoy a modern and clean user experience.
            </p>
          </div>
        </div>

        {/* Dedicated FAQs */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Instagram Post Downloader FAQ</h2>
            <p className="text-xs text-slate-400 mt-1">Frequently asked questions about post downloads</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <FaqAccordion items={INSTAGRAM_POST_FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
