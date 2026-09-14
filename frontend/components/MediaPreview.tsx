"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MediaMetadata } from "@/lib/api";
import { Clock, User, RotateCcw, Sparkles } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/Icons";
import FormatSelector, { MediaFormat } from "./FormatSelector";
import DownloadButton from "./DownloadButton";

interface MediaPreviewProps {
  metadata: MediaMetadata;
  isDownloading: boolean;
  isCompleted: boolean;
  onDownload: (format: MediaFormat) => void;
  onReset: () => void;
}

function formatDuration(seconds?: number): string {
  if (!seconds || seconds <= 0) return "";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}:${remMins < 10 ? "0" : ""}${remMins}:${secs < 10 ? "0" : ""}${secs}`;
  }
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function MediaPreview({
  metadata,
  isDownloading,
  isCompleted,
  onDownload,
  onReset,
}: MediaPreviewProps) {
  // Default to the first available format (e.g. "image" for DP/photos, "video" for videos)
  const initialFormat = (metadata.formats && metadata.formats[0]) || "video";
  const [selectedFormat, setSelectedFormat] = useState<MediaFormat>(initialFormat as MediaFormat);

  useEffect(() => {
    if (metadata.formats && !metadata.formats.includes(selectedFormat)) {
      setSelectedFormat(metadata.formats[0] as MediaFormat);
    }
  }, [metadata, selectedFormat]);

  const formattedDuration = formatDuration(metadata.duration);
  const isProfile = metadata.type === "profile";

  return (
    <div className="glass-panel w-full rounded-2xl p-5 sm:p-7 animate-in fade-in zoom-in-95 duration-300">
      {/* Header bar of preview */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
        <div className="flex items-center gap-2">
          {metadata.platform === "youtube" ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-mono">
              <YoutubeIcon className="h-3.5 w-3.5" />
              <span>YOUTUBE</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-950/50 border border-pink-500/40 text-pink-400 text-xs font-mono">
              <InstagramIcon className="h-3.5 w-3.5" />
              <span>INSTAGRAM</span>
            </div>
          )}
          <span className="text-xs font-mono uppercase text-slate-300 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>{metadata.type} verified</span>
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          disabled={isDownloading}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition disabled:opacity-50 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>New Link</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Thumbnail / Avatar container */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div
            className={`relative overflow-hidden bg-slate-950/80 border border-white/15 shadow-2xl ${
              isProfile ? "w-40 h-40 sm:w-48 sm:h-48 rounded-full ring-4 ring-purple-500/30" : "w-full aspect-video rounded-xl"
            }`}
          >
            {metadata.thumbnail ? (
              <Image
                src={metadata.thumbnail}
                alt={metadata.title || "Media Preview"}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-mono">
                No Preview Available
              </div>
            )}

            {formattedDuration && !isProfile && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono font-medium text-white backdrop-blur-md">
                <Clock className="h-3 w-3" />
                <span>{formattedDuration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Metadata details & format selection */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white line-clamp-2 leading-snug">
              {metadata.title || "Public Media"}
            </h2>

            {metadata.author && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-300">
                <User className="h-3.5 w-3.5 text-slate-400" />
                <span>{metadata.author}</span>
              </div>
            )}
          </div>

          <FormatSelector
            platform={metadata.platform}
            availableFormats={metadata.formats}
            selectedFormat={selectedFormat}
            onSelect={setSelectedFormat}
            disabled={isDownloading}
          />

          <div className="pt-2">
            <DownloadButton
              format={selectedFormat}
              isDownloading={isDownloading}
              isCompleted={isCompleted}
              onClick={() => onDownload(selectedFormat)}
            />
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Direct high-speed download. 100% Free &bull; Zero logs &bull; Ephemeral sandbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
