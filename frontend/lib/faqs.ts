export interface FaqItem {
  question: string;
  answer: string;
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "Is link2save free to use?",
    answer:
      "Yes, link2save is completely free to use. There are no subscriptions, registration requirements, or hidden download fees.",
  },
  {
    question: "What platforms and media types are supported?",
    answer:
      "link2save supports public YouTube videos and Shorts (available as MP4 video or MP3 audio) and public Instagram Reels, videos, and post media. We strictly do not support private accounts, restricted content, or DRM-protected streams.",
  },
  {
    question: "How long does processing and downloading take?",
    answer:
      "Most public videos and audio extracts are analyzed and prepared in seconds. Exact processing times depend on media duration and current network speeds.",
  },
  {
    question: "Does link2save store copies of my downloaded files?",
    answer:
      "No. Files are temporarily processed in an isolated sandbox and immediately purged from the server after streaming completes. We never store media permanently or log personal information.",
  },
  {
    question: "Can I download content from private Instagram accounts?",
    answer:
      "No. In strict accordance with platform privacy and security standards, link2save only accesses publicly accessible media. We do not bypass login walls or authentication requirements.",
  },
];
