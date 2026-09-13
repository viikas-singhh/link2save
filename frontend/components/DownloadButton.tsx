import React from "react";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { MediaFormat } from "./FormatSelector";

interface DownloadButtonProps {
  format: MediaFormat;
  isDownloading: boolean;
  isCompleted: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function DownloadButton({
  format,
  isDownloading,
  isCompleted,
  onClick,
  disabled,
}: DownloadButtonProps) {
  return (
    <button
      id="download-media-button"
      type="button"
      onClick={onClick}
      disabled={disabled || isDownloading}
      className={`w-full relative flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-6 font-semibold text-white shadow-xl transition-all cursor-pointer ${
        isCompleted
          ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40"
          : "bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-red-950/50 hover:shadow-red-600/20 active:scale-[0.99]"
      } ${disabled || isDownloading ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="tracking-wide">Processing & Converting Media...</span>
        </>
      ) : isCompleted ? (
        <>
          <CheckCircle2 className="h-5 w-5" />
          <span className="tracking-wide">Download Triggered (Click to Save Again)</span>
        </>
      ) : (
        <>
          <Download className="h-5 w-5" />
          <span className="tracking-wide">
            Download {format === "video" ? "MP4 Video" : "MP3 Audio"}
          </span>
        </>
      )}
    </button>
  );
}
