import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — link2save",
  description:
    "Review link2save's transparent privacy practices, data minimization principles, and cookie usage guidelines.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 text-slate-300">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-slate-500">
          LAST UPDATED: SEPTEMBER 2026 &bull; VERSION 1.0
        </p>
      </div>

      <section className="space-y-4 leading-relaxed text-sm">
        <p>
          At <strong>link2save</strong>, your digital privacy is a foundational design requirement.
          This Privacy Policy explains how our web application operates, what minimal diagnostic information is processed, and our strict commitment to data minimization.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Information We Do NOT Collect</h2>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-400">
          <li>We do not require user accounts, names, or passwords.</li>
          <li>We do not harvest or store login cookies or tokens from YouTube or Instagram.</li>
          <li>We do not permanently archive or store copies of videos or audio downloaded through the service.</li>
          <li>We do not correlate submitted URLs with individual identifiable user profiles.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Ephemeral Media Processing</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          When you request media analysis or download, the requested public URL is processed dynamically on our backend inside an isolated sandbox. As soon as the resulting media stream finishes transmitting to your web browser, all temporary files in that sandbox are immediately and permanently erased.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Server Logs & Rate Limiting</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          To protect our service from distributed denial-of-service (DDoS) attacks and malicious scraping, our servers temporarily track incoming IP addresses using an in-memory sliding window rate limiter. These records are not shared with third parties and are discarded automatically.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Cookies & Third-Party Advertising (Google AdSense)</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          link2save uses Google AdSense to display non-intrusive advertisements that support our infrastructure. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          Users may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:underline"
          >
            Google Ads Settings
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. Contact Regarding Privacy</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          If you have questions about this policy or our data handling practices, contact us at{" "}
          <a href="mailto:privacy@link2save.com" className="text-red-400 hover:underline">
            privacy@link2save.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
