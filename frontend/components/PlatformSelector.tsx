import React from "react";
import { Sparkles, Film, Image as ImageIcon, UserCircle, History, Music } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/Icons";

export type PlatformFilter =
  | "all"
  | "youtube"
  | "instagram_reels"
  | "instagram_posts"
  | "instagram_dp"
  | "instagram_stories"
  | "youtube_mp3";

interface PlatformSelectorProps {
  selected: PlatformFilter;
  onSelect: (platform: PlatformFilter) => void;
}

export default function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  const options: { id: PlatformFilter; label: string; icon: React.ReactNode }[] = [
    {
      id: "all",
      label: "All Media",
      icon: <Sparkles className="h-3.5 w-3.5 text-amber-400" />,
    },
    {
      id: "youtube",
      label: "YouTube",
      icon: <YoutubeIcon className="h-3.5 w-3.5 text-red-500" />,
    },
    {
      id: "instagram_reels",
      label: "Reels",
      icon: <Film className="h-3.5 w-3.5 text-pink-500" />,
    },
    {
      id: "instagram_dp",
      label: "Insta DP",
      icon: <UserCircle className="h-3.5 w-3.5 text-purple-400" />,
    },
    {
      id: "instagram_posts",
      label: "Posts",
      icon: <ImageIcon className="h-3.5 w-3.5 text-rose-400" />,
    },
    {
      id: "instagram_stories",
      label: "Stories",
      icon: <History className="h-3.5 w-3.5 text-orange-400" />,
    },
    {
      id: "youtube_mp3",
      label: "Audio MP3",
      icon: <Music className="h-3.5 w-3.5 text-emerald-400" />,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pb-1">
      {options.map((opt) => {
        const isActive = selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-white/15 text-white shadow-lg shadow-black/40 ring-1 ring-white/30 backdrop-blur-md"
                : "glass-pill text-slate-300 hover:text-white"
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
