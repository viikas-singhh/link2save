import React from "react";
import { Video, Music, Image as ImageIcon, Check } from "lucide-react";

export type MediaFormat = "video" | "audio" | "image";

interface FormatSelectorProps {
  platform: "youtube" | "instagram";
  availableFormats: ("video" | "audio" | "image")[];
  selectedFormat: MediaFormat;
  onSelect: (format: MediaFormat) => void;
  disabled?: boolean;
}

export default function FormatSelector({
  platform,
  availableFormats,
  selectedFormat,
  onSelect,
  disabled,
}: FormatSelectorProps) {
  const hasVideo = availableFormats.includes("video");
  const hasAudio = availableFormats.includes("audio");
  const hasImage = availableFormats.includes("image");

  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
        Choose Output Format:
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Image Option (For DP or Photo Posts) */}
        {hasImage && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect("image")}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
              selectedFormat === "image"
                ? "border-purple-500/80 bg-purple-950/40 text-white ring-1 ring-purple-500/50 shadow-lg shadow-purple-950/40"
                : "border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20 hover:bg-slate-800/40"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  selectedFormat === "image" ? "bg-purple-600 text-white" : "bg-white/5 text-purple-400"
                }`}
              >
                <ImageIcon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold flex items-center gap-2">
                  <span>HD Photo / DP</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    JPG
                  </span>
                </div>
                <p className="text-xs text-slate-400">Original high resolution image</p>
              </div>
            </div>
            {selectedFormat === "image" && <Check className="h-4 w-4 text-purple-400" />}
          </button>
        )}

        {/* Video + Audio Option */}
        {hasVideo && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect("video")}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
              selectedFormat === "video"
                ? "border-red-500/80 bg-red-950/40 text-white ring-1 ring-red-500/50 shadow-lg shadow-red-950/40"
                : "border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20 hover:bg-slate-800/40"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  selectedFormat === "video" ? "bg-red-600 text-white" : "bg-white/5 text-red-400"
                }`}
              >
                <Video className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold flex items-center gap-2">
                  <span>MP4 Video</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    Full HD
                  </span>
                </div>
                <p className="text-xs text-slate-400">High-def video with audio</p>
              </div>
            </div>
            {selectedFormat === "video" && <Check className="h-4 w-4 text-red-400" />}
          </button>
        )}

        {/* Audio Only Option */}
        {hasAudio && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect("audio")}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
              selectedFormat === "audio"
                ? "border-emerald-500/80 bg-emerald-950/40 text-white ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/40"
                : "border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20 hover:bg-slate-800/40"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  selectedFormat === "audio" ? "bg-emerald-600 text-white" : "bg-white/5 text-emerald-400"
                }`}
              >
                <Music className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold flex items-center gap-2">
                  <span>MP3 Audio</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    192 kbps
                  </span>
                </div>
                <p className="text-xs text-slate-400">High fidelity music & voice</p>
              </div>
            </div>
            {selectedFormat === "audio" && <Check className="h-4 w-4 text-emerald-400" />}
          </button>
        )}
      </div>
    </div>
  );
}
