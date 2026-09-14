"use client";

import React, { useState } from "react";
import { Link2, Clipboard, X, Loader2, ArrowRight, Film, UserCheck, Image as ImageIcon, Sparkles, Check } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/Icons";
import { detectMediaDetails } from "@/lib/validation";
import { PlatformFilter } from "./PlatformSelector";

interface UrlInputProps {
  url: string;
  onChange: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  filterMode?: PlatformFilter;
}

export default function UrlInput({ url, onChange, onSubmit, isLoading, filterMode = "all" }: UrlInputProps) {
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [pasteError, setPasteError] = useState(false);
  const details = detectMediaDetails(url);

  const getPlaceholder = () => {
    switch (filterMode) {
      case "instagram_dp":
        return "Enter @username or Instagram profile URL for Full HD DP...";
      case "instagram_reels":
        return "Paste public Instagram Reel link here...";
      case "instagram_posts":
        return "Paste Instagram Post or photo link here...";
      case "instagram_stories":
        return "Paste Instagram Story link here...";
      case "youtube_mp3":
        return "Paste YouTube video link to extract MP3 audio...";
      case "youtube":
        return "Paste YouTube video or Shorts link here...";
      default:
        return "Paste YouTube video, Instagram Reel, Post, or @username for DP...";
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text.trim());
        setPasteError(false);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2000);
      }
    } catch {
      setPasteError(true);
      setTimeout(() => setPasteError(false), 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && url.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="glass-input-container relative flex flex-col sm:flex-row items-center gap-2 rounded-2xl p-2 sm:p-2.5 transition-all">
        {/* Left Link Icon & Smart Detected Badge */}
        <div className="hidden sm:flex items-center pl-3 text-slate-400">
          {details.kind === "youtube_video" ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono">
              <YoutubeIcon className="h-3.5 w-3.5" />
              <span>YT Video</span>
            </div>
          ) : details.kind === "youtube_shorts" ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono">
              <YoutubeIcon className="h-3.5 w-3.5" />
              <span>YT Shorts</span>
            </div>
          ) : details.kind === "instagram_reel" ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-mono">
              <Film className="h-3.5 w-3.5" />
              <span>Insta Reel</span>
            </div>
          ) : details.kind === "instagram_dp" ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono">
              <UserCheck className="h-3.5 w-3.5" />
              <span>Insta DP</span>
            </div>
          ) : details.kind === "instagram_post" ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono">
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Insta Post</span>
            </div>
          ) : (
            <div className="p-1 text-slate-400">
              <Link2 className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Input Field */}
        <input
          id="media-url-input"
          type="text"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-400/80 outline-none"
          autoComplete="off"
          spellCheck="false"
          disabled={isLoading}
          aria-label="Public media URL or username"
        />

        {/* Action Controls */}
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2 pr-1">
          {/* Clear Button */}
          {url && !isLoading && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
              title="Clear input"
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Convenient 1-Click Paste button */}
          <button
            type="button"
            onClick={handlePaste}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-medium text-slate-200 transition-all cursor-pointer active:scale-95"
            title="Paste link from clipboard"
          >
            {copiedNotification ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-300">Pasted</span>
              </>
            ) : (
              <>
                <Clipboard className="h-3.5 w-3.5 text-slate-300" />
                <span>Paste</span>
              </>
            )}
          </button>

          {/* Analyze / Download CTA */}
          <button
            id="analyze-button"
            type="button"
            onClick={onSubmit}
            disabled={isLoading || !url.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-950/50 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Fetching</span>
              </>
            ) : (
              <>
                <span>Download</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {pasteError && (
        <p className="text-xs text-amber-400/90 pl-3">
          Clipboard access was denied by your browser. Please paste using Ctrl+V.
        </p>
      )}
    </div>
  );
}
