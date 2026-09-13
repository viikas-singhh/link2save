"use client";

import React, { useState } from "react";
import { Link2, Clipboard, X, Loader2, ArrowRight } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/Icons";
import { detectPlatform, DetectedPlatform } from "@/lib/validation";

interface UrlInputProps {
  url: string;
  onChange: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function UrlInput({ url, onChange, onSubmit, isLoading }: UrlInputProps) {
  const [pasteError, setPasteError] = useState(false);
  const detected: DetectedPlatform = detectPlatform(url);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text);
        setPasteError(false);
      }
    } catch {
      setPasteError(true);
      setTimeout(() => setPasteError(false), 2500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && url.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col sm:flex-row items-center gap-2.5 rounded-2xl border border-slate-800 bg-[#0D1527]/90 p-2.5 shadow-2xl backdrop-blur-md transition-all focus-within:border-red-600/70 focus-within:ring-1 focus-within:ring-red-600/40">
        {/* Left Link Icon & Platform Indicator */}
        <div className="hidden sm:flex items-center pl-3 text-slate-500">
          {detected === "youtube" ? (
            <YoutubeIcon className="h-5 w-5 text-red-500 animate-in fade-in zoom-in-75 duration-200" />
          ) : detected === "instagram" ? (
            <InstagramIcon className="h-5 w-5 text-pink-500 animate-in fade-in zoom-in-75 duration-200" />
          ) : (
            <Link2 className="h-5 w-5 text-slate-400" />
          )}
        </div>

        {/* Input Field */}
        <input
          id="media-url-input"
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste public YouTube or Instagram URL here..."
          className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-500 outline-none"
          autoComplete="off"
          spellCheck="false"
          disabled={isLoading}
          aria-label="Public media URL"
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

          {/* Paste from clipboard */}
          {!url && (
            <button
              type="button"
              onClick={handlePaste}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <Clipboard className="h-3.5 w-3.5" />
              <span>Paste</span>
            </button>
          )}

          {/* Analyze CTA */}
          <button
            id="analyze-button"
            type="button"
            onClick={onSubmit}
            disabled={isLoading || !url.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:from-red-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analyzing</span>
              </>
            ) : (
              <>
                <span>Analyze</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {pasteError && (
        <p className="mt-2 text-xs text-amber-400/90 pl-2">
          Clipboard access unavailable. Please paste using Ctrl+V or right-click.
        </p>
      )}
    </div>
  );
}
