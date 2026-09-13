import type { Metadata } from "next";
import { ShieldCheck, Server, Cpu, Globe2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "About link2save — Public Media Downloader",
  description:
    "Learn about link2save's mission, technology architecture, security principles, and commitment to privacy and fair use.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About link2<span className="text-red-500">save</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          link2save is a high-speed, security-conscious public media downloader designed to empower users to archive, learn, and enjoy publicly accessible media offline.
        </p>
      </div>

      {/* Mission & Purpose */}
      <section className="rounded-2xl border border-slate-800 bg-[#0D1527]/70 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white">Our Mission</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          The modern web is rich in educational lectures, open-source tutorials, public domain speeches, and creative short-form media. However, reliable offline access is often impeded by deceptive websites filled with intrusive adware and malware.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          link2save was engineered to provide a clean, modern, and transparent utility for saving publicly available media without sacrificing speed, security, or user dignity.
        </p>
      </section>

      {/* Technical Architecture */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">Technical Architecture & Engineering</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-red-400">
              <Server className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">Stateless Processing</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our backend runs on Python and FastAPI with zero persistent databases. Media extraction jobs are executed in isolated, ephemeral sandboxes and automatically deleted as soon as streaming completes.
            </p>
          </div>

          <div className="grid-cols-1 rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase font-mono">SSRF & Injection Defense</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every submitted URL undergoes strict DNS resolution and subnet filtering, blocking access to private and local network ranges while preventing arbitrary command injection.
            </p>
          </div>
        </div>
      </section>

      {/* Limitations & Boundaries */}
      <section className="rounded-2xl border border-amber-900/40 bg-amber-950/20 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-base">
          <AlertTriangle className="h-5 w-5" />
          <span>Product Boundaries & Legal Disclaimer</span>
        </div>
        <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><strong>Public Media Only:</strong> We strictly do not support private accounts or password-gated streams.</li>
          <li><strong>No DRM Circumvention:</strong> We never bypass Digital Rights Management (DRM), authentication walls, or encrypted paywalls.</li>
          <li><strong>Fair Use & User Responsibility:</strong> Users are solely responsible for ensuring they possess the appropriate rights, licenses, or fair-use permissions before downloading third-party media.</li>
          <li><strong>Independent Operation:</strong> link2save is an independent service with no affiliation, endorsement, or sponsorship by YouTube, Google, Instagram, or Meta.</li>
        </ul>
      </section>
    </div>
  );
}
