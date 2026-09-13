"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem, DEFAULT_FAQS } from "@/lib/faqs";

export type { FaqItem };
export { DEFAULT_FAQS };

export default function FaqAccordion({ items = DEFAULT_FAQS }: { items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-3xl mx-auto divide-y divide-slate-800/80 rounded-2xl border border-slate-800 bg-[#0D1527]/50 backdrop-blur-md">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="p-4 sm:p-5">
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="flex w-full items-center justify-between text-left text-sm sm:text-base font-medium text-slate-200 hover:text-white transition"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-red-400" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-400 animate-in fade-in duration-150">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
