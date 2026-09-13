"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Menu, X, ArrowDownToLine } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#060B14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg shadow-red-900/30 transition-transform group-hover:scale-105">
            <ArrowDownToLine className="h-5 w-5" />
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-white">link2<span className="text-red-500">save</span></span>
            <span className="ml-2 hidden rounded border border-red-500/30 bg-red-950/40 px-1.5 py-0.5 text-[10px] font-mono font-medium tracking-wider text-red-400 sm:inline-block">
              SECURE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link href="/#downloader" className="transition hover:text-white">
            Downloader
          </Link>
          <Link href="/#how-it-works" className="transition hover:text-white">
            How It Works
          </Link>
          <Link href="/#platforms" className="transition hover:text-white">
            Supported
          </Link>
          <Link href="/#faq" className="transition hover:text-white">
            FAQ
          </Link>
        </nav>

        {/* Status / Compliance Pill */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 border border-slate-800 rounded-full px-3 py-1 bg-slate-900/60">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Public Media Only</span>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#060B14] px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/#downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800/80"
          >
            Downloader
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800/80"
          >
            How It Works
          </Link>
          <Link
            href="/#platforms"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800/80"
          >
            Supported Platforms
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800/80"
          >
            Frequently Asked Questions
          </Link>
          <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-1.5 px-3">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Public Media Only &bull; Zero DRM Bypass</span>
          </div>
        </div>
      )}
    </header>
  );
}
