import React from "react";

export type AdPlacement = "top-banner" | "hero-bottom" | "result" | "between-sections" | "footer";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

const PLACEMENT_DIMENSIONS: Record<AdPlacement, { height: string; label: string }> = {
  "top-banner": {
    height: "min-h-[90px]",
    label: "Top Banner Advertisement Area (728x90 / Responsive)",
  },
  "hero-bottom": {
    height: "min-h-[100px]",
    label: "Sponsored Content Placement (Responsive)",
  },
  result: {
    height: "min-h-[120px]",
    label: "Sponsored Result Placement (Non-intrusive)",
  },
  "between-sections": {
    height: "min-h-[150px]",
    label: "Mid-Page Advertisement Slot (Responsive)",
  },
  footer: {
    height: "min-h-[90px]",
    label: "Footer Advertisement Area (728x90 / Responsive)",
  },
};

export default function AdSlot({ placement, className = "" }: AdSlotProps) {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
  const { height, label } = PLACEMENT_DIMENSIONS[placement];

  if (!isEnabled) {
    // Development / clean placeholder ensuring CLS is 0 while keeping UI strictly non-deceptive
    return (
      <div
        className={`w-full max-w-4xl mx-auto my-6 px-4 ${className}`}
        data-ad-placement={placement}
      >
        <div
          className={`w-full ${height} flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-800/80 bg-slate-900/30 p-4 text-center select-none`}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            [ AdSense Placement Reserved: {placement} ]
          </span>
          <p className="mt-1 text-xs text-slate-400">{label}</p>
        </div>
      </div>
    );
  }

  // When live AdSense is enabled via environment variables
  return (
    <div
      className={`w-full max-w-4xl mx-auto my-6 px-4 ${className}`}
      data-ad-placement={placement}
    >
      <div className={`w-full ${height} overflow-hidden rounded-lg bg-slate-900/20`}>
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 text-center">
          Advertisement
        </div>
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={placement}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
