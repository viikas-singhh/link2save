import type { Metadata } from "next";
import { Mail, Shield, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Support — link2save",
  description:
    "Get in touch with the link2save team for technical inquiries, feedback, and copyright / DMCA notices.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact & <span className="text-red-500">Support</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Have questions, technical feedback, or a copyright inquiry? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form Container */}
        <ContactForm />

        {/* Support details & DMCA */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>Response Time</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our engineering support team monitors inquiries during standard operating hours. You can expect a response within 24 to 48 business hours.
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-300">
              <span className="font-mono text-slate-400">Direct Email:</span>{" "}
              <a href="mailto:support@link2save.com" className="text-red-400 hover:underline">
                support@link2save.com
              </a>
            </div>
          </div>

          <div id="dmca" className="rounded-2xl border border-slate-800 bg-[#0D1527]/50 p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-500" />
              <span>DMCA & Copyright Inquiries</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              link2save does not host or store any copyright-protected media files on our infrastructure. If you are a copyright owner wishing to request domain restrictions or report misuse, please contact our designated agent:
            </p>
            <div className="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              dmca@link2save.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
