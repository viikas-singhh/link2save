import React from "react";
import { Layers } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/Icons";

export type PlatformFilter = "all" | "youtube" | "instagram";

interface PlatformSelectorProps {
  selected: PlatformFilter;
  onSelect: (platform: PlatformFilter) => void;
}

export default function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  const options: { id: PlatformFilter; label: string; icon: React.ReactNode }[] = [
    {
      id: "all",
      label: "All Supported",
      icon: <Layers className="h-4 w-4" />,
    },
    {
      id: "youtube",
      label: "YouTube",
      icon: <YoutubeIcon className="h-4 w-4 text-red-500" />,
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: <InstagramIcon className="h-4 w-4 text-pink-500" />,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2 pb-2">
      {options.map((opt) => {
        const isActive = selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? "bg-slate-800 text-white shadow-sm ring-1 ring-slate-700"
                : "bg-slate-900/60 text-slate-400 hover:bg-slate-800/60 hover:text-slate-300"
            }`}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
