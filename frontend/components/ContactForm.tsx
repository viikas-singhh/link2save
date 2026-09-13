"use client";

import React, { useState } from "react";
import { MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && message.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-800/80 bg-emerald-950/30 p-8 text-center space-y-3">
        <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
        <h3 className="text-lg font-bold text-white">Message Received</h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Thank you, {name || "there"}. Your message has been routed to our engineering support queue. We will respond to {email} within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1527]/70 p-6 sm:p-8 space-y-5">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-red-500" />
        <span>Send Us a Message</span>
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-slate-400 mb-1">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-red-600"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-slate-400 mb-1">
            Email Address *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-red-600"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-slate-400 mb-1">
            Message / Inquiry *
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your inquiry, bug report, or technical question..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-red-600 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/40 hover:from-red-500 hover:to-red-600 transition cursor-pointer"
        >
          Submit Message
        </button>
      </form>
    </div>
  );
}
