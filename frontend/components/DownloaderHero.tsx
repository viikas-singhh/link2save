"use client";

import React, { useState } from "react";
import UrlInput from "./UrlInput";
import PlatformSelector, { PlatformFilter } from "./PlatformSelector";
import MediaPreview from "./MediaPreview";
import ProgressState, { DownloadStep } from "./ProgressState";
import { analyzeMedia, downloadMediaFile, MediaMetadata } from "@/lib/api";
import { validateInputUrl } from "@/lib/validation";
import { AlertCircle, RotateCcw, Shield } from "lucide-react";
import { MediaFormat } from "./FormatSelector";

export default function DownloaderHero() {
  const [url, setUrl] = useState("");
  const [filter, setFilter] = useState<PlatformFilter>("all");
  const [step, setStep] = useState<DownloadStep>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnalyze = async () => {
    setErrorMessage(null);
    setIsCompleted(false);

    const validation = validateInputUrl(url);
    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage || "Please enter a valid YouTube or Instagram URL.");
      return;
    }

    setStep("analyzing");
    setStatusMessage("Connecting to media service and analyzing URL...");

    try {
      const data = await analyzeMedia(url);
      setMetadata(data);
      setStep("ready");
      setStatusMessage("Analysis complete. Select format and download.");
    } catch (err: unknown) {
      setStep("idle");
      const msg = err instanceof Error ? err.message : "Something went wrong while analyzing the media. Please try again.";
      setErrorMessage(msg);
    }
  };

  const handleDownload = async (format: MediaFormat) => {
    if (!url) return;
    setErrorMessage(null);
    setStep("preparing");
    setStatusMessage("Preparing isolated temporary environment...");

    // Advance smoothly to processing
    const prepTimer = setTimeout(() => {
      setStep("processing");
      setStatusMessage("Extracting media streams and encoding with FFmpeg...");
    }, 800);

    try {
      await downloadMediaFile(url, format);
      clearTimeout(prepTimer);
      setStep("ready");
      setStatusMessage("Media ready and saved to your device!");
      setIsCompleted(true);
    } catch (err: unknown) {
      clearTimeout(prepTimer);
      setStep("idle");
      const msg = err instanceof Error ? err.message : "Something went wrong while processing the media. Please try again.";
      setErrorMessage(msg);
    }
  };

  const handleReset = () => {
    setUrl("");
    setMetadata(null);
    setStep("idle");
    setErrorMessage(null);
    setIsCompleted(false);
  };

  return (
    <section id="downloader" className="relative w-full pt-10 pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center space-y-6">
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/30 px-3.5 py-1 text-xs font-mono text-red-400">
          <Shield className="h-3.5 w-3.5" />
          <span>FAST &bull; SECURE &bull; NO LOGS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
          Download Public Media <br />
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-rose-400 bg-clip-text text-transparent">
            Without Limitations
          </span>
        </h1>

        {/* Short explanation */}
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
          High-performance extractor for public YouTube videos and Instagram Reels.
          Save high-definition MP4 videos or crystal-clear MP3 audio instantly.
        </p>

        {/* Platform quick toggle */}
        <div className="pt-2">
          <PlatformSelector selected={filter} onSelect={setFilter} />
        </div>

        {/* Main Downloader Widget Container */}
        <div className="relative mx-auto max-w-3xl mt-6 space-y-4">
          {!metadata ? (
            <UrlInput
              url={url}
              onChange={setUrl}
              onSubmit={handleAnalyze}
              isLoading={step === "analyzing"}
            />
          ) : (
            <MediaPreview
              metadata={metadata}
              isDownloading={step === "preparing" || step === "processing"}
              isCompleted={isCompleted}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          )}

          {/* Stepped Progress Feedback */}
          {step !== "idle" && !isCompleted && (
            <ProgressState currentStep={step} statusText={statusMessage} />
          )}

          {/* Error Message Box with Retry Action */}
          {errorMessage && (
            <div className="rounded-xl border border-red-900/60 bg-red-950/40 p-4 text-left backdrop-blur-md animate-in fade-in duration-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-red-200">Unable to Process Media</h4>
                  <p className="mt-1 text-xs text-red-300/90 leading-relaxed">{errorMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={metadata ? () => handleDownload("video") : handleAnalyze}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-300 hover:text-white bg-red-900/50 hover:bg-red-800/60 px-2.5 py-1 rounded-lg transition"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Retry</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
