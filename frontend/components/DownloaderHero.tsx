"use client";

import React, { useState } from "react";
import UrlInput from "./UrlInput";
import PlatformSelector, { PlatformFilter } from "./PlatformSelector";
import MediaPreview from "./MediaPreview";
import ProgressState, { DownloadStep } from "./ProgressState";
import { analyzeMedia, downloadMediaFile, MediaMetadata } from "@/lib/api";
import { validateInputUrl } from "@/lib/validation";
import { AlertCircle, RotateCcw, Shield, Sparkles } from "lucide-react";
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
      setErrorMessage(validation.errorMessage || "Please enter a valid YouTube or Instagram URL or username.");
      return;
    }

    setStep("analyzing");
    setStatusMessage("Connecting to media engine and analyzing media...");

    // Friendly notice for Render free tier spinning up
    const coldStartTimer = setTimeout(() => {
      setStatusMessage("Waking up high-speed media engine (~20s on initial load)...");
    }, 3500);

    try {
      const data = await analyzeMedia(url);
      clearTimeout(coldStartTimer);
      setMetadata(data);
      setStep("ready");
      setStatusMessage("Analysis complete. Select format and download.");
    } catch (err: unknown) {
      clearTimeout(coldStartTimer);
      setStep("idle");
      const msg = err instanceof Error ? err.message : "Something went wrong while analyzing the media. Please try again.";
      setErrorMessage(msg);
    }
  };

  const handleDownload = async (format: MediaFormat) => {
    if (!url) return;
    setErrorMessage(null);
    setStep("preparing");
    setStatusMessage(format === "image" ? "Fetching high-definition image..." : "Preparing isolated temporary sandbox...");

    const prepTimer = setTimeout(() => {
      setStep("processing");
      setStatusMessage(format === "image" ? "Optimizing image resolution..." : "Extracting media streams and encoding with FFmpeg...");
    }, 1000);

    try {
      await downloadMediaFile(url, format);
      clearTimeout(prepTimer);
      setStep("ready");
      setStatusMessage("Media ready and saved to your device!");
      setIsCompleted(true);
    } catch (err: unknown) {
      clearTimeout(prepTimer);
      setStep("ready");
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
    <section id="downloader" className="relative w-full pt-8 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Ambient background glow orbs for glassmorphic depth */}
      <div className="ambient-glow-red -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[350px] opacity-40" />
      <div className="ambient-glow-pink top-32 -left-20 w-[400px] h-[400px] opacity-30" />
      <div className="ambient-glow-cyan top-40 -right-20 w-[400px] h-[400px] opacity-25" />

      <div className="relative mx-auto max-w-4xl text-center space-y-6">
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-mono text-slate-300 shadow-lg">
          <Shield className="h-3.5 w-3.5 text-red-400" />
          <span>100% FREE &bull; NO ADS &bull; FULL HD &bull; ZERO LOGS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Download Public Media <br />
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-pink-400 bg-clip-text text-transparent">
            Without Limits or Ads
          </span>
        </h1>

        {/* Short explanation */}
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
          High-performance downloader for public <strong className="text-white font-medium">YouTube Videos & Shorts</strong>,{" "}
          <strong className="text-white font-medium">Instagram Reels</strong>,{" "}
          <strong className="text-white font-medium">Full HD DP</strong>, and <strong className="text-white font-medium">Posts</strong>. Fast, free, and completely ad-free.
        </p>

        {/* Platform quick toggle tabs */}
        <div className="pt-2">
          <PlatformSelector selected={filter} onSelect={setFilter} />
        </div>

        {/* Main Downloader Widget Container */}
        <div className="relative mx-auto max-w-3xl mt-4 space-y-4">
          {!metadata ? (
            <UrlInput
              url={url}
              onChange={setUrl}
              onSubmit={handleAnalyze}
              isLoading={step === "analyzing"}
              filterMode={filter}
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
            <div className="glass-card rounded-xl p-3">
              <ProgressState currentStep={step} statusText={statusMessage} />
            </div>
          )}

          {/* Error Message Box with Retry Action */}
          {errorMessage && (
            <div className="glass-card rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-left backdrop-blur-xl animate-in fade-in duration-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-red-200">Unable to Process Media</h4>
                  <p className="mt-1 text-xs text-red-300/90 leading-relaxed">{errorMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={metadata ? () => handleDownload("video") : handleAnalyze}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-200 hover:text-white bg-red-900/60 hover:bg-red-800/80 px-3 py-1.5 rounded-lg transition cursor-pointer"
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
