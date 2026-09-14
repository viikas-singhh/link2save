"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Menu, X, ArrowDownToLine, Sparkles } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#060B14]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-lg shadow-red-900/40 transition-transform group-hover:scale-105">
            <ArrowDownToLine className="h-5 w-5" />
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-white">
              link2<span className="text-red-500">save</span>
            </span>
            <span className="ml-2 hidden rounded-full border border-red-500/30 bg-red-950/40 px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider text-red-400 sm:inline-block">
              100% FREE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/youtube-video-downloader" className="transition hover:text-white">
            YouTube
          </Link>
          <Link href="/youtube-to-mp3" className="transition hover:text-white">
            YouTube to MP3
          </Link>
          <Link href="/instagram-reel-downloader" className="transition hover:text-white">
            Insta Reels
          </Link>
          <Link href="/instagram-dp-downloader" className="transition hover:text-white">
            Insta DP
          </Link>
          <Link href="/instagram-post-downloader" className="transition hover:text-white">
            Posts
          </Link>
          <Link href="/instagram-story-downloader" className="transition hover:text-white">
            Stories
          </Link>
        </nav>

        {/* Status / Compliance Pill */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 border border-white/10 rounded-full px-3 py-1 bg-white/5 backdrop-blur-md">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>No Ads &bull; No Login</span>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#060B14]/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-2">
          <Link
            href="/youtube-video-downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            YouTube Video Downloader
          </Link>
          <Link
            href="/youtube-to-mp3"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            YouTube to MP3 Converter
          </Link>
          <Link
            href="/instagram-reel-downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Instagram Reels Downloader
          </Link>
          <Link
            href="/instagram-dp-downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Instagram DP Downloader
          </Link>
          <Link
            href="/instagram-post-downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Instagram Post Downloader
          </Link>
          <Link
            href="/instagram-story-downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Instagram Story Downloader
          </Link>
          <div className="pt-2 border-t border-white/10 text-xs text-slate-400 flex items-center gap-1.5 px-3">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>100% Free &bull; Zero Ads &bull; No Login</span>
          </div>
        </div>
      )}
    </header>
  );
}
