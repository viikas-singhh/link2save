import React from "react";
import { Video, Music, Check } from "lucide-react";

export type MediaFormat = "video" | "audio";

interface FormatSelectorProps {
  platform: "youtube" | "instagram";
  availableFormats: ("video" | "audio")[];
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
  const isYouTube = platform === "youtube";

  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
        Select Output Format:
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Video + Audio Option */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelect("video")}
          className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
            selectedFormat === "video"
              ? "border-red-500 bg-red-950/20 text-white ring-1 ring-red-500/50 shadow-md shadow-red-950/20"
              : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                selectedFormat === "video" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"
              }`}
            >
              <Video className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold flex items-center gap-2">
                <span>MP4 Video</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  HD
                </span>
              </div>
              <p className="text-xs text-slate-400">Video + Audio remuxed</p>
            </div>
          </div>
          {selectedFormat === "video" && <Check className="h-4 w-4 text-red-500" />}
        </button>

        {/* Audio Only Option (Enabled for YouTube or where available) */}
        {isYouTube && availableFormats.includes("audio") && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect("audio")}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
              selectedFormat === "audio"
                ? "border-red-500 bg-red-950/20 text-white ring-1 ring-red-500/50 shadow-md shadow-red-950/20"
                : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  selectedFormat === "audio" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                <Music className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold flex items-center gap-2">
                  <span>MP3 Audio</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    192 kbps
                  </span>
                </div>
                <p className="text-xs text-slate-400">Audio only extraction</p>
              </div>
            </div>
            {selectedFormat === "audio" && <Check className="h-4 w-4 text-red-500" />}
          </button>
        )}
      </div>
    </div>
  );
}
