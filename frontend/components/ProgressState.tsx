import React from "react";
import { Loader2, CheckCircle2, CircleDashed } from "lucide-react";

export type DownloadStep = "idle" | "analyzing" | "preparing" | "processing" | "ready" | "error";

interface ProgressStateProps {
  currentStep: DownloadStep;
  statusText?: string;
}

const STEPS: { key: DownloadStep; label: string }[] = [
  { key: "analyzing", label: "Analyzing" },
  { key: "preparing", label: "Preparing" },
  { key: "processing", label: "Processing" },
  { key: "ready", label: "Ready" },
];

export default function ProgressState({ currentStep, statusText }: ProgressStateProps) {
  if (currentStep === "idle") return null;

  const currentIdx = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#0D1527]/70 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {currentStep === "ready" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <Loader2 className="h-4 w-4 animate-spin text-red-500" />
          )}
          <span className="text-xs font-mono font-medium tracking-wide uppercase text-slate-300">
            {statusText || (currentStep === "ready" ? "Media Ready" : `${currentStep}...`)}
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          STEP {Math.max(1, currentIdx + 1)} OF 4
        </span>
      </div>

      {/* Progress Bar */}
      <div className="grid grid-cols-4 gap-1.5">
        {STEPS.map((s, idx) => {
          const isDone = currentIdx > idx || currentStep === "ready";
          const isCurrent = currentIdx === idx && currentStep !== "ready";

          return (
            <div key={s.key} className="space-y-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isDone
                    ? "bg-emerald-500"
                    : isCurrent
                    ? "bg-red-500 animate-pulse"
                    : "bg-slate-800"
                }`}
              />
              <span
                className={`block text-[10px] truncate ${
                  isDone
                    ? "text-emerald-400"
                    : isCurrent
                    ? "text-red-400 font-medium"
                    : "text-slate-600"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
