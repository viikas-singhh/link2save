import Link from "next/link";
import { ArrowDownToLine, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040810] text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-md">
                <ArrowDownToLine className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                link2<span className="text-red-500">save</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              High-speed, 100% free and ad-free public media downloader for YouTube and Instagram.
              Designed for clean offline playback, educational research, and media archiving.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Zero logs &bull; Ephemeral sandbox</span>
            </div>
          </div>

          {/* YouTube Tools */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200">
              YouTube Tools
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/youtube-video-downloader" className="transition hover:text-white">
                  YouTube Video Downloader
                </Link>
              </li>
              <li>
                <Link href="/youtube-video-downloader" className="transition hover:text-white">
                  YouTube Shorts Downloader
                </Link>
              </li>
              <li>
                <Link href="/youtube-to-mp3" className="transition hover:text-white">
                  YouTube to MP3 Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Instagram Tools */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200">
              Instagram Tools
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/instagram-reel-downloader" className="transition hover:text-white">
                  Instagram Reel Downloader
                </Link>
              </li>
              <li>
                <Link href="/instagram-dp-downloader" className="transition hover:text-white">
                  Instagram DP Downloader
                </Link>
              </li>
              <li>
                <Link href="/instagram-post-downloader" className="transition hover:text-white">
                  Instagram Post Downloader
                </Link>
              </li>
              <li>
                <Link href="/instagram-story-downloader" className="transition hover:text-white">
                  Instagram Story Downloader
                </Link>
              </li>
              <li>
                <Link href="/instagram-video-downloader" className="transition hover:text-white">
                  Instagram Video Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200">
              Legal & Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About link2save
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-xs leading-relaxed text-slate-500">
          <p className="mb-3">
            <strong>Disclaimer:</strong> link2save is an independent utility created for downloading
            publicly accessible media that users are authorized to access and save. We do not support
            the downloading of private, copyright-protected, DRM-gated, or restricted content. link2save
            is not affiliated with, authorized by, or endorsed by Google LLC, YouTube, Instagram, or Meta Platforms, Inc.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>&copy; {new Date().getFullYear()} link2save. 100% Free &amp; Ad-Free Media Downloader.</p>
            <p className="font-mono text-[11px] text-slate-400">
              STATUS: OPERATIONAL &bull; V1.2.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
