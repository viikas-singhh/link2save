import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — link2save",
  description:
    "Terms of service and acceptable use agreement for the link2save public media downloader.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 text-slate-300">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-slate-500">
          EFFECTIVE DATE: SEPTEMBER 2026 &bull; VERSION 1.0
        </p>
      </div>

      <section className="space-y-4 leading-relaxed text-sm">
        <p>
          Welcome to <strong>link2save</strong>. By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our utility.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Authorized & Permitted Use</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          link2save is provided strictly as a technical tool for saving publicly available media that you are authorized to download for personal, educational, non-commercial, or fair-use purposes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Prohibited Conduct</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          You agree not to use link2save for any unlawful activity, including but not limited to:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-400">
          <li>Attempting to bypass access controls, DRM systems, or private account permissions.</li>
          <li>Distributing copyrighted third-party media commercially without proper licenses or authorization.</li>
          <li>Overloading our infrastructure using automated scripts or bot nets beyond reasonable personal use.</li>
          <li>Attempting to execute Server-Side Request Forgery (SSRF) attacks or probe local network addresses.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Intellectual Property Rights</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          link2save does not claim any ownership, copyright, or licensing rights over third-party videos, reels, photos, or audio processed through the service. All rights belong exclusively to their respective creators and copyright owners.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Disclaimer of Warranties & Limitation of Liability</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          The service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind. link2save shall not be held liable for any direct, indirect, or consequential damages resulting from the use or inability to use the service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. Governing Law & Modifications</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          We reserve the right to revise or update these Terms of Service at any time. Continued use of the platform following updates constitutes acceptance of the new terms.
        </p>
      </section>
    </div>
  );
}
