"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MediaMetadata } from "@/lib/api";
import { Clock, User, RotateCcw } from "lucide-react";
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
  const [selectedFormat, setSelectedFormat] = useState<MediaFormat>("video");

  const formattedDuration = formatDuration(metadata.duration);

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#0D1527] p-5 sm:p-6 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
      {/* Header bar of preview */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
        <div className="flex items-center gap-2">
          {metadata.platform === "youtube" ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono">
              <YoutubeIcon className="h-3.5 w-3.5" />
              <span>YOUTUBE</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-pink-950/40 border border-pink-500/30 text-pink-400 text-xs font-mono">
              <InstagramIcon className="h-3.5 w-3.5" />
              <span>INSTAGRAM</span>
            </div>
          )}
          <span className="text-xs font-mono uppercase text-slate-400">
            {metadata.type} verified
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          disabled={isDownloading}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>New Link</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Thumbnail container */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-inner">
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
              <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs font-mono">
                No Preview Available
              </div>
            )}

            {formattedDuration && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/85 text-[11px] font-mono font-medium text-white backdrop-blur-sm">
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
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                <User className="h-3.5 w-3.5 text-slate-500" />
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
            <p className="mt-2 text-center text-[11px] text-slate-500">
              Direct stream download. Media files are deleted immediately after download.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
