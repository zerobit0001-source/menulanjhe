"use client";
import { Search, X } from "lucide-react";

export function Template008Search({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="px-4 pt-3">
      <label className="mx-auto flex h-13 max-w-5xl items-center gap-3 rounded-full border border-[#E5E5E5] bg-white px-5 py-3.5 transition focus-within:border-[#F5C400] focus-within:shadow-[0_0_0_4px_rgba(245,196,0,0.18)]">
        <Search size={19} strokeWidth={1.75} className="shrink-0 text-[#A3A3A3]" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="جستجو در منو..."
          className="w-full bg-transparent text-[15px] text-[#171717] outline-none placeholder:text-[#A3A3A3]"
        />
        {value && (
          <button type="button" onClick={() => onChange("")} aria-label="پاک کردن" className="rounded-full bg-neutral-100 p-1 text-[#737373]">
            <X size={14} />
          </button>
        )}
      </label>
    </div>
  );
}
